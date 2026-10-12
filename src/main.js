import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createBovineAnatomyScene } from './scene/cowModel.js';
import { CameraController } from './utils/cameraController.js';
import { TreifahVisualizer } from './scene/treifahVisualizer.js';
import { ShechitaZoneVisualizer } from './scene/shechitaVisualizer.js';
import { sound } from './utils/audio.js';
import { ORGANS, ORGAN_SYSTEMS } from './data/organData.js';
import { TREIFOT_18 } from './data/treifotData.js';
import { ANATOMICAL_SPECIMENS } from './data/specimensData.js';
import { SHECHITA_SIMANIM, CHAMESH_HALACHOT, BEDIKAT_HASAKIN } from './data/shechitaData.js';
import { SketchfabController } from './scene/sketchfabController.js';
import { BEEF_CUTS, SECTION_METADATA } from './data/beefCutsData.js';
import { BeefCutsVisualizer } from './scene/beefCutsVisualizer.js';
import { fetchAndLoadSecureGltf } from './utils/modelDecryptor.js';

// Application State
const state = {
  lang: 'he', // 'he' | 'en'
  activeMode: 'explore', // 'explore' | 'shechita' | 'treifot' | 'bedikah' | 'specimens' | 'beef-cuts'
  activeSpecimen: 'solid_cow', // 'solid_cow' | 'blender_cow' | 'skeleton' | 'digestive' | 'vessels' | 'shechita' | 'uon_anatomy'
  skinMode: 'solid', // 'solid' | 'muscle' | 'xray' | 'none'
  isBeefCutsActive: false,
  selectedBeefCutId: 'entrecote',
  beefCutsFilter: 'all',
  beefCutsSearch: '',
  selectedOrganId: null,
  selectedSimanId: 'kaneh',
  isShechitaZoneActive: true,
  isShechitaLabelsActive: true,
  activeTreifahId: null,
  isTreifahDefectActive: true,
  autoRotate: false,
  explodeFactor: 0,
  isSlicingActive: false,
  sliceAxis: 'z',
  sliceOffset: 0.5,
  quizCurrentIndex: 0,
  quizScore: { correct: 0, total: 0 }
};

// UI Translations
const TRANSLATIONS = {
  he: {
    tagline: "אטלס תלת-ממדי לאנטומיית הבקר, הלכות שחיטה וי\"ח טרפות • מסכת חולין ויו\"ד",
    modeExplore: "חקר תלת-ממד",
    modeShechita: "הלכות שחיטה (י\"ב-י\"ח)",
    modeTreifot: "י\"ח טרפות (חולין ג')",
    modeBedikah: "סימולטור בדיקה",
    modeSpecimens: "סריקות Z-Anatomy",
    shechitaTitle: "הלכות שחיטה וסימנים (חולין י\"ב-י\"ח)",
    systemsLayers: "מערכות איברים",
    cowAppearance: "מראה הפרה",
    skinSolid: "פרה מלאה",
    skinXray: "רנטגן שקוף",
    skinNone: "איברים בלבד",
    sysBody: "גוף חיצוני (X-Ray)",
    sysSkeletal: "שלד וצלעות",
    sysRespiratory: "קנה וריאה (אונות)",
    sysDigestive: "4 הקיבות והמעיים",
    sysVital: "לב, כבד, מרה וטחול",
    sysNervous: "מוח וחוט השדרה",
    sysLimbs: "צומת הגידים והירך",
    viewAngles: "מנחי צפייה",
    resetCam: "איפוס מבט",
    autoRotate: "סיבוב אוטומטי",
    bodyOpacity: "שקיפות גוף",
    explodeView: "פירוק איברים (Dissect)",
    sectionSlicing: "חיתוך חללים פנימיים (Section)",
    sliceToggle: "הפעל חיתוך",
    importModel: "טעינת מודל חיצוני",
    importBtn: "טען GLB / GLTF",
    viewportHint: "לחץ על איבר למיקוד והלכות • גרור לסיבוב • גלגל לזום",
    selectOrganPrompt: "לחץ על כל איבר במודל התלת-ממדי (ריאות, 4 קיבות, קנה, ושט, מוח, צלעות) או בחר מתוך י\"ח הטרפות.",
    talmudTerm: "מונח תלמודי",
    halachicRule: "עיקרי ההלכה (שולחן ערוך)",
    relatedTreifot: "טרפות רלוונטיות לאיבר זה",
    focusOrgan: "התמקד באיבר זה",
    treifotCatalogTitle: "י\"ח טרפות (חולין מ\"ב ע\"א)",
    searchTreifot: "חיפוש טרפה או איבר...",
    visualizeStatus: "המחשה תלת-ממדית:",
    stateKosher: "כשרה",
    stateTreifah: "טרפה (הצג מום)",
    bedikahSimTitle: "סימולטור בדיקת כשרות",
    nextScenario: "תרחיש הבא ❯",
    specimensTitle: "סריקות אנטומיות אותנטיות",
    specimensIntro: "סריקות תלת-ממדיות אמיתיות מאוסף Z-Anatomy Bovide ומוזיאוני האנטומיה הווטרינרית בציריך ואונטריו:",
    specimenSolidCow: "פרה חיה (עור מלא)",
    specimenMuscles: "שרירים ובשר (Meat)",
    specimenBlender: "אנטומיה פנימית (רנטגן X-Ray)",
    specimenSkeleton: "שלד וי\"ג צלעות",
    specimenDigestive: "4 הקיבות והמעיים",
    specimenVessels: "מערכת כלי הדם",
    specimenZAnatomy: "מודל Z-Anatomy (GLB)",
    specimenHolstein: "פרה שלמה",
    specimenHindlimb: "צומת הגידים",
    specimenShechita: "מקום השחיטה (קנה וושט)",
    specimenRumen: "4 הקיבות (כרס)",
    sysMuscles: "שרירים ובשר (Meat)",
  },
  en: {
    tagline: "3D Bovine Anatomy, Shechita & 18 Treifot Atlas • Tractate Chullin & Yoreh De'ah",
    modeExplore: "3D Explorer",
    modeShechita: "Hilchot Shechita (12a-18b)",
    modeTreifot: "18 Treifot Catalog",
    modeBedikah: "Bedikah Simulator",
    modeSpecimens: "Z-Anatomy Scans",
    shechitaTitle: "Laws of Shechita & Simanim (Chullin 12a-18b)",
    systemsLayers: "Organ Systems",
    cowAppearance: "Cow Appearance",
    skinSolid: "Solid Cow",
    skinXray: "X-Ray Cow",
    skinNone: "Organs Only",
    sysBody: "External Body (X-Ray)",
    sysMuscles: "Muscles & Meat",
    sysSkeletal: "Skeletal & Ribs",
    sysRespiratory: "Trachea & Lungs",
    sysDigestive: "4 Stomachs & Intestines",
    sysVital: "Heart, Liver, Bile, Spleen",
    sysNervous: "Brain & Spinal Cord",
    sysLimbs: "Tendons & Hip Joint",
    viewAngles: "Anatomical Views",
    resetCam: "Reset View",
    autoRotate: "Auto Rotate",
    bodyOpacity: "Body Opacity",
    explodeView: "Dissect / Explode Organs",
    sectionSlicing: "Internal Cross-Section",
    sliceToggle: "Toggle Section",
    importModel: "Import External Model",
    importBtn: "Load GLB / GLTF",
    viewportHint: "Click an organ to inspect • Drag to rotate • Scroll to zoom",
    selectOrganPrompt: "Click any 3D organ (lungs, 4 stomachs, trachea, esophagus, brain, ribs) or pick from the 18 Treifot catalog.",
    talmudTerm: "Talmudic Term",
    halachicRule: "Halachic Rules (Shulchan Aruch)",
    relatedTreifot: "Related Treifot For This Organ",
    focusOrgan: "Focus On This Organ",
    treifotCatalogTitle: "The 18 Treifot (Chullin 42a)",
    searchTreifot: "Search Treifah or organ...",
    visualizeStatus: "3D Visualization:",
    stateKosher: "Kosher",
    stateTreifah: "Treifah (Show Defect)",
    bedikahSimTitle: "Halachic Bedikah Simulator",
    nextScenario: "Next Scenario ❯",
    specimensTitle: "Authentic Specimen Scans",
    specimensIntro: "Authentic 3D veterinary photogrammetry scans from Z-Anatomy Bovide & Univ. of Zurich Vet Anatomy:",
    specimenSolidCow: "Living Cow (Full Skin)",
    specimenMuscles: "Muscles & Meat",
    specimenBlender: "Internal Anatomy (X-Ray)",
    specimenSkeleton: "Skeleton & 13 Ribs",
    specimenDigestive: "4 Stomachs & Viscera",
    specimenVessels: "Vascular System",
    specimenZAnatomy: "Z-Anatomy 3D (GLB)",
    specimenHolstein: "Full Holstein Cow",
    specimenHindlimb: "Tendon Nexus (Hock)",
    specimenShechita: "Shechita Zone (Trachea & Esophagus)",
    specimenRumen: "4 Stomachs (Rumen)",
  }
};



// -------------------------------------------------------------
// THREE.JS SETUP
// -------------------------------------------------------------
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x090d16, 0.12);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 50);
camera.position.set(2.6, 2.0, 3.2);

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  powerPreference: 'high-performance'
});
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;
renderer.localClippingEnabled = true;

// Slicing Clipping Plane
const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), 10.0);

// Lighting setup: balanced for sculpted 3D anatomical relief
const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambientLight);

const dirLight1 = new THREE.DirectionalLight(0xfffaf0, 2.2);
dirLight1.position.set(4, 6, 4);
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 1.2);
dirLight2.position.set(-4, -2, -4);
scene.add(dirLight2);

const rimLight = new THREE.PointLight(0xa855f7, 2.0, 10);
rimLight.position.set(0, 3, -3);
scene.add(rimLight);

// Build Anatomy Scene (Data and structures preserved; crude procedural model is completely hidden)
const { root, groups, organMeshes, materials } = createBovineAnatomyScene();
root.visible = false;
root.traverse((child) => { child.visible = false; });
organMeshes.forEach((mesh) => { mesh.visible = false; });

// Apply clipping plane to materials
Object.values(materials).forEach((mat) => {
  mat.clippingPlanes = [clippingPlane];
  mat.clipShadows = true;
});

// Group for imported custom 3D models (e.g. from Blender / Z-Anatomy)
const importedModelGroup = new THREE.Group();
importedModelGroup.name = 'imported_3d_models';
scene.add(importedModelGroup);

// Dedicated Group for the high-definition Bovine Musculature 3D model (Meshy AI Image-to-3D)
const muscleModelGroup = new THREE.Group();
muscleModelGroup.name = 'muscle_anatomy_model';
muscleModelGroup.visible = false;
scene.add(muscleModelGroup);

let isMuscleModelLoading = false;
let isMuscleModelLoaded = false;

// Texture loader & cache for the converted Blender model
const textureLoader = new THREE.TextureLoader();
const textureCache = new Map();
function getCowTexture(num) {
  const str = String(num);
  if (!textureCache.has(str)) {
    const tex = textureLoader.load(`/models/cow/textures/${str}.jpg`);
    tex.colorSpace = THREE.SRGBColorSpace;
    textureCache.set(str, tex);
  }
  return textureCache.get(str);
}

// High-fidelity procedural shader materials for bovine anatomy
function createMuscleShaderMaterial(clipPlane) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0x8e1a1a,
    roughness: 0.38,
    metalness: 0.04,
    side: THREE.DoubleSide,
    clippingPlanes: clipPlane ? [clipPlane] : [],
    clipShadows: true
  });
  mat.customProgramCacheKey = () => 'bovineMuscleStriatedShader_v2';
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vAnatomyPos;
      `
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vAnatomyPos = position;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vAnatomyPos;

      float muscleNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 157.0 + 113.0 * i.z;
        return mix(
          mix(mix(fract(sin(n + 0.0) * 43758.5453), fract(sin(n + 1.0) * 43758.5453), f.x),
              mix(fract(sin(n + 157.0) * 43758.5453), fract(sin(n + 158.0) * 43758.5453), f.x), f.y),
          mix(mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
              mix(fract(sin(n + 270.0) * 43758.5453), fract(sin(n + 271.0) * 43758.5453), f.x), f.y), f.z);
      }
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `
      #include <color_fragment>
      vec3 mPos = vAnatomyPos * 0.45;
      float fiberNoise1 = muscleNoise(vec3(mPos.x * 2.5, mPos.y * 35.0, mPos.z * 35.0));
      float fiberNoise2 = muscleNoise(vec3(mPos.x * 5.0, mPos.y * 70.0, mPos.z * 70.0));
      float fiberWave = sin(mPos.x * 8.0 + mPos.y * 32.0 + mPos.z * 24.0);
      float striations = 0.5 * fiberNoise1 + 0.3 * fiberNoise2 + 0.2 * (fiberWave * 0.5 + 0.5);

      vec3 deepMeat = vec3(0.50, 0.07, 0.07);
      vec3 richMeat = vec3(0.74, 0.14, 0.14);
      vec3 brightMeat = vec3(0.86, 0.22, 0.20);
      vec3 fasciaWhite = vec3(0.92, 0.88, 0.82);

      vec3 meatColor = mix(deepMeat, richMeat, smoothstep(0.2, 0.7, striations));
      meatColor = mix(meatColor, brightMeat, smoothstep(0.7, 0.95, striations) * 0.6);
      float fasciaStreak = smoothstep(0.88, 0.96, muscleNoise(vec3(mPos.x * 1.2, mPos.y * 18.0, mPos.z * 18.0)));
      meatColor = mix(meatColor, fasciaWhite, fasciaStreak * 0.65);

      diffuseColor.rgb = meatColor;
      `
    );
  };
  return mat;
}

function createTendonShaderMaterial(clipPlane) {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xede6d8,
    roughness: 0.28,
    metalness: 0.05,
    side: THREE.DoubleSide,
    clippingPlanes: clipPlane ? [clipPlane] : [],
    clipShadows: true
  });
  mat.customProgramCacheKey = () => 'bovineTendonShader_v2';
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vAnatomyPos;
      `
    );
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      vAnatomyPos = position;
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <common>',
      `
      #include <common>
      varying vec3 vAnatomyPos;

      float tendonNoise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float n = i.x + i.y * 157.0 + 113.0 * i.z;
        return mix(
          mix(mix(fract(sin(n + 0.0) * 43758.5453), fract(sin(n + 1.0) * 43758.5453), f.x),
              mix(fract(sin(n + 157.0) * 43758.5453), fract(sin(n + 158.0) * 43758.5453), f.x), f.y),
          mix(mix(fract(sin(n + 113.0) * 43758.5453), fract(sin(n + 114.0) * 43758.5453), f.x),
              mix(fract(sin(n + 270.0) * 43758.5453), fract(sin(n + 271.0) * 43758.5453), f.x), f.y), f.z);
      }
      `
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <color_fragment>',
      `
      #include <color_fragment>
      vec3 p = vAnatomyPos * 0.5;
      float n = tendonNoise(vec3(p.x * 2.0, p.y * 25.0, p.z * 25.0));
      vec3 whiteCol = vec3(0.95, 0.93, 0.89);
      vec3 creamCol = vec3(0.86, 0.81, 0.74);
      vec3 fleshTint = vec3(0.78, 0.52, 0.50);

      vec3 tendColor = mix(creamCol, whiteCol, n);
      float edgeTint = smoothstep(0.1, 0.3, tendonNoise(p * 1.5));
      tendColor = mix(tendColor, fleshTint, (1.0 - edgeTint) * 0.25);

      diffuseColor.rgb = tendColor;
      `
    );
  };
  return mat;
}

