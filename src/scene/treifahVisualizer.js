import * as THREE from 'three';

export class TreifahVisualizer {
  constructor(scene, organMeshes) {
    this.scene = scene;
    this.organMeshes = organMeshes;
    this.activeDefectObjects = [];
    this.defectGroup = new THREE.Group();
    this.defectGroup.name = 'active_treifah_visuals';
    this.scene.add(this.defectGroup);
  }

  clear() {
    while (this.defectGroup.children.length > 0) {
      const obj = this.defectGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
      this.defectGroup.remove(obj);
    }
    this.activeDefectObjects = [];

    // Reset any organ special visibilities (like sircha)
    const reahMesh = this.organMeshes.get('reah');
    if (reahMesh) {
      const sircha = reahMesh.getObjectByName('sircha_mesh');
      if (sircha) sircha.visible = false;
    }
  }

  showDefect(treifah, isTreifahState = true) {
    this.clear();
    if (!treifah) return;

    const pos = new THREE.Vector3(...treifah.targetPosition);

    switch (treifah.defectType) {
      case 'puncture':
        this.createPunctureVisual(pos, treifah, isTreifahState);
        break;
      case 'severance':
        this.createSeveranceVisual(pos, treifah, isTreifahState);
        break;
      case 'fracture':
        this.createFractureVisual(pos, treifah, isTreifahState);
        break;
      case 'dislocation':
        this.createDislocationVisual(pos, treifah, isTreifahState);
        break;
      case 'claw':
        this.createClawStrikeVisual(pos, treifah, isTreifahState);
        break;
      case 'missing':
        this.createMissingVisual(pos, treifah, isTreifahState);
        break;
      default:
        this.createPunctureVisual(pos, treifah, isTreifahState);
    }

    // Special realistic lung adhesion Sircha (Treifah #7)
    if (treifah.id === 7) {
      this.createRealisticSirchaVisual(pos, isTreifahState);
    }
  }

  /**
   * Realistic Biological Puncture:
   * Features torn crater edges, inflamed perimeter, dark necrotic core,
   * and protruding thorn/needle for swallowed hardware (Reticulum / Keres).
   */
  createPunctureVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();

