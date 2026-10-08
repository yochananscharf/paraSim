// Real Anatomical 3D Specimen Scans from Z-Anatomy & Veterinary Collections
// Integrated directly with Masechet Chullin anatomical topics

export const ANATOMICAL_SPECIMENS = [
  {
    id: 'muscles',
    titleHe: 'מערכת השרירים והבשר (Bovine Musculature & Meat)',
    titleEn: 'Bovine Musculature & Meat Anatomy',
    organId: 'muscles',
    relatedTreifot: [15, 16, 17],
    author: 'paraSim 3D Anatomy Suite',
    descriptionHe: 'הדמיה תלת-ממדית מלאה של 124 שרירי השלד ובשר הבהמה: מבנה רקמות השריר, הגידים המקשרים אל השלד, וחלקי הבשר המותרים באכילה לאחר ניקור גיד הנשה והחלב.',
    descriptionEn: 'Full 3D anatomical visualization of the 124 bovine skeletal muscles (kosher meat): muscle fiber orientation, tendon attachments, and kosher meat cuts.'
  },
  {
    id: 'skeleton',
    titleHe: 'שלד הבקר המלא (עמוד השדרה והצלעות)',
    titleEn: 'Full Cow Skeleton (Spine & Marrow Ribs)',
    organId: 'chutHashidrah',
    relatedTreifot: [5, 14],
    sketchfabUid: '90937bedfdc742df9b00275872bf86ea',
    author: 'James.Simon',
    descriptionHe: 'סריקה תלת-ממדית מדויקת של שלד הפרה: ניתן לראות את כל 13 זוגות הצלעות (רוב צלעות), את חוליות הצוואר והגב, ותוואי חוט השדרה.',
    descriptionEn: 'Full 3D scan of bovine skeleton showing the 13 pairs of ribs (Rov Tzla\'ot threshold) and the vertebral canal housing the spinal cord (Chut HaShidrah).'
  },
  {
    id: 'rumen',
    titleHe: 'הכרס והקיבות (Bovine Rumen)',
    titleEn: 'Bovine Rumen & Gastric Complex',
    organId: 'keres',
    relatedTreifot: [11, 12, 8],
    sketchfabUid: 'ec58bb93101448349c4551c89a41429c',
    author: 'OVCanatomy (Ontario Veterinary College)',
    descriptionHe: 'סריקה אנטומית אותנטית של קיבת הפרה: הכרס (Rumen), המחיצות הפנימיות, ומקום החיבור לבית הכוסות וההמסס.',
    descriptionEn: 'Authentic veterinary scan of bovine rumen demonstrating internal sacs, cranial/caudal pillars, and junction toward reticulum and omasum.'
  },
  {
    id: 'brain',
    titleHe: 'מוח הפרה (קרומי המוח)',
    titleEn: 'Cow Brain Plastinate (Meninges)',
    organId: 'moach',
    relatedTreifot: [3],
    sketchfabUid: '266529d112c64f88a4440671e6edcaba',
    author: 'University of Zurich Vet Anatomy',
    descriptionHe: 'דגם פלסטינציה אמיתי של מוח בקר מאוניברסיטת ציריך, הממחיש את שתי שכבות הקרומים: הקרום הקשה החיצוני והקרום הפנימי הסמוך לרקמת המוח.',
    descriptionEn: 'Plastinated specimen from Univ. of Zurich Vet Anatomy illustrating bovine cerebral lobes and meningeal membranes governing the rules of Nikav Krum Shel Mo\'ach.'
  },
  {
    id: 'hindlimb',
    titleHe: 'שוק אחורי וצומת הגידים (Hindlimb Topography)',
    titleEn: 'Hindlimb Topography & Tendon Confluence',
    organId: 'tzometHagidin',
    relatedTreifot: [17],
    sketchfabUid: '9394b3242a3247eb9e6674f871c0eb98',
    author: 'University of Zurich Vet Anatomy',
    descriptionHe: 'יציקת גומי טופוגרפית של רגל אחורית המציגה את הגידים העמוקים והשטחיים במקום צומת הגידים מעל עצם העקב.',
    descriptionEn: 'Topographical rubber cast showing flexor tendons, gastrocnemius, and the exact anatomical confluence zone of Tzomet HaGidin above the hock.'
  },
  {
    id: 'sacrosciatic',
    titleHe: 'מפרק הירך והאגן (Bovine Sacro-sciatic Ligament)',
    titleEn: 'Bovine Pelvic Joint & Ligaments (Boka D\'Atma)',
    organId: 'bokaDatma',
    relatedTreifot: [16],
    sketchfabUid: '9ad83ed3658a4782b1415b23930ac1ca',
    author: 'ERC Vet Anatomy',
    descriptionHe: 'סריקת מפרק הירך ועצמות האגן של פרה, המציגה את מכתשת האגן (בית כוסות של בוקא דאטמא) והרצועות הקושרות את מפרק הירך.',
    descriptionEn: 'Acetabular joint and sacro-sciatic ligament structure where femoral head slips in cases of Boka D\'Atma dislocation.'
  },
  {
    id: 'skull',
    titleHe: 'גולגולת הבקר (Cow Skull & Horns)',
    titleEn: 'Cow Skull & Horn Structure',
    organId: 'moach',
    relatedTreifot: [3],
    sketchfabUid: '0b16f4726509473b84750e7b2298f366',
    author: 'University of Zurich Vet Anatomy',
    descriptionHe: 'סריקה בחדות גבוהה של גולגולת פרה, חלל המוח (Cranial Cavity) ומבנה הלסת והקרניים.',
    descriptionEn: 'High-resolution photogrammetry scan of bovine cranium displaying the brain vault and mandibular articulation.'
  },
  {
    id: 'holstein',
    titleHe: 'דגם הפרה השלם (Holstein Cow External Topography)',
    titleEn: 'Realistic Holstein Cow (External Topography)',
    organId: 'veshet',
    relatedTreifot: [1, 2, 13, 15],
    sketchfabUid: '0bd2f1c0c79a4b5b9d36e67f0f700c5e',
    author: 'Hdjusj / Z-Anatomy Bovide',
    descriptionHe: 'דגם גוף פרה מלא בפורפורציות ביולוגיות מדויקות, המשמש כבסיס לטופוגרפיה של השחיטה, מכות טורף ונפילה.',
    descriptionEn: 'Full Holstein cow model with accurate anatomical proportions, framing external body reference points for Shechita zones and predator trauma.'
  }
];
