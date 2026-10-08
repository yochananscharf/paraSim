import * as THREE from 'three';
import { ORGANS } from '../data/organData.js';
import { createHolsteinTexture } from './holsteinTexture.js';

export function createBovineAnatomyScene() {
  const root = new THREE.Group();
  root.name = 'BovineAnatomyRoot';

  // System groups for easy layer toggling
  const groups = {
    silhouette: new THREE.Group(),
    skeletal: new THREE.Group(),
    respiratory: new THREE.Group(),
    digestive: new THREE.Group(),
    vital: new THREE.Group(),
    nervous: new THREE.Group(),
    limbs: new THREE.Group(),
    defects: new THREE.Group() // For puncture markers, sirchot, fractures
  };

  Object.entries(groups).forEach(([name, grp]) => {
    grp.name = `system_${name}`;
    root.add(grp);
  });

  const organMeshes = new Map();
  const holsteinTexture = createHolsteinTexture();

  // Materials with rich colors & physical highlights
  const materials = {
    bodySolid: new THREE.MeshStandardMaterial({
      map: holsteinTexture,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide
    }),
    bodyGlass: new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.1,
      emissive: 0x0369a1,
      emissiveIntensity: 0.25,
      side: THREE.DoubleSide,
      depthWrite: true
    }),
    bodyWireframe: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    }),
    snout: new THREE.MeshStandardMaterial({
      color: 0xfda4af, // pinkish cow muzzle
      roughness: 0.7
    }),
    udder: new THREE.MeshStandardMaterial({
      color: 0xfbcfe8,
      roughness: 0.6
    }),
    bone: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.05
    }),
    spineCord: new THREE.MeshStandardMaterial({
      color: 0xfde047,
      emissive: 0xb45309,
      emissiveIntensity: 0.2,
      roughness: 0.3
    }),
    brain: new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.6,
      bumpScale: 0.05
    }),
    trachea: new THREE.MeshStandardMaterial({
      color: 0xdbeafe,
      roughness: 0.5,
      metalness: 0.1
    }),
    esophagus: new THREE.MeshStandardMaterial({
      color: 0xf87171,
      roughness: 0.6
    }),
    lungRight: new THREE.MeshStandardMaterial({
      color: 0xfca5a5,
      roughness: 0.7,
      metalness: 0.05
    }),
    lungLeft: new THREE.MeshStandardMaterial({
      color: 0xf87171,
      roughness: 0.7,
      metalness: 0.05
    }),
    heart: new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.3,
      metalness: 0.2
    }),
    rumen: new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.8
    }),
    reticulum: new THREE.MeshStandardMaterial({
      color: 0xa8a29e,
      roughness: 0.7,
      wireframe: false
    }),
    omasum: new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.8
    }),
    abomasum: new THREE.MeshStandardMaterial({
      color: 0xe0a96d,
      roughness: 0.6
    }),
    intestines: new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      roughness: 0.6
    }),
    liver: new THREE.MeshStandardMaterial({
      color: 0x881337,
      roughness: 0.4
    }),
    gallbladder: new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x047857,
      emissiveIntensity: 0.25,
      roughness: 0.2
    }),
    spleen: new THREE.MeshStandardMaterial({
      color: 0x6b21a8,
      roughness: 0.5
    }),
    kidney: new THREE.MeshStandardMaterial({
      color: 0x991b1b,
      roughness: 0.5
    }),
    tendon: new THREE.MeshStandardMaterial({
      color: 0xecfeff,
      roughness: 0.3
    }),
    defectPuncture: new THREE.MeshBasicMaterial({
      color: 0xff0044,
      wireframe: false
    }),
    defectSircha: new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.85,
      roughness: 0.4
    })
  };

  // Helper to register interactive organ
  function registerOrgan(mesh, organKey, explodeDir = new THREE.Vector3(0, 0, 0)) {
    const defaultMat = mesh.material || null;
    let highlightMat = null;
    if (defaultMat) {
      highlightMat = defaultMat.clone();
      if (highlightMat.emissive) {
        highlightMat.emissive.set(0x38bdf8);
        highlightMat.emissiveIntensity = 0.5;
      }
    }

    mesh.userData = {
      isOrgan: true,
      organId: organKey,
      meta: ORGANS[organKey],
      defaultMaterial: defaultMat,
      highlightMaterial: highlightMat,
      basePosition: mesh.position.clone(),
      explodeDirection: explodeDir
    };

    organMeshes.set(organKey, mesh);
  }

  buildCowBodyMesh(groups.silhouette, materials);
  buildSkeletalMesh(groups.skeletal, materials, registerOrgan);
  buildRespiratoryMesh(groups.respiratory, materials, registerOrgan);
  buildDigestiveMesh(groups.digestive, materials, registerOrgan);
  buildVitalMesh(groups.vital, materials, registerOrgan);
  buildNervousMesh(groups.nervous, materials, registerOrgan);
  buildLimbsMesh(groups.limbs, materials, registerOrgan);

  return { root, groups, organMeshes, materials };
}

