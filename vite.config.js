import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin to automatically rewrite react-dom imports in question files
function autoPortalPatcher() {
  return {
    name: 'auto-portal-patcher',
    transform(code, id) {
      // Only transform files in the questions directory
      if (id.includes('/questions/') && (id.endsWith('.jsx') || id.endsWith('.js'))) {
        // Replace 'react-dom' imports with our wrapper
        const transformed = code.replace(
          /from\s+['"]react-dom['"]/g,
          "from '../../../react-dom-wrapper'"
        );
        
        if (transformed !== code) {
          console.log(`[Portal Patcher] Patched: ${id.split('/').slice(-3).join('/')}`);
        }
        
        return {
          code: transformed,
          map: null,
        };
      }
      return null;
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), autoPortalPatcher()],
});
