/**
 * modelDecryptor.js
 * In-memory client-side decryption for protected 3D assets (.dat)
 * Uses native browser WebCrypto API (hardware accelerated AES-256-CBC)
 */

const APP_KEY_STR = 'paraSim_bovine_anatomy_sec_2026_key_#1!';
const KEY_BYTES = new TextEncoder().encode(APP_KEY_STR).subarray(0, 32);

// Magic bytes for custom signature "PSIM"
const MAGIC_P = 0x50; // 'P'
const MAGIC_S = 0x53; // 'S'
const MAGIC_I = 0x49; // 'I'
const MAGIC_M = 0x4d; // 'M'

let cachedCryptoKey = null;

async function getCryptoKey() {
  if (!cachedCryptoKey) {
    cachedCryptoKey = await window.crypto.subtle.importKey(
      'raw',
      KEY_BYTES,
      { name: 'AES-CBC' },
      false,
      ['decrypt']
    );
  }
  return cachedCryptoKey;
}

/**
 * Checks if a buffer is encrypted with our PSIM signature
 * @param {ArrayBuffer} buffer 
 * @returns {boolean}
 */
export function isEncryptedBuffer(buffer) {
  if (!buffer || buffer.byteLength < 24) return false;
  const view = new Uint8Array(buffer, 0, 4);
  return (
    view[0] === MAGIC_P &&
    view[1] === MAGIC_S &&
    view[2] === MAGIC_I &&
    view[3] === MAGIC_M
  );
}

/**
 * Decrypts an encrypted PSIM buffer directly in memory
 * If buffer is not encrypted (standard glTF), returns it unchanged.
 * @param {ArrayBuffer} buffer 
 * @returns {Promise<ArrayBuffer>} Decrypted ArrayBuffer
 */
export async function decryptModelBuffer(buffer) {
  if (!isEncryptedBuffer(buffer)) {
    // Already standard unencrypted glTF
    return buffer;
  }

  const key = await getCryptoKey();
  const iv = new Uint8Array(buffer, 4, 16);
  const encryptedPayload = new Uint8Array(buffer, 24);

  // Hardware-accelerated native WebCrypto decryption
  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-CBC', iv },
    key,
    encryptedPayload
  );

  return decrypted;
}

/**
 * Fetches an asset with progress tracking, decrypts in memory, and parses with GLTFLoader
 * @param {string} url - Asset URL (.dat or .glb)
 * @param {import('three/examples/jsm/loaders/GLTFLoader.js').GLTFLoader} gltfLoader 
 * @param {(progressPct: number) => void} onProgress 
 * @param {(gltf: any) => void} onLoad 
 * @param {(error: any) => void} onError 
 */
export async function fetchAndLoadSecureGltf(url, gltfLoader, onProgress, onLoad, onError) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status} fetching ${url}`);
    }

    const contentLength = +(response.headers.get('content-length') || 0);
    let buffer;

    if (contentLength && response.body && onProgress) {
      const reader = response.body.getReader();
      let receivedLength = 0;
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        if (contentLength > 0) {
          const pct = Math.min(100, Math.round((receivedLength / contentLength) * 100));
          onProgress(pct);
        }
      }

      const allChunks = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        allChunks.set(chunk, position);
        position += chunk.length;
      }
      buffer = allChunks.buffer;
    } else {
      buffer = await response.arrayBuffer();
      if (onProgress) onProgress(100);
    }

    // In-memory decryption (takes ~20ms)
    const decryptedBuffer = await decryptModelBuffer(buffer);

    // Parse into Three.js scene directly from ArrayBuffer
    const basePath = url.substring(0, url.lastIndexOf('/') + 1);
    gltfLoader.parse(decryptedBuffer, basePath, onLoad, onError);
  } catch (err) {
    if (onError) onError(err);
    else console.error('fetchAndLoadSecureGltf error:', err);
  }
}
