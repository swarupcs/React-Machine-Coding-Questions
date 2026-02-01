import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import * as React from 'react';
import { __setIframeDocument } from '../react-dom-wrapper';

export default function IframeSandbox({
  children,
  htmlUrl = null,
  cssContent = '',
  jsUrls = [],
}) {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [iframeDoc, setIframeDoc] = useState(null);
  const rootRef = useRef(null);
  const mountedRef = useRef(true);

  // Cleanup function to properly unmount and reset
  const cleanup = () => {
    setIsReady(false);
    setIframeDoc(null);
    __setIframeDocument(null);

    if (rootRef.current) {
      try {
        rootRef.current.unmount();
      } catch (err) {
        console.warn('Failed to unmount:', err);
      }
      rootRef.current = null;
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    const win = iframe.contentWindow;

    if (!doc || !win) return;

    // For vanilla HTML mode
    if (htmlUrl) {
      fetch(htmlUrl)
        .then((res) => res.text())
        .then((html) => {
          if (!mountedRef.current) return;

          doc.open();
          doc.write(html);
          doc.close();

          if (cssContent) {
            const style = doc.createElement('style');
            style.textContent = cssContent;
            doc.head.appendChild(style);
          }

          jsUrls.forEach((src) => {
            const script = doc.createElement('script');
            script.type = 'module';
            script.src = src;
            doc.body.appendChild(script);
          });
        })
        .catch((err) => console.error('Failed to load HTML:', err));

      return cleanup;
    }

    // For React mode - setup environment
    setupReactEnvironment(doc, win, cssContent, () => {
      if (!mountedRef.current) return;
      setIframeDoc(doc);
      setIsReady(true);
    });

    return cleanup;
  }, [htmlUrl, cssContent, JSON.stringify(jsUrls)]);

  // Render React component into iframe once ready
  useEffect(() => {
    if (!isReady || htmlUrl || !iframeDoc) return;

    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    const win = iframe?.contentWindow;

    if (!doc || !win) return;

    try {
      // Set the iframe document for the portal wrapper
      __setIframeDocument(iframeDoc);

      // Make React and ReactDOM available in iframe window
      win.React = React;
      win.ReactDOM = ReactDOM;

      const mountPoint = doc.getElementById('root');
      if (!mountPoint) return;

      // Create root and render
      if (rootRef.current) {
        rootRef.current.unmount();
      }
      rootRef.current = ReactDOM.createRoot(mountPoint);
      rootRef.current.render(children);
    } catch (err) {
      console.error('Failed to render React in iframe:', err);
    }

    // Cleanup
    return () => {
      __setIframeDocument(null);
      if (rootRef.current) {
        try {
          rootRef.current.unmount();
        } catch (err) {
          console.warn('Failed to unmount:', err);
        }
        rootRef.current = null;
      }
    };
  }, [isReady, children, htmlUrl, iframeDoc]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title='Question Preview Sandbox'
      style={{
        width: '100%',
        minHeight: '600px',
        border: 'none',
        borderRadius: '8px',
        background: 'white',
      }}
      sandbox='allow-scripts allow-same-origin allow-modals allow-forms'
    />
  );
}

function setupReactEnvironment(iframeDoc, iframeWin, cssContent, onReady) {
  iframeDoc.open();
  iframeDoc.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Question Preview</title>
        <style>
          * {
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          body {
            padding: 20px;
            background: white;
          }
          
          #root {
            width: 100%;
            min-height: 400px;
          }

          h1, h2, h3, h4, h5, h6, p, ul, ol, li {
            margin: 0;
            padding: 0;
          }

          button {
            font-family: inherit;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `);
  iframeDoc.close();

  if (cssContent) {
    const style = iframeDoc.createElement('style');
    style.textContent = cssContent;
    style.setAttribute('data-question-styles', 'true');
    iframeDoc.head.appendChild(style);
  }

  if (onReady) onReady();
}
