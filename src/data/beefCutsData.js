/**
 * Supermarket & Butcher Beef Cuts Guide Data (חלקי הפרה בסופר ובקצבייה 1-19)
 * Based on authentic Israeli culinary & butcher specifications (sousvide.co.il)
 * Integrated with 3D anatomical coordinates for bovine musculature
 */

export const BEEF_CUTS = [
  {
    number: 1,
    id: "entrecote",
    nameHe: "אנטריקוט",
    aliasesHe: "ורד הצלע, פריים ריב, סטייק עין, טומהוק",
    nameEn: "Prime Rib, Rib Eye, Tomahawk",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "גבוהה-משויש",
    fatLevelScore: 5,
    characteristics: "נתח בעל עובי בינוני, מאופיין בשיוש שומן עשיר ובמרכזו עין שומן המקנה לו צורת פרח. זהו הנתח הנפוץ ביותר בישראל לסטייקים איכותיים.",
    cookingMethods: ["גריל / BBQ", "סטייקים במחבת", "צלייה קצרה בתנור", "סו-וויד"],
    popularDishes: "סטייק אנטריקוט, טומהוק על עצם, צלי פריים-ריב שלם סגור בנייר כסף בחום נמוך",
    chefTips: "ממנו מגיע נתח הטומהוק הידוע כמלך הסטייקים. מעולה לצלייה קצרה עד בינונית. בגלל מיקומו בחלק הקדמי, הוא כשר למהדרין ללא צורך בניקור גיד הנשה.",
    position: [0.10, 1.38, 0.28], // Upper dorsal thoracic ribs
    cameraTarget: [0.10, 1.35, 0.0],
    cameraPos: [0.35, 1.65, 1.3]
  },
  {
    number: 2,
    id: "ribs",
    nameHe: "צלעות / אונטר ריב",
    aliasesHe: 'ריפען, אונטריב, צ"אק-איי',
    nameEn: "Chuck-Eye Pot Roast, Ribs",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "בינונית",
    fatLevelScore: 3,
    characteristics: "נתח המחבר את הצוואר עם האנטריקוט. מורכב משני חלקים: חלק רזה בעל סיבים דקים וקצרים, וחלק משויש המזכיר אנטריקוט בטעמו העדין.",
    cookingMethods: ["בישול ארוך בנוזלים", "קדרה / גולאש", "טחינה לקציצות", "סו-וויד"],
    popularDishes: "קדרת בקר עשירה, תבשילי קדירה, בשר טחון פרימיום",
    chefTips: "אידיאלי לצלייה ארוכה בנוזלים בנתחים גדולים. אינו נפרס יפה בנתח שלם, אך בטחינה מעניק טעם עשיר במיוחד להמבורגרים ותבשילים.",
    position: [0.35, 1.30, 0.28], // Between neck and ribeye
    cameraTarget: [0.35, 1.28, 0.0],
    cameraPos: [0.65, 1.55, 1.25]
  },
  {
    number: 3,
    id: "brisket",
    nameHe: "חזה / בריסקט",
    aliasesHe: "ברוסט, בריסקט & פלייט",
    nameEn: "Brisket & Plate",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "בינונית-גבוהה",
    fatLevelScore: 4,
    characteristics: "ממוקם מתחת לצוואר ולצלעות כלפי מטה. מאופיין בסיבים ארוכים ומודגשים עם שכבת שומן מכובדת (פק). מעניק מרקם ייחודי ועסיסי במיוחד.",
    cookingMethods: ["עישון (Smoker)", "בישול ארוך", "כבישה (קורנדביף)", "מרקים", "אפייה בתנור"],
    popularDishes: "בריסקט מעושן בסגנון טקסס, קורנדביף כבוש, מרק בשר עשיר, חמין",
    chefTips: "הנתח האולטימטיבי למעשנות בקר (Low & Slow) ולתבשילי סיר ארוכים. שכבת השומן נמסה לאורך שעות הבישול ומרככת את הסיבים הארוכים.",
    position: [0.45, 0.76, 0.22], // Cranial-ventral chest
    cameraTarget: [0.45, 0.78, 0.0],
    cameraPos: [0.75, 0.95, 1.2]
  },
  {
    number: 4,
    id: "shoulder",
    nameHe: "כתף מרכזי",
    aliasesHe: "שולדר, כתף עגולה",
    nameEn: "Arm Roast, Shoulder Roast",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "נמוכה",
    fatLevelScore: 2,
    characteristics: "נתח רחב בקצהו האחד וצר בקצה השני. מאופיין ברקמת חיבור דקיקה במרכז, מרקם חלק ואחוזי שומן נמוכים.",
    cookingMethods: ["צלייה בקוביות", "צלייה ארוכה כנתח שלם", "טחינה רזה"],
    popularDishes: "צלי כתף קלאסי, גולאש קוביות, בשר טחון דל-שומן",
    chefTips: "מתאים במיוחד למי שמחפש בשר רזה לתבשילי קדירה או לטחינה בריאה ודלת שומן.",
    position: [0.52, 1.05, 0.35], // Lateral shoulder blade area
    cameraTarget: [0.50, 1.05, 0.0],
    cameraPos: [0.85, 1.30, 1.25]
  },
  {
    number: 5,
    id: "topBlade",
    nameHe: "צלי כתף",
    aliasesHe: "פולייקה, צונגנבראטן, טופ בלייד, פלט איירון",
    nameEn: "Top Blade Roast, Flat Iron",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "נמוכה-בינונית (עשיר בקולגן)",
    fatLevelScore: 2,
    characteristics: "נתח צר ומאורך בצורת כיכר לחם. במרכזו עובר פס קולגן ג'לטיני טבעי, הנמס בזמן בישול ארוך ומעניק לו רכות מופלאה.",
    cookingMethods: ["בישול איטי בסיר / תנור", "צלייה יבשה בנייר כסף", "סטייק פלט איירון"],
    popularDishes: "צלי כתף מסורתי של שבת ואירועים, פרוסות ברוטב פטריות ויין, קדרה איטית",
    chefTips: "מהנתחים הקלאסיים והפופולריים בישראל לשבת וחגים. סובל באהבה בישול יתר. פס הקולגן המרכזי מעניק רכות ג'לטינית עשירה.",
    position: [0.46, 1.15, 0.36], // Anterior blade
    cameraTarget: [0.45, 1.15, 0.0],
    cameraPos: [0.75, 1.40, 1.25]
  },
  {
    number: 6,
    id: "mockTender",
    nameHe: "פילה מדומה",
    aliasesHe: 'פאלש פילה, צ"אק טנדר',
    nameEn: "Chuck Tender, Mock Tender",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "נמוכה",
    fatLevelScore: 1,
    characteristics: "צורה גלילית חלקה ומחודדת קמעה המזכירה פילה, עטופה בעורית דקיקה עם סיבים קצרים. נתח דל שומן ששומר על צורתו היפה לאחר פריסה.",
    cookingMethods: ["צלייה כנתח שלם", "בישול ארוך בנוזלים", "סו-וויד"],
    popularDishes: "צלי שלם פרוס לפרוסות עגולות ויפהפיות, תבשילי שבת",
    chefTips: "אין קשר ביולוגי לפילה האמיתי למעט הצורה הגלילית. היתרון הגדול שלו הוא שהוא נפרס מושלם לפרוסות חגיגיות מבלי להתפרק.",
    position: [0.56, 1.18, 0.32], // Upper shoulder apex
    cameraTarget: [0.55, 1.15, 0.0],
    cameraPos: [0.90, 1.45, 1.2]
  },
  {
    number: 8,
    id: "foreShank",
    nameHe: "שריר קדמי",
    aliasesHe: "אוסובוקו קדמי, שריר הזרוע",
    nameEn: "Fore Shank, Ossobuco",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "נמוכה (עשיר ברקמות חיבור וג'לטין)",
    fatLevelScore: 2,
    characteristics: "נתח אליפטי עתיר ברקמות חיבור וגידים קטנים ברגל הקדמית, עטוף עורית חלקה שקופה. בבישול ארוך הגידים הופכים לג'לטין עשיר וטעים.",
    cookingMethods: ["אוסובוקו עם עצם ומח", "חמין / טשולנט", "מרקי בשר כבדים", "קדרות איטיות"],
    popularDishes: "אוסובוקו בקר ביין וירקות שורש, חמין שבת, מרק גולאש הונגרי",
    chefTips: "אחד הנתחים המושלמים לחמין ולבישול של 4-8 שעות. הג'לטין הופך את הבשר לרך ונמס בפה עם עושר טעמים עמוק.",
    position: [0.48, 0.45, 0.32], // Foreleg shank
    cameraTarget: [0.48, 0.50, 0.0],
    cameraPos: [0.80, 0.65, 1.15]
  },
  {
    number: 9,
    id: "shortRibs",
    nameHe: "אסאדו / שפונדרה",
    aliasesHe: "קשתית, שורט-ריבס, פלאנקן",
    nameEn: "Short Ribs, Flanken",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "גבוהה מאוד",
    fatLevelScore: 5,
    characteristics: "נתח שומני ומשובח הממוקם בחלק התחתון של הצלעות. מורכב משכבות שומן עשירות, בשר סיבי עדין ועצמות צלע שטוחות ומאורכות.",
    cookingMethods: ["צלייה איטית בתנור (Slow Roast)", "עישון ב-Smoker", "חמין", "גריל עקיף"],
    popularDishes: "אסאדו ארגנטינאי נימוח, שורט-ריבס ברוטב ברביקיו דביק, חמין עשיר",
    chefTips: "נתח הדגל של אוהבי הבשר (קרניבורים). בישול ארוך של 6 שעות בחום נמוך ממיס את השומן והופך את הבשר לנימוח עד שנפרד מהעצם בלחיצת מזלג.",
    position: [0.08, 0.72, 0.36], // Lower ventral ribcage
    cameraTarget: [0.08, 0.75, 0.0],
    cameraPos: [0.25, 0.90, 1.35]
  },
  {
    number: 10,
    id: "neck",
    nameHe: "צוואר",
    aliasesHe: "עורף, חלק קדמי, נֶק",
    nameEn: "Neck, Chuck Roll",
    section: "forequarter",
    sectionHe: "חלק קדמי (כשר ללא ניקור)",
    fatLevel: "בינונית-גבוהה",
    fatLevelScore: 4,
    characteristics: "החלק הקדמי ביותר של הבהמה. חלקו החיצוני שרירי וסיבי מאוד המגן על הבהמה, וחלקו הפנימי עשיר בשומן משובץ ורווי בדם וטעמים עוצמתיים.",
    cookingMethods: ["טחינה גסה להמבורגרים", "צלייה ארוכה בנוזלים", "קוביות לקדרה"],
    popularDishes: "המבורגר בקר פרימיום, תבשילי שורשים בבישול ארוך, תבשילי גולאש",
    chefTips: "הבשר המושלם בעולם לקציצות והמבורגרים בגלל היחס האידיאלי בין שומן לבשר שרירי העשיר בטעמים עמוקים בטחינה גסה.",
    position: [0.72, 1.22, 0.12], // Cervical neck muscles
    cameraTarget: [0.72, 1.20, 0.0],
    cameraPos: [1.10, 1.45, 1.15]
  },
  {
    number: 11,
    id: "sirloin",
    nameHe: "סינטה",
    aliasesHe: "מותן, סירלוין, רוסטביף, אומצה",
    nameEn: "Sirloin, Striploin, Roast Beef",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור גיד הנשה וחלב)",
    fatLevel: "נמוכה-בינונית (פס שומן עליון)",
    fatLevelScore: 3,
    characteristics: "הנתח הראשון בגב השייך לחלק האחורי. נתח רך וחלק עם כיסוי פס שומן עליון מובהק. נקי משומן פנימי ומאוד עדין במרקמו.",
    cookingMethods: ["רוסטביף בתנור", "סטייקים על הגריל / מחבת", "קרפצ'יו", "שניצל דק"],
    popularDishes: "רוסטביף ורדרד מושלם (מדיום רייר), סטייק סינטה, קרפצ'יו בקר דקיק עם שמן זית ובלסמי",
    chefTips: "הנתח הקלאסי לרוסטביף ולקרפצ'יו. דורש צלייה מבוקרת (עד מדיום בלבד) כדי לשמור על עסיסיותו ולא לייבש את הבשר הרזה.",
    position: [-0.25, 1.38, 0.26], // Dorsal lumbar loin
    cameraTarget: [-0.25, 1.35, 0.0],
    cameraPos: [-0.15, 1.65, 1.3]
  },
  {
    number: 12,
    id: "tenderloin",
    nameHe: "פילה",
    aliasesHe: "מותנית, טנדרלוין, פילה מיניון, שאטו בריאן",
    nameEn: "Tenderloin, Filet Mignon, Chateaubriand",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה מאוד (חף משומן)",
    fatLevelScore: 1,
    characteristics: "הנתח הרך והיוקרתי ביותר בכל גוף הבהמה. ממוקם פנימית מתחת לעמוד השדרה מאחורי הסינטה, אינו מבצע מאמץ ולכן רך כמו חמאה.",
    cookingMethods: ["צלייה קצרה במחבת / גריל", "סו-וויד", "ביף וולינגטון", "קרפצ'יו / טרטר"],
    popularDishes: "מדליוני פילה מיניון, שאטו בריאן, ביף וולינגטון בבצק עלים, סטרוגנוף מקצוות הפילה",
    chefTips: "הנתח הכי יקר ומבוקש. מאחר שאין בו שומן כמעט, אסור לצלות מעבר ל-Medium-Rare. מעולה לשילוב עם רטבי חמאה, יין מצומצם או פלפלת.",
    position: [-0.30, 1.24, 0.16], // Sub-lumbar internal tenderloin
    cameraTarget: [-0.30, 1.25, 0.0],
    cameraPos: [-0.20, 1.45, 1.25]
  },
  {
    number: 13,
    id: "rumpRoast",
    nameHe: "שייטל",
    aliasesHe: "כנף העוקץ, ראמפ-סטייק, ראמפ",
    nameEn: "Rump Roast, Rump Steak",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה-בינונית",
    fatLevelScore: 2,
    characteristics: "נתח אחורי מחלקו העליון של הירך/שוק. צורתו מזכירה מימייה. בעל סיבים קצרים, רכות מצוינת וטעם בשרי עמוק ומרוכז במיוחד.",
    cookingMethods: ["שיפודים איכותיים", "סטייקים על הפלנצ'ה", "הקפצה בווק (Stir-fry)", "שניצל בקר"],
    popularDishes: "שיפודי שייטל נימוחים, סטייק ראמפ קלאסי, מוקפץ אסייתי עם ירקות, רוסטביף",
    chefTips: "נתח רבגוני יוצא מן הכלל המשלב רכות של נתח יוקרתי עם עושר טעמים חזק. נפלא לשיפודים ולבישול קצרצר במחבת חמה.",
    position: [-0.62, 1.34, 0.28], // Upper pelvic rump
    cameraTarget: [-0.62, 1.30, 0.0],
    cameraPos: [-0.50, 1.55, 1.28]
  },
  {
    number: 14,
    id: "sirloinTip",
    nameHe: "אווזית",
    aliasesHe: "אגוז, נוס, סירלוין טיפ, קנאקל",
    nameEn: "Beef Knuckle, Sirloin Tip",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה",
    fatLevelScore: 2,
    characteristics: "נתח עגלגל מאורך הממוקם בחלק הקדמי של שוק הירך האחורית. רזה יחסית, בעל סיבים קצרים ורך בהשוואה לנתחי ירך אחרים.",
    cookingMethods: ["בישול בינוני-ארוך בקוביות", "צלייה כנתח שלם", "סו-וויד"],
    popularDishes: "צלי קדירה, בשר בבישול ארוך, תבשילי ירקות",
    chefTips: "אם הקצב מגלף את הנתח המרכזי העגול (הנראה ככדור בייסבול), הוא נהדר לצלייה בתנור כרוסטביף רזה ועסיסי.",
    position: [-0.55, 1.00, 0.35], // Anterior thigh / stifle
    cameraTarget: [-0.55, 0.98, 0.0],
    cameraPos: [-0.40, 1.20, 1.3]
  },
  {
    number: 15,
    id: "bottomRound",
    nameHe: 'צ"ך',
    aliasesHe: 'ירכה, צ"אק אחורי, ראונד פלאט',
    nameEn: "Bottom Round Roast, Round Flat",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה (שומן חיצוני בלבד)",
    fatLevelScore: 2,
    characteristics: "נתח אחורי משוק הבהמה. מאופיין בשכבת שומן בצידו האחד ובפנים חלק ורזה. בעל סיבים בינוניים ועסיסיות מודגשת.",
    cookingMethods: ["צלייה ארוכה כנתח שלם בתנור", "בישול בקדירה", "סו-וויד בטמפרטורה נמוכה"],
    popularDishes: "צלי בקר חגיגי ביין אדום, קוביות לקדירה איטית",
    chefTips: "עובר לאורכו גיד שחשוב שהקצב ינקה. מצוין לפריסה דקה לאחר בישול איטי בנוזלים ועשבי תיבול.",
    position: [-0.80, 1.10, 0.34], // Posterolateral hindquarter
    cameraTarget: [-0.80, 1.08, 0.0],
    cameraPos: [-0.70, 1.35, 1.25]
  },
  {
    number: 16,
    id: "topRound",
    nameHe: "כף",
    aliasesHe: "טופ ראונד, אינסייד ראונד, ירך פנימית",
    nameEn: "Top Round, Inside Round",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה מאוד",
    fatLevelScore: 1,
    characteristics: "נתח שריר גדול בחלקה הפנימי של הירך האחורית. דל שומן, חלק, בעל סיבים ארוכים וצבע אחיד יפהפה. בפריסה דקה הוא רך במיוחד.",
    cookingMethods: ["שניצל בקר דק (וינאי)", "אסקלופ", "רוסטביף רזה", "קרפצ'יו"],
    popularDishes: "שניצל בקר פריך בציפוי פירורי לחם, אסקלופ ברוטב לימון וצלפים, קרפצ'יו",
    chefTips: "הנתח המנצח לשניצל בקר איכותי! בפריסה דקיקה כנגד כיוון הסיבים ודפיקה קלה, השניצל יוצא רך ועסיסי ביותר.",
    position: [-0.74, 1.05, 0.18], // Medial hind thigh
    cameraTarget: [-0.74, 1.02, 0.0],
    cameraPos: [-0.60, 1.25, 1.2]
  },
  {
    number: 17,
    id: "flank",
    nameHe: "פלדה / כְּסָלִים",
    aliasesHe: "פאלדה, רפאלי, מתאמרי, ואסיו, כסלים",
    nameEn: "Flank, Bavette, Vacio",
    section: "hindquarter",
    sectionHe: "חלק אחורי / כסלים (מחייב ניקור)",
    fatLevel: "גבוהה",
    fatLevelScore: 4,
    characteristics: "נתח בצורת וילון דק ושומני לאורך דופן הבטן התחתונה. בעל סיבים עבים ומודגשים מאוד וטעם בשרי עוצמתי שמבוקש מאוד בקרב שפים.",
    cookingMethods: ["גריל מהיר ופריסה דקה כנגד הסיבים", "רולדת מטמברה", "טחינה", "בישול ארוך וגולאש"],
    popularDishes: "ואסיו על האש (אסאדו דרום-אמריקאי), רולדת מטמברה ממולאת, תבשילי בקר מפורק",
    chefTips: "החלק הדק נקרא ואסיו והוא מלך האסאדו בארגנטינה! צלייה מהירה בחום גבוה ופריסה דקה באלכסון כנגד הסיבים מפיקה סטייק עסיסי מאין כמוהו.",
    position: [-0.20, 0.78, 0.34], // Abdominal flank curtain
    cameraTarget: [-0.20, 0.80, 0.0],
    cameraPos: [-0.05, 0.95, 1.3]
  },
  {
    number: 18,
    id: "hindShank",
    nameHe: "שריר אחורי",
    aliasesHe: 'אוסובוקו אחורי, פולי, קצ"לקה, שנק',
    nameEn: "Hind Shank, Heel",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור גיד הנשה)",
    fatLevel: "נמוכה (עתיר ג'לטין וקולגן)",
    fatLevelScore: 2,
    characteristics: "נתח אובלי רחב במרכזו בשוק האחורית, מעל צומת הגידים. דומה לשריר הקדמי (מס' 8), אך מעט רך ועסיסי יותר ובעל מרקם פחות סיבי.",
    cookingMethods: ["אוסובוקו אחורי", "חמין", "קדירה ביין", "מרק עשיר"],
    popularDishes: "פרוסות אוסובוקו עם מח עצם בבישול איטי, קדרת בשר שורשים, חמין שבת",
    chefTips: "נתח מופלא לבישול ארוך בסיר יצוק. רקמות החיבור נמסות באיטיות ויוצרות רוטב עשיר, סמיך ומבריק.",
    position: [-0.75, 0.46, 0.28], // Lower hind leg shank
    cameraTarget: [-0.75, 0.48, 0.0],
    cameraPos: [-0.60, 0.65, 1.2]
  },
  {
    number: 19,
    id: "eyeOfRound",
    nameHe: "וייסבראטן",
    aliasesHe: "ראש ירכה, לוקוס, איי אוף ראונד",
    nameEn: "Eye of Round, Eye Round Roast",
    section: "hindquarter",
    sectionHe: "חלק אחורי (מחייב ניקור)",
    fatLevel: "נמוכה מאוד (שכבת שומן חיצונית דקה)",
    fatLevelScore: 1,
    characteristics: "נתח גלילי מדוגם ויפהפה, נקי לחלוטין משומן פנימי עם שכבת שומן חיצונית דקה בצידו האחד. בשר מוצק ואחיד.",
    cookingMethods: ["בישול ארוך בנוזלים", "סו-וויד ממושך (24-48 שעות)", "קרפצ'יו / כבישה קרה"],
    popularDishes: "צלי קדירה שלם פרוס לפרוסות דקות, ברזאולה כבושה",
    chefTips: "בגלל היותו נתח כה רזה, סו-וויד ארוך ב-55°C הופך אותו לרוסטביף ורדרד ומדהים, או בישול איטי של שעות ברוטב עשיר.",
    position: [-0.88, 1.02, 0.28], // Posterior cylinder of thigh
    cameraTarget: [-0.88, 1.00, 0.0],
    cameraPos: [-0.80, 1.20, 1.2]
  }
];

export const SECTION_METADATA = {
  forequarter: {
    id: "forequarter",
    labelHe: "חלק קדמי (1-10)",
    labelEn: "Forequarter (Kosher Without Porging)",
    descHe: "החלקים 1 עד 10 נמצאים בחלקה הקדמי של הבהמה. חלק זה נחשב קל יותר להכשרה וכשר למהדרין בכל הקהילות ללא צורך בניקור גיד הנשה, שכן גיד הנשה נמצא בירך האחורית בלבד.",
    color: "#38bdf8"
  },
  hindquarter: {
    id: "hindquarter",
    labelHe: "חלק אחורי (11-19)",
    labelEn: "Hindquarter (Requires Halachic Porging / Nikkur)",
    descHe: "החלקים 11 עד 19 שייכים לחלקה האחורי של הבהמה (מותן, ירך וכסלים). לפי ההלכה (שולחן ערוך יו\"ד סימן ס\"ד וסימן ס\"ה), חובה לבצע בהם ניקור קפדני להסרת גיד הנשה ושומן החלב האסור. בישראל חלק זה משווק לרוב לאחר ניקור מומחה או מיוצא.",
    color: "#f59e0b"
  }
};