// -------------------------------------------------------------
// 1. COW BODY MESH (Holstein Skin & Holographic Glass)
// -------------------------------------------------------------
function buildCowBodyMesh(group, mats) {
  // Container for solid Holstein cow
  const solidGroup = new THREE.Group();
  solidGroup.name = 'cow_body_solid';

  // Container for translucent glass cow
  const glassGroup = new THREE.Group();
  glassGroup.name = 'cow_body_glass';

  function createPart(geo, matSolid, matGlass, pos, rot, scale) {
    const meshSolid = new THREE.Mesh(geo, matSolid || mats.bodySolid);
    if (pos) meshSolid.position.set(...pos);
    if (rot) meshSolid.rotation.set(...rot);
    if (scale) meshSolid.scale.set(...scale);
    solidGroup.add(meshSolid);

    const meshGlass = new THREE.Mesh(geo, matGlass || mats.bodyGlass);
    if (pos) meshGlass.position.set(...pos);
    if (rot) meshGlass.rotation.set(...rot);
    if (scale) meshGlass.scale.set(...scale);
    glassGroup.add(meshGlass);
  }

  // Torso / Barrel Chest
  const torsoGeo = new THREE.CylinderGeometry(0.72, 0.78, 2.1, 24, 12);
  torsoGeo.rotateZ(Math.PI / 2);
  torsoGeo.scale(1.0, 0.95, 1.22);
  createPart(torsoGeo, null, null, [-0.2, 1.15, 0]);

  // Shoulder & Withers (Gabanon)
  const chestGeo = new THREE.SphereGeometry(0.76, 20, 16);
  chestGeo.scale(1.15, 0.98, 1.05);
  createPart(chestGeo, null, null, [0.72, 1.18, 0]);

  // Rump & Hip Flank
  const rumpGeo = new THREE.SphereGeometry(0.78, 20, 16);
  rumpGeo.scale(1.15, 0.92, 0.96);
  createPart(rumpGeo, null, null, [-1.15, 1.15, 0]);

  // Neck with Dewlap (Dildul / Tzavar)
  const neckGeo = new THREE.CylinderGeometry(0.38, 0.58, 0.95, 20);
  neckGeo.rotateZ(-Math.PI / 4.2);
  neckGeo.scale(1.0, 1.15, 0.85);
  createPart(neckGeo, null, null, [1.22, 1.34, 0]);

  // Head / Cranium
  const headGeo = new THREE.ConeGeometry(0.42, 1.05, 18);
  headGeo.rotateZ(-Math.PI / 2.3);
  headGeo.scale(1.0, 1.1, 0.82);
  createPart(headGeo, null, null, [1.72, 1.48, 0]);

  // Pinkish Bovine Muzzle / Snout
  const snoutGeo = new THREE.BoxGeometry(0.24, 0.22, 0.28);
  createPart(snoutGeo, mats.snout, mats.bodyGlass, [2.22, 1.32, 0], [0, 0, -0.3]);

  // Bovine Ears (angled laterally)
  const earGeoR = new THREE.ConeGeometry(0.09, 0.32, 10);
  earGeoR.rotateZ(Math.PI / 2.8);
  createPart(earGeoR, null, null, [1.68, 1.74, 0.42], [0.3, 0.2, 0]);

  const earGeoL = new THREE.ConeGeometry(0.09, 0.32, 10);
  earGeoL.rotateZ(Math.PI / 2.8);
  createPart(earGeoL, null, null, [1.68, 1.74, -0.42], [-0.3, -0.2, 0]);

  // Curved Bovine Horns
  const hornGeoR = new THREE.TorusGeometry(0.28, 0.055, 10, 20, Math.PI / 1.6);
  createPart(hornGeoR, mats.bone, mats.bone, [1.68, 1.84, 0.28], [0.6, 0.3, 0.4]);

  const hornGeoL = hornGeoR.clone();
  createPart(hornGeoL, mats.bone, mats.bone, [1.68, 1.84, -0.28], [-0.6, -0.3, 0.4]);

  // Udder (Atin) with 4 Teats (between hind legs)
  const udderGeo = new THREE.SphereGeometry(0.26, 16, 12);
  udderGeo.scale(1.1, 0.75, 0.9);
  createPart(udderGeo, mats.udder, mats.bodyGlass, [-0.68, 0.65, 0]);

  // 4 Teats
  const teatGeo = new THREE.CylinderGeometry(0.022, 0.015, 0.09, 8);
  const teatOffsets = [
    [-0.62, 0.52, 0.08],
    [-0.62, 0.52, -0.08],
    [-0.74, 0.52, 0.08],
    [-0.74, 0.52, -0.08]
  ];
  teatOffsets.forEach(pos => createPart(teatGeo, mats.udder, mats.bodyGlass, pos));

  // 4 Sturdy Bovine Legs (Front R, Front L, Hind R, Hind L)
  const legs = [
    { x: 0.72, z: 0.45, isFront: true },
    { x: 0.72, z: -0.45, isFront: true },
    { x: -1.15, z: 0.42, isFront: false },
    { x: -1.15, z: -0.42, isFront: false }
  ];

  legs.forEach(({ x, z, isFront }) => {
    // Upper leg / thigh
    const thighGeo = new THREE.CylinderGeometry(0.18, 0.12, 0.52, 14);
    createPart(thighGeo, null, null, [x, 0.72, z]);

    // Lower leg / shin
    const shinGeo = new THREE.CylinderGeometry(0.11, 0.08, 0.52, 12);
    createPart(shinGeo, null, null, [x, 0.32, z]);

    // Split Bovine Hooves (Parsot Sedurot - Chullin 59a)
    const hoofMat = mats.bone;
    const hoofHalfGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.12, 10, 1, false, 0, Math.PI * 0.9);
    // Right digit
    createPart(hoofHalfGeo, hoofMat, hoofMat, [x, 0.06, z + 0.035]);
    // Left digit
    createPart(hoofHalfGeo, hoofMat, hoofMat, [x, 0.06, z - 0.035], [0, Math.PI, 0]);
  });

  // Tail with hairy tuft
  const tailCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.7, 1.35, 0),
    new THREE.Vector3(-1.92, 0.95, 0),
    new THREE.Vector3(-1.88, 0.55, 0),
    new THREE.Vector3(-1.85, 0.38, 0)
  ]);
  const tailGeo = new THREE.TubeGeometry(tailCurve, 16, 0.038, 8, false);
  createPart(tailGeo, null, null);

  const tuftGeo = new THREE.ConeGeometry(0.08, 0.22, 10);
  createPart(tuftGeo, mats.bodySolid, mats.bodyGlass, [-1.84, 0.28, 0], [0, 0, Math.PI]);

  // Wireframe outline overlay
  const wireframeOverlay = solidGroup.clone();
  wireframeOverlay.traverse((child) => {
    if (child.isMesh) child.material = mats.bodyWireframe;
  });
  wireframeOverlay.name = 'cow_body_wireframe';

  group.add(solidGroup);
  group.add(glassGroup);
  group.add(wireframeOverlay);

  // Set default visibility: Glass hologram is on, wireframe subtle, solid togglable
  solidGroup.visible = false;
  glassGroup.visible = true;
  wireframeOverlay.visible = true;

  group.userData = {
    solidGroup,
    glassGroup,
    wireframeOverlay
  };
}

