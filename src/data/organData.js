// Halachic and Anatomical Data for Bovine Organs in Masechet Chullin
export const ORGAN_SYSTEMS = {
  SKELETAL: { id: 'skeletal', en: 'Skeletal & Spine', he: 'שלד ועמוד השדרה', color: '#e2e8f0' },
  RESPIRATORY: { id: 'respiratory', en: 'Respiratory & Lungs', he: 'נשימה וריאות', color: '#60a5fa' },
  DIGESTIVE: { id: 'digestive', en: 'Digestive & 4 Stomachs', he: 'עיכול וארבעת הקיבות', color: '#f59e0b' },
  VITAL: { id: 'vital', en: 'Vital Organs & Glands', he: 'איברים פנימיים ובלוטות', color: '#ef4444' },
  NERVOUS: { id: 'nervous', en: 'Nervous System & Brain', he: 'מערכת העצבים והמוח', color: '#a855f7' },
  LIMBS: { id: 'limbs', en: 'Limbs & Tendons', he: 'גפיים וצומת הגידים', color: '#10b981' },
  MUSCLES: { id: 'muscles', en: 'Muscular System & Meat', he: 'שרירים ובשר (Meat)', color: '#dc2626' },
  VESSELS: { id: 'vessels', en: 'Vascular System', he: 'מערכת כלי הדם', color: '#3b82f6' }
};