// Materials for the converted Blender bovine model
const importedMaterials = {
  skinSolid: new THREE.MeshStandardMaterial({
    map: getCowTexture('20017'),
    normalMap: getCowTexture('20018'),
    roughnessMap: getCowTexture('20019'),
    roughness: 0.7,
    metalness: 0.05,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  }),
  skinXray: new THREE.MeshPhysicalMaterial({
    map: getCowTexture('20017'),
    normalMap: getCowTexture('20018'),
    color: 0x93c5fd,
    transparent: true,
    opacity: 0.22,
    roughness: 0.35,
    metalness: 0.05,
    transmission: 0.6,
    depthWrite: false,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  }),
  bone: new THREE.MeshStandardMaterial({
    color: 0xf0e9db,
    roughness: 0.42,
    metalness: 0.04,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  }),
  vein: new THREE.MeshStandardMaterial({
    color: 0x1d4ed8,
    roughness: 0.28,
    metalness: 0.08,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  }),
  artery: new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    roughness: 0.28,
    metalness: 0.08,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  }),
  muscle: createMuscleShaderMaterial(clippingPlane),
  tendon: createTendonShaderMaterial(clippingPlane),
  esophagus: new THREE.MeshStandardMaterial({
    color: 0xc24128,
    roughness: 0.38,
    metalness: 0.05,
    side: THREE.DoubleSide,
    clippingPlanes: [clippingPlane],
    clipShadows: true
  })
};

// Anatomical systems tracking for imported Blender model
const importedSystems = {
  silhouette: [],
  muscles: [],
  skeletal: [],
  respiratory: [],
  vessels: [],
  digestive: [],
  vital: [],
  nervous: [],
  limbs: [],
  shechita: [],
  allMeshes: []
};

// Sketchfab 3D Specimen API Controller (enables programmatic explode, isolation, and 3D organ clicks)
const sketchfabController = new SketchfabController('primary-specimen-iframe');

// Controls & Visualizers
const cameraController = new CameraController(camera, canvas);
const treifahVisualizer = new TreifahVisualizer(scene, organMeshes);
const shechitaVisualizer = new ShechitaZoneVisualizer(scene);
const beefCutsVisualizer = new BeefCutsVisualizer(scene, camera, {
  onSelectCut: (cut) => selectBeefCut(cut.id)
});

// Raycasting
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const hoverBadge = document.getElementById('organ-hover-badge');
let hoveredOrgan = null;

// -------------------------------------------------------------
// COW SKIN APPEARANCE MODES
// -------------------------------------------------------------
function setSkinMode(mode) {
  state.skinMode = mode;
  const btnSkinSolid = document.getElementById('btn-skin-solid');
  const btnSkinMuscle = document.getElementById('btn-skin-muscle');
  const btnSkinXray = document.getElementById('btn-skin-xray');
  const btnSkinNone = document.getElementById('btn-skin-none');
  if (btnSkinSolid) {
    [btnSkinSolid, btnSkinMuscle, btnSkinXray, btnSkinNone].forEach(b => {
      if (b) b.classList.remove('active');
    });
  }

  // Update procedural silhouette if present
  const sil = groups.silhouette;
  if (sil && sil.userData && sil.userData.solidGroup) {
    if (mode === 'solid') {
      sil.visible = true;
      sil.userData.solidGroup.visible = true;
      sil.userData.glassGroup.visible = false;
      sil.userData.wireframeOverlay.visible = false;
    } else if (mode === 'xray') {
      sil.visible = true;
      sil.userData.solidGroup.visible = false;
      sil.userData.glassGroup.visible = true;
      sil.userData.wireframeOverlay.visible = true;
    } else if (mode === 'none' || mode === 'muscle') {
      sil.visible = false;
    }
  }

  // Update imported Blender model skin & internal organ visibilities
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    if (mode === 'solid') {
      importedSystems.silhouette.forEach(mesh => {
        mesh.visible = true;
        mesh.material = importedMaterials.skinSolid;
        mesh.userData.organId = 'solidCow';
        mesh.userData.labelHe = 'גוף הפרה (עור הולשטיין)';
        mesh.userData.labelEn = 'Cow Body (Holstein Skin)';
      });
      // Hide internal organs so no bones or vessels poke through the solid cow hide
      ['muscles', 'skeletal', 'vessels', 'digestive', 'vital'].forEach(sys => {
        if (importedSystems[sys]) importedSystems[sys].forEach(m => m.visible = false);
      });
      if (muscleModelGroup) muscleModelGroup.visible = false;
      // Clear defect visualizer in solid mode
      treifahVisualizer.clear();
    } else if (mode === 'muscle') {
      // Full anatomical muscular cow (Meat / בשר הבהמה - HD Meshy 3D Model)
      // Hide outer skin envelope
      importedSystems.silhouette.forEach(mesh => {
        mesh.visible = false;
      });
      // Hide internal visceral and digestive organs so musculature is clean and uncluttered
      ['muscles', 'skeletal', 'vessels', 'respiratory', 'shechita', 'digestive', 'vital'].forEach(sys => {
        if (importedSystems[sys]) importedSystems[sys].forEach(m => m.visible = false);
      });
      if (shechitaVisualizer) shechitaVisualizer.setVisible(false);

      // Show interactive Supermarket Beef Cuts banner in Muscle View
      const beefCutsBanner = document.getElementById('muscle-beef-cuts-banner');
      if (beefCutsBanner) beefCutsBanner.classList.remove('hidden');

      // Load & display the high-definition 3D muscle anatomy model
      loadMuscleModel((group) => {
        if (state.skinMode === 'muscle') {
          group.visible = true;
        }
      });
      if (isMuscleModelLoaded && muscleModelGroup) {
        muscleModelGroup.visible = true;
      }

      // Synchronize system toggles in toolbar
      document.querySelectorAll('.sys-btn').forEach(btn => {
        const sys = btn.dataset.system;
        btn.classList.toggle('active', sys === 'muscles');
      });
      treifahVisualizer.clear();
    } else {
      // Hide beef cuts banner & 3D markers when leaving muscle view
      const beefCutsBanner = document.getElementById('muscle-beef-cuts-banner');
      if (beefCutsBanner) beefCutsBanner.classList.add('hidden');
      if (beefCutsVisualizer) beefCutsVisualizer.setVisible(false);
      state.isBeefCutsActive = false;
      const bannerBtn = document.getElementById('btn-toggle-beef-cuts');
      if (bannerBtn) bannerBtn.classList.remove('active');

      if (mode === 'xray') {
        if (muscleModelGroup) muscleModelGroup.visible = false;
        importedSystems.silhouette.forEach(mesh => {
          mesh.visible = true;
          mesh.material = importedMaterials.skinXray;
          mesh.userData.organId = 'cowXray';
          mesh.userData.labelHe = 'גוף חיצוני (רנטגן X-Ray)';
          mesh.userData.labelEn = 'Outer Body (X-Ray)';
        });
        // Show internal organs through the translucent X-Ray skin
        ['muscles', 'skeletal', 'vessels', 'respiratory', 'shechita', 'digestive', 'vital'].forEach(sys => {
          if (importedSystems[sys]) importedSystems[sys].forEach(m => m.visible = true);
        });
      } else if (mode === 'none') {
        if (muscleModelGroup) muscleModelGroup.visible = false;
        importedSystems.silhouette.forEach(mesh => {
          mesh.visible = false;
        });
        // Show internal organs only
        ['muscles', 'skeletal', 'vessels', 'respiratory', 'shechita', 'digestive', 'vital'].forEach(sys => {
          if (importedSystems[sys]) importedSystems[sys].forEach(m => m.visible = true);
        });
      }
    }
  }

  if (mode === 'solid' && btnSkinSolid) btnSkinSolid.classList.add('active');
  if (mode === 'muscle' && btnSkinMuscle) btnSkinMuscle.classList.add('active');
  if (mode === 'xray' && btnSkinXray) btnSkinXray.classList.add('active');
  if (mode === 'none' && btnSkinNone) btnSkinNone.classList.add('active');

  // Synchronize specimen quick bar buttons
  const pillSolid = document.querySelector('.specimen-pill[data-specimen="solid_cow"]');
  const pillMuscles = document.querySelector('.specimen-pill[data-specimen="muscles"]');
  const pillBlender = document.querySelector('.specimen-pill[data-specimen="blender_cow"]');
  if (pillSolid && pillBlender) {
    pillSolid.classList.toggle('active', mode === 'solid');
    if (pillMuscles) pillMuscles.classList.toggle('active', mode === 'muscle');
    pillBlender.classList.toggle('active', mode === 'xray');
  }
}

// -------------------------------------------------------------
// AUTHENTIC 3D SPECIMEN VIEWER (Z-ANATOMY & VET ANATOMY)
// -------------------------------------------------------------
const SPECIMEN_CONFIGS = {
  holstein: {
    uid: '0bd2f1c0c79a4b5b9d36e67f0f700c5e',
    title: 'Realistic Holstein Cow (External Topography)'
  },
  skeleton: {
    uid: '90937bedfdc742df9b00275872bf86ea',
    title: 'Full Cow Skeleton (Spine & 13 Ribs)'
  },
  hindlimb: {
    uid: '9394b3242a3247eb9e6674f871c0eb98',
    title: 'Hindlimb & Tendon Nexus (Tzomet HaGidin)'
  }
};

function activateWebGLMode() {
  const specimenContainer = document.getElementById('specimen-primary-container');
  const canvasEl = document.getElementById('webgl-canvas');
  const toolbar = document.querySelector('.floating-toolbar');

  if (specimenContainer) specimenContainer.classList.add('hidden');
  if (canvasEl) canvasEl.classList.remove('hidden');
  if (toolbar) toolbar.classList.remove('hidden');
  onWindowResize();
}

function focusShechitaZone(simanKey = state.selectedSimanId) {
  setSkinMode('xray');
  if (groups.respiratory) groups.respiratory.visible = true;
  if (groups.digestive) groups.digestive.visible = true;
  if (importedSystems.respiratory) importedSystems.respiratory.forEach(m => m.visible = true);
  if (importedSystems.shechita) importedSystems.shechita.forEach(m => m.visible = true);
  if (importedSystems.digestive) importedSystems.digestive.forEach(m => m.visible = true);
  if (importedSystems.vessels) importedSystems.vessels.forEach(m => m.visible = true);
  // Hide neck muscles in shechita mode so the two simanim (kaneh & veshet) are clearly visible
  if (importedSystems.muscles) importedSystems.muscles.forEach(m => m.visible = false);

  document.querySelector('.sys-btn[data-system="respiratory"]')?.classList.add('active');
  document.querySelector('.sys-btn[data-system="digestive"]')?.classList.add('active');
  document.querySelector('.sys-btn[data-system="muscles"]')?.classList.remove('active');

  // In bovine anatomy, the trachea (קנה) is ventral and the esophagus (ושט) runs on the LEFT side (-Z)
  // Position camera on the left (-Z) side when viewing Veshet, and right (+Z) side for Kaneh
  const isVeshet = simanKey === 'veshet';
  const neckTarget = new THREE.Vector3(0.58, 1.09, isVeshet ? -0.035 : 0.01);
  const neckPos = isVeshet
    ? new THREE.Vector3(0.92, 1.22, -0.65)
    : new THREE.Vector3(0.92, 1.22, 0.65);

  cameraController.moveTo(neckPos, neckTarget, 0.8);

  // Show Shechita halachic boundaries visualization ONLY when in Shechita mode / tab
  const isShechitaView = state.activeMode === 'shechita' || state.activeSpecimen === 'shechita';
  if (shechitaVisualizer) {
    shechitaVisualizer.setVisible(isShechitaView && (state.isShechitaZoneActive ?? true));
  }

  // Highlight selected siman
  highlightOrganMesh(simanKey || 'kaneh');
}

