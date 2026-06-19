import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, LayoutTemplate, Layers, CheckCircle2 } from 'lucide-react';
import registry from '../data/registry.json';

export default function Home() {
  const stats = [
    { label: "Total Questions", value: registry.length, icon: Code2 },
    { label: "Categories", value: new Set(registry.map(q => q.category)).size, icon: Layers },
    { label: "Difficulty Levels", value: 3, icon: LayoutTemplate },
  ];

  const categories = Array.from(new Set(registry.map(q => q.category)));
  const featured = registry.slice(0, 6); // Just grab first 6 for now

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6 pt-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground"
        >
          Master <span className="text-primary">Frontend</span> Interviews
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Practice high-quality machine coding questions in a fully isolated, IDE-like sandbox environment.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 pt-4"
        >
          <Link to="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            View Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
          <button onClick={() => {
            document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'k', 'metaKey': true }));
          }} className="inline-flex items-center gap-2 px-6 py-3 rounded-md border bg-background text-foreground font-medium hover:bg-accent transition-colors">
            Search Questions <span className="text-xs border px-1.5 rounded ml-2">⌘K</span>
          </button>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="flex items-center gap-4 p-6 bg-card border rounded-xl shadow-sm"
          >
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Questions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Questions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <Link to={`/category/${q.id}`} className="block h-full p-5 bg-card border rounded-xl shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg line-clamp-1">{q.title}</h3>
                  <span className="px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                    {q.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <span className="bg-muted px-2 py-1 rounded">{q.framework}</span>
                  <span>•</span>
                  <span>{q.estimatedTime}</span>
                </div>
                <div className="flex items-center text-sm font-medium text-primary">
                  Solve Challenge <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Categories */}
      <section className="space-y-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + idx * 0.05 }}
            >
              <Link to={`/category/${registry.find(q => q.category === cat).id}`} className="flex flex-col items-center justify-center p-6 bg-card border rounded-xl hover:bg-accent transition-colors text-center">
                <LayoutTemplate className="w-8 h-8 text-primary mb-3" />
                <span className="font-medium">{cat.replace(/-/g, ' ')}</span>
                <span className="text-xs text-muted-foreground mt-1">
                  {registry.filter(q => q.category === cat).length} questions
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
