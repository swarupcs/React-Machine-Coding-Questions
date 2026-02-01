import { useParams, Link } from 'react-router-dom';
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
  const [loading, setLoading] = useState(true);

  const prefix = `../questions/${categoryName}/${questionName}/`;

  // Create a unique key for this question to force remount
  const questionKey = `${categoryName}/${questionName}`;

  // Reset state when question changes
  useEffect(() => {
    setLoading(true);
    setReactComponent(null);
    setCssContent('');
    setJsUrls([]);
  }, [questionKey]);

  // 1) Load React component
  useEffect(() => {
    let mounted = true;
    const reactPath = prefix + 'App.jsx';

    async function loadReact() {
      if (!reactModules[reactPath]) {
        if (mounted) {
          setReactComponent(null);
          setLoading(false);
        }
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
          setLoading(false);
          return;
        }

        setReactComponent(() => Comp);
        setLoading(false);
      } catch (err) {
        console.error('Failed to dynamically import React component:', err);
        if (mounted) {
          setReactComponent(null);
          setLoading(false);
        }
      }
    }

    loadReact();

    return () => {
      mounted = false;
    };
  }, [categoryName, questionName, prefix]);

  // 2) Load CSS content as raw text
  useEffect(() => {
    let cancelled = false;

    async function loadAssets() {
      // Match CSS files
      const matchedCssKeys = Object.keys(cssModules).filter((p) =>
        p.startsWith(prefix)
      );

      const cssPromises = matchedCssKeys.map((key) => cssModules[key]());
      const resolvedCss = await Promise.all(cssPromises);

      // Combine all CSS content
      const combinedCss = resolvedCss.filter(Boolean).join('\n\n');

      // Match vanilla js files
      const matchedJsKeys = Object.keys(jsModules).filter((p) =>
        p.startsWith(prefix)
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
  }, [categoryName, questionName, prefix]);

  // 3) Detect vanilla HTML
  const htmlUrl = htmlModules[prefix + 'index.html'] || null;

  return (
    <div className='qp-container animate-fadeIn' key={questionKey}>
      {/* Breadcrumb */}
      <div className='qp-breadcrumb'>
        <Link to='/'>Home</Link>
        <span>›</span>
        <Link to={`/category/${categoryName}`}>{categoryName}</Link>
        <span>›</span>
        <span>{questionName}</span>
      </div>

      <h1 className='qp-title'>
        <span>{categoryName}</span>
        <span className='qp-title-separator'>→</span>
        <span>{questionName}</span>
      </h1>

      <div className='qp-card'>
        <div className='qp-content'>
          {loading && (
            <div className='qp-loading'>
              <div className='qp-loading-content'>
                <div className='qp-spinner'></div>
                <span className='qp-loading-text'>Loading question...</span>
              </div>
            </div>
          )}

          {/* React mode */}
          {!loading && ReactComponent && (
            <IframeSandbox key={questionKey} cssContent={cssContent}>
              <ReactComponent />
            </IframeSandbox>
          )}

          {/* Vanilla mode */}
          {!loading && !ReactComponent && htmlUrl && (
            <IframeSandbox
              key={questionKey}
              htmlUrl={htmlUrl}
              cssContent={cssContent}
              jsUrls={jsUrls}
            />
          )}

          {/* Nothing found */}
          {!loading && !ReactComponent && !htmlUrl && (
            <div className='qp-not-found'>
              <div className='qp-not-found-icon'>🔍</div>
              <h2 className='qp-not-found-title'>Question Not Found</h2>
              <p className='qp-not-found-message'>
                The question you're looking for doesn't exist or hasn't been
                created yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
