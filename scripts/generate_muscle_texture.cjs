const fs = require('fs');
const jpeg = require('jpeg-js');

console.log('Loading source textures for refined bovine muscular anatomy...');
const normalBuf = fs.readFileSync('public/models/cow/textures/20018.jpg');
const furBuf = fs.readFileSync('public/models/cow/textures/20017.jpg');
const roughBuf = fs.readFileSync('public/models/cow/textures/20019.jpg');

const normalMap = jpeg.decode(normalBuf, { useTArray: true });
const furMap = jpeg.decode(furBuf, { useTArray: true });
const roughMap = jpeg.decode(roughBuf, { useTArray: true });

const srcW = normalMap.width;   // 4096
const srcH = normalMap.height;  // 4096

const targetW = 2048;
const targetH = 2048;

const outData = new Uint8Array(targetW * targetH * 4);

function getSrcNormal(sx, sy) {
  const x = Math.max(0, Math.min(srcW - 1, sx));
  const y = Math.max(0, Math.min(srcH - 1, sy));
  const idx = (y * srcW + x) * 4;
  return [
    (normalMap.data[idx] - 128) / 127,
    (normalMap.data[idx + 1] - 128) / 127,
    (normalMap.data[idx + 2] - 128) / 127
  ];
}

function getSrcFur(sx, sy) {
  const x = Math.max(0, Math.min(srcW - 1, sx));
  const y = Math.max(0, Math.min(srcH - 1, sy));
  const idx = (y * srcW + x) * 4;
  return [furMap.data[idx], furMap.data[idx + 1], furMap.data[idx + 2]];
}

function pseudoNoise(x, y) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

for (let ty = 0; ty < targetH; ty++) {
  const sy = Math.round((ty / targetH) * srcH);

  for (let tx = 0; tx < targetW; tx++) {
    const sx = Math.round((tx / targetW) * srcW);
    const outIdx = (ty * targetW + tx) * 4;

    const [nx, ny, nz] = getSrcNormal(sx, sy);
    const [furR, furG, furB] = getSrcFur(sx, sy);

    // Step size for edge / fascia curvature detection
    const step = 4;
    const [nxL] = getSrcNormal(sx - step, sy);
    const [nxR] = getSrcNormal(sx + step, sy);
    const [, nyU] = getSrcNormal(sx, sy - step);
    const [, nyD] = getSrcNormal(sx, sy + step);

    const div = (nxR - nxL) + (nyD - nyU);
    const gradX = (nxR - nxL) * 0.5;
    const gradY = (nyD - nyU) * 0.5;
    const edge = Math.sqrt(gradX * gradX + gradY * gradY);
    const slope = Math.sqrt(nx * nx + ny * ny);

    // Natural anatomical identification from fur map features (no harsh geometric boxes!)
    // 1. Eyes in 20017: smooth circular mask around the eye pupil
    const uvX = tx / targetW;
    const uvY = ty / targetH;
    const distEye1 = Math.hypot(uvX - 0.31, uvY - 0.04);
    const distEye2 = Math.hypot(uvX - 0.69, uvY - 0.04);
    const isEye = distEye1 < 0.035 || distEye2 < 0.035;

    // 2. Horns & hooves: where fur color is distinctly keratin horn/hoof
    const isHornKeratin = uvY < 0.06 && furR > 140 && furG > 125 && furB > 105;
    const isHoofKeratin = uvY > 0.85 && furR < 65 && furG < 60 && furB < 55;

    let finalR = 145;
    let finalG = 26;
    let finalB = 26;

    if (isEye) {
      // Natural anatomical eye from fur map
      finalR = furR;
      finalG = furG;
      finalB = furB;
    } else if (isHornKeratin) {
      // Natural horn keratin
      finalR = Math.round(furR * 0.95);
      finalG = Math.round(furG * 0.95);
      finalB = Math.round(furB * 0.9);
    } else if (isHoofKeratin) {
      // Natural dark hooves
      finalR = Math.round(furR * 0.9);
      finalG = Math.round(furG * 0.9);
      finalB = Math.round(furB * 0.9);
    } else {
      // --- AUTHENTIC BOVINE MUSCLE & MEAT ---
      // Muscle belly base crimson
      const belly = Math.max(0, 1.0 - slope * 1.2 - edge * 1.5);
      let r = 148 + belly * 28;
      let g = 24 + belly * 8;
      let b = 24 + belly * 8;

      // Fine longitudinal muscle grain / fibers running along the contour
      const fiberAngle = Math.atan2(ny, nx) + Math.PI / 2;
      const fiberCoord = (tx * Math.cos(fiberAngle) + ty * Math.sin(fiberAngle)) * 0.4;
      const striation = Math.sin(fiberCoord) * 12 + pseudoNoise(tx * 0.5, ty * 0.5) * 8 - 4;
      r += striation;
      g += striation * 0.25;
      b += striation * 0.25;

      // Subtle marbling highlights
      const marble = pseudoNoise(tx * 0.09, ty * 0.09);
      if (marble > 0.88) {
        const mInt = (marble - 0.88) / 0.12;
        r = r * (1 - mInt) + 215 * mInt;
        g = g * (1 - mInt) + 205 * mInt;
        b = b * (1 - mInt) + 195 * mInt;
      }

      // Intermuscular Fascia & Tendons (smoothly blended)
      const rawFascia = edge * 2.8 + Math.max(0, -div * 2.2);
      const fasciaFactor = Math.min(1.0, Math.max(0, (rawFascia - 0.22) / 0.78));

      if (fasciaFactor > 0) {
        const fasciaR = 225 + pseudoNoise(tx, ty) * 12;
        const fasciaG = 230 + pseudoNoise(tx, ty) * 12;
        const fasciaB = 236 + pseudoNoise(tx, ty) * 12;

        r = r * (1.0 - fasciaFactor) + fasciaR * fasciaFactor;
        g = g * (1.0 - fasciaFactor) + fasciaG * fasciaFactor;
        b = b * (1.0 - fasciaFactor) + fasciaB * fasciaFactor;
      }

      // Smooth tendon transition for distal limbs (feet tendons)
      if (uvY > 0.78 && (uvX < 0.18 || uvX > 0.82)) {
        const tFactor = Math.min(0.5, (uvY - 0.78) / 0.22);
        r = r * (1 - tFactor) + 215 * tFactor;
        g = g * (1 - tFactor) + 220 * tFactor;
        b = b * (1 - tFactor) + 225 * tFactor;
      }

      finalR = Math.min(255, Math.max(0, Math.round(r)));
      finalG = Math.min(255, Math.max(0, Math.round(g)));
      finalB = Math.min(255, Math.max(0, Math.round(b)));
    }

    outData[outIdx] = finalR;
    outData[outIdx + 1] = finalG;
    outData[outIdx + 2] = finalB;
    outData[outIdx + 3] = 255;
  }
}

console.log('Encoding JPEG image...');
const encoded = jpeg.encode({
  data: outData,
  width: targetW,
  height: targetH
}, 92);

const outPath = 'public/models/cow/textures/bovine_muscles_diffuse.jpg';
fs.writeFileSync(outPath, encoded.data);
console.log(`Successfully generated refined ${outPath}! Size: ${(encoded.data.length / 1024).toFixed(1)} KB`);