// -------------------------------------------------------------
// 2. SKELETAL SYSTEM (Spine, 13 Rib pairs, Pelvis, Skull)
// -------------------------------------------------------------
function buildSkeletalMesh(group, mats, register) {
  // Spine (Vertebrae chain)
  const spineGroup = new THREE.Group();
  spineGroup.name = 'spine_vertebrae';
  const vertCount = 24;
  for (let i = 0; i < vertCount; i++) {
    const t = i / (vertCount - 1);
    const x = 1.3 - t * 2.8;
    const y = 1.62 - Math.sin(t * Math.PI) * 0.18 + Math.cos(t * 1.5) * 0.05;
    const vertGeo = new THREE.BoxGeometry(0.08, 0.12, 0.16);
    const vert = new THREE.Mesh(vertGeo, mats.bone);
    vert.position.set(x, y, 0);
    spineGroup.add(vert);
  }
  group.add(spineGroup);

  // 13 Pairs of Ribs (Chullin 54: Rov Tzla'ot threshold)
  const ribsGroup = new THREE.Group();
  ribsGroup.name = 'ribs_tzlaot';
  const ribPairs = 13;
  for (let i = 0; i < ribPairs; i++) {
    const t = i / (ribPairs - 1);
    const ribX = 0.65 - t * 1.3;
    const ribHeight = 0.55 + Math.sin(t * Math.PI) * 0.25;
    const ribRadius = 0.58 + Math.sin(t * Math.PI) * 0.18;

    // Right Rib
    const curveR = new THREE.EllipseCurve(0, 0, ribRadius, ribHeight, Math.PI / 2, Math.PI * 1.45, false);
    const pointsR = curveR.getPoints(14).map(p => new THREE.Vector3(0, p.y, p.x));
    const ribGeoR = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pointsR), 14, 0.022, 6, false);
    const ribR = new THREE.Mesh(ribGeoR, mats.bone);
    ribR.position.set(ribX, 1.45, 0);
    ribsGroup.add(ribR);

    // Left Rib
    const pointsL = pointsR.map(p => new THREE.Vector3(p.x, p.y, -p.z));
    const ribGeoL = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pointsL), 14, 0.022, 6, false);
    const ribL = new THREE.Mesh(ribGeoL, mats.bone);
    ribL.position.set(ribX, 1.45, 0);
    ribsGroup.add(ribL);
  }
  register(ribsGroup, 'tzlaot');
  group.add(ribsGroup);

  // Skull bone structure
  const skullGeo = new THREE.BoxGeometry(0.35, 0.28, 0.3);
  const skull = new THREE.Mesh(skullGeo, mats.bone);
  skull.position.set(1.68, 1.55, 0);
  group.add(skull);

  // Pelvis bone
  const pelvisGeo = new THREE.TorusGeometry(0.42, 0.08, 8, 16, Math.PI);
  pelvisGeo.rotateX(Math.PI / 2);
  const pelvis = new THREE.Mesh(pelvisGeo, mats.bone);
  pelvis.position.set(-1.0, 1.4, 0);
  group.add(pelvis);
}

