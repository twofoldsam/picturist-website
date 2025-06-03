/**
 * EmailService.ts
 * A service for handling waitlist email submissions via Formspree
 */

interface WaitlistSubmissionData {
  email: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

interface WaitlistResponse {
  success: boolean;
  message: string;
}

export class EmailService {
  // Using Formspree - much more reliable than Google Apps Script
  private static readonly FORMSPREE_URL = 'https://formspree.io/f/xdkopqaw';
  
  // For fallback/offline functionality
  private static readonly STORAGE_KEY = 'picturist_waitlist_emails_pending';
  
  /**
   * Submit an email to the waitlist via Formspree
   */
  public static async submitEmail(email: string, source: string = 'website'): Promise<boolean> {
    try {
      // Validate email format first
      if (!this.validateEmail(email)) {
        throw new Error('Invalid email format');
      }
      
      // Prepare submission data
      const submissionData = {
        email,
        source,
        message: `New waitlist signup from ${source}`,
        // Capture UTM parameters if available
        utm_source: this.getUTMParameter('utm_source'),
        utm_medium: this.getUTMParameter('utm_medium'),
        utm_campaign: this.getUTMParameter('utm_campaign')
      };
      
      // Attempt to submit to Formspree
      const response = await this.submitToFormspree(submissionData);
      
      if (response.success) {
        console.log(`Email ${email} added to waitlist via Formspree`);
        this.saveSubmissionLocally(email, source, true); // Mark as successfully synced
        return true;
      } else {
        // If the API call fails due to network issues, save locally for later sync
        console.warn('Failed to submit to Formspree:', response.message);
        this.saveSubmissionLocally(email, source, false);
        return false;
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      // Attempt to save locally if there's an error
      this.saveSubmissionLocally(email, source, false);
      return false;
    }
  }
  
  /**
   * Make the actual API request to Formspree
   */
  private static async submitToFormspree(data: any): Promise<WaitlistResponse> {
    try {
      console.log('🚀 Attempting to submit to Formspree:', this.FORMSPREE_URL);
      console.log('📧 Data being sent:', data);
      
      const response = await fetch(this.FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('✅ Response data:', responseData);
      
      // Formspree returns ok: true on success
      return {
        success: responseData.ok === true,
        message: responseData.ok ? 'Email added successfully' : 'Failed to submit'
      };
      
    } catch (error) {
      console.error('❌ Formspree API error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
  
  /**
   * Validate email format
   */
  public static validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  /**
   * Save submission locally (as backup or when offline)
   */
  private static saveSubmissionLocally(email: string, source: string, synced: boolean): void {
    try {
      const pendingSubmissions = this.getPendingSubmissions();
      
      // Check if email already exists in pending submissions
      if (pendingSubmissions.some(entry => entry.email === email)) {
        // Update the existing entry if found
        const updatedSubmissions = pendingSubmissions.map(entry => {
          if (entry.email === email) {
            return {
              ...entry,
              synced,
              timestamp: Date.now()
            };
          }
          return entry;
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedSubmissions));
      } else {
        // Add new entry
        pendingSubmissions.push({
          email,
          source,
          timestamp: Date.now(),
          synced
        });
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pendingSubmissions));
      }
    } catch (error) {
      console.error('Error saving to local storage:', error);
    }
  }
  
  /**
   * Get pending submissions from local storage
   */
  private static getPendingSubmissions(): any[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  }
  
  /**
   * Get unsynced submissions that need to be sent to Google Sheets
   */
  public static getUnsyncedSubmissions(): any[] {
    return this.getPendingSubmissions().filter(entry => !entry.synced);
  }
  
  /**
   * Helper to extract UTM parameters from URL
   */
  private static getUTMParameter(param: string): string {
    if (typeof window === 'undefined') return '';
    
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param) || '';
  }
  
  /**
   * Attempt to sync any locally stored submissions that haven't been sent to Google Sheets
   * This can be called when the app regains network connectivity
   */
  public static async syncPendingSubmissions(): Promise<{success: number, failed: number}> {
    const unsynced = this.getUnsyncedSubmissions();
    let success = 0;
    let failed = 0;
    
    for (const entry of unsynced) {
      try {
        const result = await this.submitToFormspree({
          email: entry.email,
          source: entry.source,
          utm_source: entry.utm_source || '',
          utm_medium: entry.utm_medium || '',
          utm_campaign: entry.utm_campaign || ''
        });
        
        if (result.success) {
          this.saveSubmissionLocally(entry.email, entry.source, true);
          success++;
        } else {
          failed++;
        }
      } catch (error) {
        console.error(`Failed to sync ${entry.email}:`, error);
        failed++;
      }
    }
    
    return { success, failed };
  }
}