function switchPrimarySpecimen(specimenKey) {
  state.activeSpecimen = specimenKey;

  // Ensure Shechita boundary markers are hidden in all other specimen modes
  if (specimenKey !== 'shechita' && shechitaVisualizer) {
    shechitaVisualizer.setVisible(false);
  }

  // Update pill buttons active state and ensure visible in ribbon
  document.querySelectorAll('.specimen-pill').forEach((pill) => {
    const isActive = pill.dataset.specimen === specimenKey;
    pill.classList.toggle('active', isActive);
    if (isActive) {
      pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  });

  if (specimenKey === 'beef_cuts') {
    switchPrimarySpecimen('muscles');
    toggleBeefCutsExperience(true);
    return;
  }

  // Deactivate beef cuts 3D visualizer if switching to non-muscle specimen
  if (specimenKey !== 'beef_cuts' && specimenKey !== 'muscles' && state.isBeefCutsActive) {
    toggleBeefCutsExperience(false);
  }

  if (specimenKey === 'solid_cow') {
    setMode('explore');
    // Ensure all systems of imported Blender model are visible, with solid realistic skin
    Object.keys(importedSystems).forEach(k => {
      if (k !== 'allMeshes') importedSystems[k].forEach(m => m.visible = true);
    });
    setSkinMode('solid');
    document.querySelectorAll('.sys-btn').forEach(btn => btn.classList.add('active'));
    cameraController.reset();
  } else if (specimenKey === 'muscles') {
    setMode('explore');
    activateWebGLMode();
    // Display full bovine musculoskeletal anatomy (meat / בשר הבהמה, matching reference render)
    setSkinMode('muscle');
    selectOrgan('muscles');
    cameraController.reset();
  } else if (specimenKey === 'blender_cow' || specimenKey === 'holstein') {
    setMode('explore');
    // Ensure all systems of imported Blender model are visible
    Object.keys(importedSystems).forEach(k => {
      if (k !== 'allMeshes') importedSystems[k].forEach(m => m.visible = true);
    });
    setSkinMode('xray');
    document.querySelectorAll('.sys-btn').forEach(btn => btn.classList.add('active'));
    cameraController.reset();
  } else if (specimenKey === 'skeleton') {
    setMode('explore');
    setSkinMode('none');
    Object.keys(importedSystems).forEach(k => {
      if (k !== 'allMeshes' && k !== 'skeletal') importedSystems[k].forEach(m => m.visible = false);
    });
    if (importedSystems.skeletal) importedSystems.skeletal.forEach(m => m.visible = true);
    if (groups.skeletal) groups.skeletal.visible = true;
    document.querySelectorAll('.sys-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.system === 'skeletal');
    });
    selectOrgan('tzlaot');
    cameraController.reset();
  } else if (specimenKey === 'digestive' || specimenKey === 'rumen') {
    setMode('explore');
    setSkinMode('xray');
    Object.keys(importedSystems).forEach(k => {
      if (k !== 'allMeshes' && k !== 'digestive' && k !== 'silhouette') importedSystems[k].forEach(m => m.visible = false);
    });
    if (importedSystems.digestive) importedSystems.digestive.forEach(m => m.visible = true);
    selectOrgan('keres');
  } else if (specimenKey === 'vessels') {
    setMode('explore');
    setSkinMode('xray');
    Object.keys(importedSystems).forEach(k => {
      if (k !== 'allMeshes' && k !== 'vessels' && k !== 'silhouette') importedSystems[k].forEach(m => m.visible = false);
    });
    if (importedSystems.vessels) importedSystems.vessels.forEach(m => m.visible = true);
    selectOrgan('carotidArtery');
  } else if (specimenKey === 'shechita') {
    setMode('shechita');
    focusShechitaZone();
  }
}

// -------------------------------------------------------------
// TOP QUICK SWITCHER RIBBON SCROLL CONTROLS
// -------------------------------------------------------------
let isQuickBarDragging = false;

function initQuickBarScrollControls() {
  const quickBar = document.getElementById('specimen-quick-bar');
  const btnScrollLeft = document.getElementById('btn-quickbar-scroll-left');
  const btnScrollRight = document.getElementById('btn-quickbar-scroll-right');
  const headerNav = document.querySelector('.header-nav');
  if (!quickBar) return;

  function updateScrollButtons() {
    const scrollWidth = quickBar.scrollWidth;
    const clientWidth = quickBar.clientWidth;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 4) {
      if (btnScrollLeft) btnScrollLeft.classList.add('disabled');
      if (btnScrollRight) btnScrollRight.classList.add('disabled');
      return;
    }

    // In RTL, scrollLeft is 0 at right edge, and negative towards the left
    const currentScrollAbs = Math.abs(quickBar.scrollLeft);
    const atRight = currentScrollAbs <= 4;
    const atLeft = currentScrollAbs >= (maxScroll - 6);

    if (btnScrollRight) btnScrollRight.classList.toggle('disabled', atRight);
    if (btnScrollLeft) btnScrollLeft.classList.toggle('disabled', atLeft);
  }

  // 1. Arrow Button Click Handlers
  if (btnScrollLeft) {
    btnScrollLeft.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      sound.playClick();
      // In RTL, negative scrolls left towards מקום השחיטה
      quickBar.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }

  if (btnScrollRight) {
    btnScrollRight.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      sound.playClick();
      // In RTL, positive scrolls right towards פרה חיה
      quickBar.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  // 2. Mouse Wheel Scroll (scrolling down navigates along the ribbon towards shechita)
  quickBar.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
      e.preventDefault();
      e.stopPropagation();
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : -e.deltaX;
      quickBar.scrollBy({
        left: -delta * 1.5,
        behavior: 'auto'
      });
      updateScrollButtons();
    }
  }, { passive: false });

  // Wheel support for header nav tabs if overflowing
  if (headerNav) {
    headerNav.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        headerNav.scrollBy({ left: -e.deltaY * 1.5, behavior: 'auto' });
      }
    }, { passive: false });
  }

  // 3. Mouse Grab & Drag-to-Scroll
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;

  quickBar.addEventListener('mousedown', (e) => {
    isDown = true;
    isQuickBarDragging = false;
    startX = e.pageX;
    scrollLeftStart = quickBar.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      setTimeout(() => {
        isQuickBarDragging = false;
      }, 60);
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const walk = e.pageX - startX;
    if (Math.abs(walk) > 4) {
      isQuickBarDragging = true;
      quickBar.scrollLeft = scrollLeftStart - walk;
      updateScrollButtons();
    }
  });

  quickBar.addEventListener('scroll', updateScrollButtons, { passive: true });
  window.addEventListener('resize', updateScrollButtons, { passive: true });
  setTimeout(updateScrollButtons, 300);
}

// -------------------------------------------------------------
// EVENT LISTENERS & UI BINDING
// -------------------------------------------------------------
function initUI() {
  initQuickBarScrollControls();

  // Specimen Quick Bar Switcher
  document.querySelectorAll('.specimen-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      if (isQuickBarDragging) return;
      sound.playClick();
      switchPrimarySpecimen(pill.dataset.specimen);
    });
  });

  // Mode Navigation Tabs
  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      sound.playClick();
      setMode(tab.dataset.mode);
    });
  });

  // Language Toggle
  document.getElementById('btn-lang-toggle').addEventListener('click', () => {
    sound.playClick();
    state.lang = state.lang === 'he' ? 'en' : 'he';
    applyLanguage();
  });

  // Sound Toggle
  const soundBtn = document.getElementById('btn-sound-toggle');
  soundBtn.addEventListener('click', () => {
    const isMuted = sound.toggleMute();
    soundBtn.querySelector('.sound-on').classList.toggle('hidden', isMuted);
    soundBtn.querySelector('.sound-off').classList.toggle('hidden', !isMuted);
  });

  // Cow Skin Appearance Mode Switch (Immediately activates WebGL mode so changes are visible!)
  document.getElementById('btn-skin-solid').addEventListener('click', () => {
    sound.playClick();
    activateWebGLMode();
    switchPrimarySpecimen('solid_cow');
  });
  const btnSkinMuscle = document.getElementById('btn-skin-muscle');
  if (btnSkinMuscle) {
    btnSkinMuscle.addEventListener('click', () => {
      sound.playClick();
      activateWebGLMode();
      switchPrimarySpecimen('muscles');
    });
  }
  document.getElementById('btn-skin-xray').addEventListener('click', () => {
    sound.playClick();
    activateWebGLMode();
    setSkinMode('xray');
  });
  document.getElementById('btn-skin-none').addEventListener('click', () => {
    sound.playClick();
    activateWebGLMode();
    setSkinMode('none');
  });

  // System Layer Toggles (Controls both Three.js and the Converted Blender 3D Model!)
  document.querySelectorAll('.sys-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sound.playClick();
      const sysName = btn.dataset.system;
      const grp = groups[sysName];
      let finalVis = false;
      if (grp) {
        grp.visible = !grp.visible;
        finalVis = grp.visible;
        btn.classList.toggle('active', grp.visible);
      }
      // Also toggle imported Blender model meshes!
      if (importedSystems[sysName] && importedSystems[sysName].length > 0) {
        const anyVis = importedSystems[sysName].some(m => m.visible);
        const nextVis = !anyVis;
        importedSystems[sysName].forEach(m => m.visible = nextVis);
        btn.classList.toggle('active', nextVis);
        finalVis = nextVis; // Use imported system's state for Sketchfab API
      }
      // Control real 3D model system layers directly via Sketchfab API
      sketchfabController.setSystemVisibility(sysName, finalVis);
    });
  });

  // View Presets (Immediately activates WebGL mode!)
  document.querySelectorAll('.view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sound.playClick();
      activateWebGLMode();
      cameraController.setPresetView(btn.dataset.view);
    });
  });

  // Camera Utility Buttons
  document.getElementById('btn-reset-cam').addEventListener('click', () => {
    sound.playClick();
    activateWebGLMode();
    cameraController.reset();
  });


  document.getElementById('btn-auto-rotate').addEventListener('click', (e) => {
    sound.playClick();
    activateWebGLMode();
    state.autoRotate = !state.autoRotate;
    e.currentTarget.classList.toggle('active', state.autoRotate);
  });

  // Transparency Slider
  const opacitySlider = document.getElementById('slider-opacity');
  const opacityVal = document.getElementById('opacity-val');
  opacitySlider.addEventListener('input', (e) => {
    activateWebGLMode();
    const val = parseInt(e.target.value, 10);
    opacityVal.textContent = `${val}%`;
    if (materials.bodyGlass) materials.bodyGlass.opacity = val / 100;
    if (importedMaterials.skinXray) importedMaterials.skinXray.opacity = val / 100;
    if (importedMaterials.muscleEcorche) {
      if (val < 100) {
        importedMaterials.muscleEcorche.transparent = true;
        importedMaterials.muscleEcorche.opacity = Math.max(0.12, val / 100);
      } else {
        importedMaterials.muscleEcorche.transparent = false;
        importedMaterials.muscleEcorche.opacity = 1.0;
      }
    }
  });

  // Exploded View Slider (Pushes organs apart on both Three.js and the Authentic 3D Model!)
  const explodeSlider = document.getElementById('slider-explode');
  const explodeVal = document.getElementById('explode-val');
  explodeSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    explodeVal.textContent = `${val}%`;
    state.explodeFactor = val / 100;
    updateExplodedView(state.explodeFactor);
    // Move organs apart on the real anatomical model via Sketchfab API
    sketchfabController.explode(state.explodeFactor);
  });

  // Section Slicing Plane Tool (Biosphera & Online3DViewer inspired)
  const btnToggleSlice = document.getElementById('btn-toggle-slice');
  const sliceSliderBox = document.getElementById('slice-slider-container');
  const sliceSlider = document.getElementById('slider-slice');

  btnToggleSlice.addEventListener('click', () => {
    sound.playClick();
    activateWebGLMode();
    state.isSlicingActive = !state.isSlicingActive;
    btnToggleSlice.classList.toggle('active', state.isSlicingActive);
    sliceSliderBox.classList.toggle('hidden', !state.isSlicingActive);
    updateClippingPlane();
  });


  document.querySelectorAll('.axis-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      sound.playClick();
      document.querySelectorAll('.axis-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.sliceAxis = btn.dataset.axis;
      updateClippingPlane();
    });
  });

  sliceSlider.addEventListener('input', (e) => {
    state.sliceOffset = parseFloat(e.target.value) / 100;
    updateClippingPlane();
  });

  // Custom 3D Model File Import (Z-Anatomy GLTF/GLB)
  const fileInput = document.getElementById('input-custom-model');
  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      loadCustomModelFile(file);
    }
  });

  // Drag and drop onto canvas
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      loadCustomModelFile(e.dataTransfer.files[0]);
    }
  });

  // Organ Focus Button
  document.getElementById('btn-focus-organ').addEventListener('click', () => {
    if (state.selectedOrganId) {
      focusOrgan(state.selectedOrganId);
    }
  });

  // Treifot Search
  document.getElementById('treifot-search').addEventListener('input', (e) => {
    filterTreifotList(e.target.value);
  });

  // Close Inspector Button
  document.getElementById('btn-close-inspector').addEventListener('click', () => {
    sound.playClick();
    document.getElementById('treifah-inspector-card').classList.add('hidden');
    treifahVisualizer.clear();
    state.activeTreifahId = null;
  });

  // Defect Kosher/Treifah State Buttons
  const btnKosher = document.getElementById('btn-state-kosher');
  const btnTreifah = document.getElementById('btn-state-treifah');

  btnKosher.addEventListener('click', () => {
    sound.playKosherChime();
    state.isTreifahDefectActive = false;
    btnKosher.classList.add('active');
    btnTreifah.classList.remove('active');
    updateActiveTreifahVisual();
  });

  btnTreifah.addEventListener('click', () => {
    sound.playTreifahAlarm();
    state.isTreifahDefectActive = true;
    btnTreifah.classList.add('active');
    btnKosher.classList.remove('active');
    updateActiveTreifahVisual();
  });

  // Quiz Next Button
  document.getElementById('btn-next-question').addEventListener('click', () => {
    sound.playClick();
    state.quizCurrentIndex = (state.quizCurrentIndex + 1) % TREIFOT_18.length;
    renderQuizQuestion();
  });

  // Modal Close
  document.getElementById('btn-close-modal').addEventListener('click', closeModal);
  document.getElementById('specimen-modal').addEventListener('click', (e) => {
    if (e.target.id === 'specimen-modal') closeModal();
  });

  // Supermarket Beef Cuts (1-19) Interactive Controls
  document.getElementById('btn-toggle-beef-cuts')?.addEventListener('click', () => {
    sound.playClick();
    toggleBeefCutsExperience();
  });
  document.getElementById('btn-close-beef-cuts')?.addEventListener('click', () => {
    sound.playClick();
    toggleBeefCutsExperience(false);
  });
  document.getElementById('btn-focus-beef-cut')?.addEventListener('click', () => {
    sound.playClick();
    selectBeefCut(state.selectedBeefCutId, true);
  });
  document.querySelectorAll('.beef-filter-pills .filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      document.querySelectorAll('.beef-filter-pills .filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.beefCutsFilter = btn.dataset.filter;
      renderBeefCutsPanel();
    });
  });
  document.getElementById('beef-cuts-search')?.addEventListener('input', (e) => {
    state.beefCutsSearch = e.target.value;
    renderBeefCutsPanel();
  });

  // Canvas Mouse Interactions
  canvas.addEventListener('mousemove', onCanvasMouseMove);
  canvas.addEventListener('click', onCanvasClick);
  window.addEventListener('resize', onWindowResize);

  // Populate Lists
  renderShechitaPanel();
  renderTreifotList();
  renderSpecimensList();
  renderQuizQuestion();
  applyLanguage();

  // Ensure canvas dimensions and start with clear visible cow
  activateWebGLMode();
  onWindowResize();

  // Automatically load the converted Blender bovine 3D model on startup (encrypted .dat asset)
  loadModelFromUrl('/models/cow/cow_anatomy.dat');

  // Listen for clicks on authentic 3D model organs to open Halachic data
  window.addEventListener('sketchfabOrganClick', (e) => {
    const node = e.detail?.node;
    if (!node) return;
    const name = (node.name || '').toLowerCase();
    if (name.includes('rumen') || name.includes('stomach')) {
      setMode('explore');
      selectOrgan('keres');
    } else if (name.includes('reticul')) {
      setMode('explore');
      selectOrgan('beitHakosos');
    } else if (name.includes('omasum')) {
      setMode('explore');
      selectOrgan('hameses');
    } else if (name.includes('abomasum')) {
      setMode('explore');
      selectOrgan('keivah');
    } else if (name.includes('trachea')) {
      setMode('shechita');
      selectSiman('kaneh');
    } else if (name.includes('esophag')) {
      setMode('shechita');
      selectSiman('veshet');
    } else if (name.includes('lung')) {
      setMode('explore');
      selectOrgan('reah');
    } else if (name.includes('heart')) {
      setMode('explore');
      selectOrgan('lev');
    } else if (name.includes('liver')) {
      setMode('explore');
      selectOrgan('kaved');
    }
  });
}

