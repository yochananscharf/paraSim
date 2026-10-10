import * as THREE from 'three';

/**
 * ShechitaZoneVisualizer
 * Visualizes the halachic boundaries of Shechita (מקום השחיטה בצוואר)
 * based on Masechet Chullin 18b-19b and Shulchan Aruch Yoreh De'ah 20-24.
 *
 * Designed specifically to mark the boundaries with high visual clarity
 * WITHOUT occluding or obscuring the trachea (קנה), esophagus (ושט), or vessels.
 * Uses transparent materials with depthWrite=false and luminous boundary rings.
 */
export class ShechitaZoneVisualizer {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'shechita_zone_visuals';
    this.group.visible = false;

    this.labelsGroup = new THREE.Group();
    this.labelsGroup.name = 'shechita_labels_group';
    this.group.add(this.labelsGroup);

    this.midRing = null;
    this.pulseMaterial = null;
    this.currentLang = 'he';
    this.showLabels = true;

    // Anatomical landmarks along the neck:
    // P_upper: immediately below cricoid ring / below Torbetz HaVeshet
    this.pUpper = new THREE.Vector3(0.725, 1.135, -0.015);
    // P_lower: near thoracic inlet / before bronchial branching of lungs
    this.pLower = new THREE.Vector3(0.445, 1.025, -0.042);
    // P_mid: middle of the neck (ideal slaughter incision zone)
    this.pMid = new THREE.Vector3(0.585, 1.080, -0.0285);

