import * as THREE from 'three';
import { BEEF_CUTS } from '../data/beefCutsData.js';

export class BeefCutsVisualizer {
  constructor(scene, camera, options = {}) {
    this.scene = scene;
    this.camera = camera;
    this.options = options;
    this.onSelectCut = options.onSelectCut || (() => {});

    this.group = new THREE.Group();
    this.group.name = 'beef_cuts_visualizer_group';
    this.group.visible = false;
    this.scene.add(this.group);

    this.markers = [];
    this.interactiveMeshes = [];
    this.selectedCutId = null;

    // Pulse highlight ring
    this.pulseMesh = null;

    this.initMarkers();
  }

  createBadgeTexture(cut) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 140;
    const ctx = canvas.getContext('2d');

    const isForequarter = cut.section === 'forequarter';
    const mainColor = isForequarter ? '#38bdf8' : '#f59e0b';
    const bgColor = 'rgba(15, 23, 42, 0.88)';
    const borderColor = isForequarter ? 'rgba(56, 189, 248, 0.7)' : 'rgba(245, 158, 11, 0.7)';

    // Rounded background pill
    const r = 26;
    const x = 12;
    const y = 12;
    const w = canvas.width - 24;
    const h = canvas.height - 24;

    ctx.save();
    ctx.shadowColor = mainColor;
    ctx.shadowBlur = 18;

    // Draw pill
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

    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
    ctx.restore();

    // Circle number badge on the right (RTL layout)
    const circleX = x + w - 46;
    const circleY = y + h / 2;
    const circleR = 34;

    ctx.beginPath();
    ctx.arc(circleX, circleY, circleR, 0, Math.PI * 2);
    ctx.fillStyle = mainColor;
    ctx.fill();

    // Cut number inside circle
    ctx.font = 'bold 36px "Inter", "Heebo", sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${cut.number}`, circleX, circleY);

    // Hebrew cut name text
    ctx.font = 'bold 38px "Heebo", "Inter", sans-serif';
    ctx.fillStyle = '#f8fafc';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(cut.nameHe, circleX - 44, circleY - 12);

    // English subtext
    ctx.font = '22px "Inter", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(cut.nameEn, circleX - 44, circleY + 24);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  }

  initMarkers() {
    BEEF_CUTS.forEach((cut) => {
      const markerGroup = new THREE.Group();
      markerGroup.name = `beef_cut_marker_${cut.number}`;
      markerGroup.userData = { isBeefCut: true, cut };

      const [px, py, pz] = cut.position;
      markerGroup.position.set(px, py, pz);

      const isForequarter = cut.section === 'forequarter';
      const themeColor = isForequarter ? 0x38bdf8 : 0xf59e0b;

      // 1. Center glowing bead / sphere
      const sphereGeo = new THREE.SphereGeometry(0.038, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: themeColor,
        emissive: themeColor,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
      });
      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      sphereMesh.userData = { isBeefCut: true, cut, markerGroup };
      markerGroup.add(sphereMesh);
      this.interactiveMeshes.push(sphereMesh);

      // 2. Halo ring around sphere
      const ringGeo = new THREE.RingGeometry(0.048, 0.058, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: themeColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      markerGroup.add(ringMesh);

      // 3. Floating billboard sprite badge with number & name
      const texture = this.createBadgeTexture(cut);
      const spriteMat = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthTest: false
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.36, 0.10, 1.0);
      sprite.position.set(0, 0.08, 0.02);
      sprite.userData = { isBeefCut: true, cut, markerGroup };
      markerGroup.add(sprite);
      this.interactiveMeshes.push(sprite);

      // 4. Anchor stem line downwards to muscle surface
      const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -0.06, 0)
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: themeColor,
        transparent: true,
        opacity: 0.6
      });
      const stem = new THREE.Line(lineGeo, lineMat);
      markerGroup.add(stem);

      this.group.add(markerGroup);
      this.markers.push({
        cut,
        markerGroup,
        sphereMesh,
        ringMesh,
        sprite,
        basePos: new THREE.Vector3(px, py, pz)
      });
    });

    // Create glowing pulse focus ring for active cut
    const pulseGeo = new THREE.RingGeometry(0.065, 0.095, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95
    });
    this.pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    this.pulseMesh.rotation.x = Math.PI / 2;
    this.pulseMesh.visible = false;
    this.group.add(this.pulseMesh);
  }

  setVisible(visible) {
    this.group.visible = visible;
    if (!visible) {
      this.clearHighlight();
    }
  }

  isVisible() {
    return this.group.visible;
  }

  selectCut(cutIdentifier) {
    const found = this.markers.find(
      (m) => m.cut.number === cutIdentifier || m.cut.id === cutIdentifier
    );
    if (!found) return;

    this.selectedCutId = found.cut.id;

    // Reset scales & highlight
    this.markers.forEach((m) => {
      const isTarget = m.cut.id === found.cut.id;
      m.markerGroup.scale.setScalar(isTarget ? 1.35 : 1.0);
      if (m.sprite) {
        m.sprite.material.opacity = isTarget ? 1.0 : 0.75;
      }
    });

    // Position pulse highlight
    if (this.pulseMesh) {
      this.pulseMesh.position.copy(found.basePos);
      this.pulseMesh.position.y += 0.005;
      this.pulseMesh.visible = true;
    }
  }

  clearHighlight() {
    this.selectedCutId = null;
    this.markers.forEach((m) => {
      m.markerGroup.scale.setScalar(1.0);
      if (m.sprite) m.sprite.material.opacity = 0.9;
    });
    if (this.pulseMesh) {
      this.pulseMesh.visible = false;
    }
  }

  getIntersectables() {
    return this.group.visible ? this.interactiveMeshes : [];
  }

  update(time) {
    if (!this.group.visible) return;

    // Subtle breathing animation for all pins
    const bob = Math.sin(time * 2.5) * 0.012;
    this.markers.forEach((m) => {
      m.markerGroup.position.y = m.basePos.y + bob;
      if (m.ringMesh) {
        m.ringMesh.rotation.z = time * 0.8;
      }
    });

    // Expanding beacon pulse wave on active cut
    if (this.pulseMesh && this.pulseMesh.visible) {
      const pulseScale = 1.0 + ((time * 2.0) % 1.0) * 0.75;
      const pulseAlpha = Math.max(0, 1.0 - ((time * 2.0) % 1.0));
      this.pulseMesh.scale.set(pulseScale, pulseScale, pulseScale);
      this.pulseMesh.material.opacity = pulseAlpha * 0.9;
    }
  }
}
