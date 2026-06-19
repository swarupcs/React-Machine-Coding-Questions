import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeViewer({ filePath, code }) {
  if (!filePath) {
    return (
      <div className="qp-code-empty">
        <p>Select a file to view its source code.</p>
      </div>
    );
  }

  const extension = filePath.split('.').pop()?.toLowerCase();
  let language = 'javascript';
  if (extension === 'jsx' || extension === 'js') language = 'javascript';
  if (extension === 'css') language = 'css';
  if (extension === 'html') language = 'html';
  if (extension === 'json') language = 'json';
  if (extension === 'md') language = 'markdown';

  return (
    <div className="qp-code-viewer">
      <div className="qp-code-header">
        <span className="qp-code-filename">{filePath.split('/').pop()}</span>
      </div>
      <div className="qp-code-editor-container">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code || ''}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
}
