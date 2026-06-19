import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import * as Resizable from 'react-resizable-panels';
const PanelGroup = Resizable.PanelGroup || Resizable.Group || Resizable.default?.PanelGroup || Resizable.default?.Group;
const PanelResizeHandle = Resizable.PanelResizeHandle || Resizable.Separator || Resizable.default?.PanelResizeHandle || Resizable.default?.Separator;
const Panel = Resizable.Panel || Resizable.default?.Panel;
import { X, RefreshCw, ExternalLink, Monitor, Tablet, Smartphone, ChevronRight } from 'lucide-react';
import { useTracking } from '../hooks/useTracking';
import FileExplorer from '../components/FileExplorer';
import CodeViewer from '../components/CodeViewer';

// Load all raw files lazily
const allRawFiles = import.meta.glob('../questions/*/*/**/*', {
  query: '?raw',
  import: 'default',
});

export default function QuestionPreview() {
  const { categoryName, questionName } = useParams();
  const { markViewed } = useTracking();
  const questionKey = `${categoryName}/${questionName}`;

  const [availableFiles, setAvailableFiles] = useState([]);
  const [rawFilesCache, setRawFilesCache] = useState({});
  const [selectedFilePath, setSelectedFilePath] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [deviceView, setDeviceView] = useState('desktop'); // desktop, tablet, mobile
  const [refreshKey, setRefreshKey] = useState(0);

  const prefix = `../questions/${categoryName}/${questionName}/`;

  useEffect(() => {
    if (categoryName && questionName) {
      markViewed(questionKey);
    }
  }, [questionKey]);

  useEffect(() => {
    setLoading(true);
    setAvailableFiles([]);
    setRawFilesCache({});
    setSelectedFilePath(null);
    setOpenTabs([]);

    const matchedKeys = Object.keys(allRawFiles).filter((p) => p.startsWith(prefix));
    const filePaths = matchedKeys.map((key) => key.replace(prefix, ''));
    setAvailableFiles(filePaths);

    if (filePaths.includes('App.jsx')) handleSelectFile('App.jsx', matchedKeys);
    else if (filePaths.includes('index.html')) handleSelectFile('index.html', matchedKeys);
    else if (filePaths.length > 0) handleSelectFile(filePaths[0], matchedKeys);

    setLoading(false);
  }, [questionKey]);

  const handleSelectFile = async (filePath, keys = null) => {
    if (!openTabs.includes(filePath)) {
      setOpenTabs(prev => [...prev, filePath]);
    }
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

  const closeTab = (e, filePath) => {
    e.stopPropagation();
    setOpenTabs(prev => prev.filter(t => t !== filePath));
    if (selectedFilePath === filePath) {
      const newTabs = openTabs.filter(t => t !== filePath);
      setSelectedFilePath(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  const handleRefresh = () => setRefreshKey(k => k + 1);

  if (loading) {
    return <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-muted-foreground">Loading workspace...</div>;
  }

  return (
    <div className="flex flex-col flex-1 w-full min-h-0 bg-[#1e1e1e] text-gray-300">
      {/* Top Breadcrumb Bar */}
      <div className="h-10 flex-shrink-0 flex items-center justify-between px-4 bg-[#181818] border-b border-border text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/category/${categoryName}`} className="hover:text-foreground">{categoryName.replace(/-/g, ' ')}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{questionName.replace(/-/g, ' ')}</span>
        </div>
      </div>

      <PanelGroup direction="horizontal" className="flex-1 min-h-0 w-full">
        {/* Sidebar */}
        <Panel defaultSize={15} minSize={10}>
            <FileExplorer
              files={availableFiles}
              selectedFile={selectedFilePath}
              onSelectFile={(path) => handleSelectFile(path)}
            />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-primary transition-colors cursor-col-resize" />
          
          {/* Editor */}
          <Panel defaultSize={40} minSize={20}>
            <div className="flex flex-col h-full bg-[#1e1e1e]">
              {/* Tabs */}
              <div className="flex bg-[#181818] overflow-x-auto no-scrollbar">
                {openTabs.map(tab => (
                  <div 
                    key={tab}
                    onClick={() => setSelectedFilePath(tab)}
                    className={`group flex items-center gap-2 px-4 py-2 text-sm border-r border-border/50 cursor-pointer min-w-max transition-colors ${
                      selectedFilePath === tab ? 'bg-[#1e1e1e] text-white border-t-2 border-t-primary' : 'bg-[#2d2d2d] text-muted-foreground hover:bg-[#3d3d3d]'
                    }`}
                  >
                    {tab.split('/').pop()}
                    <button onClick={(e) => closeTab(e, tab)} className={`p-0.5 rounded-sm opacity-0 group-hover:opacity-100 hover:bg-white/10 ${selectedFilePath === tab ? 'opacity-100' : ''}`}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              {/* Breadcrumb inside editor */}
              {selectedFilePath && (
                <div className="flex items-center px-4 py-1 bg-[#1e1e1e] text-xs text-muted-foreground border-b border-border/10">
                  {selectedFilePath.split('/').join(' > ')}
                </div>
              )}
              {/* Editor Content */}
              <div className="flex-1 overflow-hidden">
                <CodeViewer
                  filePath={selectedFilePath}
                  code={selectedFilePath ? rawFilesCache[selectedFilePath] : ''}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-[#2d2d2d] hover:bg-primary transition-colors cursor-col-resize" />

          {/* Preview */}
          <Panel defaultSize={45} minSize={20}>
            <div className="flex flex-col h-full bg-background relative">
              {/* Toolbar */}
              <div className="h-10 flex-shrink-0 flex items-center justify-between px-3 bg-muted border-b">
                <div className="flex items-center gap-1 bg-background rounded-md p-1 border shadow-sm">
                  <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded transition-colors ${deviceView === 'mobile' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Smartphone className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeviceView('tablet')} className={`p-1.5 rounded transition-colors ${deviceView === 'tablet' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Tablet className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded transition-colors ${deviceView === 'desktop' ? 'bg-muted text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                    <Monitor className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleRefresh} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted" title="Refresh Preview">
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <a href={`/sandbox.html?question=${categoryName}/${questionName}`} target="_blank" rel="noreferrer" className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded hover:bg-muted" title="Open in New Tab">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              {/* Iframe Wrapper */}
              <div className={`flex-1 flex justify-center bg-[#e5e5e5] dark:bg-black/20 overflow-auto ${deviceView === 'desktop' ? '' : 'p-4'}`}>
                <div 
                  className={`bg-white shadow-xl ring-1 ring-black/5 transition-all duration-300 flex-shrink-0 ${
                    deviceView === 'mobile' ? 'w-[375px] h-[812px] rounded-[2rem] border-8 border-gray-900 overflow-hidden' :
                    deviceView === 'tablet' ? 'w-[768px] h-[1024px] rounded-xl overflow-hidden' :
                    'w-full h-full rounded-none overflow-hidden'
                  }`}
                >
                  <iframe
                    key={`${questionKey}-${refreshKey}`}
                    title={`Sandbox - ${questionName}`}
                    src={`/sandbox.html?question=${categoryName}/${questionName}`}
                    className="w-full h-full border-none bg-white"
                    sandbox="allow-scripts allow-same-origin allow-modals allow-forms"
                  />
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
    </div>
  );
}
