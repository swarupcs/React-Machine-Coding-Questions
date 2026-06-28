import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import * as Resizable from 'react-resizable-panels';
const PanelGroup = Resizable.PanelGroup || Resizable.Group || Resizable.default?.PanelGroup || Resizable.default?.Group;
const PanelResizeHandle = Resizable.PanelResizeHandle || Resizable.Separator || Resizable.default?.PanelResizeHandle || Resizable.default?.Separator;
const Panel = Resizable.Panel || Resizable.default?.Panel;

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
  defaultDark,
} from '@codesandbox/sandpack-react';

import {
  ChevronRight, ExternalLink, Monitor, Tablet, Smartphone,
  RefreshCw, RotateCcw, BookOpen, Zap, ArrowLeft, X
} from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import FileExplorer from '../components/FileExplorer';
import CodeViewer from '../components/CodeViewer';
import { getFileIcon } from '../utils/fileIcons';
import { detectTemplate, buildSandpackFiles, getEntryFile, getCustomSetup } from '../utils/sandpackConfig';

// Load all raw files lazily - for editorial display
const allRawFiles = import.meta.glob('../questions/*/*/**/*', { as: 'raw' });

// Load ONLY executable code files for Sandpack (excluding .md/.mdx which Vite MDX compiles to React components)
const allCodeFiles = import.meta.glob(
  ['../questions/*/*/**/*.{jsx,tsx,js,ts,css,html,json,svg,png}'],
  { as: 'raw' }
);

// ─── Reset Button (inside Sandpack context) ──────────────────────────────────
function SandpackResetButton() {
  const { sandpack } = useSandpack();
  const handleReset = useCallback(() => {
    sandpack.resetAllFiles();
  }, [sandpack]);
  return (
    <button
      onClick={handleReset}
      title="Reset all files to original"
      className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 transition-colors border border-amber-500/30 hover:border-amber-400/50"
    >
      <RotateCcw className="w-3.5 h-3.5" />
      Reset
    </button>
  );
}

// ─── Sandpack Practice Panel (Right) ────────────────────────────────────────
// KEY: Sandpack's layout uses a CSS variable (--sp-layout-height) that defaults
// to 300px. Passing height:'100%' does NOT propagate that variable, so CodeMirror
// ends up with 300px and won't scroll for long files.
// Fix: measure the actual container pixel height via ResizeObserver and pass
// it as an explicit number to SandpackLayout and each child component.
function SandpackPracticePanel({ sandpackFiles, template, customSetup, entryFile }) {
  const containerRef = useRef(null);
  const TOOLBAR_H = 40; // h-10 = 2.5rem = 40px
  const [spHeight, setSpHeight] = useState(400);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const h = el.clientHeight - TOOLBAR_H;
      setSpHeight(Math.max(200, h));
    };
    measure();
    const obs = new ResizeObserver(measure);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const visibleFiles = Object.entries(sandpackFiles)
    .filter(([, f]) => !f.hidden)
    .map(([path]) => path);

  return (
    <div ref={containerRef} className="flex flex-col h-full overflow-hidden">
      <SandpackProvider
        template={template}
        files={sandpackFiles}
        customSetup={customSetup}
        options={{
          activeFile: entryFile,
          visibleFiles,
          recompileMode: 'delayed',
          recompileDelay: 400,
        }}
        theme={defaultDark}
      >
        {/* Toolbar */}
        <div className="flex-shrink-0 flex items-center justify-between px-3 bg-[#12121f] border-b border-[#2d2d5e]" style={{ height: TOOLBAR_H }}>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-xs font-semibold text-violet-300 tracking-wider uppercase">Your Sandbox</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase">
              {template}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Live" />
          </div>
          <SandpackResetButton />
        </div>

        {/* SandpackLayout with explicit pixel height so CodeMirror can scroll */}
        <SandpackLayout
          style={{
            height: spHeight,
            borderRadius: 0,
            border: 'none',
            margin: 0,
            flexWrap: 'nowrap',
          }}
        >
          <SandpackFileExplorer style={{ height: spHeight, minWidth: 140, maxWidth: 180 }} />
          <SandpackCodeEditor
            showLineNumbers
            showInlineErrors
            wrapContent={false}
            style={{ height: spHeight }}
          />
          <SandpackPreview
            style={{ height: spHeight, minWidth: 240 }}
            showOpenInCodeSandbox={false}
            showNavigator={false}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}

