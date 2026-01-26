// This file wraps react-dom to intercept createPortal calls
// Place this at: src/react-dom-wrapper.js

import { createPortal as originalCreatePortal } from 'react-dom';

// Global variable to store the current iframe document
let currentIframeDoc = null;

// Function to set the iframe document (called by IframeSandbox)
export function __setIframeDocument(doc) {
  currentIframeDoc = doc;
}

// Wrapped createPortal that automatically redirects to iframe body
export function createPortal(children, container, key) {
  // If targeting document.body and we have an iframe, redirect to iframe body
  if (container === document.body && currentIframeDoc) {
    return originalCreatePortal(children, currentIframeDoc.body, key);
  }
  return originalCreatePortal(children, container, key);
}

// Re-export everything else from react-dom
export {
  // Main rendering methods
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,

  // Utilities
  flushSync,
  unstable_batchedUpdates,
} from 'react-dom';

// Re-export all from react-dom/client
export * from 'react-dom/client';
