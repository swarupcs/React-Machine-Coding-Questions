import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { resolve } from 'path';
import { readFileSync } from 'fs';

// ─── Mock API plugin ──────────────────────────────────────────────────────────
// Intercepts /polls/:id requests in dev so api.ts can use real fetch() calls
// without a backend, serving data from each question's data.json instead.
function mockPollsPlugin() {
  // In-memory store for mutable poll state; keyed by poll id
  const store = new Map();

  return {
    name: 'mock-polls-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const match = req.url?.match(/^\/polls\/(\d+)/);
        if (!match) return next();

        const pollId = Number(match[1]);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        if (req.method === 'GET') {
          // Lazy-load the data.json for this poll on first access
          if (!store.has(pollId)) {
            try {
              const dataPath = resolve(
                __dirname,
                `src/questions/road-side-coder-premium/21-Poll-Widget/db/data.json`
              );
              const raw = JSON.parse(readFileSync(dataPath, 'utf-8'));
              raw.polls.forEach((p) => store.set(Number(p.id), { ...p, id: Number(p.id) }));
            } catch {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Poll data not found' }));
              return;
            }
          }
          const poll = store.get(pollId);
          if (!poll) {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: `Poll ${pollId} not found` }));
            return;
          }
          res.statusCode = 200;
          res.end(JSON.stringify(poll));
          return;
        }

        if (req.method === 'PATCH') {
          let body = '';
          req.on('data', (chunk) => (body += chunk));
          req.on('end', () => {
            try {
              const updates = JSON.parse(body);
              const existing = store.get(pollId) || {};
              store.set(pollId, { ...existing, ...updates });
              res.statusCode = 200;
              res.end(JSON.stringify(store.get(pollId)));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid body' }));
            }
          });
          return;
        }

        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeHighlight] }) },
    tailwindcss(),
    react(),
    mockPollsPlugin(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sandbox: resolve(__dirname, 'sandbox.html'),
      },
    },
  },
});
