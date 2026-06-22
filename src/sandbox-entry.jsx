import React from 'react';
import { createRoot } from 'react-dom/client';

// Global error handler for the sandbox
window.addEventListener('error', (event) => {
  window.parent.postMessage({
    type: 'SANDBOX_ERROR',
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error?.stack || event.error?.message || 'Unknown error'
  }, '*');
});

window.addEventListener('unhandledrejection', (event) => {
  window.parent.postMessage({
    type: 'SANDBOX_ERROR',
    message: event.reason?.message || 'Unhandled Promise Rejection',
    error: event.reason?.stack || event.reason?.toString() || 'Unknown rejection reason'
  }, '*');
});

async function bootstrap() {
  const params = new URLSearchParams(window.location.search);
  const questionPath = params.get('question');

  if (!questionPath) {
    document.getElementById('root').innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; color: #666; text-align: center;">
        <h2>No question specified in URL</h2>
      </div>`;
    return;
  }

  const prefix = `./questions/${questionPath}/`;

  // 1. Attempt to load React Component
  const reactModules = import.meta.glob('./questions/*/*/App.{jsx,tsx,js,ts}');
  const reactModuleLoader = reactModules[`${prefix}App.jsx`] || reactModules[`${prefix}App.tsx`] || reactModules[`${prefix}App.js`] || reactModules[`${prefix}App.ts`];

  if (reactModuleLoader) {
    try {
      const mod = await reactModuleLoader();
      const App = mod.default || Object.values(mod).find(v => typeof v === 'function');

      if (App) {
        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
        return; // Success
      }
    } catch (err) {
      console.error("Failed to render React component:", err);
      document.getElementById('root').innerHTML = `
        <div style="font-family: sans-serif; padding: 20px; color: #ef4444; background: #fee2e2; border: 1px solid #f87171; border-radius: 6px; margin: 20px;">
          <h2 style="margin-top: 0;">Error loading React component</h2>
          <pre style="white-space: pre-wrap; word-break: break-all; font-size: 14px;">${err.stack || err.message}</pre>
        </div>`;
      return;
    }
  }

  // 2. Attempt to load Vanilla JS
  const htmlModules = import.meta.glob('./questions/*/*/index.html', { query: '?url', import: 'default' });
  const htmlUrl = htmlModules[`${prefix}index.html`];

  if (htmlUrl) {
    try {
      const htmlUrlResolved = await htmlUrl();
      const res = await fetch(htmlUrlResolved);
      const html = await res.text();
      
      // Completely replace the document content
      document.open();
      document.write(html);
      document.close();

      // Because we replaced the document, we need to manually fetch and inject JS and CSS
      // since relative paths in the HTML will be broken (sandbox.html is at root)
      const jsModules = import.meta.glob('./questions/*/*/{script.js,index.js}', { query: '?url', import: 'default' });
      const cssModules = import.meta.glob('./questions/*/*/*.css', { query: '?raw', import: 'default' });

      // Inject CSS first
      const matchedCssKeys = Object.keys(cssModules).filter(k => k.startsWith(prefix));
      for (const key of matchedCssKeys) {
        const cssContent = await cssModules[key]();
        const style = document.createElement('style');
        style.textContent = cssContent;
        document.head.appendChild(style);
      }

      // Inject JS
      const matchedJsKeys = Object.keys(jsModules).filter(k => k.startsWith(prefix));
      for (const key of matchedJsKeys) {
        const src = await jsModules[key]();
        const script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        document.body.appendChild(script);
      }
      
    } catch (err) {
      console.error("Failed to render Vanilla HTML:", err);
      document.body.innerHTML = `
        <div style="font-family: sans-serif; padding: 20px; color: #ef4444; background: #fee2e2; border: 1px solid #f87171; border-radius: 6px; margin: 20px;">
          <h2 style="margin-top: 0;">Error loading Vanilla HTML</h2>
          <pre style="white-space: pre-wrap; word-break: break-all; font-size: 14px;">${err.stack || err.message}</pre>
        </div>`;
    }
  } else {
    document.getElementById('root').innerHTML = `
      <div style="font-family: sans-serif; padding: 20px; color: #666; text-align: center;">
        <h2>Could not find App.jsx or index.html for ${questionPath}</h2>
      </div>`;
  }
}

bootstrap();
