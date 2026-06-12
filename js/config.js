// ============================================================
//  GYAN JYOTI ACADEMY — ADMIN CONFIGURATION FILE
//  Sirf ye file update karein apne Google IDs ke saath
// ============================================================

const GJA_CONFIG = {

  // ── GOOGLE SHEETS ────────────────────────────────────────
  // Sheet URL se ID nikalna: docs.google.com/spreadsheets/d/THIS_IS_ID/edit
  SHEETS: {
    INQUIRY_FORM:      "APNI_INQUIRY_SHEET_ID_YAHAN",   // Inquiry/Enrollment form data
    NOTIFICATIONS:     "APNI_NOTIFICATION_SHEET_ID",     // Home page notifications
    BRANCH1_NOTIF:     "BRANCH1_NOTIFICATION_SHEET_ID",  // Branch 1 specific notifications
    BRANCH2_NOTIF:     "BRANCH2_NOTIFICATION_SHEET_ID",  // Branch 2 specific notifications
  },

  // ── GOOGLE DRIVE FOLDERS ────────────────────────────────
  // Drive folder URL se ID nikalna: drive.google.com/drive/folders/THIS_IS_ID
  DRIVE: {
    TOPPERS_BRANCH1:   "BRANCH1_TOPPERS_FOLDER_ID",      // Branch 1 topper photos
    TOPPERS_BRANCH2:   "BRANCH2_TOPPERS_FOLDER_ID",      // Branch 2 topper photos
    GALLERY_BRANCH1:   "BRANCH1_GALLERY_FOLDER_ID",      // Branch 1 gallery
    GALLERY_BRANCH2:   "BRANCH2_GALLERY_FOLDER_ID",      // Branch 2 gallery
  },

  // ── GOOGLE APPS SCRIPT WEB APP URL ──────────────────────
  // Step 3 ke baad milega ye URL
  APPS_SCRIPT_URL: "APNA_APPS_SCRIPT_WEB_APP_URL_YAHAN",

  // ── BRANCH INFORMATION ──────────────────────────────────
  BRANCHES: {
    branch1: {
      name:    "Gyan Jyoti Academy — Branch 1",
      tagline: "Bawadiya Kalan Campus",
      address: "Ward No. 52, Bawadiya Kalan, Jatkhedi, Bhopal, MP 462039",
      phone:   "+91 7000115232",
      phone2:  "+91 7879708070",
      email:   "branch1@gyanjyotischools.com",
      mapUrl:  "https://maps.google.com/?q=Bawadiya+Kalan+Bhopal",
      mapEmbed: "BRANCH1_GOOGLE_MAPS_EMBED_SRC",         // Google Maps embed URL
      whatsapp: "917000115232",
      color:   "#1a5276",
      page:    "branch1.html",
    },
    branch2: {
      name:    "Gyan Jyoti Academy — Branch 2",
      tagline: "Second Campus",
      address: "BRANCH 2 KA PURA ADDRESS YAHAN LIKHEIN",
      phone:   "+91 XXXXXXXXXX",
      phone2:  "",
      email:   "branch2@gyanjyotischools.com",
      mapUrl:  "https://maps.google.com/?q=BRANCH2+ADDRESS",
      mapEmbed: "BRANCH2_GOOGLE_MAPS_EMBED_SRC",
      whatsapp: "91XXXXXXXXXX",
      color:   "#1e8449",
      page:    "branch2.html",
    }
  },

  // ── SCHOOL INFO ─────────────────────────────────────────
  SCHOOL: {
    name:      "Gyan Jyoti Academy",
    tagline:   "Higher Secondary School, Bhopal",
    founded:   "2004",
    board:     "State Board Affiliated",
    classes:   "LKG to Class XII",
    whatsapp:  "917000115232",
    email:     "info@gyanjyotischools.com",
    phone:     "+91 7000115232",
  }
};
