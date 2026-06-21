import React from 'react';
import Editor from '@monaco-editor/react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import 'github-markdown-css/github-markdown-dark.css';
import 'highlight.js/styles/github-dark.css';

export default function CodeViewer({ filePath, code }) {
  if (!filePath) {
    return (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-muted-foreground">
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
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {language === 'markdown' ? (
        <div className="flex-1 overflow-auto bg-[#0d1117]">
          <pre id="debug-code" style={{color: 'red', display: 'none'}}>{JSON.stringify(code)}</pre>
          <div className="markdown-body" style={{ padding: '32px', backgroundColor: 'transparent' }}>
            {typeof code === 'string' ? (
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
              >
                {code || ''}
              </ReactMarkdown>
            ) : typeof code === 'function' ? (
              React.createElement(code)
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-hidden relative">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code || ''}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              padding: { top: 16 },
              lineHeight: 24,
              renderLineHighlight: 'all',
            }}
          />
        </div>
      )}
    </div>
  );
}
