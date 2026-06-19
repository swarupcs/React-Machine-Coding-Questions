import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Command } from "cmdk"
import registry from "../data/registry.json"
import { Search, MonitorPlay, FolderOpen } from "lucide-react"

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (id) => {
    setOpen(false)
    navigate(`/category/${id}`)
  }

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted hover:bg-accent hover:text-accent-foreground border rounded-md transition-colors"
      >
        <Search className="w-4 h-4" />
        <span>Search questions...</span>
        <kbd className="hidden sm:inline-flex ml-2 items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium bg-background border rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-0" onClick={() => setOpen(false)} />
          <Command 
            className="relative z-50 w-full max-w-2xl bg-card text-card-foreground border rounded-xl shadow-2xl overflow-hidden"
            label="Global Command Menu"
          >
            <div className="flex items-center border-b px-4 py-3">
              <Search className="w-5 h-5 text-muted-foreground mr-3" />
              <Command.Input 
                autoFocus
                placeholder="Type a command or search questions..." 
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground text-foreground"
              />
              <button 
                onClick={() => setOpen(false)}
                className="text-xs text-muted-foreground hover:text-foreground bg-muted px-2 py-1 rounded"
              >
                ESC
              </button>
            </div>
            
            <Command.List className="max-h-[60vh] overflow-y-auto p-2">
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group heading="Navigation" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                <Command.Item onSelect={() => { setOpen(false); navigate('/') }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                  <MonitorPlay className="w-4 h-4" />
                  Home
                </Command.Item>
                <Command.Item onSelect={() => { setOpen(false); navigate('/dashboard') }} className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground">
                  <MonitorPlay className="w-4 h-4" />
                  Dashboard
                </Command.Item>
              </Command.Group>

              <Command.Group heading="Questions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground mt-2">
                {registry.map((q) => (
                  <Command.Item 
                    key={q.id} 
                    onSelect={() => handleSelect(q.id)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-foreground rounded-md cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
                  >
                    <FolderOpen className="w-4 h-4 text-primary" />
                    <div className="flex-1 flex flex-col">
                      <span>{q.title}</span>
                      <span className="text-xs text-muted-foreground">{q.category}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-secondary text-secondary-foreground">{q.difficulty}</span>
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary/10 text-primary">{q.framework}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      )}
    </>
  )
}
