// Simple project tree generator (ESM version)
// Run: node generate-tree.js src

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walk(dir, prefix = '') {
  let result = '';
  const items = fs.readdirSync(dir).sort();

  items.forEach((item, index) => {
    if (['node_modules', '.git', 'dist', 'build'].includes(item)) return;

    const full = path.join(dir, item);
    const isLast = index === items.length - 1;
    const pointer = isLast ? '└── ' : '├── ';

    result += prefix + pointer + item + '\n';

    if (fs.statSync(full).isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      result += walk(full, newPrefix);
    }
  });

  return result;
}

const root = process.argv[2] || 'src';
const fullPath = path.resolve(__dirname, root);

if (!fs.existsSync(fullPath)) {
  console.error('❌ Path not found:', fullPath);
  process.exit(1);
}

const tree = root + '\n' + walk(fullPath);

fs.writeFileSync('project-tree.txt', tree, 'utf8');

console.log('✅ project-tree.txt generated!');
