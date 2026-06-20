import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, BookOpen, Tag } from 'lucide-react';
import { NOTES_REGISTRY, CATEGORIES } from '../data/notesRegistry';

export default function NotesIndex() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(() => {
    let notes = NOTES_REGISTRY;
    if (activeCategory !== 'all') notes = notes.filter(n => n.category === activeCategory);
    if (search) notes = notes.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    return notes;
  }, [search, activeCategory]);

  const groupedByCategory = useMemo(() => {
    if (activeCategory !== 'all') return { [activeCategory]: filtered };
    return filtered.reduce((acc, note) => {
      if (!acc[note.category]) acc[note.category] = [];
      acc[note.category].push(note);
      return acc;
    }, {});
  }, [filtered, activeCategory]);

  const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
  const itemVariants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="w-5 h-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">Study Notes</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Theory & Concepts</h1>
        <p className="text-muted-foreground text-lg">
          In-depth notes on JavaScript internals, React patterns, CSS techniques, and custom hooks.
        </p>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-accent'
          }`}
        >
          All Notes <span className="ml-1 text-xs opacity-70">({NOTES_REGISTRY.length})</span>
        </button>
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const count = NOTES_REGISTRY.filter(n => n.category === key).length;
          if (!count) return null;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === key ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border hover:bg-accent'
              }`}
            >
              {cat.emoji} {cat.title} <span className="ml-1 text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search notes by title, topic, or tag..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
        />
      </div>

      {/* Notes by Category */}
      {Object.entries(groupedByCategory).map(([category, notes]) => {
        const catConfig = CATEGORIES[category] || { title: category, emoji: '📄', color: 'text-muted-foreground bg-muted border-border' };
        return (
          <section key={category} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{catConfig.emoji}</span>
              <div>
                <h2 className="text-xl font-bold">{catConfig.title}</h2>
                {catConfig.description && <p className="text-sm text-muted-foreground">{catConfig.description}</p>}
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {notes.map(note => (
                <motion.div key={note.id} variants={itemVariants}>
                  <Link
                    to={`/notes/${note.category}/${note.slug}`}
                    className="group flex flex-col h-full p-5 bg-card border rounded-xl hover:shadow-md hover:border-primary/40 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{note.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
                          {note.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{note.description}</p>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-border/50 flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-muted text-muted-foreground text-[11px] rounded">
                            <Tag className="w-2.5 h-2.5" />{tag}
                          </span>
                        ))}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                        <Clock className="w-3 h-3" />{note.readTime}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </section>
        );
      })}

      {filtered.length === 0 && (
        <div className="py-16 text-center border border-dashed rounded-xl bg-card">
          <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">No notes match your search.</p>
        </div>
      )}
    </div>
  );
}
