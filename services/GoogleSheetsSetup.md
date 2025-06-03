# Setting Up Google Sheets Integration

This document provides instructions for setting up a Google Sheet to store waitlist emails.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Picturist Waitlist"
3. Set up the following headers in row 1:
   - Column A: Email
   - Column B: Timestamp
   - Column C: Source
   - Column D: UTM Source (optional)
   - Column E: UTM Medium (optional)
   - Column F: UTM Campaign (optional)

## Step 2: Set Up Google Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. In the Apps Script editor, replace the default code with the following:

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Validate that email exists
    if (!data.email || !validateEmail(data.email)) {
      return ContentService.createTextOutput(JSON.stringify({
        'success': false,
        'message': 'Invalid email format'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists
    const emails = sheet.getRange(2, 1, sheet.getLastRow(), 1).getValues().flat();
    if (emails.includes(data.email)) {
      // Return success but don't add duplicate
      return ContentService.createTextOutput(JSON.stringify({
        'success': true,
        'message': 'Email already exists'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Add the new entry
    sheet.appendRow([
      data.email,
      new Date().toISOString(),
      data.source || 'website',
      data.utm_source || '',
      data.utm_medium || '',
      data.utm_campaign || ''
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({
      'success': true,
      'message': 'Email added successfully'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Simple email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Optional: Handle GET requests
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    'success': false,
    'message': 'Please use POST method instead'
  })).setMimeType(ContentService.MimeType.JSON);
}
```

## Step 3: Deploy as Web App

1. Click on **Deploy** > **New deployment**
2. Select **Web app** as the deployment type
3. Configure the deployment:
   - Description: "Picturist Waitlist Form Handler"
   - Execute as: "Me"
   - Who has access: "Anyone" (for public form submissions)
4. Click **Deploy**
5. Copy the Web app URL that appears (it will look like `https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec`)

## Step 4: Update Your Application

1. Copy the Web app URL from Step 3
2. Update the `SHEETS_API_URL` in the EmailService.ts file with your URL
3. Test the integration by submitting an email through your waitlist form

## Security Considerations

- This setup is suitable for simple landing pages where security is not critical
- For production use, consider adding CORS restrictions or a simple API key
- If you expect high traffic, consider using a more robust solution like Firebase or a dedicated backend

## Troubleshooting

If you encounter CORS errors:
1. Add the following to the top of your doPost function:
```javascript
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

if (e.method === 'OPTIONS') {
  return ContentService.createTextOutput('').setMimeType(ContentService.MimeType.TEXT)
    .setHeaders(headers);
}
```

2. Make sure to set headers in your response:
```javascript
return ContentService.createTextOutput(JSON.stringify({
  'success': true,
  'message': 'Email added successfully'
})).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
```