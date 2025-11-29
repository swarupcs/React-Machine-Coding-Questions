import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

export default function IframeSandbox({ children }) {
  const iframeRef = useRef(null);
  const reactRootRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument;

    // Initial HTML inside iframe
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { margin: 0; padding: 16px; font-family: sans-serif; }
          </style>
        </head>
        <body>
          <div id="mcq-root"></div>
        </body>
      </html>
    `);
    doc.close();

    const mountNode = doc.getElementById('mcq-root');

    // Create React root inside iframe
    reactRootRef.current = ReactDOM.createRoot(mountNode);
    reactRootRef.current.render(children);

    return () => {
      // Completely safe unmount
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
      }
    };
  }, [children]);

  return (
    <iframe
      ref={iframeRef}
      style={{
        width: '100%',
        minHeight: '500px',
        border: '1px solid #ccc',
        borderRadius: '10px',
        background: 'white',
      }}
    />
  );
}
