// Sketchfab Viewer API Controller
// Enables programmatic explosion, organ isolation, and click interaction on authentic 3D models

export class SketchfabController {
  constructor(iframeId) {
    this.iframeId = iframeId;
    this.api = null;
    this.nodes = [];
    this.nodeMap = {};
    this.isReady = false;
    this.baseTransforms = new Map();
  }

  init(uid = 'd5303272cb094a5d9f2de05136d2f08f', onReadyCallback) {
    const iframe = document.getElementById(this.iframeId);
    if (!iframe || !window.Sketchfab) {
      console.log('Sketchfab API library or iframe not found yet');
      return;
    }

    try {
      const client = new window.Sketchfab(iframe);
      client.init(uid, {
        success: (api) => {
          this.api = api;
          api.start();
          api.addEventListener('viewerready', () => {
            this.isReady = true;
            api.getNodeMap((err, nodes) => {
              if (!err && nodes) {
                this.nodeMap = nodes;
                this.nodes = Object.values(nodes);
                console.log('Sketchfab API loaded with', this.nodes.length, 'interactive nodes');
                if (onReadyCallback) onReadyCallback(this.nodes);
              }
            });

            // 3D Organ Click Event
            api.addEventListener('click', (info) => {
              if (info && info.instanceId && this.nodeMap[info.instanceId]) {
                const node = this.nodeMap[info.instanceId];
                console.log('3D Specimen clicked node:', node.name);
                window.dispatchEvent(new CustomEvent('sketchfabOrganClick', { detail: { node } }));
              }
            });
          });
        },
        error: (err) => {
          console.warn('Sketchfab API client init error:', err);
        },
        autostart: 1,
        ui_infos: 0,
        ui_watermark: 0,
        ui_help: 0,
        ui_settings: 0
      });
    } catch (e) {
      console.warn('Could not initialize Sketchfab client:', e);
    }
  }

  // Explode sub-organs apart based on factor (0.0 to 1.0)
  explode(factor) {
    if (!this.api || !this.isReady || !this.nodes.length) return;

    this.nodes.forEach((node) => {
      if (!node.instanceID) return;
      const name = (node.name || '').toLowerCase();

      let dx = 0, dy = 0, dz = 0;
      // Stomachs move to the left and downward
      if (name.includes('rumen') || name.includes('reticul') || name.includes('omasum') || name.includes('abomasum') || name.includes('stomach')) {
        dz = -factor * 0.7;
        dy = -factor * 0.3;
      }
      // Lungs & Trachea move upward and forward
      else if (name.includes('lung') || name.includes('trachea') || name.includes('bronch') || name.includes('heart')) {
        dy = factor * 0.6;
        dx = factor * 0.5;
      }
      // Ribs expand outward laterally
      else if (name.includes('rib') || name.includes('costa')) {
        dx = factor * 0.8;
      }

      if (dx !== 0 || dy !== 0 || dz !== 0) {
        this.api.translate(node.instanceID, [dx, dy, dz], { duration: 0.05 });
      }
    });
  }

  // Show or hide specific anatomical systems
  setSystemVisibility(systemKey, visible) {
    if (!this.api || !this.isReady) return;

    this.nodes.forEach((node) => {
      if (!node.instanceID) return;
      const name = (node.name || '').toLowerCase();

      let matches = false;
      if (systemKey === 'skeletal' && (name.includes('bone') || name.includes('rib') || name.includes('spine') || name.includes('verteb') || name.includes('skull'))) {
        matches = true;
      } else if (systemKey === 'digestive' && (name.includes('rumen') || name.includes('stomach') || name.includes('intest') || name.includes('reticul') || name.includes('omasum') || name.includes('abomasum') || name.includes('esophag'))) {
        matches = true;
      } else if (systemKey === 'respiratory' && (name.includes('lung') || name.includes('trachea') || name.includes('bronch') || name.includes('laryn'))) {
        matches = true;
      } else if (systemKey === 'silhouette' && (name.includes('skin') || name.includes('body') || name.includes('hide') || name.includes('fur'))) {
        matches = true;
      }

      if (matches) {
        if (visible) {
          this.api.show(node.instanceID);
        } else {
          this.api.hide(node.instanceID);
        }
      }
    });
  }

  // Focus camera on a specific anatomical region
  focusRegion(region) {
    if (!this.api || !this.isReady) return;
    // Built-in presets for Nottingham bovine model
    if (region === 'neck' || region === 'shechita') {
      this.api.setCameraLookAt([1.2, 1.3, 0.8], [0.8, 1.2, 0.0], 1.2);
    } else if (region === 'rumen') {
      this.api.setCameraLookAt([-0.3, 1.1, 1.8], [-0.2, 0.9, 0.0], 1.2);
    } else if (region === 'skeleton') {
      this.api.setCameraLookAt([0.0, 1.4, 2.8], [0.0, 1.0, 0.0], 1.2);
    }
  }
}
