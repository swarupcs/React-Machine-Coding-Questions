/**
 * sandpackConfig.js
 * Utilities to configure Sandpack based on a question's file structure.
 * Supports: React (JSX), React TypeScript (TSX), Vanilla JS, HTML/CSS/JS (static)
 */

/**
 * Detects the best Sandpack template based on which files exist in the question.
 * @param {string[]} filePaths - array of relative file paths, e.g. ['App.jsx', 'styles.css']
 * @returns {'react' | 'react-ts' | 'vanilla' | 'static'}
 */
export function detectTemplate(filePaths) {
  const hasTsx = filePaths.some((f) => f.endsWith('.tsx'));
  const hasAppJsx = filePaths.some(
    (f) => f === 'App.jsx' || f === 'App.js' || f.endsWith('/App.jsx') || f.endsWith('/App.js')
  );
  const hasJsx = filePaths.some((f) => f.endsWith('.jsx'));
  const hasHtml = filePaths.some((f) => f === 'index.html' || f.endsWith('/index.html'));
  const hasJs = filePaths.some(
    (f) => f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.mjs')
  );

  if (hasTsx) return 'react-ts';
  if (hasAppJsx || hasJsx) return 'react';
  if (hasHtml && hasJs) return 'vanilla';
  if (hasHtml) return 'static';

  // fallback
  return 'react';
}

/**
 * Converts rawFilesCache (path → code string) to Sandpack files format,
 * and injects the necessary boilerplate to make the question run correctly.
 *
 * KEY FIX: Sandpack's built-in `react` template ships with:
 *   - /App.js  → export default function App() { return <h1>Hello world</h1> }
 *   - /index.js → import App from "./App"  (resolves to App.js, NOT App.jsx)
 *
 * When our question only has App.jsx, the template's App.js "wins" the
 * module resolution and shows "Hello world". We fix this by:
 *   1. Overriding /App.js with a re-export of ./App.jsx (makes the import resolve correctly)
 *   2. Injecting a custom /index.js that explicitly imports ./App.jsx
 *
 * @param {Record<string, string>} rawFilesCache - relative path → code string
 * @param {'react' | 'react-ts' | 'vanilla' | 'static'} template
 * @returns {Record<string, { code: string, hidden?: boolean }>}
 */
export function buildSandpackFiles(rawFilesCache, template = 'react') {
  const files = {};

  // 1. Add all the question's own files
  for (const [filePath, code] of Object.entries(rawFilesCache)) {
    const normalizedPath = filePath.startsWith('/') ? filePath : `/${filePath}`;
    files[normalizedPath] = { code: code || '' };
  }

  // 2. Inject boilerplate for React templates
  if (template === 'react' || template === 'react-ts') {
    const questionPaths = Object.keys(rawFilesCache);

    // Find the root App component file
    const appJsx = questionPaths.find((f) => f === 'App.jsx' || f === 'App.tsx');
    const appJs  = questionPaths.find((f) => f === 'App.js'  || f === 'App.ts');
    const appExt = appJsx || appJs; // the actual app file the question provides

    // Find if the question already has its own index.js
    const hasIndexJs = questionPaths.some(
      (f) => f === 'index.js' || f === 'index.jsx' || f === 'index.ts' || f === 'index.tsx'
    );

    if (appExt) {
      // ── Fix 1: If question has App.jsx/.tsx but NOT App.js, the template's
      // default App.js (Hello World) will shadow it via module resolution.
      // Override App.js with a pass-through re-export so `import App from "./App"`
      // picks up our actual component.
      if (appJsx && !appJs) {
        files['/App.js'] = {
          code: `// Auto-generated: redirects ./App imports to the actual component file.\nexport { default } from './${appJsx}';`,
          hidden: true,
        };
      }

      // ── Fix 2: Inject index.js if the question doesn't supply one.
      // Sandpack's default index.js does `import App from "./App"` which
      // (even after Fix 1 above) may not work cleanly in all bundler versions.
      // Providing an explicit one that imports the exact filename is safest.
      if (!hasIndexJs) {
        files['/index.js'] = {
          code: `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./${appExt}";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
          hidden: true, // hide this boilerplate from the file explorer
        };
      }
    }
  }

  return files;
}

/**
 * Returns the Sandpack active file (the tab that opens first).
 * @param {string[]} filePaths
 * @param {'react' | 'react-ts' | 'vanilla' | 'static'} template
 * @returns {string}
 */
export function getEntryFile(filePaths, template) {
  if (template === 'react' || template === 'react-ts') {
    const appFile = filePaths.find(
      (f) => f === 'App.jsx' || f === 'App.tsx' || f === 'App.js' || f === 'App.ts'
    );
    return appFile ? `/${appFile}` : '/App.jsx';
  }
  if (template === 'vanilla' || template === 'static') {
    const htmlFile = filePaths.find((f) => f === 'index.html' || f.endsWith('/index.html'));
    return htmlFile ? `/${htmlFile}` : '/index.html';
  }
  return '/App.jsx';
}

/**
 * Returns extra Sandpack customSetup for templates that need explicit dependencies.
 * React questions need react + react-dom declared so Sandpack's bundler can resolve them.
 * @param {'react' | 'react-ts' | 'vanilla' | 'static'} template
 * @returns {{ dependencies?: Record<string, string>, devDependencies?: Record<string, string> }}
 */
export function getCustomSetup(template) {
  if (template === 'react') {
    return {
      dependencies: {
        react: '^18.3.0',
        'react-dom': '^18.3.0',
      },
    };
  }
  if (template === 'react-ts') {
    return {
      dependencies: {
        react: '^18.3.0',
        'react-dom': '^18.3.0',
      },
      devDependencies: {
        typescript: '^5.0.0',
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
      },
    };
  }
  return {};
}