// -------------------------------------------------------------
// 3. RESPIRATORY SYSTEM (Trachea & Lungs with Lobes)
// -------------------------------------------------------------
function buildRespiratoryMesh(group, mats, register) {
  // Trachea (Kaneh) with cartilaginous rings
  const tracheaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.4, 1.35, 0),
    new THREE.Vector3(1.0, 1.25, 0),
    new THREE.Vector3(0.55, 1.15, 0),
    new THREE.Vector3(0.2, 1.1, 0)
  ]);
  const tracheaGeo = new THREE.TubeGeometry(tracheaCurve, 20, 0.07, 12, false);
  const tracheaMesh = new THREE.Mesh(tracheaGeo, mats.trachea);
  register(tracheaMesh, 'kaneh', new THREE.Vector3(0.3, 0.2, 0));
  group.add(tracheaMesh);

  // Lungs Group (Re'ah)
  const lungsGroup = new THREE.Group();
  lungsGroup.name = 'lungs_complete';

  // RIGHT LUNG: 3 Onot (lobes), 1 Umma (main base), 1 Verda (accessory lobe)
  const rightLungGroup = new THREE.Group();
  rightLungGroup.name = 'right_lung';

  // 3 Onot
  const ona1Geo = new THREE.SphereGeometry(0.18, 14, 12);
  ona1Geo.scale(1.2, 0.7, 0.5);
  const ona1 = new THREE.Mesh(ona1Geo, mats.lungRight);
  ona1.position.set(0.35, 1.25, 0.22);
  rightLungGroup.add(ona1);

  const ona2Geo = new THREE.SphereGeometry(0.2, 14, 12);
  ona2Geo.scale(1.2, 0.75, 0.55);
  const ona2 = new THREE.Mesh(ona2Geo, mats.lungRight);
  ona2.position.set(0.15, 1.2, 0.24);
  rightLungGroup.add(ona2);

  const ona3Geo = new THREE.SphereGeometry(0.19, 14, 12);
  ona3Geo.scale(1.1, 0.8, 0.5);
  const ona3 = new THREE.Mesh(ona3Geo, mats.lungRight);
  ona3.position.set(-0.02, 1.15, 0.25);
  rightLungGroup.add(ona3);

  // Umma (Main posterior lobe)
  const ummaRGeo = new THREE.SphereGeometry(0.32, 16, 14);
  ummaRGeo.scale(1.4, 0.85, 0.65);
  const ummaR = new THREE.Mesh(ummaRGeo, mats.lungRight);
  ummaR.position.set(-0.25, 1.08, 0.25);
  rightLungGroup.add(ummaR);

  // Aleh Verda (Rose / Accessory Lobe tucked in between)
  const verdaGeo = new THREE.ConeGeometry(0.14, 0.28, 10);
  verdaGeo.rotateX(Math.PI / 2);
  verdaGeo.scale(1.0, 0.6, 1.0);
  const verda = new THREE.Mesh(verdaGeo, mats.lungRight);
  verda.position.set(-0.08, 0.95, 0.08);
  rightLungGroup.add(verda);

  lungsGroup.add(rightLungGroup);

  // LEFT LUNG: 2 Onot, 1 Umma
  const leftLungGroup = new THREE.Group();
  leftLungGroup.name = 'left_lung';

  const lOna1Geo = new THREE.SphereGeometry(0.2, 14, 12);
  lOna1Geo.scale(1.2, 0.75, 0.5);
  const lOna1 = new THREE.Mesh(lOna1Geo, mats.lungLeft);
  lOna1.position.set(0.25, 1.22, -0.22);
  leftLungGroup.add(lOna1);

  const lOna2Geo = new THREE.SphereGeometry(0.22, 14, 12);
  lOna2Geo.scale(1.2, 0.8, 0.55);
  const lOna2 = new THREE.Mesh(lOna2Geo, mats.lungLeft);
  lOna2.position.set(0.05, 1.16, -0.24);
  leftLungGroup.add(lOna2);

  const lUmmaGeo = new THREE.SphereGeometry(0.34, 16, 14);
  lUmmaGeo.scale(1.4, 0.85, 0.65);
  const lUmma = new THREE.Mesh(lUmmaGeo, mats.lungLeft);
  lUmma.position.set(-0.25, 1.08, -0.25);
  leftLungGroup.add(lUmma);

  lungsGroup.add(leftLungGroup);

  // Sircha simulation mesh (adhesion band connecting lung to ribs)
  const sirchaCurve = new THREE.LineCurve3(
    new THREE.Vector3(0.15, 1.2, 0.24),
    new THREE.Vector3(0.15, 1.45, 0.55)
  );
  const sirchaGeo = new THREE.TubeGeometry(sirchaCurve, 10, 0.02, 8, false);
  const sirchaMesh = new THREE.Mesh(sirchaGeo, mats.defectSircha);
  sirchaMesh.name = 'sircha_mesh';
  sirchaMesh.visible = false;
  lungsGroup.add(sirchaMesh);

  register(lungsGroup, 'reah', new THREE.Vector3(0, 0.3, 0.4));
  group.add(lungsGroup);
}

