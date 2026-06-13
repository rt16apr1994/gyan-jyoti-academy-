// ============================================================
//  GYAN JYOTI ACADEMY — ADMIN CONFIGURATION FILE
//  Sirf ye file update karein apne Google IDs ke saath
// ============================================================

const GJA_CONFIG = {

  // ── GOOGLE SHEETS ────────────────────────────────────────
  // Sheet URL se ID nikalna: docs.google.com/spreadsheets/d/THIS_IS_ID/edit
  SHEETS: {
    INQUIRY_FORM:      "112sJUqhdHbRgBY4HMoKOZ879ER07aIYnbuEEor4oit0",   // Inquiry/Enrollment form data
    NOTIFICATIONS:     "1g2VQAuKdgzR482dfli21obSvZPvRVpZZN6X4FiefbN0",     // Home page notifications
    BRANCH1_NOTIF:     "1AEGeSUpQ9LRGjBdSzyp2dpnPz2LSJ_SpFLsoagqqzVI",  // Branch 1 specific notifications
    BRANCH2_NOTIF:     "1FDbdfaRtnhs5bRpRfkjF3iHcGfsAT09VJnKs8WRDA6U",  // Branch 2 specific notifications
  },

  // ── GOOGLE DRIVE FOLDERS ────────────────────────────────
  // Drive folder URL se ID nikalna: drive.google.com/drive/folders/THIS_IS_ID
  DRIVE: {
    TOPPERS_BRANCH1:   "1hvFI9kq-zqkXJEFjlukGyKRIyeZzpnpp",      // Branch 1 topper photos
    TOPPERS_BRANCH2:   "1k5EhQ5Pwj9YCn0kvsSymO2z6y4xfjTZh",      // Branch 2 topper photos
    GALLERY_BRANCH1:   "1oUKYxxhOOGjkPlfuCdj7jzROCTM_C-Ex",      // Branch 1 gallery
    GALLERY_BRANCH2:   "1mogeYB9dPkGCZ7vo8b6qz1CY2ghZVizR",      // Branch 2 gallery
  },

  // ── GOOGLE APPS SCRIPT WEB APP URL ──────────────────────
  // Step 3 ke baad milega ye URL
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwtNostUJqwJlo-DH89G7v1MG77kN1A-tch60AdiuUUfMHSW0WBYxKpN15TvBCqoEaS0A/exec",

  // ── BRANCH INFORMATION ──────────────────────────────────
  BRANCHES: {
    branch1: {
      name:    "Gyan Jyoti Academy Higher Secondary School ,Bhopal",
      tagline: "Bawadiya Kalan Campus",
      address: "Ward No. 52, Bawadiya Kalan, Jatkhedi, Near Radha krishna tample Bhopal, MP 462039",
      phone:   "+91 7000115232",
      phone2:  "+91 7879708070",
      email:   "branch1@gyanjyotischools.com",
      mapUrl:  "https://maps.app.goo.gl/PjUAakFyCAZDgcGDA",
      mapEmbed: "BRANCH1_GOOGLE_MAPS_EMBED_SRC",         // Google Maps embed URL
      whatsapp: "917000115232",
      color:   "#1a5276",
      page:    "branch1.html",
    },
    branch2: {
      name:    "Gyan Jyoti Academy Higher Secondary School ,Bhopal",
      tagline: "Main Campus",
      address: "P, 39, Narmadapuram Rd, Indus Towne, Ratanpur Sadak, Bhopal, Madhya Pradesh 462047, India",
      phone:   "+917415667584",
      phone2:  "",
      email:   "branch2@gyanjyotischools.com",
      mapUrl:  "https://maps.app.goo.gl/bEze4vsZ9NxgB8GV7",
      mapEmbed: "BRANCH2_GOOGLE_MAPS_EMBED_SRC",
      whatsapp: "917415667584",
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
