# paraSim (פרה-סים) 🐂

> **אטלס תלת-ממדי אינטראקטיבי לאנטומיית הבקר, הלכות שחיטה וי"ח טרפות**  
> **Interactive 3D Bovine Anatomy, Hilchot Shechita & 18 Treifot Simulator (Masechet Chullin)**

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-049EF4?logo=three.js&logoColor=white)](https://threejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**paraSim** הוא כלי לימודי ומחקרי אינטראקטיבי בתלת-ממד המשלב אנטומיה וטרינרית מודרנית עם הלכות שחיטה וטרפות ממסכת חולין (פרקים א'–ג') ושולחן ערוך יורה דעה (סימנים א'–ס"ה).

---

## 🌟 עיקרי המערכת (Features)

### 1. מודל אנטומי תלת-ממדי ריאליסטי ומלא של הבהמה
* **שלד מלא (Skeletal System)**: עמוד השדרה (Spine & חוט השדרה), גולגולת ולסת, י"ג צלעות (13 צלעות, לרבות דין "נשתברו רוב צלעותיה"), ועצמות הגפיים (בוקא דאטמא ומפרק הירך).
* **מערכת השרירים והבשר (Muscles & Meat)**: 124 שרירי שלד עם טקסטורת סיבי שריר, גידים ורצועות (Fascia & Tendons), והמחשת צומת הגידים.
* **מערכת הנשימה (Respiratory System)**: קנה הנשימה (גרגרת) עם טבעות הסחוס, והריאה על כל חלקיה ההלכתיים: אונות (מימין 3, משמאל 2), אומות, ועלה ורדא (Accessory Lobe).
* **מערכת העיכול (Digestive System)**: ושט (תורבץ הוושט, מורכב משני עורות: חיצוני אדום ופנימי לבן), ארבעת מדורי הקיבה של מעלי הגירה: כרס (Rumen), בית הכוסות (Reticulum), המסס (Omasum), וקיבה אמיתית (Abomasum / Matnot Kehunah), ומעיים.
* **איברים פנימיים (Vital Organs)**: לב (חלל הלב וחדריו), כבד, כיס המרה, טחול (עוביו ודוקו), וכליות (חריץ הכליה).
* **כלי דם ראשיים (Vascular System)**: עורקי התרדמה (Carotid Arteries) וורידי הצוואר (Jugular Veins) המדגימים את זרימת הדם והקזת הדם בשחיטה.

### 2. הדמיית הלכות שחיטה וסימנים (חולין י"ב–י"ח)
* **שני הסימנים**: קנה (גרגרת) ו-ושט (תורבץ הוושט) עם זוויות מבט מותאמות אנטומית (ושט משמאל לקנה בצוואר).
* **הלכות גבולי השחיטה**: מקום הכשר בקנה ובוושט, שפוי כובע, תורבץ הוושט, וחיבור הוושט לכרס.
* **חמש הלכות שחיטה (הפסולים מדאורייתא)**: שהייה, דרסה, חלדה, הגרמה, ועיקור.
* **בדיקת הסכין**: הדמיית י"ד בדיקות בסכין של שחיטה (י"ב בדיקות באצבע וציפורן + ב' בדיקות בשערה ובבשר).

### 3. קטלוג י"ח טרפות (חולין מ"ב ע"א) והמחשת מומים
* מיפוי מלא של 18 הטרפות שנמנו במשנה ובגמרא.
* בורר מצב **כשר / טרפה** המציג בזמן אמת מום תלת-ממדי (כגון סירכות הריאה לדופן, ניקוב קרום המוח, שמיטת ירך, נקב בכרס הפנימית ועוד).
* מראי מקומות מדויקים מהתלמוד הבבלי ומשולחן ערוך יורה דעה.

### 4. כלי תצוגה מתקדמים
* **מצבי עור**: פרה מלאה (עור הולשטיין), שרירים ובשר (Meat / Ecorché), רנטגן שקוף (X-Ray), ואיברים פנימיים בלבד.
* **פירוק איברים (Exploded View)**: פריסה מרחבית של איברי הבקר לצפייה מעמיקה.
* **חיתוך חללים (Cross-Section Slicing)**: מישור חיתוך דינמי לבדיקת חללים פנימיים.
* **ממשק דו-לשוני מלא**: מעבר בלחיצה אחת בין עברית (Hebrew) לאנגלית (English).

---

## 💻 דרישות מוקדמות (Prerequisites)

* **Node.js** (גרסה 18.0 ומעלה) – [הורדה מאתר Node.js הרשמי](https://nodejs.org/)
* **npm** (מגיע מובנה עם Node.js) או **pnpm** / **yarn**

---

## 🚀 התקנה והרצה מקומית (Installation & Quick Start)

### 1. הורדת הפרויקט
```bash
git clone https://github.com/<YOUR_USERNAME>/paraSim.git
cd paraSim
```

### 2. התקנת התלויות
```bash
npm install
```

### 3. הרצת שרת הפיתוח
```bash
npm run dev
```

לאחר ההרצה, הטרמינל יציג כתובת מקומית (למשל `http://localhost:5173/`). פתחו כתובת זו בדפדפן (מומלץ Chrome / Edge / Firefox עם תמיכת WebGL מופעלת).

---

## 📦 פקודות שימושיות (Available Scripts)

| פקודה | תיאור |
|---|---|
| `npm run dev` | מפעיל שרת פיתוח מקומי מהיר עם טעינה חמה (Hot Module Reload) |
| `npm run build` | יוצר גרסת הפצה סופית וחסכונית בתיקיית `dist/` |
| `npm run preview` | מפעיל שרת מקומי המציג את גרסת ה-Production שנבנתה ב-`dist/` |

---

## 📁 מבנה הפרויקט (Project Architecture)

```
paraSim/
├── index.html              # דף הבית, שלד ה-HTML ומבנה התפריטים
├── style.css               # מערכת עיצוב מודרנית (Glassmorphism & Dark Mode)
├── package.json            # הגדרות הפרויקט והספריות (Three.js, Vite)
├── .gitignore              # התעלמות מקבצי בנייה וארכיונים כבדים
├── README.md               # תיעוד והוראות התקנה
├── public/
│   ├── favicon.svg         # אייקון לשונית הדפדפן
│   └── models/
│       └── cow/
│           ├── cow_anatomy.glb  # מודל תלת-ממד מפורט של הבקר (45MB)
│           └── textures/        # מפות טקסטורה של העור, השרירים והאיברים
└── src/
    ├── main.js             # לוגיקת האפליקציה, רינדור Three.js, Raycasting ומצלמה
    ├── data/
    │   ├── organData.js    # נתוני האיברים, קואורדינטות והלכות שו"ע
    │   ├── shechitaData.js # הלכות שחיטה, סימנים, בדיקת סכין ו-5 פסולים
    │   ├── treifotData.js  # קטלוג י"ח טרפות מפורט
    │   └── specimensData.js# נתוני סריקות אנטומיות נוספות
    ├── scene/
    │   ├── cowModel.js     # סכמות המבנה האנטומי והחומרים
    │   ├── sketchfabController.js # ממשק אינטגרציה עם מודלים חיצוניים
    │   └── treifahVisualizer.js   # המחשת מומי הטרפות בתלת-ממד
    └── utils/
        ├── audio.js        # צלילי ממשק, התרעות כשר/טרפה
        └── cameraController.js # ניהול תנועת המצלמה והקפות
```

---

## 🛠️ טכנולוגיות עיקריות (Tech Stack)

* **Core**: Vanilla JavaScript (ES Modules), HTML5 Semantic Structure
* **Rendering Engine**: [Three.js](https://threejs.org/) (WebGL 2.0, Physically Based Rendering, Physical Materials, Custom Noise Shaders)
* **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
* **Styling**: Modern CSS3 (CSS Variables, Flexbox/Grid, Backdrop Filter Blur)

---

## 📜 רישיון (License)

פרויקט זה מופץ תחת רישיון MIT. לפרטים נוספים ראו קובץ `LICENSE`.
