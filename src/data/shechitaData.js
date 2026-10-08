// Masechet Chullin 12a - 18b: Hilchot Shechita Data
// Based on Talmud Bavli Chullin, Steinsaltz Edition, and Shulchan Aruch Yoreh De'ah 1-28

export const SHECHITA_SIMANIM = {
  kaneh: {
    id: 'kaneh',
    nameHe: 'קנה (גרגרת - Trachea)',
    nameEn: 'Trachea (Kaneh / Windpipe)',
    requirementHe: 'שחיטת רוב הקנה בבהמה ובעוף. בבהמה חובה לשחוט רוב שני הסימנים.',
    requirementEn: 'Severing the majority (Rov) of the trachea. In cattle, majority of both simanim must be severed.',
    boundariesHe: 'מלמעלה: מטבעת הגדולה (סחוס הקריקואיד) ולמטה. שיפוי כובע פסול (הגרמה). מלמטה: עד כנפי הריאה (שיבולת של ריאה).',
    boundariesEn: 'Superior boundary: From the large cricoid ring (Taba\'at HaGedolah) downwards. Cutting above is Hagramah. Inferior boundary: Down to the bronchial branching of the lungs (Shiboleth Shel Re\'ah).',
    talmudDaf: 'חולין י"ח ע"ב - י"ט ע"א',
    shulchanAruch: 'יו"ד סימן ל"ד סעיף א\'-ג\''
  },
  veshet: {
    id: 'veshet',
    nameHe: 'ושט (תורבץ הוושט - Esophagus)',
    nameEn: 'Esophagus (Veshet / Gullet)',
    requirementHe: 'שחיטת רוב הוושט (מורכב משני עורות: שרירי אדום ורירי לבן).',
    requirementEn: 'Severing the majority (Rov) of the esophagus (consists of outer muscular and inner mucosal layers).',
    boundariesHe: 'מלמעלה: מתורבץ הוושט (מקום שמתרחב בבולעו ומתכווץ בנמתח). מלמטה: עד מקום שמכריס (חיבור לכרס/דופן החזה).',
    boundariesEn: 'Superior boundary: From Torbet HaVeshet (the pharyngeal boundary that widens when swallowing and narrows when stretched). Inferior boundary: Where it reaches the rumen entrance.',
    talmudDaf: 'חולין י"ח ע"א - י"ח ע"ב',
    shulchanAruch: 'יו"ד סימן ל"ג סעיף א\'-ד\''
  }
};

export const CHAMESH_HALACHOT = [
  {
    id: 'shehiyah',
    nameHe: 'שהייה (Pausing)',
    nameEn: 'Shehiyah (Delay / Interruption)',
    summaryHe: 'הפסקת פעולת החיתוך באמצע השחיטה ללא תנועת חיתוך רציפה.',
    summaryEn: 'Pausing or interrupting the cutting stroke midway through the slaughter.',
    measureHe: 'בבהמה: שיעור כדי שירביצנה וישחטנה, או שיגביהנה וירביצנה וישחטנה (בכדי שחיטת בהמה אחרת).',
    measureEn: 'In cattle: The duration needed to lay down another animal and slaughter it.',
    status: 'פסול דאורייתא - נבלה',
    shulchanAruch: 'יו"ד סימן כ"ג'
  },
  {
    id: 'drasah',
    nameHe: 'דרסה (Pressing)',
    nameEn: 'Drasah (Downward Chopping)',
    summaryHe: 'חיתוך בלחיצה או כתישה כלפי מטה (כמו גרזן) במקום הולכה והובאה של הסכין.',
    summaryEn: 'Pressing downwards like a chopper or cleaver instead of slicing back and forth.',
    measureHe: 'אפילו בחלק מן השחיטה, אם לחץ בלא הולכה והובאה הסחיטה פסולה.',
    measureEn: 'Even if only a portion of the cut was pressed downwards without drawing the blade.',
    status: 'פסול דאורייתא - נבלה',
    shulchanAruch: 'יו"ד סימן כ"ד'
  },
  {
    id: 'chaladah',
    nameHe: 'חלדה (Concealment)',
    nameEn: 'Chaladah (Covering the Blade)',
    summaryHe: 'כיסוי או הטמנת להב הסכין מתחת לעור, בין הסימנים, או בתוך צמר ושיער בזמן השחיטה.',
    summaryEn: 'Concealing or burying the blade under the hide, between the simanim, or within dense wool during the cut.',
    measureHe: 'אם נתכסה הלהב מעין רואה בעת חיתוך הסימנים.',
    measureEn: 'If the cutting edge is hidden from sight while cutting the trachea or esophagus.',
    status: 'פסול דאורייתא - נבלה',
    shulchanAruch: 'יו"ד סימן כ"ד'
  },
  {
    id: 'hagramah',
    nameHe: 'הגרמה (Slanting / Out of Bounds)',
    nameEn: 'Hagramah (Cutting Outside Kosher Zone)',
    summaryHe: 'נטיית החיתוך מעבר לתחומי השחיטה הכשרים בצוואר (למעלה או למטה).',
    summaryEn: 'Slanting the cut outside the kosher anatomical boundaries on the neck.',
    measureHe: 'בקנה: למעלה מטבעת הגדולה (שיפוי כובע). בוושט: למעלה מתורבץ הוושט או בבית הבליעה.',
    measureEn: 'In trachea: Above the large cricoid ring. In esophagus: Above Torbet HaVeshet.',
    status: 'פסול דאורייתא - נבלה',
    shulchanAruch: 'יו"ד סימן כ\''
  },
  {
    id: 'ikkur',
    nameHe: 'עיקור (Tearing / Dislodging)',
    nameEn: 'Ikkur (Tearing Simanim from Roots)',
    summaryHe: 'תלישת או עקירת הקנה או הוושט מחיבורם בלחי או בבית החזה קודם שנשחטו כדין.',
    summaryEn: 'Dislodging or tearing the simanim from their anatomical attachments prior to complete cutting.',
    measureHe: 'אם נעקר אחד הסימנים משרשו או נפסק מחיבורו קודם שחיטה.',
    measureEn: 'If either siman is pulled out or detached from its cranial or thoracic anchor before the cut.',
    status: 'פסול דאורייתא - נבלה',
    shulchanAruch: 'יו"ד סימן כ"ד'
  }
];