// -------------------------------------------------------------
// NAVIGATION & MODES
// -------------------------------------------------------------
function setMode(mode) {
  state.activeMode = mode;

  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.mode === mode);
  });

  document.querySelectorAll('.drawer-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `panel-${mode}`);
  });

  if (mode === 'shechita') {
    renderShechitaPanel();
    focusShechitaZone(state.selectedSimanId || 'kaneh');
  } else {
    if (shechitaVisualizer) shechitaVisualizer.setVisible(false);
    if (mode === 'treifot') {
      if (!state.activeTreifahId) {
        selectTreifah(1);
      } else {
        selectTreifah(state.activeTreifahId);
      }
    } else if (mode === 'bedikah') {
      renderQuizQuestion();
    } else if (mode === 'specimens') {
      renderSpecimensList();
    } else if (mode === 'beef-cuts') {
      renderBeefCutsPanel();
    }
  }

  // Deactivate beef cuts 3D markers if user explicitly switched to another drawer mode
  if (mode !== 'beef-cuts' && mode !== 'explore' && state.isBeefCutsActive) {
    toggleBeefCutsExperience(false);
  }
}

// -------------------------------------------------------------
// ADVANCED TOOLS: EXPLODED VIEW, SLICING, & 3D IMPORT
// -------------------------------------------------------------
function updateExplodedView(factor) {
  organMeshes.forEach((mesh) => {
    if (mesh.userData && mesh.userData.basePosition && mesh.userData.explodeDirection) {
      const offset = mesh.userData.explodeDirection.clone().multiplyScalar(factor * 1.5);
      mesh.position.copy(mesh.userData.basePosition).add(offset);
    }
  });

  // Also explode imported model meshes
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    importedSystems.allMeshes.forEach((mesh) => {
      if (mesh.userData?.system === 'silhouette') return;
      if (!mesh.userData.origPos) {
        mesh.userData.origPos = mesh.position.clone();
      }
      const dir = mesh.userData.origPos.clone().normalize();
      mesh.position.copy(mesh.userData.origPos).add(dir.multiplyScalar(factor * 0.8));
    });
  }
}

function updateClippingPlane() {
  if (!state.isSlicingActive) {
    clippingPlane.constant = 100.0; // effectively disabled
    return;
  }

  // Set normal vector based on axis
  switch (state.sliceAxis) {
    case 'x': // Sagittal plane
      clippingPlane.normal.set(-1, 0, 0);
      break;
    case 'y': // Transverse/Horizontal plane
      clippingPlane.normal.set(0, -1, 0);
      break;
    case 'z': // Coronal/Frontal plane
    default:
      clippingPlane.normal.set(0, 0, -1);
      break;
  }
  clippingPlane.constant = state.sliceOffset;
}

function loadCustomModelFile(file) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {
    const contents = e.target.result;
    const loader = new GLTFLoader();
    loader.parse(contents, '', (gltf) => {
      // Clear previous custom model if any
      while (importedModelGroup.children.length > 0) {
        importedModelGroup.remove(importedModelGroup.children[0]);
      }

      const model = gltf.scene;

      // Auto-fit and center model
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = 2.0 / (maxDim || 1);
      model.scale.set(scale, scale, scale);

      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center.multiplyScalar(scale));
      model.position.y += 1.0;

      importedModelGroup.add(model);
      root.visible = false;
      sound.playKosherChime();

      // Focus camera on imported model
      cameraController.reset();
    }, (err) => {
      console.error('Error loading custom GLTF model:', err);
    });
  };
}

