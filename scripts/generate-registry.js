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
        tags: [],
        estimatedTime: "30m",
        learningTopics: []
      };

      if (fs.existsSync(metadataPath)) {
        try {
          const customMeta = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
          metadata = { ...metadata, ...customMeta, id: `${category}/${question}` };
        } catch (e) {
          console.error(`Error parsing metadata in ${questionPath}:`, e);
        }
      } else {
        // Create default metadata file to allow user to edit later
        fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
      }

      registry.push(metadata);
    }
  }

  fs.writeFileSync(outputRegistryPath, JSON.stringify(registry, null, 2), 'utf8');
  console.log(`✅ Registry generated with ${registry.length} questions at src/data/registry.json`);
}

generateRegistry();
