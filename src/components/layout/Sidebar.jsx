import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import registry from '../../data/registry.json';
import { ChevronDown, ChevronRight, Home, LayoutDashboard, Layers, Compass, BookOpen } from 'lucide-react';
import { SiReact, SiJavascript, SiTypescript, SiCss } from 'react-icons/si';
import { cn } from '@/lib/utils';

const TYPE_ICONS = {
  'React (JS)':  { icon: SiReact, color: 'text-[#61DAFB]' },
  'React (TS)':  { icon: SiTypescript, color: 'text-[#3178C6]' },
  'Vanilla JS':  { icon: SiJavascript, color: 'text-[#F7DF1E]' },
  'CSS':         { icon: SiCss, color: 'text-sky-400' },
};

function NavLink({ to, icon: Icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <Icon className="w-4 h-4" />
        {label}
      </Link>
    </li>
  );
}

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

  // Get a representative icon per category based on most common type
  const getCategoryIcon = (cat) => {
    const qs = categories[cat] || [];
    const typeCount = {};
    qs.forEach(q => { typeCount[q.type] = (typeCount[q.type] || 0) + 1; });
    const dominant = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const cfg = TYPE_ICONS[dominant];
    if (cfg) return <cfg.icon className={`w-4 h-4 ${cfg.color}`} />;
    return <Layers className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <div className='flex flex-col h-full bg-card border-r w-64'>
      <div className='p-6 border-b'>
        <h2 className='text-lg font-bold tracking-tight text-foreground flex items-center gap-2'>
          <Layers className="w-5 h-5 text-primary" />
          Frontend Prep
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Master every interview</p>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto py-4'>
        {/* Main nav */}
        <div className="px-4 mb-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Main</p>
          <ul className='space-y-1'>
            <NavLink to="/" icon={Home} label="Home" />
            <NavLink to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavLink to="/explore" icon={Compass} label="Explore" />
            <NavLink to="/notes" icon={BookOpen} label="Notes" />
          </ul>
        </div>

        {/* Categories */}
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
                    <div className="flex items-center gap-2.5">
                      {getCategoryIcon(cat)}
                      <span className="truncate">{cat.replace(/-/g, ' ')}</span>
                      <span className="ml-auto text-xs text-muted-foreground bg-muted rounded px-1.5">{categories[cat].length}</span>
                    </div>
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1 flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 opacity-50 ml-1 flex-shrink-0" />}
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
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
