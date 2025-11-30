import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './QuestionPreview.css';
import IframeSandbox from '../components/IframeSandbox';

// detect App.jsx (React)
const reactModules = import.meta.glob('../questions/*/*/App.jsx');

// detect index.html (vanilla)
const htmlModules = import.meta.glob('../questions/*/*/index.html', {
  as: 'url',
});

// detect ALL css files (as url functions)
const cssModules = import.meta.glob('../questions/*/*/*.css', { as: 'url' });

// detect ALL js files (as url functions)
const jsModules = import.meta.glob('../questions/*/*/{script.js,index.js}', {
  as: 'url',
});



export default function QuestionPreview() {
  const { categoryName, questionName } = useParams();
  const [ReactComponent, setReactComponent] = useState(null);

  // resolved urls for the current folder (injected into iframe)
  const [cssUrls, setCssUrls] = useState([]);
  const [jsUrls, setJsUrls] = useState([]);

  // prefix used to match glob keys
  const prefix = `../questions/${categoryName}/${questionName}/`;

  // 1) Load React component (if App.jsx exists)
  // safe loader for React components
  useEffect(() => {
    let mounted = true;
    const reactPath = prefix + 'App.jsx';

    async function loadReact() {
      if (!reactModules[reactPath]) {
        if (mounted) setReactComponent(null);
        return;
      }

      try {
        const mod = await reactModules[reactPath](); // dynamic import
        if (!mounted) return;

        // Helper: choose the component from module
        const chooseComponent = (m) => {
          if (!m) return null;
          // prefer default
          if (typeof m.default === 'function' || typeof m.default === 'object')
            return m.default;
          // otherwise find first exported function/class
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
          console.warn(
            "QuestionPreview: loaded module but couldn't find a React component export. Module keys:",
            Object.keys(mod),
            'module:',
            mod
          );
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

  // 2) Resolve CSS and JS URLs for this folder (call the functions returned by import.meta.glob)
  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      // match ANY css file inside the question folder
      const matchedCssKeys = Object.keys(cssModules).filter((p) =>
        p.startsWith(prefix)
      );

      const cssPromises = matchedCssKeys.map((key) => cssModules[key]());
      const resolvedCss = (await Promise.all(cssPromises)).filter(Boolean);

      // match vanilla js files
      const matchedJsKeys = Object.keys(jsModules).filter((p) =>
        p.startsWith(prefix)
      );

      const jsPromises = matchedJsKeys.map((key) => jsModules[key]());
      const resolvedJs = (await Promise.all(jsPromises)).filter(Boolean);

      if (!cancelled) {
        setCssUrls(resolvedCss);
        setJsUrls(resolvedJs);
      }
    }

    loadAssets();

    return () => {
      cancelled = true;
      setCssUrls([]);
      setJsUrls([]);
    };
  }, [categoryName, questionName]);

  // 3) Detect vanilla HTML (served URL) if present
  const htmlUrl = htmlModules[prefix + 'index.html'] || null;

  // debug helper (remove or comment out after testing)
  // console.log('prefix', prefix, 'cssUrls', cssUrls, 'jsUrls', jsUrls, 'htmlUrl', htmlUrl, 'ReactComponent?', !!ReactComponent);

  return (
    <div className='qp-container'>
      <h1 className='qp-title'>
        {categoryName} → {questionName}
      </h1>

      <div className='qp-card'>
        <div className='qp-content'>
          {/* React mode: render React component inside iframe and inject cssUrls */}
          {ReactComponent && (
            <IframeSandbox cssUrls={cssUrls}>
              <ReactComponent />
            </IframeSandbox>
          )}

          {/* Vanilla mode: load index.html and inject cssUrls & jsUrls */}
          {!ReactComponent && htmlUrl && (
            <IframeSandbox
              htmlUrl={htmlUrl}
              cssUrls={cssUrls}
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
