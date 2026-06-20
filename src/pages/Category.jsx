import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import registry from '../data/registry.json';
import { useTracking } from '../hooks/useTracking';
import { Search, Filter, Bookmark, CheckCircle2 } from 'lucide-react';
import { SiReact, SiJavascript, SiTypescript } from 'react-icons/si';

const TYPE_CONFIG = {
  'React (JS)':  { color: 'text-[#61DAFB] bg-[#61DAFB]/10 border-[#61DAFB]/20', icon: SiReact },
  'React (TS)':  { color: 'text-[#3178C6] bg-[#3178C6]/10 border-[#3178C6]/20', icon: SiTypescript },
  'Vanilla JS':  { color: 'text-[#F7DF1E] bg-[#F7DF1E]/10 border-[#F7DF1E]/20', icon: SiJavascript },
};

const DIFF_CONFIG = {
  Easy:   'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  Medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  Hard:   'bg-red-500/10 text-red-500 border-red-500/20',
};

function TypeBadge({ type }) {
  const config = TYPE_CONFIG[type];
  if (!config) return (
    <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground border border-border">{type || 'React (JS)'}</span>
  );
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border font-medium ${config.color}`}>
      <Icon className="w-3 h-3" />{type}
    </span>
  );
}

export default function Category() {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const { isCompleted, isBookmarked } = useTracking();

  const questions = useMemo(() => {
    let filtered = registry.filter(q => q.category === categoryName);
    if (filtered.length === 0) filtered = registry;
    if (searchTerm) filtered = filtered.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (difficultyFilter !== 'All') filtered = filtered.filter(q => q.difficulty === difficultyFilter);
    return filtered;
  }, [categoryName, searchTerm, difficultyFilter]);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 capitalize">
          {categoryName ? categoryName.replace(/-/g, ' ') : 'Questions'}
        </h1>
        <p className="text-muted-foreground">
          {questions.length} question{questions.length !== 1 ? 's' : ''} • Practice and master these challenges.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.length > 0 ? (
          questions.map((q) => (
            <Link
              key={q.id}
              to={`/category/${q.id}`}
              className="group relative bg-card p-5 border rounded-xl hover:shadow-md hover:border-primary/40 transition-all flex flex-col gap-3"
            >
              {/* Title row */}
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
                  {q.title}
                </h3>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {isBookmarked(q.id) && <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500" />}
                  {isCompleted(q.id) && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </div>
              </div>

              {/* Tags */}
              {q.tags && q.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {q.tags.slice(0, 4).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-muted text-muted-foreground text-[11px] rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                <TypeBadge type={q.type} />
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${DIFF_CONFIG[q.difficulty] || 'bg-muted text-muted-foreground border-border'}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-xs text-muted-foreground">{q.estimatedTime}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-12 text-center border rounded-xl bg-card border-dashed">
            <p className="text-muted-foreground">No questions found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