function loadModelFromUrl(url) {
  const loader = new GLTFLoader();
  if (hoverBadge) {
    hoverBadge.classList.remove('hidden');
    hoverBadge.textContent = state.lang === 'he' ? 'טוען מודל תלת-ממד של הפרה...' : 'Loading 3D Cow Model...';
  }

  const onProgress = (pct) => {
    if (hoverBadge) {
      hoverBadge.classList.remove('hidden');
      hoverBadge.textContent = state.lang === 'he' ? `טוען מודל בקר... ${pct}%` : `Loading Cow Model... ${pct}%`;
    }
  };

  const handleLoadedGltf = (gltf) => {
    const model = gltf.scene;
    let meshCount = 0;

    // Filter Group001 to isolate ONE single complete cow body and remove the other 5 clone stages
    const group001 = model.getObjectByName('Group001') || model;
    if (group001 && group001.children && group001.children.length > 50) {
      // In the original 3D Max/FBX scene, 6 stages were placed side by side along Z:
      // Cow 1 (full anatomy with skin & all organs): Z ≈ 176
      // Cow 2: Z ≈ 31, Cow 3: Z ≈ -49, Cow 4: Z ≈ -133, Cow 5: Z ≈ -193, Cow 6: Z ≈ 96
      const toRemove = [];
      group001.children.forEach((child) => {
        const zPos = child.position ? child.position.z : 0;
        if (Math.abs(zPos - 176) > 25) {
          toRemove.push(child);
        }
      });
      toRemove.forEach((c) => group001.remove(c));
    }

    // Reset importedSystems
    Object.keys(importedSystems).forEach(k => importedSystems[k].length = 0);

    // Compute bounding box and normalize scale & position FIRST so mesh world boxes are accurate
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.4 / (maxDim || 1);
    model.scale.set(scale, scale, scale);

    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center.multiplyScalar(scale));
    // Ground the hooves nicely above the grid plane
    model.position.y += 0.8;
    model.updateMatrixWorld(true);

    model.traverse((child) => {
      if (child.isMesh) {
        meshCount++;
        child.castShadow = true;
        child.receiveShadow = true;
        child.userData.isOrgan = true;

        const origMatName = child.material?.name || '';
        const nodeName = child.name || '';
        const b = new THREE.Box3().setFromObject(child);
        const ctr = b.getCenter(new THREE.Vector3());

        // Check if mesh is cow skin / body
        const isSkin = origMatName === '20023' || origMatName === '20024' ||
                       origMatName === '20017' ||
                       nodeName === '21450' || nodeName === '21509' ||
                       nodeName.includes('1516') || nodeName.includes('1517') ||
                       nodeName === '20067' || nodeName === '20068';

        if (isSkin) {
          child.material = importedMaterials.skinSolid;
          child.userData.system = 'silhouette';
          child.userData.organId = 'solidCow';
          child.userData.labelHe = 'גוף הפרה (עור הולשטיין)';
          child.userData.labelEn = 'Cow Body (Holstein Skin)';
          importedSystems.silhouette.push(child);
        } else if (origMatName === '20021') {
          // Venous vascular network
          child.material = importedMaterials.vein.clone();
          child.userData.system = 'vessels';
          child.userData.organId = 'jugularVein';
          child.userData.labelHe = 'וריד הצוואר ומחזור הוורידים (Jugular Vein)';
          child.userData.labelEn = 'Jugular Veins & Venous System';
          importedSystems.vessels.push(child);
        } else if (origMatName === '20022') {
          // Arterial vascular network
          child.material = importedMaterials.artery.clone();
          child.userData.system = 'vessels';
          child.userData.organId = 'carotidArtery';
          child.userData.labelHe = 'עורק התרדמה ועורקי הצוואר (Carotid Artery)';
          child.userData.labelEn = 'Carotid Arteries & Arterial System';
          importedSystems.vessels.push(child);
        } else if (origMatName === '20020') {
          // Skeleton (172 bone meshes)
          child.material = importedMaterials.bone.clone();
          child.userData.system = 'skeletal';

          if (ctr.x > 0.75 && ctr.y > 0.9) {
            child.userData.organId = 'moach';
            child.userData.labelHe = 'גולגולת ומוח (Bovine Skull)';
            child.userData.labelEn = 'Bovine Skull & Brain';
          } else if (ctr.y > 1.25 && ctr.x < 0.75 && ctr.x > -0.9) {
            child.userData.organId = 'chutHashidrah';
            child.userData.labelHe = 'עמוד השדרה וחוט השדרה (Spine & Spinal Cord)';
            child.userData.labelEn = 'Spine & Spinal Cord';
          } else if (ctr.x > -0.35 && ctr.x < 0.45 && ctr.y > 0.7 && Math.abs(ctr.z) > 0.08) {
            child.userData.organId = 'tzlaot';
            child.userData.labelHe = 'צלעות (י"ג צלעות)';
            child.userData.labelEn = 'Ribs (13 Pairs of Ribs)';
          } else if (ctr.x < -0.5 && ctr.y < 1.0) {
            child.userData.organId = 'bokaDatma';
            child.userData.labelHe = 'עצמות הירך והאגן (בוקא דאטמא)';
            child.userData.labelEn = 'Pelvis & Femur (Boka D\'Atma)';
          } else {
            child.userData.organId = 'tzlaot';
            child.userData.labelHe = 'עצמות השלד';
            child.userData.labelEn = 'Bovine Skeleton';
          }
          importedSystems.skeletal.push(child);
        } else if (origMatName === '20018') {
          // Tendons & Fascia
          child.material = importedMaterials.tendon.clone();
          if (ctr.x < -0.6 && ctr.y < 0.6) {
            child.userData.system = 'limbs';
            child.userData.organId = 'tzometHagidin';
            child.userData.labelHe = 'צומת הגידים (Tendon Nexus)';
            child.userData.labelEn = 'Junction of Tendons (Tzomet HaGidin)';
            importedSystems.limbs.push(child);
          } else {
            child.userData.system = 'muscles';
            child.userData.organId = 'muscles';
            child.userData.labelHe = 'גידים ורצועות (Fascia & Tendons)';
            child.userData.labelEn = 'Bovine Tendons & Fascia';
            importedSystems.muscles.push(child);
          }
        } else if (origMatName === '20019') {
          // Muscle Bellies
          child.material = importedMaterials.muscle.clone();
          if (ctr.x < -0.6 && ctr.y < 0.5 && Math.abs(ctr.z) > 0.15) {
            child.userData.system = 'limbs';
            child.userData.organId = 'tzometHagidin';
            child.userData.labelHe = 'שרירי השוק וצומת הגידים';
            child.userData.labelEn = 'Hindlimb Musculature';
            importedSystems.limbs.push(child);
          } else {
            child.userData.system = 'muscles';
            child.userData.organId = 'muscles';
            child.userData.labelHe = 'שרירי הבקר (בשר הבהמה)';
            child.userData.labelEn = 'Bovine Musculature (Meat)';
            importedSystems.muscles.push(child);
          }
        } else if (nodeName === '20033' || nodeName === '20050' || (ctr.x > 0.25 && ctr.x < 0.9 && ctr.y > 1.0 && ctr.y < 1.25 && Math.abs(ctr.z) < 0.08 && origMatName === '20005')) {
          // Trachea / Windpipe & Esophagus (Anterior neck tube)
          child.material = new THREE.MeshStandardMaterial({
            color: 0xebdcd0,
            roughness: 0.38,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'respiratory';
          child.userData.organId = 'kaneh';
          child.userData.labelHe = 'קנה הנשימה (גרגרת - Trachea)';
          child.userData.labelEn = 'Trachea (Windpipe)';
          importedSystems.respiratory.push(child);
          if (importedSystems.shechita) importedSystems.shechita.push(child);
        } else if (origMatName === '20016' || nodeName === '20065') {
          // Heart
          child.material = new THREE.MeshStandardMaterial({
            color: 0xb91c1c,
            roughness: 0.35,
            metalness: 0.1,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'vital';
          child.userData.organId = 'lev';
          child.userData.labelHe = 'לב (בית חללו - Heart)';
          child.userData.labelEn = 'Heart (Lev)';
          importedSystems.vital.push(child);
        } else if (origMatName === '20015' || origMatName === '20006' || nodeName === '20049' || nodeName === '20012') {
          // Lungs & Lobes
          const tex = getCowTexture('20015');
          child.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.5,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'respiratory';
          child.userData.organId = 'reah';
          child.userData.labelHe = 'ריאה (אונות, אומות וורדא)';
          child.userData.labelEn = 'Lungs (Re\'ah & Lobes)';
          importedSystems.respiratory.push(child);
        } else if (origMatName === '20007' || nodeName === '20016') {
          // Liver
          const tex = getCowTexture('20007');
          child.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.5,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'vital';
          child.userData.organId = 'kaved';
          child.userData.labelHe = 'כבד (Kaved)';
          child.userData.labelEn = 'Liver (Kaved)';
          importedSystems.vital.push(child);
        } else if (origMatName === '20001' || nodeName === '20001') {
          // Gallbladder
          child.material = new THREE.MeshStandardMaterial({
            color: 0x10b981,
            roughness: 0.3,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'vital';
          child.userData.organId = 'marah';
          child.userData.labelHe = 'מרה (כיס המרה - Gallbladder)';
          child.userData.labelEn = 'Gallbladder (Marah)';
          importedSystems.vital.push(child);
        } else if (origMatName === '20011' || nodeName === '20026') {
          // Spleen
          child.material = new THREE.MeshStandardMaterial({
            color: 0x6b21a8,
            roughness: 0.5,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'vital';
          child.userData.organId = 'tchol';
          child.userData.labelHe = 'טחול (עוביו ודוקו - Spleen)';
          child.userData.labelEn = 'Spleen (Tchol)';
          importedSystems.vital.push(child);
        } else if (origMatName === '20009' || nodeName === '20021' || nodeName === '20022') {
          // Kidneys
          child.material = new THREE.MeshStandardMaterial({
            color: 0x991b1b,
            roughness: 0.45,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'vital';
          child.userData.organId = 'klayot';
          child.userData.labelHe = 'כליות (Kidneys)';
          child.userData.labelEn = 'Kidneys (Klayot)';
          importedSystems.vital.push(child);
        } else if (origMatName === '20008' || nodeName === '20019' || nodeName === '20020') {
          // Rumen (Keres)
          const tex = getCowTexture('20008');
          child.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.55,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'digestive';
          child.userData.organId = 'keres';
          child.userData.labelHe = 'כרס (הכרס הפנימית - Rumen)';
          child.userData.labelEn = 'Rumen (Keres / Paunch)';
          importedSystems.digestive.push(child);
        } else if (origMatName === '20003') {
          // Reticulum & Omasum
          const tex = getCowTexture('20003');
          child.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.55,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'digestive';
          child.userData.organId = 'beitHakosos';
          child.userData.labelHe = 'בית הכוסות והמסס (Reticulum & Omasum)';
          child.userData.labelEn = 'Reticulum & Omasum';
          importedSystems.digestive.push(child);
        } else if (ctr.x > 0.8 && ctr.y > 1.0) {
          // Head / Brain
          child.userData.system = 'nervous';
          child.userData.organId = 'moach';
          child.userData.labelHe = 'מוח וקרום המוח (Brain)';
          child.userData.labelEn = 'Brain & Meninges (Mo\'ach)';
          importedSystems.nervous.push(child);
        } else if (['20002', '20004', '20005', '20010'].includes(origMatName)) {
          // Intestines & Viscera
          const tex = getCowTexture(origMatName);
          child.material = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 0.5,
            metalness: 0.05,
            side: THREE.DoubleSide,
            clippingPlanes: [clippingPlane]
          });
          child.userData.system = 'digestive';
          child.userData.organId = 'dakin';
          child.userData.labelHe = 'מעיים ודקין (Intestines)';
          child.userData.labelEn = 'Intestines (Dakin)';
          importedSystems.digestive.push(child);
        } else {
          // Vital organs fallback
          child.userData.system = 'vital';
          child.userData.organId = 'reah';
          child.userData.labelHe = 'איברים פנימיים';
          child.userData.labelEn = 'Internal Visceral Organs';
          importedSystems.vital.push(child);
        }

        importedSystems.allMeshes.push(child);
      }
    });

    if (meshCount > 0) {
      while (importedModelGroup.children.length > 0) {
        importedModelGroup.remove(importedModelGroup.children[0]);
      }

      importedModelGroup.add(model);
      root.visible = false; // Hide procedural placeholder cow

      // -----------------------------------------------------------------
      // Bovine Esophagus (הוושט - הסימן השני לשחיטה)
      // Anatomically positioned along the dorsal neck and shifts to the LEFT (-Z)
      // of the trachea (קנה) into the rumen (כרס). Essential for Hilchot Shechita.
      // -----------------------------------------------------------------
      const veshetCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.82, 1.155, 0.000),  // Pharynx / Larynx / תורבץ הוושט
        new THREE.Vector3(0.70, 1.135, -0.016), // Upper cervical neck
        new THREE.Vector3(0.58, 1.085, -0.032), // Middle neck (Shechita incision zone - נוטה לשמאל)
        new THREE.Vector3(0.44, 1.035, -0.045), // Lower neck / Thoracic inlet
        new THREE.Vector3(0.25, 1.045, -0.055), // Mediastinum (Thorax)
        new THREE.Vector3(0.00, 1.040, -0.065), // Cardia / Junction with Rumen (כרס)
        new THREE.Vector3(-0.15, 1.000, -0.075) // Entering Rumen cavity
      ]);

      const veshetGeo = new THREE.TubeGeometry(veshetCurve, 40, 0.024, 16, false);
      const veshetMesh = new THREE.Mesh(veshetGeo, importedMaterials.esophagus.clone());
      veshetMesh.name = 'bovine_veshet_esophagus';
      veshetMesh.castShadow = true;
      veshetMesh.receiveShadow = true;
      veshetMesh.userData.isOrgan = true;
      veshetMesh.userData.organId = 'veshet';
      veshetMesh.userData.system = 'digestive';
      veshetMesh.userData.labelHe = 'ושט (תורבץ הוושט ובית הבליעה - Esophagus)';
      veshetMesh.userData.labelEn = 'Esophagus (Gullet)';

      importedModelGroup.add(veshetMesh);
      importedSystems.digestive.push(veshetMesh);
      importedSystems.respiratory.push(veshetMesh);
      if (importedSystems.shechita) importedSystems.shechita.push(veshetMesh);
      importedSystems.allMeshes.push(veshetMesh);

      // Apply initial appearance mode (solid lifelike cow by default)
      setSkinMode(state.activeSpecimen === 'solid_cow' ? 'solid' : 'xray');

      sound.playKosherChime();
      cameraController.reset();

      // Fade out loading overlay smoothly
      const loadingOverlay = document.getElementById('model-loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.classList.add('fade-out');
        setTimeout(() => loadingOverlay.classList.add('hidden'), 500);
      }

      if (hoverBadge) {
        hoverBadge.classList.remove('hidden');
        hoverBadge.textContent = state.lang === 'he' ? '✓ מודל הבקר התלת-ממדי (Blender) נטען בהצלחה!' : '✓ Blender Bovine 3D Model Loaded Successfully!';
        setTimeout(() => hoverBadge.classList.add('hidden'), 3500);
      }
    } else {
      console.warn('The loaded model contains 0 meshes.');
      const loadingOverlay = document.getElementById('model-loading-overlay');
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      if (hoverBadge) hoverBadge.classList.add('hidden');
    }
  };

  fetchAndLoadSecureGltf(url, loader, onProgress, handleLoadedGltf, (err) => {
    if (url.endsWith('.dat')) {
      const fallbackUrl = url.replace(/\.dat$/, '.glb');
      console.warn(`[paraSim] Encrypted asset load failed, attempting fallback to: ${fallbackUrl}`, err);
      fetchAndLoadSecureGltf(fallbackUrl, loader, onProgress, handleLoadedGltf, (fallbackErr) => {
        console.error('Could not auto-load 3D model from url:', fallbackErr);
        const loadingOverlay = document.getElementById('model-loading-overlay');
        if (loadingOverlay) loadingOverlay.classList.add('hidden');
        if (hoverBadge) hoverBadge.classList.add('hidden');
      });
    } else {
      console.error('Could not auto-load 3D model from url:', err);
      const loadingOverlay = document.getElementById('model-loading-overlay');
      if (loadingOverlay) loadingOverlay.classList.add('hidden');
      if (hoverBadge) hoverBadge.classList.add('hidden');
    }
  });
}

// -------------------------------------------------------------
// LOAD HIGH-DEFINITION BOVINE MUSCLE MODEL (Meshy AI Image-to-3D)
// Supports original export filename (*bovine_muscle*), renamed variants, and dynamic manifests
// -------------------------------------------------------------
const DEFAULT_BOVINE_MUSCLE_PATHS = [
  // Protected encrypted production asset (.dat)
  '/models/cow/bovine_muscles.dat',
  // Build-time paths injected by Vite
  ...(typeof __BOVINE_MUSCLE_PATHS__ !== 'undefined' && Array.isArray(__BOVINE_MUSCLE_PATHS__) ? __BOVINE_MUSCLE_PATHS__ : []),
  // Standardized file name
  '/models/cow/bovine_muscles.glb',
  // Original Meshy AI export filename
  '/models/cow/Meshy_AI_Bovine_Muscle_Anatomy_1010200520_image-to-3d-texture.glb',
  // Common variations matching *bovine_muscle*
  '/models/cow/bovine_muscle.glb',
  '/models/cow/Meshy_AI_Bovine_Muscle_Anatomy.glb',
  '/models/cow/bovine_muscles_anatomy.glb',
  '/models/cow/bovine_muscle_anatomy.glb'
];

async function getCandidateMuscleUrls() {
  const candidates = [...new Set(DEFAULT_BOVINE_MUSCLE_PATHS)];

  // Try dynamic manifest or dev server API endpoint
  const endpoints = ['/api/muscle-models', '/models/cow/muscle_manifest.json'];
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep);
      if (res.ok && !res.headers.get('content-type')?.includes('text/html')) {
        const list = await res.json();
        if (Array.isArray(list) && list.length > 0) {
          list.forEach(p => {
            if (/bovine.*muscle|muscle.*bovine/i.test(p) && !candidates.includes(p)) {
              candidates.unshift(p);
            }
          });
          break;
        }
      }
    } catch (_) {}
  }

  return candidates;
}

function loadMuscleModel(onComplete) {
  if (isMuscleModelLoaded) {
    if (onComplete) onComplete(muscleModelGroup);
    return;
  }
  if (isMuscleModelLoading) return;
  isMuscleModelLoading = true;

  if (hoverBadge) {
    hoverBadge.classList.remove('hidden');
    hoverBadge.textContent = state.lang === 'he' ? 'טוען מודל שרירי הבקר התלת-ממדי (HD)...' : 'Loading HD Bovine Muscle Model...';
  }

  getCandidateMuscleUrls().then(candidateUrls => {
    let index = 0;

    function tryLoadNextUrl() {
      if (index >= candidateUrls.length) {
        console.error('All candidate bovine muscle models failed to load:', candidateUrls);
        isMuscleModelLoading = false;
        if (hoverBadge) {
          hoverBadge.textContent = state.lang === 'he' ? 'שגיאה בטעינת מודל השרירים' : 'Error loading muscle model';
          setTimeout(() => hoverBadge.classList.add('hidden'), 3000);
        }
        return;
      }

      const url = candidateUrls[index++];
      console.log(`[paraSim] Attempting to load bovine muscle model from: ${url}`);

      const loader = new GLTFLoader();
      const onProgress = (pct) => {
        if (hoverBadge) {
          hoverBadge.classList.remove('hidden');
          hoverBadge.textContent = state.lang === 'he' ? `טוען מודל שרירים... ${pct}%` : `Loading Muscle Model... ${pct}%`;
        }
      };

      fetchAndLoadSecureGltf(url, loader, onProgress, (gltf) => {
        const model = gltf.scene;

        // Compute bounding box and normalize
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.30 / (maxDim || 1);
        model.scale.set(scale, scale, scale);

        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));

        // Rotate +90 deg around Y so the head (+Z) aligns with the cow (+X)
        model.rotation.y = Math.PI / 2;

        // Ground hooves nicely at same height as main cow
        model.position.y += 0.82;
        model.updateMatrixWorld(true);

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            child.userData.isOrgan = true;
            child.userData.organId = 'muscles';
            child.userData.system = 'muscles';
            child.userData.labelHe = 'שרירי הבקר ובשר הבהמה (Muscles & Meat)';
            child.userData.labelEn = 'Bovine Skeletal Musculature & Meat';

            if (child.material) {
              child.material.clippingPlanes = [clippingPlane];
              child.material.side = THREE.DoubleSide;
            }
          }
        });

        while (muscleModelGroup.children.length > 0) {
          muscleModelGroup.remove(muscleModelGroup.children[0]);
        }
        muscleModelGroup.add(model);
        isMuscleModelLoaded = true;
        isMuscleModelLoading = false;

        if (hoverBadge) {
          hoverBadge.textContent = state.lang === 'he' ? '✓ מודל השרירים נטען בהצלחה!' : '✓ Muscle Model Loaded!';
          setTimeout(() => hoverBadge.classList.add('hidden'), 2500);
        }

        if (onComplete) onComplete(muscleModelGroup);
      }, (err) => {
        console.warn(`[paraSim] Failed to load candidate ${url}, trying next fallback...`, err);
        tryLoadNextUrl();
      });
    }

    tryLoadNextUrl();
  });
}

