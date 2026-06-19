export function getQuestionsRegistry() {
  const reactModules = import.meta.glob('../questions/*/*/App.jsx');
  const htmlModules = import.meta.glob('../questions/*/*/index.html');
  const manifests = import.meta.glob('../questions/*/*/manifest.json', { eager: true });

  const questions = {};

  // Extract all valid question paths
  const allPaths = new Set([
    ...Object.keys(reactModules),
    ...Object.keys(htmlModules)
  ]);

  allPaths.forEach((path) => {
    // path looks like '../questions/Category/QuestionName/App.jsx'
    const parts = path.split('/');
    if (parts.length >= 4) {
      const category = parts[2];
      const name = parts[3];
      const key = `${category}/${name}`;

      if (!questions[key]) {
        // Try to load manifest
        const manifestPath = `../questions/${category}/${name}/manifest.json`;
        const manifest = manifests[manifestPath] ? manifests[manifestPath].default : {};

        questions[key] = {
          category,
          name,
          title: manifest.title || name.replace(/-/g, ' '),
          difficulty: manifest.difficulty || 'medium',
          tags: manifest.tags || [],
          path: key,
          type: reactModules[`../questions/${category}/${name}/App.jsx`] ? 'react' : 'vanilla'
        };
      }
    }
  });

  return Object.values(questions);
}
