import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import * as ReactDOMExports from 'react-dom';

export default function IframeSandbox({
  children,
  htmlUrl = null,
  cssUrls = [],
  cssContent = '',
  jsUrls = [],
}) {
  const iframeRef = useRef(null);
  const reactRootRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    const win = iframe.contentWindow;
    if (!doc || !win) return;

    // Clean slate
    doc.open();
    doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
    doc.close();

    // CRITICAL: Monitor parent window's body for modals that leak out
    const parentObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            const className = (node.className || '').toString().toLowerCase();

            if (
              className.includes('modal') ||
              className.includes('overlay') ||
              className.includes('backdrop')
            ) {
              console.log(
                '[Parent Monitor] 🚨 Modal leaked to parent window! Moving to iframe...',
                className,
              );

              // Move the modal into the iframe
              const modalRoot = doc.getElementById('modal-root') || doc.body;
              modalRoot.appendChild(node);
              console.log('[Parent Monitor] ✅ Modal moved to iframe');
            }
          }
        });
      });
    });

    // Watch parent body for leaked modals
    parentObserver.observe(document.body, {
      childList: true,
      subtree: false,
    });

    const cleanup = () => {
      parentObserver.disconnect();
    };

    //
    // ------------------------ VANILLA HTML MODE ------------------------
    //
    if (htmlUrl) {
      fetch(htmlUrl)
        .then((res) => res.text())
        .then((html) => {
          doc.open();
          doc.write(html);
          doc.close();

          if (cssContent) {
            const style = doc.createElement('style');
            style.textContent = cssContent;
            doc.head.appendChild(style);
          }

          cssUrls.forEach((href) => {
            const link = doc.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            doc.head.appendChild(link);
          });

          jsUrls.forEach((src) => {
            const script = doc.createElement('script');
            script.type = 'module';
            script.src = src;
            doc.body.appendChild(script);
          });
        });

      return;
    }

    //
    // ------------------------ REACT MODE ------------------------
    //
    doc.body.innerHTML = `
      <div id="root"></div>
      <div id="modal-root"></div>
    `;

    // Base styles
    const baseStyles = `
      * {
        box-sizing: border-box;
      }
      
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        font-family: system-ui, -apple-system, sans-serif;
      }
      
      body {
        padding: 20px;
        position: relative;
      }
      
      #root {
        position: relative;
        min-height: 400px;
        z-index: 1;
      }
      
      #modal-root {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        pointer-events: none !important;
        z-index: 999999 !important;
      }
      
      #modal-root > * {
        pointer-events: auto !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        z-index: 999999 !important;
      }
    `;

    const baseStyleTag = doc.createElement('style');
    baseStyleTag.textContent = baseStyles;
    doc.head.appendChild(baseStyleTag);

    // Modal enhancement CSS
    const modalEnhancementStyle = doc.createElement('style');
    modalEnhancementStyle.textContent = getModalEnhancements();
    doc.head.appendChild(modalEnhancementStyle);

    // User CSS
    if (cssContent) {
      const style = doc.createElement('style');
      style.textContent = cssContent;
      doc.head.appendChild(style);
    }

    cssUrls.forEach((href) => {
      const link = doc.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      doc.head.appendChild(link);
    });

    const mountNode = doc.getElementById('root');

    // Cleanup previous root
    if (reactRootRef.current) {
      try {
        reactRootRef.current.unmount();
      } catch (err) {
        console.warn('React root unmount failed:', err);
      }
    }

    // CRITICAL: Patch createPortal BEFORE rendering
    patchCreatePortal(doc);

    // Setup aggressive DOM monitor
    setupDOMMonitor(doc);

    // Create new React root
    reactRootRef.current = ReactDOM.createRoot(mountNode);
    reactRootRef.current.render(children);

    return () => {
      cleanup();
      if (reactRootRef.current) {
        try {
          reactRootRef.current.unmount();
        } catch (err) {
          console.warn('Unmount error:', err);
        }
      }
    };
  }, [
    htmlUrl,
    cssContent,
    JSON.stringify(cssUrls),
    JSON.stringify(jsUrls),
    children,
  ]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        minHeight: '800px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        background: 'white',
      }}
    />
  );
}