export const ORGANS = {
  veshet: {
    id: 'veshet',
    en: 'Esophagus (Veshet)',
    he: 'ושט',
    system: 'digestive',
    talmudicTerm: 'ושט (תורבץ הוושט)',
    halachicSummaryEn: 'Composed of two layers (outer muscular red layer, inner white mucous layer). A puncture through both layers renders the animal Treifah. Even the tiniest perforation invalidates.',
    halachicSummaryHe: 'מורכב משני עורות: חיצוני אדום ופנימי לבן. ניקב זה בלא זה כשר, ניקבו שניהם טרפה אפילו בנקב כלשהו. (שולחן ערוך יו"ד סימן ל"ג)',
    position: [-0.58, 1.21, -0.03]
  },
  kaneh: {
    id: 'kaneh',
    en: 'Trachea (Kaneh / Gargeret)',
    he: 'קנה (גרגרת)',
    system: 'respiratory',
    talmudicTerm: 'קנה / גרגרת',
    halachicSummaryEn: 'The windpipe composed of cartilage rings. If severed across majority (rov) or perforated to the size of an issar coin, it is Treifah.',
    halachicSummaryHe: 'פסוקת הגרגרת ברובה טרפה. בניקוב שיעורו כאיסר. (שולחן ערוך יו"ד סימן ל"ד)',
    position: [-0.52, 1.21, 0.04]
  },
  reah: {
    id: 'reah',
    en: 'Lungs (Re\'ah)',
    he: 'ריאה',
    system: 'respiratory',
    talmudicTerm: 'ריאה (אונות, אומות וורדא)',
    halachicSummaryEn: 'Right lung has 3 Onot (lobes), 1 Umma (main lobe), and 1 Verda (accessory lobe). Left lung has 2 Onot and 1 Umma. Any missing lobe, extra lobe in improper place, or perforation renders it Treifah. Adhesions (Sirchot) require rigorous examination.',
    halachicSummaryHe: 'מימין ג\' אונות ואומה אחת ועלה ורדא. משמאל ב\' אונות ואומה אחת. חסרה או יתרה או ניקבה - טרפה. סירכות מחיבות בדיקה קפדנית אם יורדות לדופן או בין אונה לאומה. (שולחן ערוך יו"ד סימנים ל"ה-ל"ט)',
    position: [-0.10, 1.15, 0.0]
  },
  lev: {
    id: 'lev',
    en: 'Heart (Lev)',
    he: 'לב',
    system: 'vital',
    talmudicTerm: 'לב (בית חללו)',
    halachicSummaryEn: 'A perforation penetrating into the internal cavity (Beit Chalalo) of any of the ventricles/atria renders the animal Treifah.',
    halachicSummaryHe: 'ניקב הלב לבית חללו - טרפה, אפילו נקב דק ביותר. ניקב בשומן הלב או שלא הגיע לחלל - כשר. (שולחן ערוך יו"ד סימן מ\')',
    position: [-0.25, 0.95, 0.0]
  },
  keres: {
    id: 'keres',
    en: 'Rumen (Keres / Paunch)',
    he: 'כרס (הכרס הפנימית)',
    system: 'digestive',
    talmudicTerm: 'כרס הפנימית',
    halachicSummaryEn: 'The first and largest stomach. A puncture through the internal rumen wall (Keres Hapenimit) into the abdominal cavity renders it Treifah.',
    halachicSummaryHe: 'ניקבה הכרס הפנימית טרפה. כרס הפנימית הוא כל מקום שאינו דבוק עם המסס ובית הכוסות ודופן הגוף. (שולחן ערוך יו"ד סימן מ"ח)',
    position: [0.20, 0.95, -0.15]
  },
  beitHakosos: {
    id: 'beitHakosos',
    en: 'Reticulum (Beit HaKosos / Honeycomb)',
    he: 'בית הכוסות',
    system: 'digestive',
    talmudicTerm: 'בית הכוסות',
    halachicSummaryEn: 'The second stomach chamber with honeycomb-like cells. Commonly subject to swallowed needles/nails. Puncture to the outside peritoneal cavity is Treifah.',
    halachicSummaryHe: 'בית הכוסות שניקב לחוץ טרפה. אם נמצא מחט תחובה ואינה מנקבת לחוץ או שאינה יוצאת - יש בו דינים וספיקות בדיקה. (שולחן ערוך יו"ד סימן מ"ח)',
    position: [-0.10, 0.88, 0.12]
  },
  hameses: {
    id: 'hameses',
    en: 'Omasum (Hameses / Manyplies)',
    he: 'המסס',
    system: 'digestive',
    talmudicTerm: 'המסס (כמין דפים דפים)',
    halachicSummaryEn: 'The third stomach chamber featuring folded leaf-like tissue. Puncture through its exterior wall renders it Treifah.',
    halachicSummaryHe: 'המסס שניקב לחוץ טרפה. אם ניקב בינו לבין בית הכוסות במקום חיבורם יש חילוקי דינים. (שולחן ערוך יו"ד סימן מ"ח)',
    position: [0.05, 0.82, 0.15]
  },
  keivah: {
    id: 'keivah',
    en: 'Abomasum (Keivah / True Stomach)',
    he: 'קיבה',
    system: 'digestive',
    talmudicTerm: 'קיבה (מתנות כהונה)',
    halachicSummaryEn: 'The fourth, glandular true stomach where digestive acid works. Punctured anywhere renders it Treifah. Also one of the Matnot Kehunah (Priestly Gifts).',
    halachicSummaryHe: 'ניקבה הקיבה טרפה בכל שהוא. והיא אחת ממתנות כהונה (הזרוע והלחיים והקיבה). (שולחן ערוך יו"ד סימן מ"ט)',
    position: [0.15, 0.70, 0.10]
  },
  dakin: {
    id: 'dakin',
    en: 'Intestines (Dakin)',
    he: 'מעיים / דקין',
    system: 'digestive',
    talmudicTerm: 'בני מעיים / דקין',
    halachicSummaryEn: 'Any perforation through the intestines into the abdominal cavity is Treifah. Even the prick of a thorn or worm perforation.',
    halachicSummaryHe: 'ניקבו הדקין אפילו בנקב קטן כמלוא מחט טרפה. תולעים שנקבו מבפנים טרפה, מבחוץ כשרה. (שולחן ערוך יו"ד סימן מ"ו)',
    position: [0.40, 0.85, 0.0]
  },
  kaved: {
    id: 'kaved',
    en: 'Liver (Kaved)',
    he: 'כבד',
    system: 'vital',
    talmudicTerm: 'כבד (כזית כנגד בית הכוסות ומרה)',
    halachicSummaryEn: 'If the liver is completely removed or disintegrated, it is Treifah, unless at least an olive\'s bulk (K\'zayit) remains near the gallbladder and reticulum.',
    halachicSummaryHe: 'ניטלה הכבד טרפה, אלא אם נשתייר הימנה כזית במקום שהיא תלויה ובמקום מרה וטרפשא דכבדא. (שולחן ערוך יו"ד סימן מ"א)',
    position: [0.05, 1.05, 0.15]
  },
  marah: {
    id: 'marah',
    en: 'Gallbladder (Marah)',
    he: 'מרה',
    system: 'vital',
    talmudicTerm: 'מרה (כיס המרה)',
    halachicSummaryEn: 'The bile sac attached to the liver. Any perforation of the gallbladder renders it Treifah.',
    halachicSummaryHe: 'ניקבה המרה טרפה. ניטלה המרה כולה כשרה בעוף ויש פוסקים שטרפה בבהמה. (שולחן ערוך יו"ד סימן מ"ב)',
    position: [0.02, 0.98, 0.18]
  },
  tchol: {
    id: 'tchol',
    en: 'Spleen (Tchol)',
    he: 'טחול',
    system: 'vital',
    talmudicTerm: 'טחול (עוביו ודוקו)',
    halachicSummaryEn: 'Elongated organ along the rumen. Perforation on the thick side (Ovyov) is Treifah; perforation on the thin side (Duko) is Kosher.',
    halachicSummaryHe: 'הטחול שניקב: אם בעוביו טרפה, ואם בדוקו כשרה. ניטל הטחול כולו כשר. (שולחן ערוך יו"ד סימן מ"ג)',
    position: [0.25, 1.15, -0.20]
  },
  klayot: {
    id: 'klayot',
    en: 'Kidneys (Klayot)',
    he: 'כליות',
    system: 'vital',
    talmudicTerm: 'כליות (הגיע נקב לחריץ)',
    halachicSummaryEn: 'Puncture of the kidney into the central hilum/pelvis groove (Charitz) or collection of pus/water with foul odor renders it Treifah.',
    halachicSummaryHe: 'הכליות שניקבו אם הגיע הנקב לחריץ טרפה. חסרה או ניטלה כשרה, אבל חולי מוגלה מסריחה טרפה. (שולחן ערוך יו"ד סימן מ"ד)',
    position: [0.45, 1.25, 0.0]
  },
  chutHashidrah: {
    id: 'chutHashidrah',
    en: 'Spinal Cord & Vertebrae',
    he: 'חוט השדרה',
    system: 'nervous',
    talmudicTerm: 'חוט השדרה (נשברה השדרה ונפסק החוט)',
    halachicSummaryEn: 'Spinal cord running through the spine. If severed across its majority, or crushed/melted like water, it is Treifah.',
    halachicSummaryHe: 'נשברה השדרה ונפסק החוט ברובו - טרפה. וכן אם נתמסמס החוט או נשפך כמים. שיעורו עד בין הפרשות. (שולחן ערוך יו"ד סימן ל"ב)',
    position: [-0.02, 1.30, 0.0]
  },
  moach: {
    id: 'moach',
    en: 'Brain & Meninges',
    he: 'מוח וקרום המוח',
    system: 'nervous',
    talmudicTerm: 'קרום של מוח (חיצון ופנימי)',
    halachicSummaryEn: 'Covered by two meningeal membranes (dura and pia). Perforation through the inner membrane touching the brain is Treifah.',
    halachicSummaryHe: 'ניקב קרום של מוח: החיצון בלבד כשר, ניקב הפנימי הסמוך למוח טרפה. (שולחן ערוך יו"ד סימן ל"א)',
    position: [-0.96, 1.35, 0.0]
  },
  tzlaot: {
    id: 'tzlaot',
    en: 'Ribs (Tzlaot)',
    he: 'צלעות',
    system: 'skeletal',
    talmudicTerm: 'נשתברו רוב צלעותיה',
    halachicSummaryEn: 'Cattle have 13 pairs of ribs (26 total), 11 bearing marrow. If the majority of ribs (at least 11 from the spinal side or 6 with marrow on one side) are fractured, it is Treifah.',
    halachicSummaryHe: 'נשתברו רוב צלעותיה (אחת עשרה צלעות שיש בהן מוח מכיוון השדרה) טרפה. (שולחן ערוך יו"ד סימן נ"ד)',
    position: [0.33, 0.84, 0.0]
  },
  tzometHagidin: {
    id: 'tzometHagidin',
    en: 'Junction of Tendons (Tzomet HaGidin)',
    he: 'צומת הגידים',
    system: 'limbs',
    talmudicTerm: 'צומת הגידים שנחתכו',
    halachicSummaryEn: 'Crucial tendon nexus on the hind leg above the heel. In cattle, severance of the majority of the main cords invalidates the animal.',
    halachicSummaryHe: 'צומת הגידים שנחתכו רובם טרפה. שיעורו בבהמה במקום שהגידים מתפצלים מעל העקב. (שולחן ערוך יו"ד סימן נ"ו)',
    position: [0.85, 0.35, 0.20]
  },
  bokaDatma: {
    id: 'bokaDatma',
    en: 'Hip Socket & Joint (Boka D\'Atma)',
    he: 'בוקא דאטמא (מפרק הירך)',
    system: 'limbs',
    talmudicTerm: 'נשמטה ירך (בוקא דאטמא)',
    halachicSummaryEn: 'Dislocation of the femur head from the acetabulum hip socket. If the ligaments tear and rot, the animal is Treifah.',
    halachicSummaryHe: 'נשמטה הירך מחלל הירך (בוקא דאטמא מבית כוסות שלה) ונפסקו החוטים ונתקלקלו - טרפה. (שולחן ערוך יו"ד סימן נ"ה)',
    position: [0.75, 0.95, 0.25]
  },
  muscles: {
    id: 'muscles',
    en: 'Bovine Musculature & Meat',
    he: 'שרירי הבקר (בשר הבהמה)',
    system: 'muscles',
    talmudicTerm: 'בשר (שרירים שלדיים)',
    halachicSummaryEn: 'Bovine skeletal musculature (kosher meat). Permitted for consumption after valid ritual slaughter (Shechita), kosher salting (Melihah) to purge blood, and careful porging (Nikkur) of prohibited sciatic nerve (Gid HaNasheh) and forbidden tallow fats (Chelev).',
    halachicSummaryHe: 'בשר השרירים של הבהמה. מותר באכילה לאחר שחיטה כשרה כהלכתה, מליחה כדת להוצאת הדם, וניקור יסודי של גיד הנשה ושומן החלב האסור (שולחן ערוך יו"ד סימנים ס"ד-ס"ט).',
    position: [0.0, 1.1, 0.2]
  },
  carotidArtery: {
    id: 'carotidArtery',
    en: 'Carotid Artery (עורק התרדמה)',
    he: 'עורק התרדמה (עורקי הצוואר)',
    system: 'vessels',
    talmudicTerm: 'עורקי הצוואר',
    halachicSummaryEn: 'The primary arterial blood vessels running in the neck alongside the trachea and esophagus. Severed during shechita to ensure instantaneous rapid exsanguination.',
    halachicSummaryHe: 'עורקי הדם הראשיים של הצוואר המובילים דם מהלב למוח. עוברים במרזב הצוואר לצד הקנה והוושט. בשחיטה נחתכים עם רוב הצוואר ומביאים להקזה מידית של הדם.',
    position: [-0.60, 1.18, 0.05]
  },
  jugularVein: {
    id: 'jugularVein',
    en: 'Jugular Vein (וריד הצוואר)',
    he: 'וריד הצוואר (ורידין שצוואר)',
    system: 'vessels',
    talmudicTerm: 'ורידין שצוואר',
    halachicSummaryEn: 'The large neck veins draining blood from the head. In fowl slaughter (Chullin 27a), cutting or piercing the veins is required by halacha, and in cattle they are severed during the shechita cut.',
    halachicSummaryHe: 'ורידי הדם הגדולים בצוואר המנקזים את הדם מהראש. בחולין כ"ז ע"א נפסק שבעוף צריך לחתוך או לנקוב את הוורידין, ובבהמה נחתכים במהלך חיתוך הסימנים (יו"ד סימן כ"א וסימן ס"ה).',
    position: [-0.60, 1.18, -0.05]
  }
};
