/**
 * Google Apps Script for the Hick's Law Experiment
 * 
 * Instructions:
 * 1. Create a Google Sheet.
 * 2. Click Extensions > Apps Script.
 * 3. Replace the default code with this script.
 * 4. Rename the project if desired.
 * 5. Click "Deploy" > "New deployment".
 * 6. Select type "Web app".
 * 7. Set "Execute as" to "Me".
 * 8. Set "Who has access" to "Anyone" (crucial for receiving data without auth).
 * 9. Authorize access.
 * 10. Copy the Web App URL and paste it into your local config.js file.
 */

function doPost(e) {
  try {
    var payloadStr = e.postData.contents;
    var data = JSON.parse(payloadStr);
    
    // Ensure data is parsed as an array of trials
    if (!Array.isArray(data)) {
      data = [data];
    }
    
    var sheet = getOrCreateResponsesSheet();
    var headers = getHeaders();
    
    // Initialize headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
    }
    
    // Process and append rows
    for (var i = 0; i < data.length; i++) {
      var trialData = data[i];
      var row = [];
      for (var j = 0; j < headers.length; j++) {
        var key = headers[j];
        var val = trialData[key];
        
        // Handle nulls, objects, or arrays to string, else use literal value
        if (val === undefined || val === null) {
          row.push("");
        } else if (typeof val === "object" || Array.isArray(val)) {
          row.push(JSON.stringify(val));
        } else {
          row.push(val);
        }
      }
      sheet.appendRow(row);
    }
    
    return createJsonResponse({ success: true, rows: data.length });
    
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

function doGet(e) {
  return createJsonResponse({ 
    success: true, 
    message: "AnswerBestFriends GAS endpoint is running." 
  });
}

function getOrCreateResponsesSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("responses");
  if (!sheet) {
    sheet = ss.insertSheet("responses");
  }
  return sheet;
}

// Columns definition corresponding directly to JavaScript data schema
function getHeaders() {
  return [
    "participant_id",
    "participant_type",
    "language",
    "session_id",
    "trial_id",
    "phase",
    "is_bonus",
    "condition",
    "option_count",
    "question_id",
    "question_text",
    "options_json",
    "selected_option",
    "trial_start_time",
    "selected_time",
    "reaction_time_ms",
    "satisfaction",
    "difficulty",
    "confidence",
    
    // New columns for block-based experiment design
    "block_id",
    "block_index",
    "trial_in_block",
    "block_option_count",
    "rating_scope",
    "is_filler",
    
    "user_agent",
    "screen_width",
    "screen_height",
    "created_at",
    "session_start_time",
    "session_end_time",
    "total_time_ms"
  ];
}

function createJsonResponse(obj) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