// -------------------------------------------------------------
// ORGAN SELECTION & INTERACTION
// -------------------------------------------------------------
function selectOrgan(organId) {
  const organ = ORGANS[organId];
  if (!organ) return;

  state.selectedOrganId = organId;
  sound.playSelect();

  // Hide Shechita boundary overlay if exploring general organs
  if (state.activeMode !== 'shechita' && state.activeSpecimen !== 'shechita' && shechitaVisualizer) {
    shechitaVisualizer.setVisible(false);
  }

  // If solid skin is obstructing, switch to translucent X-Ray so organ is visible inside
  if (organId !== 'muscles' && state.activeSpecimen !== 'muscles' && state.skinMode === 'solid') {
    setSkinMode('xray');
  }

  // Update Drawer UI
  document.getElementById('organ-empty-prompt').classList.add('hidden');
  document.getElementById('organ-content').classList.remove('hidden');

  document.getElementById('organ-title').textContent = state.lang === 'he' ? organ.he : organ.en;
  const sysMeta = ORGAN_SYSTEMS[organ.system.toUpperCase()] || { he: organ.system, en: organ.system };
  document.getElementById('organ-system-tag').textContent = state.lang === 'he' ? sysMeta.he : sysMeta.en;
  document.getElementById('organ-talmud-term').textContent = organ.talmudicTerm;
  document.getElementById('organ-halacha-text').textContent = state.lang === 'he' ? organ.halachicSummaryHe : organ.halachicSummaryEn;

  // Related Treifot
  const related = TREIFOT_18.filter(t => t.organId === organId);
  const chipContainer = document.getElementById('organ-related-treifot');
  chipContainer.innerHTML = '';

  if (related.length === 0) {
    chipContainer.innerHTML = `<span style="font-size:0.8rem;color:var(--text-muted);">${state.lang === 'he' ? 'אין טרפות ישירות מוגדרות לאיבר זה' : 'No direct Treifot specified'}</span>`;
  } else {
    related.forEach((tr) => {
      const chip = document.createElement('div');
      chip.className = 'treifah-chip';
      chip.textContent = state.lang === 'he' ? tr.titleHe : tr.titleEn;
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        setMode('treifot');
        selectTreifah(tr.id);
      });
      chipContainer.appendChild(chip);
    });
  }

  // Highlight Organ in 3D
  highlightOrganMesh(organId);
}

function focusOrgan(organId) {
  let target = null;
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    const matchingMeshes = importedSystems.allMeshes.filter(m => m.userData?.organId === organId && m.visible);
    const meshesToMeasure = matchingMeshes.length > 0 ? matchingMeshes : importedSystems.allMeshes.filter(m => m.userData?.organId === organId);
    if (meshesToMeasure.length > 0) {
      const box = new THREE.Box3();
      meshesToMeasure.forEach(m => box.expandByObject(m));
      target = new THREE.Vector3();
      box.getCenter(target);
    }
  }
  if (!target) {
    const organ = ORGANS[organId];
    if (organ) target = new THREE.Vector3(...organ.position);
  }
  if (!target) return;

  const camPos = target.clone().add(new THREE.Vector3(0.5, 0.4, 0.7));
  cameraController.moveTo(camPos, target, 0.9);
}

function highlightOrganMesh(organId) {
  if (root && root.visible) {
    organMeshes.forEach((mesh, id) => {
      const isSelected = id === organId;
      if (mesh.userData && mesh.userData.defaultMaterial && mesh.userData.highlightMaterial) {
        mesh.material = isSelected ? mesh.userData.highlightMaterial : mesh.userData.defaultMaterial;
      }
    });
  }

  // Highlight imported 3D model meshes with dynamic emissive highlight
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    importedSystems.allMeshes.forEach((mesh) => {
      const isSelected = mesh.userData?.organId === organId;
      if (mesh.material && 'emissive' in mesh.material) {
        if (isSelected) {
          if (!mesh.userData.savedEmissive) {
            mesh.userData.savedEmissive = mesh.material.emissive.clone();
            mesh.userData.savedEmissiveIntensity = mesh.material.emissiveIntensity || 0;
          }
          mesh.material.emissive.set(organId === 'veshet' ? 0xf59e0b : 0x38bdf8);
          mesh.material.emissiveIntensity = 0.9;
        } else if (mesh.userData.savedEmissive) {
          mesh.material.emissive.copy(mesh.userData.savedEmissive);
          mesh.material.emissiveIntensity = mesh.userData.savedEmissiveIntensity;
        }
      }
    });
  }
}

