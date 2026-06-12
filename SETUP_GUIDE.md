# GYAN JYOTI ACADEMY — Complete Setup Guide
## Google Drive + Sheets Integration (No Database Required)

---

## 📁 FILE STRUCTURE (GitHub pe yahan daalo)

```
gyanjyotischools.com/
├── index.html          ← Home page
├── branch1.html        ← Branch 1 page
├── branch2.html        ← Branch 2 page
├── css/
│   └── style.css       ← Main stylesheet
├── js/
│   ├── config.js       ← ⭐ AAPKA CONFIG FILE (IDs yahan bharo)
│   └── main.js         ← Main JavaScript
└── assets/
    └── school-hero.jpg ← Apni school ki photo
```

---

## STEP 1 — Google Sheets banao (3 sheets chahiye)

### Sheet 1: Inquiry/Enrollment Forms
1. `sheets.google.com` kholein
2. New Spreadsheet banayein: **"GJA Inquiries"**
3. Sheet name: `Inquiries`
4. Header row manually add karein (optional — code auto-banata hai):
   ```
   Timestamp | Parent Name | Contact | Email | Student Name | Class | Branch | Message | Source
   ```
5. URL se Sheet ID copy karein:
   `docs.google.com/spreadsheets/d/`**`THIS_IS_YOUR_ID`**`/edit`
6. Ye ID `config.js` mein `SHEETS.INQUIRY_FORM` mein paste karein

### Sheet 2: Home Page Notifications
1. New Spreadsheet: **"GJA Notifications — Home"**
2. Sheet ko `Sheet1` rehne dein
3. **Columns exactly aise likhein (Row 1):**
   ```
   A: Date    B: Title    C: Message    D: Branch    E: Active
   ```
4. Sample row daalo:
   ```
   A: 13 Jun 2026
   B: Admissions Open 2026-27
   C: LKG se Class XII tak admissions shuru. Contact karein.
   D: all
   E: yes
   ```
5. Sheet ID copy karke `SHEETS.NOTIFICATIONS` mein daalo

### Sheet 3 & 4: Branch-wise Notifications
- Same structure, 2 alag sheets banao:
  - **"GJA Notifications — Branch 1"** → `SHEETS.BRANCH1_NOTIF`
  - **"GJA Notifications — Branch 2"** → `SHEETS.BRANCH2_NOTIF`

---

## STEP 2 — Google Drive Folders banao (4 folders)

1. `drive.google.com` kholein
2. Yeh 4 folders banao:
   - `GJA_Toppers_Branch1`
   - `GJA_Toppers_Branch2`
   - `GJA_Gallery_Branch1`
   - `GJA_Gallery_Branch2`

3. **Har folder PUBLIC karo:**
   - Folder pe Right Click → Share → Change → **"Anyone with the link"** → **Viewer**

4. Folder ID URL se copy karein:
   `drive.google.com/drive/folders/`**`THIS_IS_FOLDER_ID`**

5. Inhe `config.js` mein `DRIVE` section mein paste karein

### Photos Upload karne ka tarika:
- Photos ka naam student ka naam rakhein:
  - `Rahul_Sharma_Class12.jpg` → Slider mein "Rahul Sharma Class12" dikhega
  - `Priya_Gupta_Class10.jpg` → "Priya Gupta Class10"
- JPG ya PNG — dono chalenge
- **Naya photo upload karo → website pe automatically aayega!**

---

## STEP 3 — Google Apps Script deploy karo ⭐ IMPORTANT

1. `script.google.com` kholein
2. **New Project** click karein
3. Project naam: `GJA_Website_Backend`
4. `Code.gs` file khulegi — sab delete karein
5. `google-apps-script.js` file ka **poora content paste karein**
6. File mein apne **Sheet IDs aur Folder IDs update karein** (top mein `SHEET_IDS` aur `FOLDER_IDS`)
7. Admin email bhi update karein: `ADMIN_EMAIL`

