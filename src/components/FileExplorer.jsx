import React, { useState, useMemo, useEffect } from 'react';
import { getFileIcon } from '../utils/fileIcons';
import {
  Folder,
  FolderOpen,
  FileCode2,
  FileText,
  FileJson,
  Search,
  ChevronRight,
  ChevronDown,
  FileType2
} from 'lucide-react';
import { cn } from '@/lib/utils';

function buildTree(paths) {
  const root = { name: 'root', type: 'folder', children: {}, path: '' };
  paths.forEach((filePath) => {
    const parts = filePath.split('/');
    let current = root;
    let currentPath = '';
    parts.forEach((part, index) => {
      const isFile = index === parts.length - 1;
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      if (!current.children[part]) {
        current.children[part] = {
          name: part,
          type: isFile ? 'file' : 'folder',
          path: isFile ? filePath : currentPath,
          children: isFile ? null : {},
        };
      }
      current = current.children[part];
    });
  });
  return root;
}



function TreeNode({ node, level, onSelectFile, selectedFile, expandedFolders, toggleFolder }) {
  const isOpen = expandedFolders.has(node.path) || node.name === 'root';

  if (node.type === 'file') {
    const isSelected = selectedFile === node.path;
    return (
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 cursor-pointer text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          isSelected ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground"
        )}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => onSelectFile(node.path)}
      >
        {getFileIcon(node.name)}
        <span className="truncate">{node.name}</span>
      </div>
    );
  }

  const childrenNodes = Object.values(node.children || {}).sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="select-none">
      {node.name !== 'root' && (
        <div
          className="flex items-center gap-1.5 py-1 px-2 cursor-pointer text-sm text-foreground hover:bg-accent transition-colors"
          style={{ paddingLeft: `${level * 12}px` }}
          onClick={() => toggleFolder(node.path)}
        >
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" /> : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
          {isOpen ? <FolderOpen className="w-4 h-4 text-yellow-500" /> : <Folder className="w-4 h-4 text-yellow-500" />}
          <span className="truncate">{node.name}</span>
        </div>
      )}
      {isOpen && (
        <div>
          {childrenNodes.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              level={node.name === 'root' ? level : level + 1}
              onSelectFile={onSelectFile}
              selectedFile={selectedFile}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function FileExplorer({ files, selectedFile, onSelectFile }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFolders, setExpandedFolders] = useState(new Set());

  const filteredFiles = useMemo(() => {
    if (!searchTerm) return files;
    return files.filter(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [files, searchTerm]);

  const tree = useMemo(() => buildTree(filteredFiles), [filteredFiles]);

  useEffect(() => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      let changed = false;
      if (selectedFile) {
        const parts = selectedFile.split('/');
        let currentPath = '';
        for (let i = 0; i < parts.length - 1; i++) {
          currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
          if (!next.has(currentPath)) {
            next.add(currentPath);
            changed = true;
          }
        }
      }
      if (searchTerm) {
        filteredFiles.forEach(file => {
          const parts = file.split('/');
          let currentPath = '';
          for (let i = 0; i < parts.length - 1; i++) {
            currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
            if (!next.has(currentPath)) {
              next.add(currentPath);
              changed = true;
            }
          }
        });
      }
      return changed ? next : prev;
    });
  }, [selectedFile, searchTerm, filteredFiles]);

  const toggleFolder = (path) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  };

  const collapseAll = () => setExpandedFolders(new Set());

  return (
    <div className="flex flex-col h-full bg-[#181818] border-r border-border text-gray-300">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase border-b border-border/50 bg-[#1e1e1e]">
        <span>Explorer</span>
        <button onClick={collapseAll} className="hover:text-foreground transition-colors" title="Collapse All">
          <Folder className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="p-2 border-b border-border/50">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search files..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 bg-[#2d2d2d] border border-transparent rounded text-xs focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {filteredFiles.length === 0 ? (
          <div className="text-center text-xs text-muted-foreground mt-4">No files found</div>
        ) : (
          <TreeNode
            node={tree}
            level={0}
            onSelectFile={onSelectFile}
            selectedFile={selectedFile}
            expandedFolders={expandedFolders}
            toggleFolder={toggleFolder}
          />
        )}
      </div>
    </div>
  );
}
