import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.controls = new OrbitControls(camera, domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.minDistance = 0.5;
    this.controls.maxDistance = 6.0;
    this.controls.maxPolarAngle = Math.PI / 1.05;

    // Immediately stop automated camera interpolation when user starts manual rotation
    this.controls.addEventListener('start', () => {
      this.isTransitioning = false;
    });

    this.defaultCamPos = new THREE.Vector3(2.6, 2.0, 3.2);
    this.defaultTarget = new THREE.Vector3(0.0, 1.1, 0.0);

    this.targetPosition = new THREE.Vector3().copy(this.defaultCamPos);
    this.targetLookAt = new THREE.Vector3().copy(this.defaultTarget);
    this.isTransitioning = false;
    this.transitionDuration = 1.0;
    this.transitionTime = 0;
    this.startCamPos = new THREE.Vector3();
    this.startLookAt = new THREE.Vector3();
  }

  reset() {
    this.moveTo(this.defaultCamPos, this.defaultTarget);
  }

  moveTo(camPos, targetLookAt, duration = 0.8) {
    this.startCamPos.copy(this.camera.position);
    this.startLookAt.copy(this.controls.target);

    this.targetPosition.copy(camPos);
    this.targetLookAt.copy(targetLookAt);

    this.transitionDuration = Math.max(duration, 0.1);
    this.transitionTime = 0;
    this.isTransitioning = true;
  }

  // Biosphera-style standard anatomical orientation presets
  setPresetView(viewName) {
    const dist = 3.6;
    const yCenter = 1.1;
    switch (viewName) {
      case 'lateral-right':
        this.moveTo(new THREE.Vector3(0, yCenter, dist), new THREE.Vector3(0, yCenter, 0));
        break;
      case 'lateral-left':
        this.moveTo(new THREE.Vector3(0, yCenter, -dist), new THREE.Vector3(0, yCenter, 0));
        break;
      case 'dorsal':
        this.moveTo(new THREE.Vector3(0, dist + 0.5, 0.01), new THREE.Vector3(0, yCenter, 0));
        break;
      case 'ventral':
        this.moveTo(new THREE.Vector3(0, -dist + 1.0, 0.01), new THREE.Vector3(0, yCenter, 0));
        break;
      case 'cranial':
        this.moveTo(new THREE.Vector3(dist, yCenter, 0), new THREE.Vector3(0, yCenter, 0));
        break;
      case 'caudal':
        this.moveTo(new THREE.Vector3(-dist, yCenter, 0), new THREE.Vector3(0, yCenter, 0));
        break;
      default:
        this.reset();
    }
  }

  update(delta) {
    if (this.isTransitioning) {
      this.transitionTime += delta;
      const progress = Math.min(this.transitionTime / this.transitionDuration, 1.0);
      // Smooth ease-out cubic
      const t = 1 - Math.pow(1 - progress, 3);

      this.camera.position.lerpVectors(this.startCamPos, this.targetPosition, t);
      this.controls.target.lerpVectors(this.startLookAt, this.targetLookAt, t);

      if (progress >= 1.0) {
        this.isTransitioning = false;
      }
    }
    this.controls.update();
  }
}
