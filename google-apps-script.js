function doPost(e) {
  // Set up CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle preflight requests
  if (e.method === 'OPTIONS') {
    return ContentService.createTextOutput('')
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeaders(headers);
  }

  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Validate that email exists
    if (!data.email || !validateEmail(data.email)) {
      return ContentService.createTextOutput(JSON.stringify({
        'success': false,
        'message': 'Invalid email format'
      })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
    }
    
    // Check if email already exists (only check if there are rows with data)
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const emails = sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
      if (emails.includes(data.email)) {
        // Return success but don't add duplicate
        return ContentService.createTextOutput(JSON.stringify({
          'success': true,
          'message': 'Email already exists'
        })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
      }
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
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      'success': false,
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON).setHeaders(headers);
  }
}

// Simple email validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Handle GET requests
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    'success': false,
    'message': 'Please use POST method instead'
  })).setMimeType(ContentService.MimeType.JSON);
} 