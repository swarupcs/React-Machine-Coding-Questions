import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import './QuestionPreview.css';
import FileExplorer from '../components/FileExplorer';
import CodeViewer from '../components/CodeViewer';

// Load all raw files lazily
const allRawFiles = import.meta.glob('../questions/*/*/**/*', {
  query: '?raw',
  import: 'default',
});

// Custom resizable panel hook
function useResize(initialPx, minPx = 100, maxPx = 600) {
  const [width, setWidth] = useState(initialPx);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [width]);

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return;
      const delta = e.clientX - startX.current;
      const next = Math.max(minPx, Math.min(maxPx, startWidth.current + delta));
      setWidth(next);
    };
    const onMouseUp = () => {
      dragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [minPx, maxPx]);

  return [width, onMouseDown];
}

export default function QuestionPreview() {
  const { categoryName, questionName } = useParams();

  const [availableFiles, setAvailableFiles] = useState([]);
  const [rawFilesCache, setRawFilesCache] = useState({});
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Resizable panels: explorer width, editor width (preview gets the rest)
  const [explorerWidth, onExplorerDrag] = useResize(200, 120, 400);
  const [editorWidth, onEditorDrag] = useResize(480, 200, 900);

  const prefix = `../questions/${categoryName}/${questionName}/`;
  const questionKey = `${categoryName}/${questionName}`;

  useEffect(() => {
    setLoading(true);
    setAvailableFiles([]);
    setRawFilesCache({});
    setSelectedFilePath(null);
    setIsFullscreen(false);
  }, [questionKey]);

  useEffect(() => {
    const matchedKeys = Object.keys(allRawFiles).filter((p) => p.startsWith(prefix));
    const filePaths = matchedKeys.map((key) => key.replace(prefix, ''));
    setAvailableFiles(filePaths);

    if (filePaths.includes('App.jsx')) handleSelectFile('App.jsx', matchedKeys);
    else if (filePaths.includes('index.html')) handleSelectFile('index.html', matchedKeys);
    else if (filePaths.length > 0) handleSelectFile(filePaths[0], matchedKeys);

    setLoading(false);
  }, [questionKey]);

  const handleSelectFile = async (filePath, keys = null) => {
    setSelectedFilePath(filePath);
    if (rawFilesCache[filePath]) return;
    const matchedKeys = keys || Object.keys(allRawFiles).filter((p) => p.startsWith(prefix));
    const fullPath = matchedKeys.find(k => k.replace(prefix, '') === filePath);
    if (fullPath && allRawFiles[fullPath]) {
      try {
        const content = await allRawFiles[fullPath]();
        setRawFilesCache(prev => ({ ...prev, [filePath]: content }));
      } catch (err) {
        console.error('Failed to load file:', err);
      }
    }
  };

  // Keyboard shortcut
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'F11') { e.preventDefault(); setIsFullscreen(p => !p); }
    if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
  }, [isFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={`qp-container${isFullscreen ? ' qp-fullscreen' : ''}`} key={questionKey}>
      {/* Compact header */}
      <div className="qp-header">
        <div className="qp-breadcrumb">
          <Link to="/">Home</Link>
          <span className="qp-breadcrumb-sep">›</span>
          <Link to={`/category/${categoryName}`}>{categoryName}</Link>
          <span className="qp-breadcrumb-sep">›</span>
          <span className="qp-breadcrumb-current">{questionName}</span>
        </div>
        <div className="qp-header-actions">
          <button
            className="qp-fullscreen-btn"
            onClick={() => setIsFullscreen(p => !p)}
            title={isFullscreen ? 'Exit Fullscreen (Esc)' : 'Fullscreen (F11)'}
          >
            {isFullscreen ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="4 14 10 14 10 20"/><polyline points="20 10 14 10 14 4"/>
                <line x1="10" y1="14" x2="3" y2="21"/><line x1="21" y1="3" x2="14" y2="10"/>
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
                <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
              </svg>
            )}
            <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Workspace */}
      <div className="qp-workspace">
        {loading ? (
          <div className="qp-loading">
            <div className="qp-spinner" />
            <span className="qp-loading-text">Loading workspace…</span>
          </div>
        ) : availableFiles.length === 0 ? (
          <div className="qp-not-found">
            <div className="qp-not-found-icon">🔍</div>
            <h2>Question Not Found</h2>
            <p>The question you're looking for doesn't exist.</p>
          </div>
        ) : (
          <div className="qp-panels">
            {/* File Explorer */}
            <div className="qp-panel-sidebar" style={{ width: explorerWidth, minWidth: explorerWidth, maxWidth: explorerWidth }}>
              <FileExplorer
                files={availableFiles}
                selectedFile={selectedFilePath}
                onSelectFile={(path) => handleSelectFile(path)}
              />
            </div>

            {/* Drag handle 1 */}
            <div className="qp-drag-handle" onMouseDown={onExplorerDrag} />

            {/* Code Editor */}
            <div className="qp-panel-editor" style={{ width: editorWidth, minWidth: editorWidth, maxWidth: editorWidth }}>
              <CodeViewer
                filePath={selectedFilePath}
                code={selectedFilePath ? rawFilesCache[selectedFilePath] : ''}
              />
            </div>

            {/* Drag handle 2 */}
            <div className="qp-drag-handle" onMouseDown={onEditorDrag} />

            {/* Live Preview — fills remaining space */}
            <div className="qp-panel-preview">
              <div className="qp-preview-header">
                <span className="qp-preview-title">
                  <span className="qp-preview-dot" />
                  Preview
                </span>
              </div>
              <div className="qp-preview-content">
                <iframe
                  key={questionKey}
                  title={`Sandbox - ${questionName}`}
                  src={`/sandbox.html?question=${categoryName}/${questionName}`}
                  style={{ width: '100%', height: '100%', border: 'none' }}
                  sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