// -------------------------------------------------------------
// HILCHOT SHECHITA CONTROLLER (CHULLIN 12a - 18b)
// -------------------------------------------------------------
function renderShechitaPanel() {
  const kanehBtn = document.getElementById('btn-siman-kaneh');
  const veshetBtn = document.getElementById('btn-siman-veshet');
  if (!kanehBtn || !veshetBtn) return;

  function updateSimanView(simanKey) {
    state.selectedSimanId = simanKey;
    kanehBtn.classList.toggle('active', simanKey === 'kaneh');
    veshetBtn.classList.toggle('active', simanKey === 'veshet');

    const data = SHECHITA_SIMANIM[simanKey];
    if (!data) return;

    const nameEl = document.getElementById('siman-name');
    const reqEl = document.getElementById('siman-req');
    const boundsEl = document.getElementById('siman-boundaries');
    const talmudEl = document.getElementById('siman-talmud');
    const saEl = document.getElementById('siman-sa');

    if (nameEl) nameEl.textContent = state.lang === 'he' ? data.nameHe : data.nameEn;
    if (reqEl) reqEl.textContent = state.lang === 'he' ? data.requirementHe : data.requirementEn;
    if (boundsEl) boundsEl.textContent = state.lang === 'he' ? data.boundariesHe : data.boundariesEn;
    if (talmudEl) talmudEl.textContent = data.talmudDaf;
    if (saEl) saEl.textContent = `שו"ע: ${data.shulchanAruch}`;

    highlightOrganMesh(simanKey);
    focusShechitaZone(simanKey);
  }

  kanehBtn.onclick = () => { sound.playClick(); updateSimanView('kaneh'); };
  veshetBtn.onclick = () => { sound.playClick(); updateSimanView('veshet'); };

  const focusZoneBtn = document.getElementById('btn-focus-shechita-zone');
  if (focusZoneBtn) {
    focusZoneBtn.onclick = () => {
      sound.playClick();
      activateWebGLMode();
      focusShechitaZone();
    };
  }

  // Toggle Shechita Zone Boundaries
  const toggleZoneBtn = document.getElementById('btn-toggle-shechita-zone');
  const toggleZoneText = document.getElementById('toggle-zone-text');
  if (toggleZoneBtn) {
    toggleZoneBtn.classList.toggle('active', state.isShechitaZoneActive);
    if (toggleZoneText) {
      toggleZoneText.textContent = state.isShechitaZoneActive
        ? (state.lang === 'he' ? 'סימון תחומי שחיטה: פעיל ✓' : 'Boundary Guides: Active ✓')
        : (state.lang === 'he' ? 'סימון תחומי שחיטה: כבוי' : 'Boundary Guides: Hidden');
    }
    toggleZoneBtn.onclick = () => {
      sound.playClick();
      state.isShechitaZoneActive = !state.isShechitaZoneActive;
      if (shechitaVisualizer) shechitaVisualizer.setVisible(state.isShechitaZoneActive);
      toggleZoneBtn.classList.toggle('active', state.isShechitaZoneActive);
      if (toggleZoneText) {
        toggleZoneText.textContent = state.isShechitaZoneActive
          ? (state.lang === 'he' ? 'סימון תחומי שחיטה: פעיל ✓' : 'Boundary Guides: Active ✓')
          : (state.lang === 'he' ? 'סימון תחומי שחיטה: כבוי' : 'Boundary Guides: Hidden');
      }
    };
  }

  // Toggle Shechita 3D Labels
  const toggleLabelsBtn = document.getElementById('btn-toggle-shechita-labels');
  const toggleLabelsText = document.getElementById('toggle-labels-text');
  if (toggleLabelsBtn) {
    toggleLabelsBtn.classList.toggle('active', state.isShechitaLabelsActive);
    if (toggleLabelsText) {
      toggleLabelsText.textContent = state.isShechitaLabelsActive
        ? (state.lang === 'he' ? 'תגיות הסבר: מוצגות' : 'Labels: Shown')
        : (state.lang === 'he' ? 'תגיות הסבר: מוסתרות' : 'Labels: Hidden');
    }
    toggleLabelsBtn.onclick = () => {
      sound.playClick();
      state.isShechitaLabelsActive = !state.isShechitaLabelsActive;
      if (shechitaVisualizer) shechitaVisualizer.setLabelsVisible(state.isShechitaLabelsActive);
      toggleLabelsBtn.classList.toggle('active', state.isShechitaLabelsActive);
      if (toggleLabelsText) {
        toggleLabelsText.textContent = state.isShechitaLabelsActive
          ? (state.lang === 'he' ? 'תגיות הסבר: מוצגות' : 'Labels: Shown')
          : (state.lang === 'he' ? 'תגיות הסבר: מוסתרות' : 'Labels: Hidden');
      }
    };
  }

  // Render Chamesh Halachot Pesulot
  const chameshContainer = document.getElementById('chamesh-halachot-list');
  if (chameshContainer) {
    chameshContainer.innerHTML = '';
    CHAMESH_HALACHOT.forEach((h) => {
      const item = document.createElement('div');
      item.className = 'chamesh-item';
      item.innerHTML = `
        <div class="chamesh-header">
          <span class="chamesh-title">${state.lang === 'he' ? h.nameHe : h.nameEn}</span>
          <span class="chamesh-badge">${h.status}</span>
        </div>
        <div class="chamesh-desc">${state.lang === 'he' ? h.summaryHe : h.summaryEn}</div>
        <div style="font-size:0.75rem;color:var(--accent-amber);margin-top:2px;">
          <strong>שיעור:</strong> ${state.lang === 'he' ? h.measureHe : h.measureEn} (${h.shulchanAruch})
        </div>
      `;
      item.addEventListener('click', () => {
        sound.playClick();
        activateWebGLMode();
        focusShechitaZone();
      });
      chameshContainer.appendChild(item);
    });
  }

  // Knife Tester Simulator (Chullin 17b)
  const resultBox = document.getElementById('knife-test-result');
  const indicator = document.getElementById('knife-indicator');
  const btnKosher = document.getElementById('btn-test-knife-kosher');
  const btnPegimah = document.getElementById('btn-test-knife-pegimah');

  if (btnKosher) {
    btnKosher.onclick = () => {
      sound.playKosherChime();
      if (indicator) {
        indicator.textContent = state.lang === 'he' ? 'סכין חלקה וכשרה ✓' : 'Smooth & Kosher Knife ✓';
        indicator.style.color = '#047857';
      }
      if (resultBox) {
        resultBox.className = 'knife-result-box kosher';
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
          <strong>${state.lang === 'he' ? '✓ סכין נבדקה בי"ב רוחות וכשרה לכתחילה!' : '✓ Knife Inspected in 12 Vectors: 100% Kosher!'}</strong>
          <p style="margin-top:4px;">${state.lang === 'he' ? 'נבדקה בהולכה והובאה על בשר ועל ציפורן, בחוד ובב\' הצדדים. אין בה שום פגימה (חולין י"ז ע"ב, שו"ע יו"ד סימן י"ח).' : 'Tested forward & backward on flesh and fingernail across cutting edge and both bevels. No notch detected.'}</p>
        `;
      }
    };
  }

  if (btnPegimah) {
    btnPegimah.onclick = () => {
      sound.playTreifahAlarm();
      if (indicator) {
        indicator.textContent = state.lang === 'he' ? 'פגימה חוגרת בלהב ✕' : 'Notch Detected (Pegimah) ✕';
        indicator.style.color = '#b91c1c';
      }
      if (resultBox) {
        resultBox.className = 'knife-result-box pegimah';
        resultBox.classList.remove('hidden');
        resultBox.innerHTML = `
          <strong>${state.lang === 'he' ? '✕ נמצאה פגימה חוגרת - הסכין פסולה והבהמה נבלה!' : '✕ Notched Blade: Invalid Knife, Animal is Neveilah!'}</strong>
          <p style="margin-top:4px;">${state.lang === 'he' ? 'אפילו פגימה דקה כחוט השערה שחוגרת בציפורן או בבשר פוסלת את השחיטה ומטילה עליה איסור נבלה (חולין י"ז ע"ב, יו"ד י"ח:א).' : 'Even a hair-thin notch catching on fingernail or flesh invalidates ritual slaughter under Biblical law.'}</p>
        `;
      }
    };
  }

  updateSimanView(state.selectedSimanId || 'kaneh');
}

// -------------------------------------------------------------
// 18 TREIFOT CONTROLLER
// -------------------------------------------------------------

function renderTreifotList() {
  const container = document.getElementById('treifot-list');
  container.innerHTML = '';

  TREIFOT_18.forEach((item) => {
    const btn = document.createElement('button');
    btn.className = 'treifah-item-btn';
    btn.id = `treifah-item-${item.id}`;
    btn.innerHTML = `
      <span class="treifah-item-title">${state.lang === 'he' ? item.titleHe : item.titleEn}</span>
      <span class="treifah-item-badge">${state.lang === 'he' ? ORGANS[item.organId]?.he : ORGANS[item.organId]?.en}</span>
    `;
    btn.addEventListener('click', () => {
      sound.playClick();
      selectTreifah(item.id);
    });
    container.appendChild(btn);
  });
}

function filterTreifotList(query) {
  const q = query.toLowerCase().trim();
  TREIFOT_18.forEach((item) => {
    const btn = document.getElementById(`treifah-item-${item.id}`);
    if (!btn) return;
    const match =
      item.titleHe.toLowerCase().includes(q) ||
      item.titleEn.toLowerCase().includes(q) ||
      item.summaryHe.toLowerCase().includes(q) ||
      item.summaryEn.toLowerCase().includes(q) ||
      ORGANS[item.organId]?.he.toLowerCase().includes(q) ||
      ORGANS[item.organId]?.en.toLowerCase().includes(q);
    btn.style.display = match ? 'flex' : 'none';
  });
}

function selectTreifah(id) {
  const treifah = TREIFOT_18.find(t => t.id === id);
  if (!treifah) return;

  state.activeTreifahId = id;

  document.querySelectorAll('.treifah-item-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.id === `treifah-item-${id}`);
  });

  const inspector = document.getElementById('treifah-inspector-card');
  inspector.classList.remove('hidden');

  document.getElementById('inspector-treifah-title').textContent = state.lang === 'he' ? treifah.titleHe : treifah.titleEn;
  document.getElementById('inspector-source').textContent = treifah.sourceMishnah;
  document.getElementById('inspector-sa').textContent = `שולחן ערוך: ${treifah.shulchanAruch}`;
  document.getElementById('inspector-summary').textContent = state.lang === 'he' ? treifah.summaryHe : treifah.summaryEn;

  // Switch to WebGL mode and translucent X-Ray so defect is clearly visible inside
  activateWebGLMode();
  setSkinMode('xray');

  // Ensure internal organ systems are visible
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    if (importedSystems.vital) importedSystems.vital.forEach(m => m.visible = true);
    if (importedSystems.digestive) importedSystems.digestive.forEach(m => m.visible = true);
    if (importedSystems.skeletal) importedSystems.skeletal.forEach(m => m.visible = true);
    if (importedSystems.vessels) importedSystems.vessels.forEach(m => m.visible = true);
  }

  // Camera transition
  const camPos = new THREE.Vector3(...treifah.cameraPosition);
  const camTarget = new THREE.Vector3(...treifah.cameraTarget);
  cameraController.moveTo(camPos, camTarget, 0.9);

  // Show 3D defect
  updateActiveTreifahVisual();

  // Also highlight associated organ
  highlightOrganMesh(treifah.organId);
}

function updateActiveTreifahVisual() {
  if (!state.activeTreifahId) return;
  const treifah = TREIFOT_18.find(t => t.id === state.activeTreifahId);
  if (treifah) {
    treifahVisualizer.showDefect(treifah, state.isTreifahDefectActive);
  }
}

// -------------------------------------------------------------
// BEDIKAH SIMULATOR (QUIZ)
// -------------------------------------------------------------
function renderQuizQuestion() {
  const treifah = TREIFOT_18[state.quizCurrentIndex];
  if (!treifah || !treifah.inspectCase) return;

  activateWebGLMode();
  setSkinMode('xray');

  const quiz = treifah.inspectCase;
  document.getElementById('quiz-question-number').textContent =
    state.lang === 'he' ? `תרחיש ${state.quizCurrentIndex + 1} מתוך ${TREIFOT_18.length}` : `Scenario ${state.quizCurrentIndex + 1} of ${TREIFOT_18.length}`;

  document.getElementById('quiz-question-text').textContent = state.lang === 'he' ? quiz.questionHe : quiz.questionEn;

  const optionsContainer = document.getElementById('quiz-options-container');
  optionsContainer.innerHTML = '';

  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.classList.add('hidden');

  quiz.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt-btn';
    btn.textContent = state.lang === 'he' ? opt.textHe : opt.textEn;
    btn.addEventListener('click', () => handleQuizAnswer(opt, btn, quiz.options));
    optionsContainer.appendChild(btn);
  });

  // Focus 3D camera on this test site
  const camPos = new THREE.Vector3(...treifah.cameraPosition);
  const camTarget = new THREE.Vector3(...treifah.cameraTarget);
  cameraController.moveTo(camPos, camTarget, 0.8);
  treifahVisualizer.showDefect(treifah, true);
}

function handleQuizAnswer(selectedOpt, selectedBtn, allOpts) {
  state.quizScore.total++;

  const isCorrect = selectedOpt.correct;
  if (isCorrect) {
    state.quizScore.correct++;
    sound.playKosherChime();
    selectedBtn.classList.add('correct');
  } else {
    sound.playTreifahAlarm();
    selectedBtn.classList.add('wrong');
  }

  // Disable all option buttons
  document.querySelectorAll('.quiz-opt-btn').forEach((b, i) => {
    b.disabled = true;
    if (allOpts[i].correct) b.classList.add('correct');
  });

  // Update Score badge
  document.getElementById('quiz-correct-count').textContent = state.quizScore.correct;
  document.getElementById('quiz-total-count').textContent = state.quizScore.total;

  // Show Feedback Box
  const treifah = TREIFOT_18[state.quizCurrentIndex];
  const feedbackBox = document.getElementById('quiz-feedback-box');
  const feedbackHeader = document.getElementById('quiz-feedback-header');
  const feedbackText = document.getElementById('quiz-feedback-explanation');

  feedbackBox.classList.remove('hidden');
  feedbackHeader.className = `feedback-header ${isCorrect ? 'success' : 'fail'}`;
  feedbackHeader.textContent = isCorrect
    ? (state.lang === 'he' ? '✓ פסק הלכה מדויק!' : '✓ Correct Halachic Ruling!')
    : (state.lang === 'he' ? '✕ שגית בפסק ההלכה' : '✕ Incorrect Ruling');

  feedbackText.textContent = state.lang === 'he' ? treifah.inspectCase.explanationHe : treifah.inspectCase.explanationEn;
}

// -------------------------------------------------------------
// REAL SPECIMENS 3D (Z-ANATOMY & VET ANATOMY)
// -------------------------------------------------------------
function renderSpecimensList() {
  const container = document.getElementById('specimens-grid');
  container.innerHTML = '';

  ANATOMICAL_SPECIMENS.forEach((specimen) => {
    const card = document.createElement('div');
    card.className = 'specimen-card';
    card.innerHTML = `
      <div class="specimen-header">
        <div class="specimen-title">${state.lang === 'he' ? specimen.titleHe : specimen.titleEn}</div>
        <span class="specimen-badge">3D Scan</span>
      </div>
      <div class="specimen-author">${state.lang === 'he' ? 'מקור:' : 'Source:'} ${specimen.author}</div>
      <p class="specimen-desc">${state.lang === 'he' ? specimen.descriptionHe : specimen.descriptionEn}</p>
      <div class="specimen-card-actions">
        <button class="specimen-action-btn load-main-btn">
          <span>👁️</span> <span>${state.lang === 'he' ? 'טען לתצוגה ראשית' : 'Load to Main 3D'}</span>
        </button>
        <button class="specimen-action-btn modal-btn">
          <span>🔍</span> <span>${state.lang === 'he' ? 'חלון מוגדל' : 'Enlarge'}</span>
        </button>
      </div>
    `;

    card.querySelector('.load-main-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      // Load directly into primary viewport
      const specimenContainer = document.getElementById('specimen-primary-container');
      const iframe = document.getElementById('primary-specimen-iframe');
      const canvasEl = document.getElementById('webgl-canvas');
      const toolbar = document.querySelector('.floating-toolbar');

      if (specimenContainer) specimenContainer.classList.remove('hidden');
      if (canvasEl) canvasEl.classList.add('hidden');
      if (toolbar) toolbar.classList.add('hidden');

      if (iframe) {
        iframe.src = `https://sketchfab.com/models/${specimen.sketchfabUid}/embed?autostart=1&internal=1&ui_infos=0&ui_watermark=0`;
      }

      // Update pills
      document.querySelectorAll('.specimen-pill').forEach((pill) => {
        pill.classList.toggle('active', pill.dataset.specimen === specimen.id);
      });

      if (specimen.organId) {
        setMode('explore');
        selectOrgan(specimen.organId);
      }
    });

    card.querySelector('.modal-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playClick();
      openSpecimenModal(specimen);
    });

    card.addEventListener('click', () => {
      card.querySelector('.load-main-btn').click();
    });

    container.appendChild(card);
  });
}


function openSpecimenModal(specimen) {
  const modal = document.getElementById('specimen-modal');
  const title = document.getElementById('modal-specimen-title');
  const desc = document.getElementById('modal-specimen-desc');
  const iframeBox = document.getElementById('modal-iframe-container');

  title.textContent = state.lang === 'he' ? specimen.titleHe : specimen.titleEn;
  desc.textContent = state.lang === 'he' ? specimen.descriptionHe : specimen.descriptionEn;

  // Safe Sketchfab 3D Embed
  iframeBox.innerHTML = `
    <iframe title="${specimen.titleEn}"
      frameborder="0"
      allowfullscreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      xr-spatial-tracking
      execution-while-out-of-viewport
      execution-while-not-rendered
      web-share
      src="https://sketchfab.com/models/${specimen.sketchfabUid}/embed?autostart=1&internal=1&ui_infos=0&ui_watermark=0">
    </iframe>
  `;

  modal.classList.remove('hidden');
}

function closeModal() {
  sound.playClick();
  const modal = document.getElementById('specimen-modal');
  modal.classList.add('hidden');
  document.getElementById('modal-iframe-container').innerHTML = '';
}

// -------------------------------------------------------------
// SUPERMARKET & BUTCHER BEEF CUTS GUIDE (1-19)
// -------------------------------------------------------------
function toggleBeefCutsExperience(enable) {
  state.isBeefCutsActive = enable !== undefined ? enable : !state.isBeefCutsActive;

  const bannerBtn = document.getElementById('btn-toggle-beef-cuts');
  const bannerStatus = document.getElementById('beef-cuts-btn-status');
  const pillBtn = document.getElementById('btn-specimen-beef-cuts');

  if (state.isBeefCutsActive) {
    // Automatically switch to the muscular system view if not active
    if (state.skinMode !== 'muscle') {
      setSkinMode('muscle');
    }
    activateWebGLMode();

    if (bannerBtn) bannerBtn.classList.add('active');
    if (bannerStatus) bannerStatus.textContent = 'פעיל ✓';
    if (pillBtn) pillBtn.classList.add('active');

    if (beefCutsVisualizer) {
      beefCutsVisualizer.setVisible(true);
    }

    setMode('beef-cuts');
    renderBeefCutsPanel();
    selectBeefCut(state.selectedBeefCutId || 'entrecote', false);
    sound.playSelect();
  } else {
    if (bannerBtn) bannerBtn.classList.remove('active');
    if (bannerStatus) bannerStatus.textContent = 'הפעל מפה ❯';
    if (pillBtn) pillBtn.classList.remove('active');

    if (beefCutsVisualizer) {
      beefCutsVisualizer.setVisible(false);
    }
    setMode('explore');
  }
}

