import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import registry from '../../data/registry.json';
import { ChevronDown, ChevronRight, Home, LayoutDashboard, LayoutTemplate, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const location = useLocation();
  const [openCategories, setOpenCategories] = useState({});

  // Group registry by category
  const categories = registry.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {});

  const toggle = (cat) => {
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  return (
    <div className='flex flex-col h-full bg-card border-r w-64'>
      <div className='p-6 border-b'>
        <h2 className='text-lg font-bold tracking-tight text-foreground flex items-center gap-2'>
          <Layers className="w-5 h-5 text-primary" />
          Frontend Prep
        </h2>
      </div>

      <div className='flex-1 overflow-y-auto py-4'>
        <div className="px-4 mb-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Main</p>
          <ul className='space-y-1'>
            <li>
              <Link
                to='/'
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === '/' 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/dashboard'
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === '/dashboard' 
                    ? "bg-primary text-primary-foreground" 
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div className="px-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Categories</p>
          <ul className='space-y-1'>
            {Object.keys(categories).map((cat) => {
              const isOpen = openCategories[cat];
              return (
                <li key={cat} className="mb-1">
                  <button 
                    onClick={() => toggle(cat)}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <LayoutTemplate className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{cat.replace(/-/g, ' ')}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-4 h-4 opacity-50" /> : <ChevronRight className="w-4 h-4 opacity-50" />}
                  </button>

                  {isOpen && (
                    <ul className='mt-1 ml-4 pl-4 border-l border-border space-y-1'>
                      {categories[cat].map((q) => {
                        const path = `/category/${q.id}`;
                        const isActive = location.pathname === path;
                        return (
                          <li key={q.id}>
                            <Link
                              to={path}
                              className={cn(
                                "block px-3 py-1.5 text-sm rounded-md transition-colors truncate",
                                isActive 
                                  ? "bg-secondary text-secondary-foreground font-medium" 
                                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                            >
                              {q.title}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
