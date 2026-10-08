import * as THREE from 'three';

// Generates an authentic black-and-white Holstein bovine coat texture procedurally
export function createHolsteinTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Base white hide
  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle organic hide noise
  for (let i = 0; i < 4000; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(0,0,0,0.015)' : 'rgba(255,255,255,0.02)';
    ctx.fillRect(Math.random() * 1024, Math.random() * 1024, 4, 4);
  }

  // Large organic black patches (Holstein Friesian pattern)
  ctx.fillStyle = '#0f172a'; // Deep bovine black

  const patches = [
    // Torso flank patches
    { cx: 280, cy: 380, rx: 190, ry: 130, rot: 0.2 },
    { cx: 380, cy: 620, rx: 160, ry: 120, rot: -0.4 },
    { cx: 720, cy: 340, rx: 210, ry: 140, rot: 0.3 },
    { cx: 640, cy: 680, rx: 180, ry: 130, rot: -0.2 },
    // Shoulder & Neck patches
    { cx: 840, cy: 480, rx: 140, ry: 110, rot: 0.5 },
    { cx: 160, cy: 450, rx: 130, ry: 100, rot: -0.3 },
    // Head / Forehead patch
    { cx: 920, cy: 260, rx: 80, ry: 70, rot: 0.1 },
    // Rump & Hip patch
    { cx: 120, cy: 300, rx: 110, ry: 90, rot: 0.4 },
    { cx: 500, cy: 260, rx: 120, ry: 80, rot: -0.1 }
  ];

  patches.forEach((p) => {
    ctx.save();
    ctx.translate(p.cx, p.cy);
    ctx.rotate(p.rot);

    // Draw wavy organic patch
    ctx.beginPath();
    const steps = 18;
    for (let j = 0; j <= steps; j++) {
      const angle = (j / steps) * Math.PI * 2;
      const noise = 0.85 + Math.sin(angle * 3) * 0.15 + Math.cos(angle * 5) * 0.08;
      const x = Math.cos(angle) * p.rx * noise;
      const y = Math.sin(angle) * p.ry * noise;
      if (j === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.5, 1.2);
  texture.needsUpdate = true;
  return texture;
}