function getModalEnhancements() {
  return `
    [class*="modal"],
    [class*="overlay"],
    [class*="backdrop"],
    [class*="dialog"],
    [class*="popup"],
    [id*="modal"],
    [role="dialog"] {
      position: fixed !important;
      z-index: 999999 !important;
    }
    
    [class*="modal-overlay"],
    [class*="backdrop"],
    [class*="overlay"] {
      position: fixed !important;
      inset: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      z-index: 999999 !important;
    }
  `;
}

/**
 * Patch ReactDOM.createPortal at the module level
 */
function patchCreatePortal(iframeDoc) {
  const originalCreatePortal = ReactDOMExports.createPortal;

  console.log('[Portal Patch] Installing createPortal interceptor');

  // Override the createPortal function
  ReactDOMExports.createPortal = function (children, container, key) {
    console.log(
      '[Portal Patch] createPortal called with container:',
      container?.tagName,
      container,
    );

    // Get modal root in iframe
    let modalRoot = iframeDoc.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = iframeDoc.createElement('div');
      modalRoot.id = 'modal-root';
      modalRoot.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        pointer-events: none !important;
        z-index: 999999 !important;
      `;
      iframeDoc.body.appendChild(modalRoot);
    }

    // If container is ANY body element, redirect to iframe's modal-root
    if (!container || container.tagName === 'BODY') {
      console.log('[Portal Patch] ✅ Redirecting portal to iframe modal-root');
      container = modalRoot;
    }

    // Call original createPortal
    return originalCreatePortal.call(this, children, container, key);
  };

  console.log('[Portal Patch] ✅ Interceptor installed');
}

/**
 * Setup aggressive DOM monitor to catch and fix any modals
 */
function setupDOMMonitor(iframeDoc) {
  const iframeBody = iframeDoc.body;

  function getModalRoot() {
    let modalRoot = iframeDoc.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = iframeDoc.createElement('div');
      modalRoot.id = 'modal-root';
      modalRoot.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        pointer-events: none !important;
        z-index: 999999 !important;
      `;
      iframeDoc.body.appendChild(modalRoot);
    }
    return modalRoot;
  }

  function fixModalElement(element) {
    const className = (element.className || '').toString().toLowerCase();
    const id = (element.id || '').toString().toLowerCase();

    const isModal =
      className.includes('modal') ||
      className.includes('overlay') ||
      className.includes('backdrop') ||
      className.includes('dialog') ||
      id.includes('modal');

    if (!isModal) return false;

    console.log('[DOM Monitor] 🎯 Modal detected:', className || id);

    // Force styles
    element.style.position = 'fixed';
    element.style.zIndex = '999999';
    element.style.top = '0';
    element.style.left = '0';
    element.style.right = '0';
    element.style.bottom = '0';

    // Move to modal-root
    const modalRoot = getModalRoot();
    if (element.parentElement !== modalRoot) {
      console.log('[DOM Monitor] 📦 Moving modal to modal-root');
      modalRoot.appendChild(element);
    }

    return true;
  }

  // Monitor ALL additions to body
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1 && node.parentElement === iframeBody) {
          console.log(
            '[DOM Monitor] Element added to body:',
            node.className,
            node.tagName,
          );
          fixModalElement(node);

          // Also check children
          const children = node.querySelectorAll('*');
          children.forEach(fixModalElement);
        }
      });
    });
  });

  observer.observe(iframeBody, {
    childList: true,
    subtree: false,
  });

  // Periodic checks
  [100, 300, 500, 1000, 2000].forEach((delay) => {
    setTimeout(() => {
      console.log('[DOM Monitor] Periodic scan at', delay, 'ms');

      // Check everything in body (except #root and #modal-root)
      Array.from(iframeBody.children).forEach((child) => {
        if (child.id !== 'root' && child.id !== 'modal-root') {
          console.log(
            '[DOM Monitor] Found element in body:',
            child.className,
            child.tagName,
          );
          fixModalElement(child);
        }
      });
    }, delay);
  });

  console.log('[DOM Monitor] ✅ Active');
}
