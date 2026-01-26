import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QuestionPreview.css';
import IframeSandbox from '../components/IframeSandbox';

// detect App.jsx (React)
const reactModules = import.meta.glob('../questions/*/*/App.jsx');

// detect index.html (vanilla) - using new query syntax
const htmlModules = import.meta.glob('../questions/*/*/index.html', {
  query: '?url',
  import: 'default',
});

// Import CSS as raw text - using new query syntax
const cssModules = import.meta.glob('../questions/*/*/*.css', {
  query: '?raw',
  import: 'default',
});

// detect ALL js files - using new query syntax
const jsModules = import.meta.glob('../questions/*/*/{script.js,index.js}', {
  query: '?url',
  import: 'default',
});

export default function QuestionPreview() {
  const { categoryName, questionName } = useParams();
  const [ReactComponent, setReactComponent] = useState(null);
  const [cssContent, setCssContent] = useState('');
  const [jsUrls, setJsUrls] = useState([]);

  const prefix = `../questions/${categoryName}/${questionName}/`;

  // 1) Load React component
  useEffect(() => {
    let mounted = true;
    const reactPath = prefix + 'App.jsx';

    async function loadReact() {
      if (!reactModules[reactPath]) {
        if (mounted) setReactComponent(null);
        return;
      }

      try {
        const mod = await reactModules[reactPath]();
        if (!mounted) return;

        const chooseComponent = (m) => {
          if (!m) return null;
          if (typeof m.default === 'function' || typeof m.default === 'object')
            return m.default;
          const vals = Object.values(m);
          for (const v of vals) {
            if (
              typeof v === 'function' ||
              (typeof v === 'object' && v && (v.$$typeof || v.render))
            ) {
              return v;
            }
          }
          return null;
        };

        const Comp = chooseComponent(mod);

        if (!Comp) {
          console.warn("Couldn't find a React component export");
          setReactComponent(null);
          return;
        }

        setReactComponent(() => Comp);
      } catch (err) {
        console.error('Failed to dynamically import React component:', err);
        if (mounted) setReactComponent(null);
      }
    }

    loadReact();

    return () => {
      mounted = false;
    };
  }, [categoryName, questionName]);

  // 2) Load CSS content as raw text
  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      // Match CSS files
      const matchedCssKeys = Object.keys(cssModules).filter((p) =>
        p.startsWith(prefix),
      );

      const cssPromises = matchedCssKeys.map((key) => cssModules[key]());
      const resolvedCss = await Promise.all(cssPromises);

      // Combine all CSS content
      const combinedCss = resolvedCss.filter(Boolean).join('\n\n');

      // Match vanilla js files
      const matchedJsKeys = Object.keys(jsModules).filter((p) =>
        p.startsWith(prefix),
      );

      const jsPromises = matchedJsKeys.map((key) => jsModules[key]());
      const resolvedJs = (await Promise.all(jsPromises)).filter(Boolean);

      if (!cancelled) {
        console.log('[QuestionPreview] Loaded CSS:', {
          length: combinedCss.length,
          preview: combinedCss.substring(0, 200),
          files: matchedCssKeys,
        });
        setCssContent(combinedCss);
        setJsUrls(resolvedJs);
      }
    }

    loadAssets();

    return () => {
      cancelled = true;
      setCssContent('');
      setJsUrls([]);
    };
  }, [categoryName, questionName]);

  // 3) Detect vanilla HTML
  const htmlUrl = htmlModules[prefix + 'index.html'] || null;

  return (
    <div className='qp-container'>
      <h1 className='qp-title'>
        {categoryName} → {questionName}
      </h1>

      <div className='qp-card'>
        <div className='qp-content'>
          {/* React mode */}
          {ReactComponent && (
            <IframeSandbox cssContent={cssContent}>
              <ReactComponent />
            </IframeSandbox>
          )}

          {/* Vanilla mode */}
          {!ReactComponent && htmlUrl && (
            <IframeSandbox
              htmlUrl={htmlUrl}
              cssContent={cssContent}
              jsUrls={jsUrls}
            />
          )}

          {/* Nothing found */}
          {!ReactComponent && !htmlUrl && <h2>Not found</h2>}
        </div>
      </div>
    </div>
  );
}