function renderBeefCutsPanel() {
  const grid = document.getElementById('beef-cuts-grid');
  if (!grid) return;
  grid.innerHTML = '';

  const filter = state.beefCutsFilter || 'all';
  const search = (state.beefCutsSearch || '').trim().toLowerCase();

  const filteredCuts = BEEF_CUTS.filter(cut => {
    // Section / Cooking method filter
    if (filter === 'forequarter' && cut.section !== 'forequarter') return false;
    if (filter === 'hindquarter' && cut.section !== 'hindquarter') return false;
    if (filter === 'grill' && !cut.cookingMethods.some(m => m.includes('גריל') || m.includes('סטייק'))) return false;
    if (filter === 'stew' && !cut.cookingMethods.some(m => m.includes('בישול') || m.includes('סו-וויד') || m.includes('חמין') || m.includes('קדרה'))) return false;

    // Search query
    if (search) {
      const matchNum = String(cut.number).includes(search);
      const matchHe = cut.nameHe.toLowerCase().includes(search) || cut.aliasesHe.toLowerCase().includes(search);
      const matchEn = cut.nameEn.toLowerCase().includes(search);
      if (!matchNum && !matchHe && !matchEn) return false;
    }
    return true;
  });

  const countLabel = document.getElementById('beef-cuts-count-label');
  if (countLabel) countLabel.textContent = `${filteredCuts.length} נתחים`;

  filteredCuts.forEach(cut => {
    const tile = document.createElement('div');
    tile.className = `beef-cut-tile ${cut.id === state.selectedBeefCutId ? 'active' : ''}`;
    tile.dataset.cutId = cut.id;

    tile.innerHTML = `
      <div class="tile-number-badge">${cut.number}</div>
      <div class="tile-texts">
        <span class="tile-name">${cut.nameHe}</span>
        <span class="tile-sub">${cut.nameEn}</span>
      </div>
    `;

    tile.addEventListener('click', () => {
      selectBeefCut(cut.id, true);
    });

    grid.appendChild(tile);
  });

  renderBeefCutSpotlight(state.selectedBeefCutId || 'entrecote');
}

function renderBeefCutSpotlight(cutId) {
  const cut = BEEF_CUTS.find(c => c.id === cutId) || BEEF_CUTS[0];
  if (!cut) return;

  const numEl = document.getElementById('spotlight-number');
  const nameEl = document.getElementById('spotlight-name');
  const aliasesEl = document.getElementById('spotlight-aliases');
  const enEl = document.getElementById('spotlight-en');
  const secEl = document.getElementById('spotlight-section-tag');
  const fatEl = document.getElementById('spotlight-fat-tag');
  const descEl = document.getElementById('spotlight-characteristics');
  const dishesEl = document.getElementById('spotlight-dishes');
  const tipsEl = document.getElementById('spotlight-tips');
  const chipsContainer = document.getElementById('spotlight-cooking-chips');

  if (numEl) numEl.textContent = cut.number;
  if (nameEl) nameEl.textContent = cut.nameHe;
  if (aliasesEl) aliasesEl.textContent = cut.aliasesHe;
  if (enEl) enEl.textContent = cut.nameEn;

  if (secEl) {
    secEl.textContent = cut.sectionHe;
    secEl.className = `cut-section-tag ${cut.section}`;
  }

  if (fatEl) fatEl.textContent = `רמת שומן: ${cut.fatLevel}`;
  if (descEl) descEl.textContent = cut.characteristics;
  if (dishesEl) dishesEl.textContent = cut.popularDishes;
  if (tipsEl) tipsEl.textContent = cut.chefTips;

  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    cut.cookingMethods.forEach(method => {
      const chip = document.createElement('span');
      chip.className = 'cooking-chip';
      let icon = '🔥';
      if (method.includes('סו-וויד')) icon = '⏱️';
      else if (method.includes('עישון')) icon = '💨';
      else if (method.includes('תנור') || method.includes('אפייה')) icon = '🍳';
      else if (method.includes('טחינה')) icon = '🥩';
      else if (method.includes('מרק') || method.includes('בישול')) icon = '🍲';
      chip.textContent = `${icon} ${method}`;
      chipsContainer.appendChild(chip);
    });
  }

  // Update active state in list
  document.querySelectorAll('.beef-cut-tile').forEach(tile => {
    tile.classList.toggle('active', tile.dataset.cutId === cut.id);
  });
}

function selectBeefCut(cutIdentifier, shouldMoveCam = true) {
  const cut = BEEF_CUTS.find(c => c.id === cutIdentifier || c.number === cutIdentifier);
  if (!cut) return;

  state.selectedBeefCutId = cut.id;
  sound.playSelect();

  renderBeefCutSpotlight(cut.id);

  if (beefCutsVisualizer) {
    beefCutsVisualizer.selectCut(cut.id);
  }

  if (shouldMoveCam && cameraController) {
    const target = new THREE.Vector3(...cut.cameraTarget);
    const pos = new THREE.Vector3(...cut.cameraPos);
    cameraController.moveTo(pos, target, 0.85);
  }
}

// -------------------------------------------------------------
// RAYCASTING & MOUSE INTERACTION
// -------------------------------------------------------------
function onCanvasMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  // 1. High-priority hit testing for Supermarket Beef Cuts markers
  if (beefCutsVisualizer && beefCutsVisualizer.isVisible()) {
    const cutHits = raycaster.intersectObjects(beefCutsVisualizer.getIntersectables(), true);
    if (cutHits.length > 0) {
      let hitObj = cutHits[0].object;
      while (hitObj && !hitObj.userData?.cut && hitObj.parent) {
        hitObj = hitObj.parent;
      }
      const cut = hitObj?.userData?.cut;
      if (cut) {
        hoveredOrgan = null;
        hoverBadge.classList.remove('hidden');
        hoverBadge.textContent = `🥩 מס' ${cut.number}: ${cut.nameHe} (${cut.nameEn})`;
        const canvasRect = canvas.getBoundingClientRect();
        const badgeW = hoverBadge.offsetWidth || 220;
        const badgeH = hoverBadge.offsetHeight || 36;
        const pad = 16;
        const mouseX = event.clientX - canvasRect.left;
        const mouseY = event.clientY - canvasRect.top;
        let bx = mouseX > canvasRect.width * 0.45 ? (mouseX - badgeW - pad) : (mouseX + pad);
        let by = mouseY < 120 ? (mouseY + pad + 10) : (mouseY - badgeH - pad);
        bx = Math.max(pad, Math.min(bx, canvasRect.width - badgeW - pad));
        by = Math.max(pad, Math.min(by, canvasRect.height - badgeH - pad));
        hoverBadge.style.left = `${bx}px`;
        hoverBadge.style.top = `${by}px`;
        canvas.style.cursor = 'pointer';
        return;
      }
    }
  }

  canvas.style.cursor = 'default';

  // 2. Standard organ / system raycasting
  const isSolidSkinMode = state.skinMode === 'solid';
  const isAnatomyOrDefectView = state.activeMode === 'treifot' || state.activeMode === 'bedikah' || state.activeMode === 'shechita';

  const interactiveObjects = [];
  if (root && root.visible) {
    organMeshes.forEach(mesh => {
      if (mesh.visible) {
        const isSil = mesh.userData?.system === 'silhouette';
        if (isSolidSkinMode && !isSil) return; // In solid skin view, hide internal organ hovers
        if (isAnatomyOrDefectView && isSil) return; // In anatomy/treifot view, never hover outer skin
        interactiveObjects.push(mesh);
      }
    });
  }
  if (importedSystems.allMeshes && importedSystems.allMeshes.length > 0) {
    importedSystems.allMeshes.forEach(mesh => {
      if (mesh.visible) {
        const isSil = mesh.userData?.system === 'silhouette';
        if (isSolidSkinMode && !isSil) return; // In solid cow view, only the cow body/skin is interactive
        if (isAnatomyOrDefectView && isSil) return; // In anatomy/18 treifot view, never hover body/skin
        interactiveObjects.push(mesh);
      }
    });
  }
  if (muscleModelGroup && muscleModelGroup.visible) {
    muscleModelGroup.traverse(mesh => {
      if (mesh.isMesh && mesh.visible) {
        interactiveObjects.push(mesh);
      }
    });
  }

  const intersects = raycaster.intersectObjects(interactiveObjects, true);

  if (intersects.length > 0) {
    // If not in solid skin mode, prioritize internal organs over translucent skin
    const hasNonSilhouette = intersects.some(
      ix => ix.object.userData?.system !== 'silhouette'
    );

    let hit = null;
    for (let i = 0; i < intersects.length; i++) {
      const obj = intersects[i].object;
      if (obj.userData?.system === 'silhouette' && hasNonSilhouette) {
        continue;
      }
      hit = obj;
      break;
    }
    if (!hit) hit = intersects[0].object;

    let topMesh = hit;
    while (topMesh.parent && !topMesh.userData?.isOrgan && topMesh.parent !== root && topMesh.parent !== importedModelGroup) {
      topMesh = topMesh.parent;
    }

    // In anatomy, treifot, shechita, or internal view: ignore any hit that is silhouette
    if (topMesh.userData?.system === 'silhouette' && (isAnatomyOrDefectView || state.skinMode === 'xray' || state.skinMode === 'muscle' || state.skinMode === 'none')) {
      hoveredOrgan = null;
      hoverBadge.classList.add('hidden');
      return;
    }

    if (topMesh.userData?.isOrgan) {
      const organ = ORGANS[topMesh.userData.organId];
      hoveredOrgan = organ || {
        id: topMesh.userData.organId || 'keres',
        he: topMesh.userData.labelHe || 'איבר פנימי',
        en: topMesh.userData.labelEn || 'Internal Organ'
      };
      hoverBadge.classList.remove('hidden');
      hoverBadge.textContent = state.lang === 'he' ? hoveredOrgan.he : hoveredOrgan.en;

      // Smart badge positioning: dynamically place in free space
      const canvasRect = canvas.getBoundingClientRect();
      const badgeW = hoverBadge.offsetWidth || 180;
      const badgeH = hoverBadge.offsetHeight || 36;
      const pad = 16;
      const mouseX = event.clientX - canvasRect.left;
      const mouseY = event.clientY - canvasRect.top;

      let bx = mouseX > canvasRect.width * 0.45 ? (mouseX - badgeW - pad) : (mouseX + pad);
      let by = mouseY < 120 ? (mouseY + pad + 10) : (mouseY - badgeH - pad);

      bx = Math.max(pad, Math.min(bx, canvasRect.width - badgeW - pad));
      by = Math.max(pad, Math.min(by, canvasRect.height - badgeH - pad));

      hoverBadge.style.left = `${bx}px`;
      hoverBadge.style.top = `${by}px`;
      return;
    }
  }

  hoveredOrgan = null;
  hoverBadge.classList.add('hidden');
}

let pointerStartX = 0;
let pointerStartY = 0;
let hasDragged = false;

canvas.addEventListener('pointerdown', (e) => {
  pointerStartX = e.clientX;
  pointerStartY = e.clientY;
  hasDragged = false;
});

canvas.addEventListener('pointermove', (e) => {
  const dx = e.clientX - pointerStartX;
  const dy = e.clientY - pointerStartY;
  if (dx * dx + dy * dy > 25) {
    hasDragged = true;
  }
});

function onCanvasClick(e) {
  if (hasDragged) {
    // Rotation or pan gesture completed: do NOT snap camera or trigger selection!
    return;
  }

  // Check Beef Cuts 3D marker hits
  if (beefCutsVisualizer && beefCutsVisualizer.isVisible()) {
    const cutHits = raycaster.intersectObjects(beefCutsVisualizer.getIntersectables(), true);
    if (cutHits.length > 0) {
      let hitObj = cutHits[0].object;
      while (hitObj && !hitObj.userData?.cut && hitObj.parent) {
        hitObj = hitObj.parent;
      }
      const cut = hitObj?.userData?.cut;
      if (cut) {
        selectBeefCut(cut.id, true);
        return;
      }
    }
  }

  if (hoveredOrgan && hoveredOrgan.id) {
    setMode('explore');
    selectOrgan(hoveredOrgan.id);
  }
}

function onWindowResize() {
  const width = canvas.parentElement.clientWidth;
  const height = canvas.parentElement.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}

// -------------------------------------------------------------
// INTERNATIONALIZATION (HEBREW / ENGLISH)
// -------------------------------------------------------------
function applyLanguage() {
  const t = TRANSLATIONS[state.lang];
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'he' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });

  document.getElementById('btn-lang-toggle').querySelector('.lang-text').textContent =
    state.lang === 'he' ? 'EN' : 'עב';

  // Re-render localized dynamic components
  if (shechitaVisualizer) shechitaVisualizer.setLanguage(state.lang);
  renderShechitaPanel();
  renderTreifotList();
  renderSpecimensList();
  if (state.selectedOrganId) selectOrgan(state.selectedOrganId);
  if (state.activeTreifahId) selectTreifah(state.activeTreifahId);
  renderQuizQuestion();
}

// -------------------------------------------------------------
// MAIN RENDER LOOP
// -------------------------------------------------------------
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  const time = clock.getElapsedTime();

  // Auto-rotate scene when enabled
  if (state.autoRotate) {
    root.rotation.y += delta * 0.3;
    importedModelGroup.rotation.y += delta * 0.3;
  }

  // Keep shechita visualizer synced with cow model rotation
  if (shechitaVisualizer && shechitaVisualizer.group) {
    shechitaVisualizer.group.rotation.y = importedModelGroup.rotation.y;
  }
  // Keep muscle model synced with cow model rotation
  if (muscleModelGroup) {
    muscleModelGroup.rotation.y = importedModelGroup.rotation.y;
  }
  // Keep supermarket beef cuts visualizer synced with cow model rotation
  if (beefCutsVisualizer && beefCutsVisualizer.group) {
    beefCutsVisualizer.group.rotation.y = importedModelGroup.rotation.y;
    beefCutsVisualizer.update(time);
  }

  cameraController.update(delta);
  treifahVisualizer.update(time);
  if (shechitaVisualizer) shechitaVisualizer.update(time);

  renderer.render(scene, camera);
}

// Initialize Application
initUI();
animate();

window.__simcowleh = {
  THREE,
  scene,
  camera,
  cameraController,
  importedSystems,
  importedMaterials,
  importedModelGroup,
  muscleModelGroup,
  beefCutsVisualizer,
  loadMuscleModel,
  toggleBeefCutsExperience,
  selectBeefCut,
  BEEF_CUTS,
  state,
  switchPrimarySpecimen,
  setSkinMode
};
window.__parasim = window.__simcowleh;
