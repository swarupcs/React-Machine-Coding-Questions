import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import registry from '../data/registry.json';
import { useTracking } from '../hooks/useTracking';
import { Search, Filter, Bookmark, CheckCircle2 } from 'lucide-react';

export default function Category() {
  const { categoryName } = useParams(); // Note: due to route config, this is actually the question ID's first part
  // Actually, we should probably just show all questions for a specific category, but wait, the route is /category/:categoryName.
  // The current app routes /category/:categoryName to a Category view, and /category/:categoryName/:questionName to QuestionPreview.
  
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  
  const { isCompleted, isBookmarked } = useTracking();

  const questions = useMemo(() => {
    let filtered = registry.filter(q => q.category === categoryName);
    
    // Fallback: If no category matches exactly, just show all or handle differently.
    // Assuming categoryName is indeed a category.
    if (filtered.length === 0) {
      filtered = registry; // Show all if invalid category, or we could show a not found
    }

    if (searchTerm) {
      filtered = filtered.filter(q => q.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (difficultyFilter !== 'All') {
      filtered = filtered.filter(q => q.difficulty === difficultyFilter);
    }
    
    return filtered;
  }, [categoryName, searchTerm, difficultyFilter]);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 capitalize">{categoryName ? categoryName.replace(/-/g, ' ') : 'Questions'}</h1>
        <p className="text-muted-foreground">Practice and master these challenges to ace your interviews.</p>
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
            className="w-full pl-9 pr-4 py-2 bg-background border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select 
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
              className="group relative bg-card p-5 border rounded-xl hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between h-36"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{q.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{q.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isBookmarked(q.id) && <Bookmark className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                  {isCompleted(q.id) && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                    q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400' :
                    'bg-red-500/10 text-red-600 dark:text-red-400'
                  }`}>
                    {q.difficulty}
                  </span>
                  <span className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                    {q.estimatedTime}
                  </span>
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
