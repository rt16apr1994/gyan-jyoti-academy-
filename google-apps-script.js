// ============================================================
//  GYAN JYOTI ACADEMY — GOOGLE APPS SCRIPT
//  Ye code Google Apps Script mein paste karein
//  (script.google.com → New Project)
// ============================================================

// ── SHEET IDs — apne IDs se replace karein ──────────────────
const SHEET_IDS = {
  INQUIRY:       "APNI_INQUIRY_SHEET_ID",
  NOTIFICATIONS: "APNI_NOTIFICATION_SHEET_ID",
  BRANCH1_NOTIF: "BRANCH1_NOTIFICATION_SHEET_ID",
  BRANCH2_NOTIF: "BRANCH2_NOTIFICATION_SHEET_ID",
};

// ── DRIVE FOLDER IDs ─────────────────────────────────────────
const FOLDER_IDS = {
  TOPPERS_B1:  "BRANCH1_TOPPERS_FOLDER_ID",
  TOPPERS_B2:  "BRANCH2_TOPPERS_FOLDER_ID",
  GALLERY_B1:  "BRANCH1_GALLERY_FOLDER_ID",
  GALLERY_B2:  "BRANCH2_GALLERY_FOLDER_ID",
};

// ── NOTIFICATION EMAIL ───────────────────────────────────────
const ADMIN_EMAIL = "info@gyanjyotischools.com";

// ============================================================
//  MAIN doGet — handles all GET requests (fetch notifications, photos)
// ============================================================
function doGet(e) {
  const action = e.parameter.action;
  let result;

  try {
    if (action === "getNotifications") {
      result = getNotifications(e.parameter.branch);
    } else if (action === "getDrivePhotos") {
      result = getDrivePhotos(e.parameter.folder, e.parameter.branch);
    } else {
      result = { error: "Unknown action" };
    }
  } catch (err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
//  MAIN doPost — handles form submissions
// ============================================================
function doPost(e) {
  let result;
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.action === "submitInquiry") {
      result = submitInquiry(data);
    } else {
      result = { error: "Unknown action" };
    }
  } catch (err) {
    result = { error: err.message };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ============================================================
//  GET NOTIFICATIONS — Sheet se notifications padhna
//  Sheet format: Date | Title | Message | Branch (all/branch1/branch2) | Active (yes/no)
// ============================================================
function getNotifications(branch) {
  const sheetId = branch === "branch1" ? SHEET_IDS.BRANCH1_NOTIF
                : branch === "branch2" ? SHEET_IDS.BRANCH2_NOTIF
                : SHEET_IDS.NOTIFICATIONS;

  const ss = SpreadsheetApp.openById(sheetId);
  const sheet = ss.getSheets()[0];
  const data = sheet.getDataRange().getValues();

  const notifications = [];
  // Row 1 = header, skip karo
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const active = String(row[4]).toLowerCase();
    if (active !== "yes" && active !== "true" && active !== "1") continue;

    notifications.push({
      date:    formatDate(row[0]),
      title:   row[1] || "",
      message: row[2] || "",
      branch:  row[3] || "all",
      isNew:   isWithinDays(row[0], 7), // 7 din ke andar = NEW badge
    });
  }

  // Latest pehle
  notifications.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
  return { success: true, notifications };
}

// ============================================================
//  GET DRIVE PHOTOS — Google Drive folder se images
// ============================================================
function getDrivePhotos(folderType, branch) {
  let folderId;
  if (folderType === "toppers") {
    folderId = branch === "branch2" ? FOLDER_IDS.TOPPERS_B2 : FOLDER_IDS.TOPPERS_B1;
  } else {
    folderId = branch === "branch2" ? FOLDER_IDS.GALLERY_B2 : FOLDER_IDS.GALLERY_B1;
  }

  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFilesByType(MimeType.JPEG);
  const photos = [];

  while (files.hasNext()) {
    const file = files.next();
    // Public sharing ke liye thumbnail URL
    const id = file.getId();
    photos.push({
      id:    id,
      name:  file.getName().replace(/\.[^.]+$/, ""), // extension hata do
      url:   `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
      thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
    });
  }

  // PNG bhi lo
  const pngFiles = folder.getFilesByType(MimeType.PNG);
  while (pngFiles.hasNext()) {
    const file = pngFiles.next();
    const id = file.getId();
    photos.push({
      id:    id,
      name:  file.getName().replace(/\.[^.]+$/, ""),
      url:   `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
      thumb: `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
    });
  }

  return { success: true, photos };
}

// ============================================================
//  SUBMIT INQUIRY — form data Google Sheet mein save karna
//  aur admin ko email bheja
// ============================================================
function submitInquiry(data) {
  const ss = SpreadsheetApp.openById(SHEET_IDS.INQUIRY);

  // Sheet nahi hai to banao
  let sheet = ss.getSheetByName("Inquiries");
  if (!sheet) {
    sheet = ss.insertSheet("Inquiries");
    // Header row
    sheet.appendRow([
      "Timestamp", "Parent Name", "Contact Number", "Email",
      "Student Name", "Class Seeking", "Branch", "Message", "Source"
    ]);
    sheet.getRange(1, 1, 1, 9).setFontWeight("bold");
  }

  // Data append karo
  sheet.appendRow([
    new Date(),
    data.parentName    || "",
    data.contact       || "",
    data.email         || "",
    data.studentName   || "",
    data.classSeeking  || "",
    data.branch        || "general",
    data.message       || "",
    data.source        || "website",
  ]);

  // Admin ko notification email
  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: `New Inquiry: ${data.parentName} — ${data.classSeeking}`,
      htmlBody: `
        <h2>New Admission Inquiry</h2>
        <table style="border-collapse:collapse;width:100%">
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Parent Name</td><td style="padding:8px;border:1px solid #ddd">${data.parentName}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Contact</td><td style="padding:8px;border:1px solid #ddd">${data.contact}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${data.email || "—"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Student Name</td><td style="padding:8px;border:1px solid #ddd">${data.studentName || "—"}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Class Seeking</td><td style="padding:8px;border:1px solid #ddd">${data.classSeeking}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Branch</td><td style="padding:8px;border:1px solid #ddd">${data.branch}</td></tr>
          <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${data.message || "—"}</td></tr>
        </table>
        <p>View all inquiries: <a href="https://docs.google.com/spreadsheets/d/${SHEET_IDS.INQUIRY}">Open Sheet</a></p>
      `
    });
  } catch(e) {
    // Email fail hone se form submit fail nahi hona chahiye
    console.log("Email error:", e.message);
  }

  return { success: true, message: "Inquiry submitted successfully" };
}

// ── Helper functions ─────────────────────────────────────────
function formatDate(dateVal) {
  if (!dateVal) return "";
  const d = new Date(dateVal);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function isWithinDays(dateVal, days) {
  if (!dateVal) return false;
  const d = new Date(dateVal);
  const now = new Date();
  return (now - d) < (days * 24 * 60 * 60 * 1000);
}