    // 1. Inflamed tissue halo (outer erythematous ring)
    const haloGeo = new THREE.RingGeometry(0.04, 0.12, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: isTreifahState ? 0xef4444 : 0x10b981,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.copy(position);
    halo.lookAt(position.clone().add(new THREE.Vector3(0, 0.8, 1)));
    group.add(halo);

    // 2. Torn tissue wound crater (3D necrotic crater)
    const craterGeo = new THREE.CylinderGeometry(0.035, 0.015, 0.06, 16, 2, false);
    const craterMat = new THREE.MeshStandardMaterial({
      color: isTreifahState ? 0x450a0a : 0x15803d,
      roughness: 0.8,
      metalness: 0.1,
      emissive: isTreifahState ? 0x991b1b : 0x052e16,
      emissiveIntensity: 0.4
    });
    const crater = new THREE.Mesh(craterGeo, craterMat);
    crater.position.copy(position);
    crater.quaternion.copy(halo.quaternion);
    crater.rotateX(Math.PI / 2);
    group.add(crater);

    // 3. For hardware disease (Needle/Thorn in Reticulum Treifah #12 & #11):
    // Realistic steel needle protruding through the organ wall
    if (treifah.id === 12 || treifah.id === 11) {
      const needleGeo = new THREE.CylinderGeometry(0.005, 0.002, 0.28, 8);
      const needleMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.15
      });
      const needle = new THREE.Mesh(needleGeo, needleMat);
      needle.position.copy(position).add(new THREE.Vector3(0.02, 0.06, 0.05));
      needle.rotation.set(0.6, 0.3, 0.8);
      group.add(needle);
    }

    // 4. Pulsing beacon ring
    const pulseGeo = new THREE.RingGeometry(0.12, 0.14, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: isTreifahState ? 0xff0055 : 0x34d399,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide
    });
    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.position.copy(position);
    pulseRing.quaternion.copy(halo.quaternion);
    pulseRing.userData = { isPulse: true, baseScale: 1.0 };
    group.add(pulseRing);
    this.activeDefectObjects.push(pulseRing);

    this.defectGroup.add(group);
  }

  /**
   * Realistic Transection / Severance (Chut HaShidrah & Kaneh/Veshet):
   * Features frayed neural fibers / muscular tissue gap and hemorrhage staining.
   */
  createSeveranceVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();

    // Severed gap indicator
    const gapGeo = new THREE.BoxGeometry(0.04, 0.22, 0.22);
    const gapMat = new THREE.MeshStandardMaterial({
      color: isTreifahState ? 0x991b1b : 0x10b981,
      roughness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const gap = new THREE.Mesh(gapGeo, gapMat);
    gap.position.copy(position);
    group.add(gap);

    // Frayed nerve fibers / tissue strands spanning the cut
    if (isTreifahState) {
      for (let i = 0; i < 6; i++) {
        const strandGeo = new THREE.CylinderGeometry(0.003, 0.003, 0.08, 6);
        const strandMat = new THREE.MeshStandardMaterial({
          color: 0xfef08a, // neural yellow
          roughness: 0.4
        });
        const strand = new THREE.Mesh(strandGeo, strandMat);
        strand.position.copy(position).add(new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.12,
          (Math.random() - 0.5) * 0.12
        ));
        strand.rotation.set(Math.random() * 0.5, Math.random() * 0.5, Math.PI / 2);
        group.add(strand);
      }
    }

    // Glowing alert ring
    const alertRingGeo = new THREE.TorusGeometry(0.14, 0.012, 12, 32);
    const alertRingMat = new THREE.MeshBasicMaterial({
      color: isTreifahState ? 0xff0044 : 0x10b981
    });
    const ring = new THREE.Mesh(alertRingGeo, alertRingMat);
    ring.position.copy(position);
    ring.rotation.y = Math.PI / 2;
    ring.userData = { isPulse: true, baseScale: 1.0 };
    group.add(ring);
    this.activeDefectObjects.push(ring);

    this.defectGroup.add(group);
  }

  /**
   * Realistic Bone Fracture (Rov Tzlaot - Treifah #14):
   * Features jagged displaced bone ends with exposed pinkish marrow (Mohach SheBaTzlaot).
   */
  createFractureVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();

    // 4 fractured rib models with jagged ends and exposed marrow
    for (let i = 0; i < 4; i++) {
      const ribX = position.x - 0.18 + i * 0.1;
      const ribY = position.y;
      const ribZ = position.z + 0.35;

      // Fractured bone fragment 1
      const frag1Geo = new THREE.CylinderGeometry(0.024, 0.024, 0.14, 8);
      const boneMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.4
      });
      const frag1 = new THREE.Mesh(frag1Geo, boneMat);
      frag1.position.set(ribX, ribY + 0.08, ribZ);
      frag1.rotation.z = 0.15;
      group.add(frag1);

      // Fractured bone fragment 2 (displaced)
      const frag2 = new THREE.Mesh(frag1Geo.clone(), boneMat);
      frag2.position.set(ribX - 0.015, ribY - 0.08, ribZ);
      frag2.rotation.z = -0.22;
      group.add(frag2);

      // Exposed red vascular marrow (Mohach)
      if (isTreifahState) {
        const marrowGeo = new THREE.SphereGeometry(0.018, 8, 8);
        const marrowMat = new THREE.MeshStandardMaterial({
          color: 0x991b1b,
          roughness: 0.3,
          emissive: 0x7f1d1d,
          emissiveIntensity: 0.5
        });
        const marrow = new THREE.Mesh(marrowGeo, marrowMat);
        marrow.position.set(ribX, ribY, ribZ);
        group.add(marrow);
      }
    }

    // Glowing boundary indicator
    const boxGeo = new THREE.BoxGeometry(0.45, 0.3, 0.2);
    const boxMat = new THREE.MeshBasicMaterial({
      color: isTreifahState ? 0xff0044 : 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const indicator = new THREE.Mesh(boxGeo, boxMat);
    indicator.position.set(position.x, position.y, position.z + 0.35);
    group.add(indicator);

    this.defectGroup.add(group);
  }

  /**
   * Realistic Lung Adhesions (Sirchot - Treifah #7):
   * Spanning fibrous connective tissue cords connecting lung surface to ribs.
   */
  createRealisticSirchaVisual(position, isTreifahState) {
    const group = new THREE.Group();

    // 5 fibrous branching strands bridging visceral to parietal pleura
    for (let i = 0; i < 5; i++) {
      const start = new THREE.Vector3(position.x - 0.1 + i * 0.05, position.y, position.z + 0.18);
      const end = new THREE.Vector3(position.x - 0.08 + i * 0.05, position.y + 0.08, position.z + 0.38);
      const mid = start.clone().lerp(end, 0.5).add(new THREE.Vector3(0, -0.02, 0));

      const curve = new THREE.CatmullRomCurve3([start, mid, end]);
      const tubeGeo = new THREE.TubeGeometry(curve, 16, 0.009, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: isTreifahState ? 0xef4444 : 0x10b981, // Red = Sircha Treifah; Green = Sircha Keshirah (Rov Matir)
        roughness: 0.5,
        transparent: true,
        opacity: 0.85
      });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      group.add(tube);
    }

    this.defectGroup.add(group);
  }

  /**
   * Realistic Hip Dislocation (Boka D'Atma - Treifah #16):
   * Features head of femur slipping out of the acetabulum with torn ligament fibers.
   */
  createDislocationVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();

    // Slipped Femur Head
    const headGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4
    });
    const head = new THREE.Mesh(headGeo, headMat);
    // Displaced position
    head.position.copy(position).add(new THREE.Vector3(0, -0.12, 0.08));
    group.add(head);

    // Directional Displacement Indicator
    const dir = new THREE.Vector3(0, -1, 0.6).normalize();
    const arrow = new THREE.ArrowHelper(dir, position, 0.25, isTreifahState ? 0xff0044 : 0x10b981, 0.08, 0.05);
    group.add(arrow);

    this.defectGroup.add(group);
  }

  /**
   * Realistic Predator Claw Strike (Dorusah - Treifah #13):
   * Deep parallel gouges with inflamed red venomous erythema perimeter.
   */
  createClawStrikeVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();

    for (let i = -1; i <= 1; i++) {
      const gougeGeo = new THREE.BoxGeometry(0.24, 0.02, 0.04);
      gougeGeo.rotateZ(Math.PI / 4);
      const gougeMat = new THREE.MeshStandardMaterial({
        color: isTreifahState ? 0x7f1d1d : 0x10b981,
        roughness: 0.6,
        emissive: isTreifahState ? 0x991b1b : 0x000000,
        emissiveIntensity: 0.5
      });
      const gouge = new THREE.Mesh(gougeGeo, gougeMat);
      gouge.position.copy(position).add(new THREE.Vector3(i * 0.045, i * 0.025, 0.22));
      group.add(gouge);
    }

    this.defectGroup.add(group);
  }

  createMissingVisual(position, treifah, isTreifahState) {
    const group = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(0.35, 0.3, 0.25);
    const wireGeo = new THREE.WireframeGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: isTreifahState ? 0xff0044 : 0x10b981
    });
    const box = new THREE.LineSegments(wireGeo, wireMat);
    box.position.copy(position);
    group.add(box);
    this.defectGroup.add(group);
  }

  update(time) {
    // Animate pulsing defect markers
    this.activeDefectObjects.forEach((obj) => {
      if (obj.userData && obj.userData.isPulse) {
        const s = 1.0 + Math.sin(time * 6) * 0.18;
        obj.scale.set(s, s, s);
      }
    });
  }
}
