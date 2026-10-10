// The 18 Canonical Treifot of Masechet Chullin (Chullin 42a / Mishnah 3:1)
// With Shulchan Aruch Yoreh De'ah citations, anatomical defects, and interactive inspection cases

export const TREIFOT_18 = [
  {
    id: 1,
    organId: 'veshet',
    titleHe: '1. נקובת הוושט',
    titleEn: '1. Punctured Esophagus (Nekuvat HaVeshet)',
    sourceMishnah: 'חולין מ"ב ע"א (משנה ג\', א\'): "אלו טרפות בבהמה: נקובת הוושט"',
    shulchanAruch: 'יו"ד סימן ל"ג סעיף א\'',
    defectType: 'puncture',
    targetPosition: [0.58, 1.09, -0.035],
    cameraTarget: [0.58, 1.09, -0.035],
    cameraPosition: [0.92, 1.25, -0.65],
    summaryHe: 'הוושט יש לו שני עורות: החיצון אדום ובשרי, והפנימי לבן וקשה. ניקבו שניהם אפילו במחט דקה כלשהו - הרי זו טרפה. אם ניקב החיצון ולא הפנימי או להפך - כשרה.',
    summaryEn: 'The esophagus contains two distinct layers: an outer muscular red coat and an inner tough white mucosal lining. A puncture penetrating both layers, even as minute as a needle point, renders the animal Treifah. Puncturing only one layer leaves it Kosher.',
    inspectCase: {
      questionHe: 'שוחט מצא מחט תקועה בוושט: העור החיצון האדום נקוב, אך העור הפנימי הלבן שלם ללא שום נקב. מה הדין?',
      questionEn: 'A needle was discovered lodged in the esophagus: the outer red muscular layer is punctured, but the inner white lining is completely intact. What is the Halachic ruling?',
      options: [
        { textHe: 'כשרה - כי בעינן נקב בשני עורות', textEn: 'Kosher - requires perforation through both coats', correct: true },
        { textHe: 'טרפה - כל נקב בוושט מטריף מיד', textEn: 'Treifah - any puncture in the esophagus invalidates', correct: false },
        { textHe: 'ספק טרפה וטעונה שריפה', textEn: 'Uncertain - must be burned', correct: false }
      ],
      explanationHe: 'מפורש בגמרא ובשולחן ערוך יו"ד סימן ל"ג: ניקב זה בלא זה כשר, עד שינקבו שניהם זה כנגד זה.',
      explanationEn: 'Explicit in Talmud Chullin 43a & Shulchan Aruch YD 33: A puncture in one layer without the other remains strictly Kosher until both are perforated.'
    }
  },
  {
    id: 2,
    organId: 'kaneh',
    titleHe: '2. פסוקת הגרגרת',
    titleEn: '2. Severed Trachea (Pesukat HaGargeret)',
    sourceMishnah: 'חולין מ"ב ע"א: "ופסוקת הגרגרת"',
    shulchanAruch: 'יו"ד סימן ל"ד סעיף א\'',
    defectType: 'severance',
    targetPosition: [0.58, 1.09, 0.01],
    cameraTarget: [0.58, 1.09, 0.01],
    cameraPosition: [0.92, 1.25, 0.65],
    summaryHe: 'הקנה מורכב מטבעות סחוס. אם נחתך רוב היקף חלל הקנה לרוחבו - טרפה. באורך: אם נסדק לאורכו ברובו כשרה, ובניקוב: שיעורו כאיסר.',
    summaryEn: 'The trachea consists of cartilaginous rings. Severance across the majority (rov) of its circumference renders it Treifah. Longitudinal cracks remain kosher under certain criteria; punctures must equal an "Issar" coin.',
    inspectCase: {
      questionHe: 'נמצא חתך רוחבי בקנה המכסה בדיוק 40% מהיקף הקנה. האם הבהמה טרפה?',
      questionEn: 'A transverse cut in the trachea covers exactly 40% of the circumference. Is the animal a Treifah?',
      options: [
        { textHe: 'כשרה - לא נפסק רובו (רוב חלל)', textEn: 'Kosher - majority (rov) was not severed', correct: true },
        { textHe: 'טרפה - חתך רוחבי מטריף בכל שהוא', textEn: 'Treifah - transverse cut invalidates at any size', correct: false }
      ],
      explanationHe: 'ההלכה היא "פסוקת הגרגרת ברובה" - עד שייפסק רוב היקף הקנה.',
      explanationEn: 'The halachic standard is Rov (majority) of the circumference of the windpipe.'
    }
  },
  {
    id: 3,
    organId: 'moach',
    titleHe: '3. ניקב קרום של מוח',
    titleEn: '3. Perforated Brain Membrane (Nikav Krum Shel Mo\'ach)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניקב קרום של מוח"',
    shulchanAruch: 'יו"ד סימן ל"א סעיף א\'',
    defectType: 'puncture',
    targetPosition: [1.08, 1.38, 0.0],
    cameraTarget: [1.08, 1.38, 0.0],
    cameraPosition: [1.55, 1.55, 0.65],
    summaryHe: 'יש שני קרומים למוח: קרום עליון דבוק לגולגולת (Dura Mater) וקרום תחתון סמוך למוח (Pia Mater). ניקב התחתון - טרפה. ניקב העליון בלבד - כשרה.',
    summaryEn: 'The brain is safeguarded by two membranes: outer dura mater adjacent to the skull, and inner pia mater enveloping brain tissue. A puncture reaching the inner membrane renders it Treifah.',
    inspectCase: {
      questionHe: 'פגיעה בראש ניקבה את הקרום העליון הצמוד לעצם הגולגולת, אך הקרום הפנימי הסמוך למוח נמצא שלם. מה הדין?',
      questionEn: 'A head injury perforated the outer membrane lining the skull bone, but the inner membrane touching the brain is untouched. What is the ruling?',
      options: [
        { textHe: 'כשרה - קרום הפנימי מגן ומציל', textEn: 'Kosher - inner membrane protects the brain', correct: true },
        { textHe: 'טרפה - מוח רגיש ביותר וכל פגיעה מטריפה', textEn: 'Treifah - brain is sensitive to any trauma', correct: false }
      ],
      explanationHe: 'שולחן ערוך יו"ד ל"א: שני קרומים יש למוח, ניקב החיצון בלבד כשרה עד שיינקב הפנימי.',
      explanationEn: 'Shulchan Aruch YD 31: Outer membrane puncture alone is kosher; only inner membrane perforation invalidates.'
    }
  },
  {
    id: 4,
    organId: 'lev',
    titleHe: '4. ניקב הלב לבית חללו',
    titleEn: '4. Perforated Heart Cavity (Nikav HaLev Le\'Veit Chalalo)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניקב הלב לבית חללו"',
    shulchanAruch: 'יו"ד סימן מ\' סעיף א\'',
    defectType: 'puncture',
    targetPosition: [0.35, 0.85, 0.0],
    cameraTarget: [0.35, 0.85, 0.0],
    cameraPosition: [1.1, 1.1, 0.9],
    summaryHe: 'כל נקב החודר לאחד משלושת חללי הלב (חדרי הלב) מטריף בכל שהוא. ניקב שומן הלב או עובי בשר הלב ולא הגיע לחלל - כשרה.',
    summaryEn: 'Any perforation penetrating directly into one of the heart chambers renders the animal Treifah at any size. Punctures in the myocardium that do not pierce into the cavity remain Kosher.',
    inspectCase: {
      questionHe: 'קוץ נתחב בעובי שריר הלב, ובבדיקה פנימית במים ובנפיחה נראה שלא חדר לחלל החדרים. מה הדין?',
      questionEn: 'A thorn penetrated deep into the heart muscle, but inflation and water testing prove it did not reach any ventricle chamber. Ruling?',
      options: [
        { textHe: 'כשרה - לא הגיע לבית חללו', textEn: 'Kosher - did not reach internal chamber (Veit Chalalo)', correct: true },
        { textHe: 'טרפה - לב הוא מקור החיים', textEn: 'Treifah - heart is the seat of vitality', correct: false }
      ],
      explanationHe: 'משנה חולין מ"ב: "ניקב הלב לבית חללו" - דוקא כשהגיע לחלל הפנימי.',
      explanationEn: 'Mishnah states explicitly: "Le-Veit Chalalo" - precisely when reaching the interior cavity.'
    }
  },
  {
    id: 5,
    organId: 'chutHashidrah',
    titleHe: '5. נשברה השדרה ונפסק החוט',
    titleEn: '5. Severed Spinal Cord (Nifsek Chut HaShidrah)',
    sourceMishnah: 'חולין מ"ב ע"א: "נשברה השדרה ונפסק החוט שלה"',
    shulchanAruch: 'יו"ד סימן ל"ב סעיף א\'',
    defectType: 'severance',
    targetPosition: [-0.2, 1.6, 0.0],
    cameraTarget: [-0.2, 1.6, 0.0],
    cameraPosition: [0.6, 2.2, 1.1],
    summaryHe: 'נפסק חוט השדרה ברובו - טרפה. שיעור זה נאמר מהקדקוד ועד סיום עמוד השדרה בין הפרשות (עד הירכיים). מעבר לשם אינו מטריף.',
    summaryEn: 'If the spinal cord is severed across its majority from the base of the skull down to the lumbo-sacral junction ("Bein HaParashot"), the animal is Treifah. Below that point it no longer invalidates.',
    inspectCase: {
      questionHe: 'חוט השדרה נפסק בחלק הזנב התחתון, עמוק מעבר למקום פיצול עצבי הירכיים (בין הפרשות). מה הדין?',
      questionEn: 'The spinal cord was severed down near the lower tail vertebrae, well past the branching of the pelvic nerve plexus (Bein HaParashot). Ruling?',
      options: [
        { textHe: 'כשרה - פסיקה לאחר בין הפרשות אינה מטריפה', textEn: 'Kosher - cord severance past Bein HaParashot is kosher', correct: true },
        { textHe: 'טרפה - עמוד השדרה מטריף לכל אורכו', textEn: 'Treifah - entire spinal column invalidates', correct: false }
      ],
      explanationHe: 'הגמרא בחולין מ"ה ע"ב פוסקת: חוט השדרה עד בין הפרשות טרפה, משם ואילך כשר.',
      explanationEn: 'Talmud Chullin 45b clarifies that spinal severance only invalidates prior to "Bein HaParashot".'
    }
  },
  {
    id: 6,
    organId: 'kaved',
    titleHe: '6. ניטלה הכבד',
    titleEn: '6. Removed Liver (Nitla HaKaved)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניטלה הכבד ולא נשתייר הימנה כלום"',
    shulchanAruch: 'יו"ד סימן מ"א סעיף א\'',
    defectType: 'missing',
    targetPosition: [0.0, 1.05, 0.35],
    cameraTarget: [0.0, 1.05, 0.35],
    cameraPosition: [0.7, 1.3, 1.2],
    summaryHe: 'אם נרקבה או ניטלה כל הכבד טרפה. אך אם נשתייר הימנה כזית במקום שהיא תלויה ובמקום מרה וטרפשא דכבדא - כשרה.',
    summaryEn: 'If the liver is completely missing or degraded, it is Treifah. However, if an olive\'s volume (K\'zayit) survives anchored at the gallbladder and diaphragm attachment, it is Kosher.',
    inspectCase: {
      questionHe: 'רוב הכבד נרקב ונעלם עקב מחלה, אך כזית בשר כבד בריא ושלם נותר מעוגן סביב כיס המרה. האם הבהמה כשרה?',
      questionEn: 'Most of the liver degenerated from illness, but an olive\'s bulk of viable liver tissue remains firmly attached around the gallbladder. Is the animal Kosher?',
      options: [
        { textHe: 'כשרה - נשתייר כזית במקום מרה', textEn: 'Kosher - an olive\'s bulk remains at the bile attachment', correct: true },
        { textHe: 'טרפה - חסרון רוב הכבד ממית את הבהמה', textEn: 'Treifah - loss of majority of liver is lethal', correct: false }
      ],
      explanationHe: 'משנה חולין מ"ב: "ולא נשתייר הימנה כלום" - אבל אם נשתייר כזית במקום חיותה כשרה.',
      explanationEn: 'Mishnah and Shulchan Aruch state that retaining a K\'zayit at the vital attachment site preserves kashrut.'
    }
  },
  {
    id: 7,
    organId: 'reah',
    titleHe: '7. הריאה שניקבה או שחסרה',
    titleEn: '7. Perforated or Deficient Lung (Re\'ah)',
    sourceMishnah: 'חולין מ"ב ע"א: "הריאה שניקבה או שחסרה"',
    shulchanAruch: 'יו"ד סימנים ל"ה - ל"ט',
    defectType: 'puncture',
    targetPosition: [0.2, 1.25, 0.0],
    cameraTarget: [0.2, 1.25, 0.0],
    cameraPosition: [0.8, 1.6, 1.1],
    summaryHe: 'מרכז בדיקת הבהמות ("בדיקת הריאה"): כל נקב בריאה שמוציא אוויר במים פושרים מטריף. סירכות (הידבקויות) מחייבות מומחיות לבדוק האם נוצרו מנקב וסותמות.',
    summaryEn: 'The core of post-mortem inspection ("Bedikat HaRe\'ah"). Any lung puncture leaking air when submerged in warm water invalidates. Adhesions (Sirchot) tethering lobes require meticulous examination.',
    inspectCase: {
      questionHe: 'נמצאה סירכא (קרום דביק) בין האונה השנייה הימנית לבין האומה הצמודה אליה ("כסדרן"). לפי מנהג בני אשכנז (רמ"א) לאחר מיעוך ומשמוש קל שנפרקה בקלות, מה הדין?',
      questionEn: 'An adhesion band (Sircha) spanned between two adjacent right lobes in proper anatomical order ("Ke-Sidran"). It peeled cleanly without resistance upon delicate palpation. What is the Ashkenazi (Rema) ruling?',
      options: [
        { textHe: 'כשרה כבשר כשר רגיל (אך אינה גלאט-חלק)', textEn: 'Kosher standard (though not Glatt)', correct: true },
        { textHe: 'טרפה גמורה לכל הדעות', textEn: 'Absolute Treifah according to all opinions', correct: false },
        { textHe: 'גלאט מהדרין', textEn: 'Glatt Mehadrin', correct: false }
      ],
      explanationHe: 'לפי הרמ"א ביו"ד ל"ט סעיף י"ג, מנהג אשכנז להכשיר סירכא שנתפרקה במיעוך ומשמוש, אך לבני ספרד (המחבר) אינה כשרה אלא "חלק" (גלאט) ללא סירכות כלל.',
      explanationEn: 'The Rema rules that an adhesion resolved through gentle rubbing can be certified kosher non-Glatt, whereas the Mechaber requires completely smooth (Glatt) lungs.'
    }
  },
  {
    id: 8,
    organId: 'keivah',
    titleHe: '8. ניקבה הקיבה',
    titleEn: '8. Perforated Abomasum (Nikvah HaKeivah)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניקבה הקבה"',
    shulchanAruch: 'יו"ד סימן מ"ט סעיף א\'',
    defectType: 'puncture',
    targetPosition: [-0.25, 0.65, 0.15],
    cameraTarget: [-0.25, 0.65, 0.15],
    cameraPosition: [0.4, 0.9, 1.0],
    summaryHe: 'הקיבה היא הרביעית מבין הקיבות, שבה מתבצע עיכול חומצי. כל נקב בה מטריף בכל שהוא, מפני שחומרי העיכול דולפים לחלל הבטן.',
    summaryEn: 'The true fourth digestive stomach. Any puncture through its wall invalidates the animal at any size, as corrosive gastric juices leak into the peritoneal cavity.',
    inspectCase: {
      questionHe: 'מחט נקבה את דופן הקיבה ונמצאה בולטת לחלל הבטן. מה הדין?',
      questionEn: 'A needle pierced through the abomasum wall and protrudes into the peritoneal cavity. Ruling?',
      options: [
        { textHe: 'טרפה - ניקבה הקיבה בכל שהוא', textEn: 'Treifah - abomasum puncture invalidates at any size', correct: true },
        { textHe: 'כשרה - אם אין שם מוגלה', textEn: 'Kosher - if no pus is present', correct: false }
      ],
      explanationHe: 'משנה מפורשת: "ניקבה הקבה טרפה" בכל שהוא.',
      explanationEn: 'Explicit Mishnah: Abomasum perforation is an absolute Treifah.'
    }
  },
  {
    id: 9,
    organId: 'marah',
    titleHe: '9. ניקבה המרה',
    titleEn: '9. Perforated Gallbladder (Nikvah HaMarah)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניקבה המרה"',
    shulchanAruch: 'יו"ד סימן מ"ב סעיף א\'',
    defectType: 'puncture',
    targetPosition: [0.05, 0.95, 0.38],
    cameraTarget: [0.05, 0.95, 0.38],
    cameraPosition: [0.6, 1.2, 1.1],
    summaryHe: 'כיס המרה המכיל את נוזל המרה. נקב בדופן כיס המרה מטריף. אולם אם נקבה המרה במקום שדבוק לכבד והכבד סותמתה - יש בזה דיון רחב בהלכה.',
    summaryEn: 'The bile vesicle affixed to the liver. A perforation in its free wall is Treifah. If punctured where bonded directly to liver parenchyma, halachic authorities analyze whether the liver effectively seals it.',
    inspectCase: {
      questionHe: 'כיס המרה ניקב בצדו הפתוח לחלל הגוף, ונוזל המרה ירוק זלג על המעיים. מה הדין?',
      questionEn: 'The gallbladder was punctured on its exposed peritoneal face and bile fluid leaked. Ruling?',
      options: [
        { textHe: 'טרפה ודאית', textEn: 'Definite Treifah', correct: true },
        { textHe: 'כשרה לאחר שטיפה', textEn: 'Kosher after thorough washing', correct: false }
      ],
      explanationHe: 'שולחן ערוך יו"ד מ"ב: ניקבה המרה לחוץ טרפה בכל שהוא.',
      explanationEn: 'Uncontested rule: Free perforation of the gallbladder is Treifah.'
    }
  },
  {
    id: 10,
    organId: 'dakin',
    titleHe: '10. ניקבו הדקין',
    titleEn: '10. Perforated Intestines (Nikvu HaDakin)',
    sourceMishnah: 'חולין מ"ב ע"א: "ניקבו הדקין"',
    shulchanAruch: 'יו"ד סימן מ"ו סעיף א\'',
    defectType: 'puncture',
    targetPosition: [-0.7, 0.9, 0.0],
    cameraTarget: [-0.7, 0.9, 0.0],
    cameraPosition: [-0.1, 1.3, 1.2],
    summaryHe: 'כל בני המעיים אם ניקבו אפילו בנקב זעיר ביותר כמלא מחט - טרפה, ואין להם שום סתימה המועילה.',
    summaryEn: 'All intestinal loops. A puncture even as minute as a needle eye renders the animal Treifah, as intestines cannot establish a viable biological seal.',
    inspectCase: {
      questionHe: 'תולעת במעיים נמצאה בבדיקה: הנקב נראה רק מחלל המעי הפנימי ולא הגיע לחלל החיצוני. מה הדין?',
      questionEn: 'Parasitic worm found: examination reveals the perforation entered from the inside mucosa but stopped halfway without breaching the outer peritoneal serosa. Ruling?',
      options: [
        { textHe: 'כשרה - לא ניקב לחוץ', textEn: 'Kosher - did not perforate through to outside', correct: true },
        { textHe: 'טרפה - כל פגם במעיים מטריף', textEn: 'Treifah - any gut defect invalidates', correct: false }
      ],
      explanationHe: 'שולחן ערוך יו"ד מ"ו סעיף ד\': נקב שאינו מפולש לחוץ כשר.',
      explanationEn: 'Partial, non-transmural bowel punctures remain kosher.'
    }
  },
  {
    id: 11,
    organId: 'keres',
    titleHe: '11. הכרס הפנימית שניקבה',
    titleEn: '11. Punctured Internal Rumen (Keres HaPenimit)',
    sourceMishnah: 'חולין מ"ב ע"א: "הכרס הפנימית שניקבה"',
    shulchanAruch: 'יו"ד סימן מ"ח סעיף א\'',
    defectType: 'puncture',
    targetPosition: [-0.4, 0.9, -0.2],
    cameraTarget: [-0.4, 0.9, -0.2],
    cameraPosition: [0.3, 1.4, 1.0],
    summaryHe: 'הכרס היא מדור המזון העיקרי. חלקה העליון והחופשי נקרא "כרס הפנימית". נקב בה מטריף. מקום הדבוק לחלקי בשר ועצם הדופן אינו נקרא פנימית.',
    summaryEn: 'The vast primary fermentation chamber. Its free peritoneal wall is designated "Internal Rumen". A puncture here is Treifah. Sections adhered to abdominal musculature have differing rulings.',
    inspectCase: {
      questionHe: 'קרע של 2 ס"מ בדופן החופשית של הכרס לתוך חלל הצפק. מה הדין?',
      questionEn: 'A 2 cm tear on the free wall of the rumen leaking ruminal contents into peritoneum. Ruling?',
      options: [
        { textHe: 'טרפה - ניקבה הכרס הפנימית', textEn: 'Treifah - internal rumen wall punctured', correct: true },
        { textHe: 'כשרה אם נתפרה בחיים', textEn: 'Kosher if sutured while alive', correct: false }
      ],
      explanationHe: 'משנה חולין מ"ב: הכרס הפנימית שניקבה טרפה.',
      explanationEn: 'Mishnah Chullin 42a: Transmural puncture of the internal rumen is invalidating.'
    }
  },
  {
    id: 12,
    organId: 'beitHakosos',
    titleHe: '12. המסס ובית הכוסות שניקבו לחוץ',
    titleEn: '12. Omasum / Reticulum Punctured Outward',
    sourceMishnah: 'חולין מ"ב ע"א: "המסס ובית הכוסות שניקבו לחוץ"',
    shulchanAruch: 'יו"ד סימן מ"ח סעיפים ג\'-ד\'',
    defectType: 'puncture',
    targetPosition: [0.1, 0.85, 0.2],
    cameraTarget: [0.1, 0.85, 0.2],
    cameraPosition: [0.7, 1.2, 1.1],
    summaryHe: 'אם ניקבו המסס או בית הכוסות כלפי חוץ - טרפה. אם ניקב הדופן המשותף המפריד ביניהם (זה לתוך זה) - כשרה, כי אין המזון יוצא לגוף.',
    summaryEn: 'If either omasum or reticulum is perforated toward the external abdominal cavity, it is Treifah. If the internal septum separating them is perforated (one into the other), it remains Kosher because contents do not exit into the abdomen.',
    inspectCase: {
      questionHe: 'מסמר נבלע על ידי הפרה ונקב את המחיצה הפנימית שבין בית הכוסות להמסס, מבלי לנקב את הדופן החיצונית כלל. מה הדין?',
      questionEn: 'A swallowed nail perforated the internal partition wall between reticulum and omasum, but the outer peritoneal wall is undamaged. Ruling?',
      options: [
        { textHe: 'כשרה - זה לתוך זה אינו מטריף', textEn: 'Kosher - internal inter-chamber puncture does not invalidate', correct: true },
        { textHe: 'טרפה - מחט בקיבה מטריפה תמיד', textEn: 'Treifah - hardware in stomachs always invalidates', correct: false }
      ],
      explanationHe: 'חולין נ\' ע"א: "שניקבו זה לתוך זה כשרה, לא אמרו אלא שניקבו לחוץ".',
      explanationEn: 'Talmud Chullin 50a explicitly validates communication between adjacent stomach chambers provided the exterior wall is unpunctured.'
    }
  },
  {
    id: 13,
    organId: 'tzlaot',
    titleHe: '13. נפלה מן הגג (ריסוק איברים)',
    titleEn: '13. Fall from Roof / Crushed Organs (Naflo Min HaGag)',
    sourceMishnah: 'חולין מ"ב ע"א: "נפלה מן הגג"',
    shulchanAruch: 'יו"ד סימן נ"ח סעיף א\'',
    defectType: 'fracture',
    targetPosition: [-0.1, 1.25, 0.0],
    cameraTarget: [-0.1, 1.25, 0.0],
    cameraPosition: [0.9, 1.7, 1.5],
    summaryHe: 'בהמה שנפלה מגובה של עשרה טפחים או מכה אנושה אחרת, יש לחוש לריסוק איברים פנימיים. חובה לבדוק את כל איברי הפנים מחשש קריעה או שטף דם ממית.',
    summaryEn: 'An animal subjected to a fall of 10 tefachim or major blunt-force trauma carries presumption of shattered internal viscera. Full systemic dissection is mandated to rule out ruptured organs or fatal hemorrhages.',
    inspectCase: {
      questionHe: 'עגלה נפלה ממצוק גבוה אך קמה והלכה מיד. האם מותר לשחוט ללא שהייה ולבדוק?',
      questionEn: 'A heifer fell from a steep height but got up and walked normally. Can she be slaughtered immediately without quarantine?',
      options: [
        { textHe: 'אם הלכה הילוך יפה כשרה, אך אם שהתה 24 שעות או נבדקו כל איבריה - כשרה', textEn: 'If walked vigorously kosher, or requires 24h quarantine & full organ inspection', correct: true },
        { textHe: 'נבלה גמורה מיד ואסורה לעולם', textEn: 'Instant Carrion (Neveilah) and forever forbidden', correct: false }
      ],
      explanationHe: 'יו"ד סימן נ"ח סעיף א\': נפילה מגובה מצריכה בדיקת כל האיברים אם נשחטה מיד, או המתנה כ"ד שעות לראות אם מהלכת כדרכה.',
      explanationEn: 'Requires full anatomical autopsy if slaughtered immediately, or a 24-hour observation period to confirm mobility.'
    }
  },
  {
    id: 14,
    organId: 'tzlaot',
    titleHe: '14. נשתברו רוב צלעותיה',
    titleEn: '14. Majority of Ribs Broken (Nishberu Rov Tzla\'oteha)',
    sourceMishnah: 'חולין מ"ב ע"א: "נשתברו רוב צלעותיה"',
    shulchanAruch: 'יו"ד סימן נ"ד סעיף א\'',
    defectType: 'fracture',
    targetPosition: [-0.1, 1.25, 0.0],
    cameraTarget: [-0.1, 1.25, 0.0],
    cameraPosition: [0.8, 1.4, 1.3],
    summaryHe: 'בבהמה יש 22 צלעות שיש בהן מוח (11 בכל צד). אם נשברו רובן (12 צלעות, או 6 צלעות עם מוח מצד אחד ליד השדרה) - הרי זו טרפה.',
    summaryEn: 'Cattle possess marrow-bearing true ribs along the spine (11 per side). If the majority (12 overall, or 6 with marrow on one side near spine) are fractured, the cow is Treifah.',
    inspectCase: {
      questionHe: 'נמצאו 3 צלעות שבורות בצד ימין ו-2 צלעות שבורות בצד שמאל. האם הבהמה טרפה?',
      questionEn: '3 broken ribs found on the right flank and 2 broken ribs on the left flank (5 total). Is the cow Treifah?',
      options: [
        { textHe: 'כשרה - לא נשברו רוב צלעותיה (פחות מ-11/12)', textEn: 'Kosher - broken count is far below majority (rov)', correct: true },
        { textHe: 'טרפה - כל שבר בצלע מטריף מחשש ניקוב הריאה', textEn: 'Treifah - any fractured rib punctures lungs', correct: false }
      ],
      explanationHe: 'ההלכה דורשת רוב צלעות (שולחן ערוך נ"ד סעיף א\'). חמש צלעות בלבד אינן רוב.',
      explanationEn: 'Shulchan Aruch YD 54: Requires majority of marrow-bearing ribs; 5 broken ribs remain kosher.'
    }
  },
  {
    id: 15,
    organId: 'veshet',
    titleHe: '15. דרוסת הטורף (זאב / ארי)',
    titleEn: '15. Predator Claw Strike / Venom (Drusat HaZeev / Ari)',
    sourceMishnah: 'חולין מ"ב ע"א: "דרוסת הזאב בבהמה דקה, ודרוסת הארי בבהמה גסה"',
    shulchanAruch: 'יו"ד סימנים נ"ז - נ"ח',
    defectType: 'claw',
    targetPosition: [0.7, 1.3, 0.2],
    cameraTarget: [0.7, 1.3, 0.2],
    cameraPosition: [1.4, 1.5, 1.1],
    summaryHe: 'טורף המכה בטפריו (אריה בבקר, זאב בצאן) מטיל "ארס" השורף את האיברים מבפנים. בדיקתה כנגד סימני שחיטה ואיברים פנימיים אם יש אודם חרוך.',
    summaryEn: 'Carnivorous predators (lions on cattle, wolves on sheep) inject burning claw toxins (Arisut) during predatory attacks. Visceral redness or scorch marks invalidate the animal.',
    inspectCase: {
      questionHe: 'חתול או שועל קטן תקף פרה גדולה ושרט את עורה. האם יש בזה דין דרוסה בבהמה גסה?',
      questionEn: 'A cat or small fox attacked a large bovine cow and left claw marks. Does predator "Drusah" apply?',
      options: [
        { textHe: 'כשרה - אין דרוסה לחתול ושועל בבהמה גסה', textEn: 'Kosher - small predators have no Drusah status on large cattle', correct: true },
        { textHe: 'טרפה - כל חיית טרף מטילה ארס', textEn: 'Treifah - all carnivores impart venom', correct: false }
      ],
      explanationHe: 'משנה חולין נ"ב ע"ב: אין דרוסה לזאב בבהמה גסה, וכל שכן לחתול ושועל, אלא לאריה בלבד.',
      explanationEn: 'Talmud Chullin 52b: On large bovines (Behemah Gasah), only a lion has the halachic classification of Drusah.'
    }
  },
  {
    id: 16,
    organId: 'bokaDatma',
    titleHe: '16. נשמטה הירך (בוקא דאטמא)',
    titleEn: '16. Dislocated Hip Joint (Boka D\'Atma)',
    sourceMishnah: 'חולין מ"ב ע"א: "נשמטה הירך"',
    shulchanAruch: 'יו"ד סימן נ"ה סעיף א\'',
    defectType: 'dislocation',
    targetPosition: [-0.95, 0.95, 0.3],
    cameraTarget: [-0.95, 0.95, 0.3],
    cameraPosition: [-0.4, 1.2, 1.3],
    summaryHe: 'ראש עצם הירך שנשמט מתוך המכתשת שבאגן (בוקא דאטמא מבית כוסות שלו). אם נתרופפו ונפסקו מיתרי המפרק ונרקבו - הרי זו טרפה.',
    summaryEn: 'Dislocation of the head of the femur from the acetabulum cup socket of the pelvis. If the anchoring ligaments are severed and gangrenous, the cow is Treifah.',
    inspectCase: {
      questionHe: 'עצם הירך נשמטה מן המפרק אך כל הגידים והמיתרים שלמים ולא נקרעו ולא הרקיבו. מה הדין?',
      questionEn: 'The femur slipped out of its socket, but all connective ligaments and sinews are intact and show no signs of rot. Ruling?',
      options: [
        { textHe: 'כשרה - כל עוד לא נתעכלו ונפסקו הגידים', textEn: 'Kosher - as long as ligaments have not degenerated', correct: true },
        { textHe: 'טרפה - כל יציאה מהמפרק מטריפה', textEn: 'Treifah - dislocation alone is fatal', correct: false }
      ],
      explanationHe: 'שולחן ערוך נ"ה סעיף ב\': אם לא נפסקו החוטים ולא נרקבו - כשרה.',
      explanationEn: 'Shulchan Aruch YD 55 §2: Preserves kashrut provided joint ligaments remain intact without decomposition.'
    }
  },
  {
    id: 17,
    organId: 'tzometHagidin',
    titleHe: '17. צומת הגידים שנחתכו',
    titleEn: '17. Severed Tendon Nexus (Tzomet HaGidin)',
    sourceMishnah: 'חולין מ"ב ע"א: "וצומת הגידים שנחתכו"',
    shulchanAruch: 'יו"ד סימן נ"ו סעיף א\'',
    defectType: 'severance',
    targetPosition: [-0.95, 0.40, 0.22],
    cameraTarget: [-0.95, 0.40, 0.22],
    cameraPosition: [-0.60, 0.65, 0.85],
    summaryHe: 'מקום חיבור של שלושה גידים עבים בשוק מעל העקב. אם נחתך רוב עוביים או נפסקו רוב הגידים - טרפה. בבקר יש גיד מרכזי חזק ועוד שניים עמוקים.',
    summaryEn: 'The critical anatomical confluence of flexor tendons above the hock on the hind leg. If the majority of the tendon bulk is transected, the animal is Treifah.',
    inspectCase: {
      questionHe: 'שריטה שטחית חתכה כ-20% בלבד מעובי הגיד הראשי של צומת הגידים. מה הדין?',
      questionEn: 'A superficial laceration severed approximately 20% of the thickness of the main flexor tendon at Tzomet HaGidin. Ruling?',
      options: [
        { textHe: 'כשרה - בעינן חיתוך רוב עוביו', textEn: 'Kosher - requires severance across majority (rov) of thickness', correct: true },
        { textHe: 'טרפה - צומת הגידים רגיש בכל חתך', textEn: 'Treifah - any cut in the tendon nexus invalidates', correct: false }
      ],
      explanationHe: 'שולחן ערוך נ"ו סעיף א\': עד שייחתך רוב הגידים ברובו.',
      explanationEn: 'Halachic rule mandates transection of the majority of the tendon bundle.'
    }
  },
  {
    id: 18,
    organId: 'tchol',
    titleHe: '18. הטחול שניקב או ניטל',
    titleEn: '18. Perforated or Missing Spleen (Tchol)',
    sourceMishnah: 'חולין נ"ד ע"א: "הטחול שניקב... בעוביו טרפה בדוקו כשרה"',
    shulchanAruch: 'יו"ד סימן מ"ג סעיפים א\'-ב\'',
    defectType: 'puncture',
    targetPosition: [-0.5, 1.15, -0.3],
    cameraTarget: [-0.5, 1.15, -0.3],
    cameraPosition: [0.1, 1.5, 0.9],
    summaryHe: 'איבר דמוי לשון ארוך הצמוד לכרס. יש לו חלק עבה הנקרא "עוביו" וחלק דק הנקרא "דוקו". נקב בעוביו טרפה, נקב בדוקו כשרה. ניטל הטחול כולו - כשרה!',
    summaryEn: 'A tongue-shaped organ resting along the rumen. Split into a thick head ("Ovyov") and thin edge ("Duko"). Punctures in the thick vital region are Treifah; punctures in the thin edge are Kosher. Remarkably, if the spleen is removed entirely, it is Kosher!',
    inspectCase: {
      questionHe: 'נמצא נקב מפולש בקצה הדק המרוחק ("דוקו") של הטחול. האם הפרה טרפה?',
      questionEn: 'A through-and-through perforation was found on the thin peripheral margin ("Duko") of the spleen. Is the cow Treifah?',
      options: [
        { textHe: 'כשרה - נקב בדוקו של הטחול כשר', textEn: 'Kosher - puncture in the thin edge (Duko) is kosher', correct: true },
        { textHe: 'טרפה - כל איבר מנוקב מטריף', textEn: 'Treifah - all perforated visceral organs invalidate', correct: false }
      ],
      explanationHe: 'משנה חולין נ"ד ע"א: הטחול שניקב בעוביו טרפה, בדוקו כשרה.',
      explanationEn: 'Mishnah Chullin 54a: Spleen puncture in thick body is Treifah; in thin taper (Duko) is Kosher.'
    }
  }
];
