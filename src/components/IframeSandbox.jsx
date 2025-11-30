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
    const doc = iframe.contentDocument;

    // always cleanup old root BEFORE rewriting iframe
    if (reactRootRef.current) {
      reactRootRef.current.unmount();
      reactRootRef.current = null;
    }

    // ---------------------------
    // VANILLA HTML MODE
    // ---------------------------
    if (htmlUrl) {
      fetch(htmlUrl)
        .then((res) => res.text())
        .then((html) => {
          doc.open();
          doc.write(html);
          doc.close();

          // inject CSS
          cssUrls.forEach((href) => {
            const link = doc.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            doc.head.appendChild(link);
          });

          // inject JS
          jsUrls.forEach((src) => {
            const script = doc.createElement('script');
            script.type = 'module';
            script.src = src;
            doc.body.appendChild(script);
          });
        });
      return;
    }

    // ---------------------------
    // REACT MODE
    // ---------------------------

    // reset iframe content BEFORE mounting React
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html>
        <head></head>
        <body><div id="root"></div></body>
      </html>
    `);
    doc.close();

    const mountNode = doc.getElementById('root');

    // Load CSS before mounting React
    let cssLoaded = 0;

    function tryMountReact() {
      if (cssLoaded === cssUrls.length) {
        reactRootRef.current = ReactDOM.createRoot(mountNode);
        reactRootRef.current.render(children);
      }
    }

    if (cssUrls.length === 0) {
      tryMountReact();
    } else {
      cssUrls.forEach((href) => {
        const link = doc.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;

        link.onload = () => {
          cssLoaded++;
          tryMountReact();
        };

        doc.head.appendChild(link);
      });
    }

    // Cleanup on unmount
    return () => {
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
        reactRootRef.current = null;
      }
    };
  }, [children, htmlUrl, JSON.stringify(cssUrls), JSON.stringify(jsUrls)]);

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