// -------------------------------------------------------------
// 4. DIGESTIVE SYSTEM (Esophagus & The 4 Stomachs)
// -------------------------------------------------------------
function buildDigestiveMesh(group, mats, register) {
  // Esophagus (Veshet) running above trachea
  const veshetCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.4, 1.48, 0),
    new THREE.Vector3(1.0, 1.38, 0.05),
    new THREE.Vector3(0.5, 1.25, 0.04),
    new THREE.Vector3(0.0, 1.05, -0.1)
  ]);
  const veshetGeo = new THREE.TubeGeometry(veshetCurve, 20, 0.045, 10, false);
  const veshetMesh = new THREE.Mesh(veshetGeo, mats.esophagus);
  register(veshetMesh, 'veshet', new THREE.Vector3(0.2, 0.4, 0));
  group.add(veshetMesh);

  // 1. KERES (Rumen) - Massive dual-sac chamber occupying left flank
  const rumenGeo = new THREE.SphereGeometry(0.65, 20, 18);
  rumenGeo.scale(1.5, 1.1, 0.9);
  const rumenMesh = new THREE.Mesh(rumenGeo, mats.rumen);
  rumenMesh.position.set(-0.45, 0.95, -0.2);
  register(rumenMesh, 'keres', new THREE.Vector3(-0.6, 0.2, -0.7));
  group.add(rumenMesh);

  // 2. BEIT HAKOSOS (Reticulum / Honeycomb) - cranial, near diaphragm & heart
  const reticGeo = new THREE.SphereGeometry(0.28, 16, 14);
  reticGeo.scale(1.0, 1.1, 0.9);
  const reticMesh = new THREE.Mesh(reticGeo, mats.reticulum);
  reticMesh.position.set(0.12, 0.88, 0.18);
  register(reticMesh, 'beitHakosos', new THREE.Vector3(0.4, 0.1, 0.6));
  group.add(reticMesh);

  // 3. HAMESES (Omasum / Manyplies) - spherical, with book leaf folds
  const omasumGeo = new THREE.SphereGeometry(0.26, 16, 14);
  const omasumMesh = new THREE.Mesh(omasumGeo, mats.omasum);
  omasumMesh.position.set(-0.1, 0.78, 0.26);
  register(omasumMesh, 'hameses', new THREE.Vector3(0.0, -0.2, 0.7));
  group.add(omasumMesh);

  // 4. KEIVAH (Abomasum) - elongated glandular stomach leading to intestine
  const abomasumGeo = new THREE.ConeGeometry(0.24, 0.7, 16);
  abomasumGeo.rotateZ(Math.PI / 2.4);
  abomasumGeo.scale(1.0, 1.2, 0.8);
  const abomasumMesh = new THREE.Mesh(abomasumGeo, mats.abomasum);
  abomasumMesh.position.set(-0.28, 0.65, 0.18);
  register(abomasumMesh, 'keivah', new THREE.Vector3(-0.3, -0.5, 0.5));
  group.add(abomasumMesh);

  // Intestines (Dakin) - looping coils
  const intestinesGroup = new THREE.Group();
  const coilCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.6, 0.65, 0.2),
    new THREE.Vector3(-0.8, 0.8, 0.1),
    new THREE.Vector3(-0.95, 0.7, -0.1),
    new THREE.Vector3(-0.75, 0.9, -0.15),
    new THREE.Vector3(-0.65, 1.05, 0.0),
    new THREE.Vector3(-0.85, 1.1, 0.15),
    new THREE.Vector3(-1.0, 1.0, 0.0)
  ]);
  const coilGeo = new THREE.TubeGeometry(coilCurve, 32, 0.07, 8, false);
  const coilMesh = new THREE.Mesh(coilGeo, mats.intestines);
  intestinesGroup.add(coilMesh);
  register(intestinesGroup, 'dakin', new THREE.Vector3(-0.6, -0.4, 0.0));
  group.add(intestinesGroup);
}

