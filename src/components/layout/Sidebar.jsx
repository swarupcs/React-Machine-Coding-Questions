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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Group registry by category
  const categories = registry.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {});

  const toggle = (cat) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  // Get a representative icon per category based on most common type
  const getCategoryIcon = (cat) => {
    const qs = categories[cat] || [];
    const typeCount = {};
    qs.forEach(q => { typeCount[q.type] = (typeCount[q.type] || 0) + 1; });
    const dominant = Object.entries(typeCount).sort((a, b) => b[1] - a[1])[0]?.[0];
    const cfg = TYPE_ICONS[dominant];
    if (cfg) return <cfg.icon className={cn("w-4 h-4 flex-shrink-0", cfg.color)} />;
    return <Layers className="w-4 h-4 flex-shrink-0 text-muted-foreground" />;
  };

  return (
    <div className={cn('flex flex-col h-full bg-card border-r transition-all duration-300 relative', isCollapsed ? 'w-16' : 'w-64')}>
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-border text-muted-foreground hover:text-foreground rounded-full p-1 z-10"
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 transform rotate-90" />}
      </button>

      <div className={cn('p-6 border-b flex items-center', isCollapsed ? 'justify-center px-0' : 'gap-2')}>
        <Layers className="w-5 h-5 text-primary flex-shrink-0" />
        {!isCollapsed && (
          <div className="overflow-hidden">
            <h2 className='text-lg font-bold tracking-tight text-foreground whitespace-nowrap'>
              Frontend Prep
            </h2>
            <p className="text-xs text-muted-foreground mt-1 whitespace-nowrap">Master every interview</p>
          </div>
        )}
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto py-4 overflow-x-hidden'>
        {/* Main nav */}
        <div className={cn("mb-4", isCollapsed ? "px-2" : "px-4")}>
          {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Main</p>}
          <ul className='space-y-1'>
            <li>
              <Link to="/" className={cn("flex items-center rounded-md text-sm font-medium transition-colors", location.pathname === '/' ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2")} title="Home">
                <Home className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Home</span>}
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={cn("flex items-center rounded-md text-sm font-medium transition-colors", location.pathname === '/dashboard' ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2")} title="Dashboard">
                <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link to="/explore" className={cn("flex items-center rounded-md text-sm font-medium transition-colors", location.pathname === '/explore' ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2")} title="Explore">
                <Compass className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Explore</span>}
              </Link>
            </li>
            <li>
              <Link to="/notes" className={cn("flex items-center rounded-md text-sm font-medium transition-colors", location.pathname === '/notes' ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-accent hover:text-accent-foreground", isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-2")} title="Notes">
                <BookOpen className="w-4 h-4 flex-shrink-0" />
                {!isCollapsed && <span>Notes</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className={cn("", isCollapsed ? "px-2" : "px-4")}>
          {!isCollapsed && <p className="text-xs font-semibold text-muted-foreground mb-2 px-2 uppercase tracking-wider">Categories</p>}
          <ul className='space-y-1'>
            {Object.keys(categories).map((cat) => {
              const isOpen = openCategories[cat];
              return (
                <li key={cat} className="mb-1">
                  <button
                    onClick={() => toggle(cat)}
                    title={cat}
                    className={cn("w-full flex items-center text-sm font-medium text-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors", isCollapsed ? "justify-center p-2" : "justify-between px-3 py-2")}
                  >
                    <div className="flex items-center gap-2.5">
                      {getCategoryIcon(cat)}
                      {!isCollapsed && <span className="truncate">{cat.replace(/-/g, ' ')}</span>}
                      {!isCollapsed && <span className="ml-auto text-xs text-muted-foreground bg-muted rounded px-1.5">{categories[cat].length}</span>}
                    </div>
                    {!isCollapsed && (isOpen ? <ChevronDown className="w-3.5 h-3.5 opacity-50 ml-1 flex-shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 opacity-50 ml-1 flex-shrink-0" />)}
                  </button>

                  {!isCollapsed && isOpen && (
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
