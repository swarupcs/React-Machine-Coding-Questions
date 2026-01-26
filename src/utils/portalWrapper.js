// This file wraps react-dom and provides a patched createPortal
import { createPortal as originalCreatePortal } from 'react-dom';

let iframeDocumentBody = null;

// Set the iframe document body (called by IframeSandbox)
export function setIframeDocument(doc) {
  iframeDocumentBody = doc ? doc.body : null;
}

// Custom createPortal that automatically redirects to iframe body
export function createPortal(children, container, key) {
  // If container is document.body and we have an iframe body, use iframe body instead
  if (container === document.body && iframeDocumentBody) {
    return originalCreatePortal(children, iframeDocumentBody, key);
  }
  return originalCreatePortal(children, container, key);
}

// Re-export everything else from react-dom except createPortal
export {
  // Main exports
  render,
  hydrate,
  unmountComponentAtNode,
  findDOMNode,

  // Other utilities
  flushSync,
  unstable_batchedUpdates,
} from 'react-dom';

// Re-export client
export * from 'react-dom/client';
