import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Secret application key (matches the decryption key in src/utils/modelDecryptor.js)
const APP_SECRET_KEY = Buffer.from('paraSim_bovine_anatomy_sec_2026_key_#1!', 'utf8').subarray(0, 32);
const HEADER_MAGIC = Buffer.from('PSIM'); // Custom signature replacing 'glTF'

function encryptGlb(inputPath, outputPath) {
  if (!fs.existsSync(inputPath)) {
    console.warn(`File not found, skipping: ${inputPath}`);
    return;
  }

  console.log(`Encrypting: ${path.basename(inputPath)}...`);
  const rawBytes = fs.readFileSync(inputPath);
  
  // 16-byte cryptographically secure random IV
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', APP_SECRET_KEY, iv);
  const encrypted = Buffer.concat([cipher.update(rawBytes), cipher.final()]);

  // Format: [4 bytes "PSIM"] + [16 bytes IV] + [4 bytes original length] + [encrypted payload]
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32LE(rawBytes.length, 0);

  const finalBuf = Buffer.concat([HEADER_MAGIC, iv, lenBuf, encrypted]);
  fs.writeFileSync(outputPath, finalBuf);

  console.log(`✓ Output saved: ${path.basename(outputPath)} (${(finalBuf.length / (1024 * 1024)).toFixed(2)} MB)`);
}

const cowDir = path.resolve(__dirname, '../public/models/cow');

// Encrypt available models
const modelsToEncrypt = [
  { in: 'cow_anatomy.glb', out: 'cow_anatomy.dat' },
  { in: 'bovine_muscles.glb', out: 'bovine_muscles.dat' }
];

console.log('=== paraSim 3D Asset Encryption Pipeline ===');
modelsToEncrypt.forEach(m => {
  const inPath = path.join(cowDir, m.in);
  const outPath = path.join(cowDir, m.out);
  encryptGlb(inPath, outPath);
});
console.log('=== Encryption Complete ===');
