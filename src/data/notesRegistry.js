// Central registry for all notes
// Each note has: id, title, description, category, slug, tags, readTime
export const NOTES_REGISTRY = [
  // Concepts
  {
    id: 'concepts/event-loop',
    title: 'The JavaScript Event Loop',
    description: 'How the event loop, call stack, microtasks, and macrotasks work together to enable async JS.',
    category: 'concepts',
    slug: 'event-loop',
    tags: ['async', 'promises', 'setTimeout', 'fundamentals'],
    readTime: '8 min',
    emoji: '🔄',
  },
  {
    id: 'concepts/closures',
    title: 'Closures',
    description: 'Understand lexical scoping and closures — the foundation of React hooks and module patterns.',
    category: 'concepts',
    slug: 'closures',
    tags: ['scope', 'functions', 'react', 'fundamentals'],
    readTime: '7 min',
    emoji: '🔒',
  },

  // Custom Hooks
  {
    id: 'custom-hooks/useDebounce',
    title: 'useDebounce',
    description: 'Delay state updates until a user stops interacting. Essential for search inputs and performance.',
    category: 'custom-hooks',
    slug: 'useDebounce',
    tags: ['performance', 'events', 'hooks'],
    readTime: '6 min',
    emoji: '⏱️',
  },
];

export const CATEGORIES = {
  concepts: {
    title: 'Core Concepts',
    description: 'Fundamental JavaScript and browser concepts for every frontend engineer.',
    emoji: '🧠',
    color: 'text-violet-500 bg-violet-500/10 border-violet-500/20',
  },
  'custom-hooks': {
    title: 'Custom Hooks',
    description: 'Reusable React hook patterns with full implementations and explanations.',
    emoji: '🎣',
    color: 'text-[#61DAFB] bg-[#61DAFB]/10 border-[#61DAFB]/20',
  },
  css: {
    title: 'CSS Deep Dives',
    description: 'Master Flexbox, Grid, animations and modern CSS layout techniques.',
    emoji: '🎨',
    color: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
  },
};
