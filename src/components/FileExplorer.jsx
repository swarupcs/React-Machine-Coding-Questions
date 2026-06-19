import React, { useState, useMemo, useEffect } from 'react';
import {
  FaFolder,
  FaFolderOpen,
  FaFileCode,
  FaFileAlt,
  FaCss3Alt,
  FaHtml5,
  FaReact,
  FaJs,
  FaSearch,
} from 'react-icons/fa';

// Helper to build a tree from a flat list of paths
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

const getFileIcon = (filename) => {
  if (filename.endsWith('.jsx')) return <FaReact className="text-blue-400" />;
  if (filename.endsWith('.js')) return <FaJs className="text-yellow-400" />;
  if (filename.endsWith('.css')) return <FaCss3Alt className="text-blue-500" />;
  if (filename.endsWith('.html')) return <FaHtml5 className="text-orange-500" />;
  return <FaFileAlt className="text-gray-400" />;
};

function TreeNode({ node, level, onSelectFile, selectedFile, expandedFolders, toggleFolder }) {
  const isOpen = expandedFolders.has(node.path) || node.name === 'root';

  if (node.type === 'file') {
    const isSelected = selectedFile === node.path;
    return (
      <div
        className={`qp-file-node ${isSelected ? 'qp-file-selected' : ''}`}
        style={{ paddingLeft: `${level * 12 + 12}px` }}
        onClick={() => onSelectFile(node.path)}
      >
        <span className="qp-file-icon">{getFileIcon(node.name)}</span>
        <span className="qp-file-name">{node.name}</span>
      </div>
    );
  }

  // It's a folder
  const childrenNodes = Object.values(node.children || {}).sort((a, b) => {
    // Folders first
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="qp-folder-container">
      {/* Don't render the root folder itself, just its children */}
      {node.name !== 'root' && (
        <div
          className="qp-folder-node"
          style={{ paddingLeft: `${level * 12}px` }}
          onClick={() => toggleFolder(node.path)}
        >
          <span className="qp-folder-icon">
            {isOpen ? <FaFolderOpen className="text-yellow-500" /> : <FaFolder className="text-yellow-500" />}
          </span>
          <span className="qp-folder-name">{node.name}</span>
        </div>
      )}
      {isOpen && (
        <div className="qp-folder-children">
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
  const [expandedFolders, setExpandedFolders] = useState(() => {
    const saved = localStorage.getItem('qp-expanded-folders');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Filter files based on search
  const filteredFiles = useMemo(() => {
    if (!searchTerm) return files;
    return files.filter(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [files, searchTerm]);

  const tree = useMemo(() => buildTree(filteredFiles), [filteredFiles]);

  // Persist expanded folders
  useEffect(() => {
    localStorage.setItem('qp-expanded-folders', JSON.stringify(Array.from(expandedFolders)));
  }, [expandedFolders]);

  // Auto-expand parents of selected file and search term matches
  useEffect(() => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      let changed = false;

      // Expand to selected file
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

      // If searching, expand all folders to show results
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
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  return (
    <div className="qp-file-explorer">
      <div className="qp-file-explorer-header">
        <span>EXPLORER</span>
      </div>
      <div className="qp-file-explorer-search">
        <FaSearch className="qp-search-icon" />
        <input 
          type="text" 
          placeholder="Search files..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="qp-search-input"
        />
      </div>
      <div className="qp-file-explorer-body">
        {filteredFiles.length === 0 ? (
          <div className="qp-empty-message">No files found</div>
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