export const BEDIKAT_HASAKIN = {
  dafReference: 'חולין י"ז ע"ב - י"ח ע"א',
  descriptionHe: 'בדיקת סכין השחיטה ב-12 כיוונים ובדיקות: על הבשר (כנגד הוושט הרך) ועל הציפורן (כנגד הקנה הקשה), בשלוש רוחות הסכין (חוד, דופן ימין, דופן שמאל) בהולכה והובאה.',
  descriptionEn: 'Inspection of the slaughter knife across 12 test vectors: On flesh (simulating soft esophagus) and on fingernail (simulating rigid trachea), testing 3 surfaces (cutting edge, right bevel, left bevel) back and forth.',
  tests: [
    { id: 'nail_edge_forward', surfaceHe: 'חוד הסכין (הולכה)', surfaceEn: 'Cutting Edge (Forward)', substrate: 'nail' },
    { id: 'nail_edge_back', surfaceHe: 'חוד הסכין (הובאה)', surfaceEn: 'Cutting Edge (Backward)', substrate: 'nail' },
    { id: 'nail_right_forward', surfaceHe: 'דופן ימין (הולכה)', surfaceEn: 'Right Bevel (Forward)', substrate: 'nail' },
    { id: 'nail_right_back', surfaceHe: 'דופן ימין (הובאה)', surfaceEn: 'Right Bevel (Backward)', substrate: 'nail' },
    { id: 'nail_left_forward', surfaceHe: 'דופן שמאל (הולכה)', surfaceEn: 'Left Bevel (Forward)', substrate: 'nail' },
    { id: 'nail_left_back', surfaceHe: 'דופן שמאל (הובאה)', surfaceEn: 'Left Bevel (Backward)', substrate: 'nail' },
    { id: 'flesh_edge_forward', surfaceHe: 'חוד על בשר (הולכה)', surfaceEn: 'Cutting Edge on Flesh (Forward)', substrate: 'flesh' },
    { id: 'flesh_edge_back', surfaceHe: 'חוד על בשר (הובאה)', surfaceEn: 'Cutting Edge on Flesh (Backward)', substrate: 'flesh' },
    { id: 'flesh_right_forward', surfaceHe: 'דופן ימין על בשר (הולכה)', surfaceEn: 'Right Bevel on Flesh (Forward)', substrate: 'flesh' },
    { id: 'flesh_right_back', surfaceHe: 'דופן ימין על בשר (הובאה)', surfaceEn: 'Right Bevel on Flesh (Backward)', substrate: 'flesh' },
    { id: 'flesh_left_forward', surfaceHe: 'דופן שמאל על בשר (הולכה)', surfaceEn: 'Left Bevel on Flesh (Forward)', substrate: 'flesh' },
    { id: 'flesh_left_back', surfaceHe: 'דופן שמאל על בשר (הובאה)', surfaceEn: 'Left Bevel on Flesh (Backward)', substrate: 'flesh' }
  ]
};
