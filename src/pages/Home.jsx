import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Layers, Compass, BookOpen } from 'lucide-react';
import { SiReact, SiJavascript, SiTypescript } from 'react-icons/si';
import registry from '../data/registry.json';

const TYPE_CONFIG = {
  'React (JS)':  { icon: SiReact,       color: 'text-[#61DAFB]', bg: 'bg-[#61DAFB]/10', border: 'border-[#61DAFB]/20' },
  'React (TS)':  { icon: SiTypescript,  color: 'text-[#3178C6]', bg: 'bg-[#3178C6]/10', border: 'border-[#3178C6]/20' },
  'Vanilla JS':  { icon: SiJavascript,  color: 'text-[#F7DF1E]', bg: 'bg-[#F7DF1E]/10', border: 'border-[#F7DF1E]/20' },
  'Custom Hook': { icon: Code2,          color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  'CSS':         { icon: Layers,         color: 'text-sky-400',    bg: 'bg-sky-500/10',   border: 'border-sky-500/20' },
};

const FEATURED_TYPES = ['React (JS)', 'Vanilla JS', 'React (TS)', 'Custom Hook'];

export default function Home() {
  const totalQuestions = registry.length;
  const categories = Array.from(new Set(registry.map(q => q.category)));
  const typeCounts = {};
  registry.forEach(q => { typeCounts[q.type] = (typeCounts[q.type] || 0) + 1; });

  const stats = [
    { label: "Total Questions", value: totalQuestions, icon: Code2, color: 'text-primary', bg: 'bg-primary/10' },
    { label: "Categories", value: categories.length, icon: Layers, color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { label: "Technologies", value: Object.keys(typeCounts).length, icon: Compass, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const featured = registry.slice(0, 6);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show:  { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 py-8">
      {/* Hero */}
      <section className="text-center space-y-6 pt-10">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-primary/5 text-primary text-sm font-medium mb-4">
            <Code2 className="w-3.5 h-3.5" /> {totalQuestions} Questions & Growing
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight"
        >
          Master{' '}
          <span className="bg-gradient-to-r from-primary via-violet-500 to-blue-500 bg-clip-text text-transparent">
            Frontend
          </span>{' '}
          Interviews
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Practice React, Vanilla JS, TypeScript, Custom Hooks & CSS in a fully
          isolated, VS Code-like sandbox environment.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-4"
        >
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
          >
            <Compass className="w-4 h-4" /> Explore Questions <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border bg-card text-foreground font-semibold hover:bg-accent transition-colors"
          >
            <BookOpen className="w-4 h-4" /> Theory Notes
          </Link>
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border bg-card text-foreground font-semibold hover:bg-accent transition-colors"
          >
            Search <kbd className="text-xs border px-1.5 py-0.5 rounded bg-muted ml-1">⌘K</kbd>
          </button>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="flex items-center gap-4 p-6 bg-card border rounded-2xl shadow-sm"
          >
            <div className={`p-3 ${stat.bg} ${stat.color} rounded-xl`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Browse by Type */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Browse by Technology</h2>
          <Link to="/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {FEATURED_TYPES.map(type => {
            const config = TYPE_CONFIG[type];
            const Icon = config.icon;
            const count = typeCounts[type] || 0;
            return (
              <motion.div key={type} variants={itemVariants}>
                <Link
                  to={`/explore?type=${encodeURIComponent(type)}`}
                  className={`flex flex-col items-center justify-center p-6 bg-card border ${config.border} rounded-2xl hover:${config.bg} hover:shadow-md transition-all text-center group`}
                >
                  <div className={`p-3 ${config.bg} rounded-xl mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-7 h-7 ${config.color}`} />
                  </div>
                  <span className="font-semibold text-sm">{type}</span>
                  <span className="text-xs text-muted-foreground mt-1">{count} questions</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Featured Questions */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Questions</h2>
          <Link to="/explore" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {featured.map((q) => {
            const config = TYPE_CONFIG[q.type] || TYPE_CONFIG['React (JS)'];
            const Icon = config.icon;
            return (
              <motion.div key={q.id} variants={itemVariants}>
                <Link
                  to={`/category/${q.id}`}
                  className="block h-full p-5 bg-card border rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className={`p-2 ${config.bg} rounded-lg`}>
                      <Icon className={`w-5 h-5 ${config.color}`} />
                    </div>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${
                      q.difficulty === 'Easy'   ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      q.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                  'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="font-semibold text-base line-clamp-2 mb-4 group-hover:text-primary transition-colors">{q.title}</h3>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="bg-muted px-2 py-0.5 rounded">{q.type || q.framework}</span>
                    <span>{q.estimatedTime}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Browse by Category */}
      <section className="space-y-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">Browse by Category</h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {categories.map(cat => {
            const qs = registry.filter(q => q.category === cat);
            const firstId = qs[0]?.id;
            return (
              <motion.div key={cat} variants={itemVariants}>
                <Link
                  to={`/category/${firstId}`}
                  className="flex flex-col items-center justify-center p-4 bg-card border rounded-xl hover:bg-accent transition-colors text-center"
                >
                  <Layers className="w-6 h-6 text-primary mb-2" />
                  <span className="font-medium text-sm truncate w-full">{cat.replace(/-/g, ' ')}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">{qs.length} q's</span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
