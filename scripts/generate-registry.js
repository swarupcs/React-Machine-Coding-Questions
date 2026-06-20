import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsDir = path.resolve(__dirname, '../src/questions');
const outputRegistryPath = path.resolve(__dirname, '../src/data/registry.json');

// Ensure data directory exists
const dataDir = path.dirname(outputRegistryPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

/**
 * Guess the `type` of a question based on files present in the question dir.
 */
function inferType(questionPath, existingFramework) {
  const files = fs.readdirSync(questionPath);
  const hasJsx = files.some(f => f.endsWith('.jsx'));
  const hasTsx = files.some(f => f.endsWith('.tsx'));
  const hasTs = files.some(f => f.endsWith('.ts') && !f.endsWith('.d.ts'));
  const hasHtml = files.some(f => f === 'index.html');
  const hasJs = files.some(f => f.endsWith('.js') && f !== 'index.js');

  if (hasTsx || (hasTs && hasJsx)) return 'React (TS)';
  if (hasJsx) return 'React (JS)';
  if (hasHtml && !hasJsx && !hasTsx) return 'Vanilla JS';
  if (hasJs && !hasJsx) return 'Vanilla JS';
  if (existingFramework === 'React') return 'React (JS)';
  return 'React (JS)';
}

function generateRegistry() {
  const registry = [];
  const categories = fs.readdirSync(questionsDir);

  for (const category of categories) {
    const categoryPath = path.join(questionsDir, category);
    
    // Skip if not a directory
    if (!fs.statSync(categoryPath).isDirectory()) continue;
    
    const questions = fs.readdirSync(categoryPath);
    
    for (const question of questions) {
      const questionPath = path.join(categoryPath, question);
      
      // Skip if not a directory
      if (!fs.statSync(questionPath).isDirectory()) continue;
      
      const metadataPath = path.join(questionPath, 'metadata.json');
      
      // Default metadata
      let metadata = {
        id: `${category}/${question}`,
        title: question.replace(/-/g, ' '),
        category: category,
        difficulty: "Medium",
        framework: "React",
        type: "React (JS)",
        tags: [],
        estimatedTime: "30m",
        learningTopics: []
      };

      if (fs.existsSync(metadataPath)) {
        try {
          const customMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          // Infer type if not set in metadata
          if (!customMeta.type) {
            customMeta.type = inferType(questionPath, customMeta.framework || metadata.framework);
          }
          metadata = { ...metadata, ...customMeta, id: `${category}/${question}` };
        } catch (e) {
          console.error(`Error parsing metadata in ${questionPath}:`, e);
        }
      } else {
        // Infer type from files and create default metadata file
        metadata.type = inferType(questionPath, metadata.framework);
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
      }

      registry.push(metadata);
    }
  }

  fs.writeFileSync(outputRegistryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log(`Registry generated with ${registry.length} questions at src/data/registry.json`);
}

generateRegistry();