// -------------------------------------------------------------
// 5. VITAL ORGANS (Heart, Liver, Gallbladder, Spleen, Kidneys)
// -------------------------------------------------------------
function buildVitalMesh(group, mats, register) {
  // Heart (Lev)
  const heartGeo = new THREE.ConeGeometry(0.24, 0.45, 16);
  heartGeo.rotateZ(Math.PI / 1.1);
  heartGeo.scale(1.1, 1.0, 0.9);
  const heartMesh = new THREE.Mesh(heartGeo, mats.heart);
  heartMesh.position.set(0.38, 0.85, 0.0);
  register(heartMesh, 'lev', new THREE.Vector3(0.4, -0.4, 0.0));
  group.add(heartMesh);

  // Liver (Kaved)
  const liverGeo = new THREE.SphereGeometry(0.42, 16, 14);
  liverGeo.scale(1.2, 0.75, 0.45);
  const liverMesh = new THREE.Mesh(liverGeo, mats.liver);
  liverMesh.position.set(0.0, 1.05, 0.35);
  register(liverMesh, 'kaved', new THREE.Vector3(0.2, 0.2, 0.7));
  group.add(liverMesh);

  // Gallbladder (Marah)
  const marahGeo = new THREE.SphereGeometry(0.11, 12, 10);
  marahGeo.scale(0.8, 1.4, 0.8);
  const marahMesh = new THREE.Mesh(marahGeo, mats.gallbladder);
  marahMesh.position.set(0.05, 0.95, 0.38);
  register(marahMesh, 'marah', new THREE.Vector3(0.3, 0.0, 0.8));
  group.add(marahMesh);

  // Spleen (Tchol) - elongated along the rumen
  const spleenGeo = new THREE.BoxGeometry(0.55, 0.18, 0.06);
  spleenGeo.rotateZ(-Math.PI / 6);
  const spleenMesh = new THREE.Mesh(spleenGeo, mats.spleen);
  spleenMesh.position.set(-0.5, 1.15, -0.32);
  register(spleenMesh, 'tchol', new THREE.Vector3(-0.5, 0.4, -0.7));
  group.add(spleenMesh);

  // Kidneys (Klayot)
  const kidneyGroup = new THREE.Group();
  const kRGeo = new THREE.SphereGeometry(0.16, 12, 10);
  kRGeo.scale(1.4, 0.9, 0.7);
  const kR = new THREE.Mesh(kRGeo, mats.kidney);
  kR.position.set(-0.78, 1.35, 0.18);
  kidneyGroup.add(kR);

  const kLGeo = kRGeo.clone();
  const kL = new THREE.Mesh(kLGeo, mats.kidney);
  kL.position.set(-0.85, 1.32, -0.18);
  kidneyGroup.add(kL);

  register(kidneyGroup, 'klayot', new THREE.Vector3(-0.6, 0.5, 0.2));
  group.add(kidneyGroup);
}