### Deploy karna:
```
Deploy button → New Deployment → Select Type: Web App
Description: GJA Website v1
Execute as: Me
Who has access: Anyone    ← ZARURI HAI
```
8. **Deploy** click karein
9. Permission maanga jayega — **Allow** karein
10. **Web App URL** copy ho jayegi:
    ```
    https://script.google.com/macros/s/XXXXXXXX/exec
    ```
11. Ye URL `config.js` mein `APPS_SCRIPT_URL` mein paste karein

---

## STEP 4 — config.js update karo (FINAL STEP)

`js/config.js` file kholein aur ye saari values fill karein:

```javascript
SHEETS: {
  INQUIRY_FORM:  "aapki-inquiry-sheet-id",
  NOTIFICATIONS: "home-notification-sheet-id",
  BRANCH1_NOTIF: "branch1-notification-sheet-id",
  BRANCH2_NOTIF: "branch2-notification-sheet-id",
},
DRIVE: {
  TOPPERS_BRANCH1: "branch1-toppers-folder-id",
  TOPPERS_BRANCH2: "branch2-toppers-folder-id",
  GALLERY_BRANCH1: "branch1-gallery-folder-id",
  GALLERY_BRANCH2: "branch2-gallery-folder-id",
},
APPS_SCRIPT_URL: "https://script.google.com/macros/s/XXXXX/exec",
```

Branch 2 ki details bhi fill karein:
```javascript
branch2: {
  name:    "Gyan Jyoti Academy — Branch 2",
  tagline: "Kamla Nagar Campus",        // ← apna actual tagline
  address: "Plot No. X, Colony Name, Bhopal, MP 4XXXXX",
  phone:   "+91 XXXXXXXXXX",
  email:   "branch2@gyanjyotischools.com",
  mapUrl:  "https://maps.google.com/?q=EXACT+ADDRESS",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18...",
  whatsapp: "91XXXXXXXXXX",
}
```

### Google Maps Embed URL kaise nikaalein:
1. `maps.google.com` pe apna address search karein
2. Share → Embed a map → **Copy HTML**
3. HTML mein se sirf `src="..."` wala URL copy karein (quotes ke bina)
4. Ye `mapEmbed` field mein paste karein

---

## STEP 5 — GitHub pe push karo

```bash
git add .
git commit -m "Add branch pages, Google Drive integration, notifications system"
git push origin main
```

Website pe 2-3 minute mein reflect ho jayega.

---

## 📊 ADMIN KA DAILY USE

### Notification publish karna:
1. Notifications Sheet kholein
2. New row add karein:
   ```
   Date: 15 Jun 2026
   Title: PTM Reminder
   Message: Branch 1 mein PTM 20 June ko hogi
   Branch: branch1   (ya: branch2 / all)
   Active: yes
   ```
3. Save karein — website pe **turant** dikhai dega!

### Notification hatana:
- `Active` column mein `no` likh dein

### Topper photo add karna:
1. Google Drive folder kholein (GJA_Toppers_Branch1)
2. Student ki photo upload karein
3. Naam: `StudentName_Class.jpg`
4. Website pe **automatically** slider mein aa jayega!

### Inquiry dekna:
- GJA Inquiries sheet kholein — sab data automatically save hoga
- Email notification bhi aayegi jab bhi koi form bhare

---

## 🔧 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| Photos load nahi ho rahi | Drive folder ka sharing check karein — "Anyone" hona chahiye |
| Form submit nahi ho raha | Apps Script URL check karein, console mein error dekhein |
| Notifications nahi aa rahi | Sheet mein `Active` column mein `yes` hai ya nahi check karein |
| CORS error aa raha hai | Apps Script ko phir se deploy karein (new deployment) |

---

## 📞 Quick Test Checklist

- [ ] config.js mein sab IDs fill hain
- [ ] Apps Script deployed hai aur URL config mein hai  
- [ ] Drive folders public hain
- [ ] Notification Sheet mein ek test row hai (Active: yes)
- [ ] Topper folder mein ek test photo hai (JPG)
- [ ] GitHub pe latest code push hai

---
*Setup karne mein koi problem aaye toh ye file refer karein.*