// ─── Editorial Panel (Left) ──────────────────────────────────────────────────
function EditorialPanel({
  categoryName, questionName,
  availableFiles, rawFilesCache,
  onSelectFile, selectedFilePath,
  openTabs, onCloseTab,
}) {
  const [deviceView, setDeviceView] = useState('desktop');
  const [refreshKey, setRefreshKey] = useState(0);
  const questionKey = `${categoryName}/${questionName}`;

  return (
    <div className="flex flex-col h-full w-full bg-[#1e1e1e] overflow-hidden">
      {/* Editorial header bar */}
      <div className="h-10 flex-shrink-0 flex items-center justify-between px-3 bg-[#181818] border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-300 tracking-wider uppercase">Editorial</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Original Solution
          </span>
        </div>
        <a
          href={`/sandbox.html?question=${questionKey}`}
          target="_blank"
          rel="noreferrer"
          title="Open original preview in new tab"
          className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-white/5"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 3-panel horizontal: file explorer | code | preview */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-44 flex-shrink-0 border-r border-border overflow-hidden">
          <FileExplorer
            files={availableFiles}
            selectedFile={selectedFilePath}
            onSelectFile={onSelectFile}
          />
        </div>

        {/* Code + Preview stacked vertically */}
        <PanelGroup direction="vertical" className="flex-1 min-w-0 min-h-0">
          {/* Code pane */}
          <Panel defaultSize={50} minSize={15}>
            <div className="flex flex-col h-full overflow-hidden">
              {/* File tabs */}
              <div className="flex-shrink-0 flex bg-[#181818] overflow-x-auto border-b border-border/40"
                   style={{ scrollbarWidth: 'none' }}>
                {openTabs.map((tab) => (
                  <div
                    key={tab}
                    onClick={() => onSelectFile(tab)}
                    className={`group flex items-center gap-1.5 px-3 py-[7px] text-xs border-r border-border/30 cursor-pointer min-w-max transition-colors ${
                      selectedFilePath === tab
                        ? 'bg-[#1e1e1e] text-white border-t-2 border-t-emerald-500'
                        : 'bg-[#252525] text-muted-foreground hover:bg-[#2d2d2d]'
                    }`}
                  >
                    {getFileIcon(tab.split('/').pop())}
                    <span>{tab.split('/').pop()}</span>
                    {/* Close button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); onCloseTab(tab); }}
                      className="ml-1 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-white/15 transition-opacity"
                      title="Close tab"
                    >
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>
              {/* Monaco (read-only) — must have overflow-hidden to isolate scroll */}
              <div className="flex-1 overflow-hidden min-h-0">
                <CodeViewer
                  filePath={selectedFilePath}
                  code={selectedFilePath ? rawFilesCache[selectedFilePath] : ''}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="h-[3px] bg-[#2a2a2a] hover:bg-emerald-500 transition-colors cursor-row-resize flex-shrink-0" />

          {/* Preview pane */}
          <Panel defaultSize={50} minSize={15}>
            <div className="flex flex-col h-full overflow-hidden bg-background">
              {/* Preview toolbar */}
              <div className="flex-shrink-0 h-9 flex items-center justify-between px-2 bg-muted border-b">
                <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5 border shadow-sm">
                  {[
                    { view: 'mobile', icon: Smartphone },
                    { view: 'tablet', icon: Tablet },
                    { view: 'desktop', icon: Monitor },
                  ].map(({ view, icon: Icon }) => (
                    <button
                      key={view}
                      onClick={() => setDeviceView(view)}
                      className={`p-1 rounded transition-colors ${
                        deviceView === view ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setRefreshKey(k => k + 1)}
                  className="p-1 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted"
                  title="Refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Iframe wrapper — fills remaining space without escaping */}
              <div className={`flex-1 min-h-0 overflow-auto flex justify-center bg-[#e5e5e5] dark:bg-black/20 ${deviceView === 'desktop' ? '' : 'p-3'}`}>
                <div
                  className={`bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300 flex-shrink-0 ${
                    deviceView === 'mobile'
                      ? 'w-[375px] h-[667px] rounded-[1.5rem] border-8 border-gray-900 overflow-hidden'
                      : deviceView === 'tablet'
                      ? 'w-[768px] h-[900px] rounded-xl overflow-hidden'
                      : 'w-full h-full rounded-none overflow-hidden'
                  }`}
                >
                  <iframe
                    key={`editorial-${questionKey}-${refreshKey}`}
                    title={`Editorial — ${questionName}`}
                    src={`/sandbox.html?question=${questionKey}`}
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                  />
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}

// ─── Main Practice View ──────────────────────────────────────────────────────
export default function PracticeView() {
  const { categoryName, questionName } = useParams();
  const questionKey = `${categoryName}/${questionName}`;
  const prefix = `../questions/${categoryName}/${questionName}/`;

  const [availableFiles, setAvailableFiles] = useState([]);
  const [rawFilesCache, setRawFilesCache] = useState({});
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sandpack state
  const [sandpackFiles, setSandpackFiles] = useState(null);
  const [template, setTemplate] = useState('react');
  const [customSetup, setCustomSetup] = useState({});
  const [entryFile, setEntryFile] = useState('/App.jsx');

  useEffect(() => {
    const loadAll = async (currentPrefix) => {
      // ── 1. Load editorial files ──────────────────────────────────────────
      const matchedKeys = Object.keys(allRawFiles).filter(p => p.startsWith(currentPrefix));
      const filePaths = matchedKeys.map(k => k.replace(currentPrefix, ''));
      setAvailableFiles(filePaths);

      const cache = {};
      for (const key of matchedKeys) {
        try {
          const content = await allRawFiles[key]();
          const rel = key.replace(currentPrefix, '');
          if (typeof content === 'string') cache[rel] = content;
        } catch (err) {
          console.error('Failed to load editorial file:', key, err);
        }
      }
      setRawFilesCache(cache);

      const paths = Object.keys(cache);
      const defaultFile =
        paths.includes('App.jsx') ? 'App.jsx' :
        paths.includes('App.tsx') ? 'App.tsx' :
        paths.includes('index.html') ? 'index.html' :
        paths[0];

      if (defaultFile) {
        setSelectedFilePath(defaultFile);
        setOpenTabs([defaultFile]);
      }

      // ── 2. Load Sandpack files (code-only glob, no .md) ──────────────────
      const codeKeys = Object.keys(allCodeFiles).filter(p => p.startsWith(currentPrefix));
      const spCache = {};
      for (const key of codeKeys) {
        try {
          const content = await allCodeFiles[key]();
          const rel = key.replace(currentPrefix, '');
          if (typeof content === 'string') spCache[rel] = content;
        } catch (err) {
          console.error('Failed to load sandpack file:', key, err);
        }
      }

      const codePaths = Object.keys(spCache);
      const tpl = detectTemplate(codePaths);
      const spFiles = buildSandpackFiles(spCache, tpl);
      const setup = getCustomSetup(tpl);
      const entry = getEntryFile(codePaths, tpl);

      setTemplate(tpl);
      setCustomSetup(setup);
      setEntryFile(entry);
      setSandpackFiles(spFiles);
      setLoading(false);
    };

    setLoading(true);
    setAvailableFiles([]);
    setRawFilesCache({});
    setSelectedFilePath(null);
    setOpenTabs([]);
    setSandpackFiles(null);
    loadAll(prefix);
  }, [questionKey]);

  const handleSelectFile = useCallback((filePath) => {
    setOpenTabs(prev => prev.includes(filePath) ? prev : [...prev, filePath]);
    setSelectedFilePath(filePath);
  }, []);

  const handleCloseTab = useCallback((filePath) => {
    setOpenTabs(prev => {
      const next = prev.filter(t => t !== filePath);
      if (selectedFilePath === filePath) {
        setSelectedFilePath(next.length > 0 ? next[next.length - 1] : null);
      }
      return next;
    });
  }, [selectedFilePath]);

  if (loading || !sandpackFiles) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0f0f23] gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium text-violet-300">Preparing practice sandbox…</span>
        </div>
        <p className="text-xs text-muted-foreground/60">Loading {questionName?.replace(/-/g, ' ')}…</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex overflow-hidden bg-[#0f0f23] text-gray-300">

      {/* ── Left: Sidebar (question list) ────────────────────────────────── */}
      <aside className="hidden md:flex flex-shrink-0 h-full">
        <Sidebar />
      </aside>

      {/* ── Right: Everything else ────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Bar */}
        <div className="h-11 flex-shrink-0 flex items-center justify-between px-4 bg-[#0a0a1a] border-b border-[#1e1e3f] z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm min-w-0">
            <Link
              to={`/category/${categoryName}/${questionName}`}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
            <span className="text-muted-foreground/70 truncate hidden md:inline">{categoryName?.replace(/-/g, ' ')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0 hidden md:inline" />
            <span className="text-white font-medium truncate">{questionName?.replace(/-/g, ' ')}</span>
          </div>

          {/* Center badge */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
            <Zap className="w-4 h-4 text-violet-400" />
            <span className="text-sm font-semibold text-violet-300">Practice Mode</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-violet-500/20 text-violet-300 border border-violet-500/30 uppercase tracking-wider">
              {template}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href={`/sandbox.html?question=${questionKey}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open solution</span>
            </a>
          </div>
        </div>

        {/* Column labels */}
        <div className="h-7 flex-shrink-0 flex bg-[#0a0a1a] border-b border-[#1e1e3f]">
          <div className="flex-1 flex items-center justify-center gap-2 border-r border-[#1e1e3f]">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span className="text-[11px] font-semibold text-emerald-400 tracking-widest uppercase">
              Editorial — Original Solution
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Zap className="w-3 h-3 text-violet-400" />
            <span className="text-[11px] font-semibold text-violet-400 tracking-widest uppercase">
              Your Sandbox — Practice Here
            </span>
          </div>
        </div>

        {/* Main content: Editorial | Sandbox */}
        <PanelGroup direction="horizontal" className="flex-1 min-h-0">

          {/* Editorial */}
          <Panel defaultSize={45} minSize={25}>
            <EditorialPanel
              categoryName={categoryName}
              questionName={questionName}
              availableFiles={availableFiles}
              rawFilesCache={rawFilesCache}
              onSelectFile={handleSelectFile}
              selectedFilePath={selectedFilePath}
              openTabs={openTabs}
              onCloseTab={handleCloseTab}
            />
          </Panel>

          <PanelResizeHandle className="w-[3px] bg-[#1e1e3f] hover:bg-violet-500 transition-colors cursor-col-resize" />

          {/* Sandpack sandbox */}
          <Panel defaultSize={55} minSize={30}>
            <div className="flex flex-col h-full overflow-hidden">
              <SandpackPracticePanel
                sandpackFiles={sandpackFiles}
                template={template}
                customSetup={customSetup}
                entryFile={entryFile}
              />
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}
