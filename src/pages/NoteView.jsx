import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, Clock, Tag, BookOpen, ChevronRight, List } from 'lucide-react';
import { NOTES_REGISTRY, CATEGORIES } from '../data/notesRegistry';
import { MDXComponents } from '../components/mdx/MDXComponents';
import 'highlight.js/styles/github-dark.css';

// Dynamically import all MDX files
const allNotes = import.meta.glob('../notes/**/*.mdx');

export default function NoteView() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [NoteContent, setNoteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);

  const noteMeta = NOTES_REGISTRY.find(n => n.category === category && n.slug === slug);
  const catConfig = CATEGORIES[category] || { title: category, emoji: '📄' };

  // Sibling notes in same category
  const siblings = NOTES_REGISTRY.filter(n => n.category === category && n.slug !== slug);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setNoteContent(null);

    const key = `../notes/${category}/${slug}.mdx`;
    const loader = allNotes[key];

    if (!loader) {
      setError(true);
      setLoading(false);
      return;
    }

    loader()
      .then(mod => {
        setNoteContent(() => mod.default);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [category, slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading note...</p>
        </div>
      </div>
    );
  }

  if (error || !noteMeta) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <p className="text-5xl">🗒️</p>
        <h2 className="text-2xl font-bold">Note not found</h2>
        <p className="text-muted-foreground">The note "{slug}" doesn't exist yet.</p>
        <Link to="/notes" className="inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Notes
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0">
      {/* Left TOC sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r bg-card/50 p-4 overflow-y-auto">
        <Link to="/notes" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> All Notes
        </Link>

        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {catConfig.emoji} {catConfig.title}
          </p>
          <ul className="space-y-1">
            {NOTES_REGISTRY.filter(n => n.category === category).map(n => (
              <li key={n.id}>
                <Link
                  to={`/notes/${n.category}/${n.slug}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                    n.slug === slug
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <span>{n.emoji}</span>
                  <span className="truncate">{n.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/notes" className="hover:text-foreground transition-colors">Notes</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to={`/notes?category=${category}`} className="hover:text-foreground transition-colors capitalize">
              {catConfig.title}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{noteMeta.title}</span>
          </nav>

          {/* Note header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${catConfig.color || 'bg-muted text-muted-foreground border-border'}`}>
                <BookOpen className="w-3 h-3" />
                {catConfig.title}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" /> {noteMeta.readTime} read
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {noteMeta.tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
                  <Tag className="w-2.5 h-2.5" />{tag}
                </span>
              ))}
            </div>
          </div>

          {/* MDX Content */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            <MDXProvider components={MDXComponents}>
              {NoteContent && <NoteContent components={MDXComponents} />}
            </MDXProvider>
          </article>

          {/* Next notes */}
          {siblings.length > 0 && (
            <div className="mt-16 pt-8 border-t">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                More in {catConfig.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {siblings.slice(0, 2).map(sib => (
                  <Link
                    key={sib.id}
                    to={`/notes/${sib.category}/${sib.slug}`}
                    className="group flex items-center gap-3 p-4 bg-card border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{sib.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">{sib.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-2.5 h-2.5" />{sib.readTime}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
