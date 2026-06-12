const SHEET_NAME = 'responses';

const HEADERS = [
  'participant_id','participant_type','language','session_id','trial_id','phase','is_bonus','condition','option_count','question_id','question_text','options_json','selected_option','trial_start_time','selected_time','reaction_time_ms','satisfaction','difficulty','confidence','user_agent','screen_width','screen_height','created_at','session_start_time','session_end_time','total_time_ms'
];

function doGet() {
  return json_({ success: true, message: 'AnswerBestFriends GAS endpoint is running.' });
}

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : '[]';
    const data = JSON.parse(raw);
    const rows = Array.isArray(data) ? data : [data];
    const sheet = getSheet_();
    ensureHeader_(sheet);
    if (rows.length > 0) {
      const values = rows.map(function(row) {
        return HEADERS.map(function(h) {
          const v = row[h];
          if (v === undefined || v === null) return '';
          return typeof v === 'object' ? JSON.stringify(v) : v;
        });
      });
      sheet.getRange(sheet.getLastRow() + 1, 1, values.length, HEADERS.length).setValues(values);
    }
    return json_({ success: true, rows: rows.length });
  } catch (err) {
    return json_({ success: false, error: String(err && err.message ? err.message : err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  return sheet;
}

function ensureHeader_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    return;
  }
  const existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (existing.join('|') !== HEADERS.join('|')) {
    sheet.insertRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
