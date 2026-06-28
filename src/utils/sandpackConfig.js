/**
 * sandpackConfig.js
 * Utilities to configure Sandpack based on a question's file structure.
 * Supports: React (JSX), React TypeScript (TSX), Vanilla JS, HTML/CSS/JS (static)
 */

/**
 * All packages used by this project — pulled from package.json.
 * These are pre-registered in every Sandpack sandbox so questions can freely
 * import any of them without triggering "Could not find dependency" errors.
 *
 * Note: react / react-dom / typescript are handled separately per template,
 * so they are excluded from KNOWN_PROJECT_DEPS but kept in BUILT_IN_PACKAGES.
 */
const BUILT_IN_PACKAGES = new Set([
  // React ecosystem (handled via template deps)
  'react', 'react-dom', 'react-router', 'react-router-dom',
  'typescript', '@types/react', '@types/react-dom',
  // Project-level tooling (not needed inside the sandbox)
  '@codemirror/autocomplete', '@codemirror/lang-javascript', '@codemirror/state', '@codemirror/view',
  '@codesandbox/sandpack-react', '@mdx-js/react', '@mdx-js/rollup', '@monaco-editor/react',
  '@tailwindcss/typography', '@tailwindcss/vite', 'tailwindcss', 'tailwind-merge', 'tailwindcss-animate',
  'next-themes', 'class-variance-authority', 'cmdk', 'clsx',
  'react-resizable-panels', 'react-icons', 'lucide-react',
  'react-markdown', 'rehype-highlight', 'remark-gfm', 'github-markdown-css', 'highlight.js',
  // node built-ins
  'path', 'fs', 'os', 'http', 'https', 'url', 'util', 'stream',
  'events', 'crypto', 'buffer', 'assert', 'module',
]);

/**
 * Pre-registered dependency versions from this project's package.json.
 * Every Sandpack sandbox gets these available so questions can import them freely.
 */
const KNOWN_PROJECT_DEPS = {
  // Styling / animation
  'framer-motion':        '^12.40.0',
  '@react-spring/web':    '^10.1.1',
  // Data / utils
  'axios':                '^1.18.0',
  'lodash':               '^4.18.1',
  'date-fns':             '^4.1.0',
  'uuid':                 '^13.0.0',
  'txtgen':               '^3.0.7',
  '@faker-js/faker':      '^10.5.0',
  // Forms / validation
  'yup':                  '^1.7.1',
  'zod':                  '^4.4.3',
  'react-hook-form':      '^7.67.0',
  // UI / components
  'prop-types':           '^15.8.1',
  'classnames':           '^2.5.1',
  'react-virtualized':    '^9.22.6',
  // Syncfusion (for questions using it)
  '@syncfusion/ej2-base':          '^20.1.55',
  '@syncfusion/ej2-buttons':       '^20.1.55',
  '@syncfusion/ej2-inputs':        '^20.1.55',
  '@syncfusion/ej2-react-buttons': '^20.1.55',
  '@syncfusion/ej2-react-inputs':  '^20.1.55',
  // Ant Design icons
  '@ant-design/icons':    '^6.2.5',
};

/**
 * Scans the raw source code of a question's files and extracts any third-party
 * npm package names so they can be added to customSetup.dependencies.
 *
 * Handles:
 *   import ... from 'pkg'
 *   import ... from "pkg"
 *   require('pkg') / require("pkg")
 *
 * Ignores:
 *   - Relative imports (starting with . or /)
 *   - Node built-ins listed in BUILT_IN_PACKAGES
 *   - Sub-paths of already-known built-ins (e.g. 'react/jsx-runtime')
 *
 * @param {Record<string, string>} rawFilesCache - relative path → code string
 * @returns {Record<string, string>} - { 'yup': 'latest', 'formik': 'latest', ... }
 */
export function extractDependencies(rawFilesCache) {
  const deps = {};
  // Matches: import ... from 'pkg'  |  import ... from "pkg"  |  require('pkg')  |  require("pkg")
  const importRe = /(?:import\s+[\s\S]*?from\s+|require\s*\()\s*['"]([^'"]+)['"]/g;

  for (const code of Object.values(rawFilesCache)) {
    if (typeof code !== 'string') continue;
    let m;
    while ((m = importRe.exec(code)) !== null) {
      const pkg = m[1];
      // Skip relative paths and file-protocol imports
      if (pkg.startsWith('.') || pkg.startsWith('/')) continue;
      // Get the root package name (handles scoped like @scope/name and sub-paths like pkg/utils)
      const rootPkg = pkg.startsWith('@')
        ? pkg.split('/').slice(0, 2).join('/')
        : pkg.split('/')[0];
      if (BUILT_IN_PACKAGES.has(rootPkg)) continue;
      deps[rootPkg] = 'latest';
    }
  }
  return deps;
}

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
 * Pass extraDeps from extractDependencies() to automatically include third-party packages.
 * @param {'react' | 'react-ts' | 'vanilla' | 'static'} template
 * @param {Record<string, string>} extraDeps - additional detected packages
 * @returns {{ dependencies?: Record<string, string>, devDependencies?: Record<string, string> }}
 */
export function getCustomSetup(template, extraDeps = {}) {
  if (template === 'react') {
    return {
      dependencies: {
        react: '^18.3.0',
        'react-dom': '^18.3.0',
        ...KNOWN_PROJECT_DEPS, // pre-load all project packages
        ...extraDeps,          // anything auto-detected not already in KNOWN_PROJECT_DEPS
      },
    };
  }
  if (template === 'react-ts') {
    return {
      dependencies: {
        react: '^18.3.0',
        'react-dom': '^18.3.0',
        ...KNOWN_PROJECT_DEPS,
        ...extraDeps,
      },
      devDependencies: {
        typescript: '^5.0.0',
        '@types/react': '^18.3.0',
        '@types/react-dom': '^18.3.0',
      },
    };
  }
  // For vanilla/static: still provide project deps + any auto-detected ones
  return {
    dependencies: {
      ...KNOWN_PROJECT_DEPS,
      ...extraDeps,
    },
  };
}
