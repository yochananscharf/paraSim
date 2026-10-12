import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

function getMuscleModelPaths() {
  const modelsDir = path.resolve(process.cwd(), 'public/models/cow');
  if (!fs.existsSync(modelsDir)) return [];
  const files = fs.readdirSync(modelsDir);
  return files
    .filter(f => (f.toLowerCase().endsWith('.dat') || f.toLowerCase().endsWith('.glb')) && /bovine.*muscle|muscle.*bovine/i.test(f))
    .sort((a, b) => (a.endsWith('.dat') ? -1 : b.endsWith('.dat') ? 1 : 0))
    .map(f => `models/cow/${f}`);
}

function syncMuscleManifest() {
  const paths = getMuscleModelPaths();
  const manifestDir = path.resolve(process.cwd(), 'public/models/cow');
  if (fs.existsSync(manifestDir)) {
    const manifestPath = path.join(manifestDir, 'muscle_manifest.json');
    fs.writeFileSync(manifestPath, JSON.stringify(paths, null, 2));
  }
}

// Ensure manifest exists right away
syncMuscleManifest();

export default defineConfig({
  base: './',
  define: {
    __BOVINE_MUSCLE_PATHS__: JSON.stringify(getMuscleModelPaths())
  },
  plugins: [
    {
      name: 'muscle-manifest-plugin',
      buildStart() {
        syncMuscleManifest();
      },
      configureServer(server) {
        syncMuscleManifest();
        // Dynamic endpoint for querying matching muscle models in real-time
        server.middlewares.use('/api/muscle-models', (_req, res) => {
          const paths = getMuscleModelPaths();
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(paths));
        });
      }
    }
  ]
});