    this.buildZone();
    this.scene.add(this.group);
  }

  buildZone() {
    // Direction vector along neck
    const neckVec = this.pUpper.clone().sub(this.pLower);
    const height = neckVec.length();
    const neckDir = neckVec.clone().normalize();

    // Rotations
    const qCylinder = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      neckDir
    );
    const qTorus = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      neckDir
    );

    const radius = 0.062;

    // -------------------------------------------------------------
    // 1. Semi-transparent Holographic Corridor
    // Ultra-low opacity, depthWrite=false so trachea and esophagus
    // are 100% visible and NEVER occluded!
    // -------------------------------------------------------------
    const cylinderGeo = new THREE.CylinderGeometry(
      radius * 0.96, // slightly tapered at head
      radius * 1.04, // slightly wider at chest
      height,
      32,
      1,
      true // open ended
    );

    const cylinderMat = new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald green (kosher slaughter zone)
      emissive: 0x059669,
      emissiveIntensity: 0.18,
      roughness: 0.2,
      metalness: 0.1,
      transparent: true,
      opacity: 0.13, // Delicate veil
      depthWrite: false, // Critical: doesn't block depth buffer
      side: THREE.DoubleSide
    });

    const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.quaternion.copy(qCylinder);
    cylinderMesh.position.copy(this.pMid);
    cylinderMesh.name = 'shechita_zone_corridor';
    this.group.add(cylinderMesh);

    // -------------------------------------------------------------
    // 2. Longitudinal Framing Struts (Bracket guides)
    // -------------------------------------------------------------
    const strutMat = new THREE.LineBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    const strutOffsets = [
      new THREE.Vector3(0, 0, radius),
      new THREE.Vector3(0, 0, -radius),
      new THREE.Vector3(radius, 0, 0),
      new THREE.Vector3(-radius, 0, 0)
    ];

    const strutsGroup = new THREE.Group();
    strutsGroup.quaternion.copy(qCylinder);
    strutsGroup.position.copy(this.pMid);

    const halfH = height / 2;
    strutOffsets.forEach(off => {
      const pts = [
        new THREE.Vector3(off.x, -halfH, off.z),
        new THREE.Vector3(off.x, halfH, off.z)
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const line = new THREE.Line(geo, strutMat);
      strutsGroup.add(line);
    });
    this.group.add(strutsGroup);

    // -------------------------------------------------------------
    // 3. Boundary Limit Rings
    // -------------------------------------------------------------
    // Upper Boundary Ring (סחוס הקריקואיד / תורבץ הוושט)
    const ringGeoUpper = new THREE.TorusGeometry(radius * 0.98, 0.0028, 16, 48);
    const ringMatUpper = new THREE.MeshStandardMaterial({
      color: 0x38bdf8, // Luminous sky blue / cyan
      emissive: 0x0284c7,
      emissiveIntensity: 0.9,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    const ringUpper = new THREE.Mesh(ringGeoUpper, ringMatUpper);
    ringUpper.quaternion.copy(qTorus);
    ringUpper.position.copy(this.pUpper);
    ringUpper.name = 'shechita_ring_upper';
    this.group.add(ringUpper);

    // Lower Boundary Ring (סמוך לבית החזה וכנפי הריאה)
    const ringGeoLower = new THREE.TorusGeometry(radius * 1.04, 0.0028, 16, 48);
    const ringMatLower = ringMatUpper.clone();
    const ringLower = new THREE.Mesh(ringGeoLower, ringMatLower);
    ringLower.quaternion.copy(qTorus);
    ringLower.position.copy(this.pLower);
    ringLower.name = 'shechita_ring_lower';
    this.group.add(ringLower);

    // Optimal Slaughter Line Ring (אמצע הצוואר - לכתחילה)
    const ringGeoMid = new THREE.TorusGeometry(radius * 1.01, 0.0035, 16, 48);
    this.pulseMaterial = new THREE.MeshStandardMaterial({
      color: 0xfbbf24, // Warm gold
      emissive: 0xd97706,
      emissiveIntensity: 1.1,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.95,
      depthWrite: false
    });
    this.midRing = new THREE.Mesh(ringGeoMid, this.pulseMaterial);
    this.midRing.quaternion.copy(qTorus);
    this.midRing.position.copy(this.pMid);
    this.midRing.name = 'shechita_ring_optimal_center';
    this.group.add(this.midRing);

    // Build text label sprites
    this.rebuildLabels();
  }

  /**
   * Builds billboard text sprites and leader lines
   */
  rebuildLabels() {
    while (this.labelsGroup.children.length > 0) {
      const obj = this.labelsGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
      this.labelsGroup.remove(obj);
    }

    const isHe = this.currentLang === 'he';

    // 1. Upper Label
    const textUpper = isHe
      ? 'גבול עליון: שיפוי כובע ותורבץ הוושט'
      : 'Upper Limit: Cricoid & Torbetz HaVeshet';
    const posUpper = this.pUpper.clone().add(new THREE.Vector3(0.04, 0.09, 0.00));
    this.addLabelWithLeader(
      textUpper,
      posUpper,
      this.pUpper,
      '#38bdf8',
      'rgba(14, 116, 144, 0.25)',
      '#38bdf8'
    );

    // 2. Mid Label (Optimal Cut)
    const textMid = isHe
      ? '★ מקום שחיטה מובחר: אמצע הצוואר'
      : '★ Optimal Incision: Mid-Neck';
    const posMid = this.pMid.clone().add(new THREE.Vector3(0.01, -0.095, 0.00));
    this.addLabelWithLeader(
      textMid,
      posMid,
      this.pMid,
      '#fbbf24',
      'rgba(180, 83, 9, 0.25)',
      '#f59e0b'
    );

    // 3. Lower Label
    const textLower = isHe
      ? 'גבול תחתון: סמוך לחזה וכנפי הריאה'
      : 'Lower Limit: Thoracic Inlet & Lungs';
    const posLower = this.pLower.clone().add(new THREE.Vector3(-0.04, -0.09, 0.00));
    this.addLabelWithLeader(
      textLower,
      posLower,
      this.pLower,
      '#38bdf8',
      'rgba(14, 116, 144, 0.25)',
      '#38bdf8'
    );
  }

  addLabelWithLeader(text, labelPos, targetPos, textColor, bgColor, borderColor) {
    // Text Sprite
    const sprite = this.createTextSprite(text, {
      color: textColor,
      bgColor,
      borderColor,
      fontSize: 26
    });
    sprite.position.copy(labelPos);
    this.labelsGroup.add(sprite);

    // Leader Line
    const lineMat = new THREE.LineDashedMaterial({
      color: new THREE.Color(borderColor),
      dashSize: 0.01,
      gapSize: 0.005,
      transparent: true,
      opacity: 0.6,
      depthWrite: false
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      labelPos.clone().add(new THREE.Vector3(0, -0.02, 0)),
      targetPos
    ]);
    const line = new THREE.Line(lineGeo, lineMat);
    line.computeLineDistances();
    this.labelsGroup.add(line);
  }

  createTextSprite(text, { color = '#ffffff', bgColor = 'rgba(15, 23, 42, 0.85)', borderColor = '#38bdf8', fontSize = 26 } = {}) {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');

    // Rounded rectangle background
    const r = 26;
    const x = 16, y = 16, w = 608, h = 108;
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Text rendering
    ctx.font = `bold ${fontSize}px "Assistant", "Segoe UI", sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = this.currentLang === 'he' ? 'rtl' : 'ltr';
    ctx.fillText(text, 320, 70);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    const sprite = new THREE.Sprite(spriteMat);
    // Adjusted scale in world units so it's clean and legible without being huge
    sprite.scale.set(0.24, 0.052, 1.0);
    return sprite;
  }

  setVisible(visible) {
    this.group.visible = visible;
  }

  setLabelsVisible(visible) {
    this.showLabels = visible;
    this.labelsGroup.visible = visible;
  }

  setLanguage(lang) {
    if (this.currentLang !== lang) {
      this.currentLang = lang;
      this.rebuildLabels();
    }
  }

  update(time) {
    if (!this.group.visible) return;
    // Subtle pulsating glow on the optimal incision center ring
    if (this.pulseMaterial) {
      const pulse = Math.sin(time * 2.5) * 0.25 + 1.05;
      this.pulseMaterial.emissiveIntensity = pulse;
    }
  }

  dispose() {
    this.scene.remove(this.group);
  }
}
