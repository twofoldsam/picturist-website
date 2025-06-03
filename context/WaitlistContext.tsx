import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EmailService } from '../services/EmailService';
import { toast } from "sonner";

interface WaitlistContextType {
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  hasJoined: boolean;
  setHasJoined: (value: boolean) => void;
  submitEmail: (email: string, source: string) => Promise<boolean>;
  checkNetworkAndSync: () => Promise<void>;
  submissionError: string | null;
  setSubmissionError: (error: string | null) => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const useWaitlist = (): WaitlistContextType => {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};

interface WaitlistProviderProps {
  children: ReactNode;
}

export const WaitlistProvider: React.FC<WaitlistProviderProps> = ({ children }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("You're back online. Syncing data...");
      checkNetworkAndSync();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      toast.warning("You're offline. Waitlist submissions will be saved locally and synced when you're back online.");
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Set initial online status
    setIsOnline(navigator.onLine);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Check for any unsynchronized submissions on initial load
  useEffect(() => {
    if (isOnline) {
      checkNetworkAndSync();
    }
  }, [isOnline]);
  
  // Submit email to waitlist via EmailService
  const submitEmail = async (email: string, source: string): Promise<boolean> => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      if (!EmailService.validateEmail(email)) {
        setSubmissionError("Please enter a valid email address");
        setIsSubmitting(false);
        return false;
      }
      
      // If offline, we'll still try to submit but it will be saved locally
      if (!isOnline) {
        toast.info("You're offline. Your submission will be synced when you reconnect.");
      }
      
      const success = await EmailService.submitEmail(email, source);
      
      setIsSubmitting(false);
      
      if (success || !isOnline) {
        setHasJoined(true);
        return true;
      } else {
        setSubmissionError("Failed to join the waitlist. Please try again later.");
        return false;
      }
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmissionError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
      return false;
    }
  };
  
  // Attempt to sync any offline submissions when back online
  const checkNetworkAndSync = async (): Promise<void> => {
    if (!isOnline) return;
    
    try {
      const unsyncedCount = EmailService.getUnsyncedSubmissions().length;
      
      if (unsyncedCount > 0) {
        const result = await EmailService.syncPendingSubmissions();
        
        if (result.success > 0) {
          toast.success(`Successfully synced ${result.success} waitlist submission${result.success > 1 ? 's' : ''}.`);
        }
        
        if (result.failed > 0) {
          toast.error(`Failed to sync ${result.failed} submission${result.failed > 1 ? 's' : ''}. Will try again later.`);
        }
      }
    } catch (error) {
      console.error("Error syncing submissions:", error);
    }
  };

  const value = {
    isSubmitting,
    setIsSubmitting,
    hasJoined,
    setHasJoined,
    submitEmail,
    checkNetworkAndSync,
    submissionError,
    setSubmissionError
  };

  return (
    <WaitlistContext.Provider value={value}>
      {children}
    </WaitlistContext.Provider>
  );
};