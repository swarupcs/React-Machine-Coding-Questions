import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

export default function IframeSandbox({
  children,
  htmlUrl = null,
  cssUrls = [],
  jsUrls = [],
}) {
  const iframeRef = useRef(null);
  const reactRootRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    // Clean slate before loading anything
    doc.open();
    doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
    doc.close();

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

          // Inject CSS
          cssUrls.forEach((href) => {
            const link = doc.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            doc.head.appendChild(link);
          });

          // Inject JS
          jsUrls.forEach((src) => {
            const script = doc.createElement('script');
            script.type = 'module';
            script.src = src;
            doc.body.appendChild(script);
          });
        });

      // in vanilla mode do NOT mount React
      return;
    }

    //
    // ------------------------ REACT MODE ------------------------
    //
    // Create root container
    doc.body.innerHTML = `<div id="root"></div>`;

    // Inject CSS first
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

    // Create new React root
    reactRootRef.current = ReactDOM.createRoot(mountNode);
    reactRootRef.current.render(children);

    // Cleanup on iframe teardown
    return () => {
      if (reactRootRef.current) {
        try {
          reactRootRef.current.unmount();
        } catch (err) {
          console.warn('Unmount error:', err);
        }
      }
    };
  }, [htmlUrl, JSON.stringify(cssUrls), JSON.stringify(jsUrls), children]);

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