// -------------------------------------------------------------
// 6. NERVOUS SYSTEM (Brain & Spinal Cord)
// -------------------------------------------------------------
function buildNervousMesh(group, mats, register) {
  // Brain (Mo'ach)
  const brainGeo = new THREE.SphereGeometry(0.14, 16, 14);
  brainGeo.scale(1.2, 0.9, 1.0);
  const brainMesh = new THREE.Mesh(brainGeo, mats.brain);
  brainMesh.position.set(1.68, 1.58, 0.0);
  register(brainMesh, 'moach', new THREE.Vector3(0.8, 0.4, 0.0));
  group.add(brainMesh);

  // Spinal Cord (Chut HaShidrah) running through vertebrae
  const cordCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(1.6, 1.55, 0),
    new THREE.Vector3(1.2, 1.62, 0),
    new THREE.Vector3(0.5, 1.58, 0),
    new THREE.Vector3(-0.2, 1.6, 0),
    new THREE.Vector3(-0.9, 1.55, 0),
    new THREE.Vector3(-1.4, 1.45, 0)
  ]);
  const cordGeo = new THREE.TubeGeometry(cordCurve, 30, 0.025, 8, false);
  const cordMesh = new THREE.Mesh(cordGeo, mats.spineCord);
  register(cordMesh, 'chutHashidrah', new THREE.Vector3(0.0, 0.5, 0.0));
  group.add(cordMesh);
}

// -------------------------------------------------------------
// 7. LIMB & TENDON ANATOMY (Tzomet HaGidin & Boka D'Atma)
// -------------------------------------------------------------
function buildLimbsMesh(group, mats, register) {
  // Tzomet HaGidin (Tendon nexus above hock on hind leg)
  const tendonGroup = new THREE.Group();
  for (let i = -1; i <= 1; i++) {
    const tCurve = new THREE.LineCurve3(
      new THREE.Vector3(-1.18, 0.48, 0.42 + i * 0.02),
      new THREE.Vector3(-1.18, 0.28, 0.42 + i * 0.02)
    );
    const tGeo = new THREE.TubeGeometry(tCurve, 8, 0.012, 6, false);
    const tMesh = new THREE.Mesh(tGeo, mats.tendon);
    tendonGroup.add(tMesh);
  }
  register(tendonGroup, 'tzometHagidin', new THREE.Vector3(-0.4, -0.3, 0.5));
  group.add(tendonGroup);

  // Boka D'Atma (Hip Joint socket & femoral head)
  const hipGroup = new THREE.Group();
  const socketGeo = new THREE.SphereGeometry(0.14, 12, 10, 0, Math.PI);
  const socketMesh = new THREE.Mesh(socketGeo, mats.bone);
  socketMesh.position.set(-0.95, 1.15, 0.32);
  hipGroup.add(socketMesh);

  const headGeo = new THREE.SphereGeometry(0.12, 12, 10);
  const headMesh = new THREE.Mesh(headGeo, mats.tendon);
  headMesh.position.set(-0.95, 1.13, 0.32);
  hipGroup.add(headMesh);

  register(hipGroup, 'bokaDatma', new THREE.Vector3(-0.5, 0.2, 0.5));
  group.add(hipGroup);
}
