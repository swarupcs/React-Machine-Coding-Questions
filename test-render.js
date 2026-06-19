import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

async function run() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  
  try {
    const mod = await vite.ssrLoadModule('/src/pages/QuestionPreview.jsx');
    const QuestionPreview = mod.default;
    
    // We need to mock React Router's useParams
    const RouterContext = (await vite.ssrLoadModule('react-router-dom')).MemoryRouter;
    const Routes = (await vite.ssrLoadModule('react-router-dom')).Routes;
    const Route = (await vite.ssrLoadModule('react-router-dom')).Route;
    
    console.log("Loaded QuestionPreview, attempting render...");
    const html = renderToString(
      React.createElement(RouterContext, { initialEntries: ['/category/test/question'] }, 
        React.createElement(Routes, null, 
          React.createElement(Route, { path: "/category/:categoryName/:questionName", element: React.createElement(QuestionPreview) })
        )
      )
    );
    console.log("Render successful! HTML length:", html.length);
  } catch (err) {
    console.error("RENDER ERROR:", err);
  } finally {
    vite.close();
  }
}

run();
