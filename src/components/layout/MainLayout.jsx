import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { CommandPalette } from '../CommandPalette';
import { useTheme } from '../theme-provider';
import { Moon, Sun, Monitor } from 'lucide-react';

export default function MainLayout({ children }) {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  
  // Question preview pages need full-height IDE layout (no padding, no scroll)
  const isPreview = /\/category\/.+\/.+/.test(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <aside className="hidden md:flex flex-shrink-0">
        <Sidebar />
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {!isPreview && (
          <header className="h-16 flex items-center justify-between px-6 border-b bg-card text-card-foreground">
            <div className="flex items-center gap-4">
              <CommandPalette />
            </div>
            
            <div className="flex items-center gap-2 bg-muted p-1 rounded-full border">
              <button 
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Sun className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-full transition-colors ${theme === 'dark' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Moon className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-full transition-colors ${theme === 'system' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>
          </header>
        )}

        <div className={`flex-1 ${isPreview ? 'flex flex-col overflow-hidden p-0 bg-[#1e1e1e]' : 'overflow-y-auto p-6 bg-muted/30'}`}>
          {children}
        </div>
      </main>
    </div>
  );
}
