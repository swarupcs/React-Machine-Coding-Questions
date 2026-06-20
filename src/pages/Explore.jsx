import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Code2, ChevronDown, X } from 'lucide-react';
import { SiReact, SiJavascript, SiTypescript } from 'react-icons/si';
import registry from '../data/registry.json';
import { useTracking } from '../hooks/useTracking';

const TYPES = ['All', 'React (JS)', 'React (TS)', 'Vanilla JS', 'Custom Hook', 'CSS'];
const DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

const TYPE_CONFIG = {
  'React (JS)':  { color: 'text-[#61DAFB] bg-[#61DAFB]/10 border-[#61DAFB]/20', icon: SiReact },
  'React (TS)':  { color: 'text-[#3178C6] bg-[#3178C6]/10 border-[#3178C6]/20', icon: SiTypescript },
  'Vanilla JS':  { color: 'text-[#F7DF1E] bg-[#F7DF1E]/10 border-[#F7DF1E]/20', icon: SiJavascript },
  'Custom Hook': { color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', icon: null },
  'CSS':         { color: 'text-sky-400 bg-sky-500/10 border-sky-500/20', icon: null },
};

const DIFF_CONFIG = {
  Easy:   'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Hard:   'bg-red-500/10 text-red-500 border-red-500/20',
};

function TypeBadge({ type }) {
  const config = TYPE_CONFIG[type] || { color: 'text-muted-foreground bg-muted border-border', icon: null };
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {type}
    </span>
  );
}

function DiffBadge({ difficulty }) {
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${DIFF_CONFIG[difficulty] || 'bg-muted text-muted-foreground border-border'}`}>
      {difficulty}
    </span>
  );
}

export default function Explore() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const { isCompleted, isBookmarked } = useTracking();

  const filtered = useMemo(() => {
    let result = [...registry];
    if (search) result = result.filter(q =>
      q.title.toLowerCase().includes(search.toLowerCase()) ||
      (q.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
    );
    if (selectedType !== 'All') result = result.filter(q => q.type === selectedType);
    if (selectedDifficulty !== 'All') result = result.filter(q => q.difficulty === selectedDifficulty);
    if (sortBy === 'alpha') result.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === 'difficulty') {
      const order = { Easy: 0, Medium: 1, Hard: 2 };
      result.sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1));
    }
    return result;
  }, [search, selectedType, selectedDifficulty, sortBy]);

  const typeCounts = useMemo(() => {
    const counts = {};
    TYPES.forEach(t => { counts[t] = t === 'All' ? registry.length : registry.filter(q => q.type === t).length; });
    return counts;
  }, []);

  const activeFilterCount = [
    selectedType !== 'All',
    selectedDifficulty !== 'All',
  ].filter(Boolean).length;

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-1">Explore Questions</h1>
        <p className="text-muted-foreground">Browse {registry.length} questions across all technologies and difficulty levels.</p>
      </div>

      {/* Type Pill Tabs */}
      <div className="flex flex-wrap gap-2">
        {TYPES.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              selectedType === type
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-card text-muted-foreground border-border hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {type}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${selectedType === type ? 'bg-white/20' : 'bg-muted'}`}>
              {typeCounts[type] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title or tag..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(f => !f)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors ${showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border hover:bg-accent'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-2.5 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="default">Default order</option>
            <option value="alpha">A → Z</option>
            <option value="difficulty">Easiest first</option>
          </select>
        </div>
      </div>

      {/* Expanded filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-card border rounded-xl flex flex-wrap gap-6">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Difficulty</p>
                <div className="flex gap-2">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        selectedDifficulty === d
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-muted-foreground border-border hover:bg-accent'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {registry.length} questions
        </p>
        {(search || selectedType !== 'All' || selectedDifficulty !== 'All') && (
          <button
            onClick={() => { setSearch(''); setSelectedType('All'); setSelectedDifficulty('All'); }}
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Question Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? filtered.map((q, idx) => (
            <motion.div
              key={q.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.15, delay: Math.min(idx * 0.02, 0.3) }}
            >
              <Link
                to={`/category/${q.id}`}
                className="group flex flex-col h-full p-5 bg-card border rounded-xl hover:shadow-md hover:border-primary/40 transition-all"
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {q.title}
                  </h3>
                  {isCompleted(q.id) && (
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-[10px] font-bold">✓</span>
                  )}
                </div>

                {/* Tags */}
                {q.tags && q.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {q.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-1.5 py-0.5 bg-muted text-muted-foreground text-[11px] rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-border/50">
                  <TypeBadge type={q.type || 'React (JS)'} />
                  <div className="flex items-center gap-1.5">
                    <DiffBadge difficulty={q.difficulty} />
                    <span className="text-xs text-muted-foreground">{q.estimatedTime}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full py-16 text-center border border-dashed rounded-xl bg-card">
              <Code2 className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground font-medium">No questions match your filters.</p>
              <button onClick={() => { setSearch(''); setSelectedType('All'); setSelectedDifficulty('All'); }} className="mt-3 text-sm text-primary hover:underline">
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
