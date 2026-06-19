import { Link } from 'react-router-dom';
import registry from '../data/registry.json';
import { useTracking } from '../hooks/useTracking';
import { CheckCircle2, Bookmark, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { completed, bookmarks, viewed } = useTracking();

  const totalQuestions = registry.length;
  const progressPercentage = totalQuestions > 0 ? Math.round((completed.length / totalQuestions) * 100) : 0;

  const getQuestionsByIds = (ids) => {
    return ids.map(id => registry.find(q => q.id === id)).filter(Boolean);
  };

  const completedQuestions = getQuestionsByIds(completed);
  const bookmarkedQuestions = getQuestionsByIds(bookmarks);
  const recentlyViewed = getQuestionsByIds(viewed.slice(0, 5));

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Your Dashboard</h1>
        <p className="text-muted-foreground">Track your progress and revisit your bookmarked challenges.</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-card border rounded-xl shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/10 text-primary rounded-lg">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overall Progress</p>
              <h2 className="text-2xl font-bold">{progressPercentage}%</h2>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{completed.length} of {totalQuestions} completed</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-card border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-500/10 text-green-500 rounded-lg">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Completed</p>
            <h2 className="text-2xl font-bold">{completed.length}</h2>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-card border rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-lg">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Bookmarks</p>
            <h2 className="text-2xl font-bold">{bookmarks.length}</h2>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        {/* Bookmarks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Bookmark className="w-5 h-5" /> Bookmarks</h2>
          </div>
          <div className="space-y-3">
            {bookmarkedQuestions.length > 0 ? (
              bookmarkedQuestions.map(q => (
                <Link key={q.id} to={`/category/${q.id}`} className="block p-4 bg-card border rounded-lg hover:shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-sm">{q.title}</h3>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">{q.difficulty}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground text-sm">
                No bookmarked questions yet.
              </div>
            )}
          </div>
        </section>

        {/* Recently Viewed */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><Clock className="w-5 h-5" /> Recently Viewed</h2>
          </div>
          <div className="space-y-3">
            {recentlyViewed.length > 0 ? (
              recentlyViewed.map(q => (
                <Link key={q.id} to={`/category/${q.id}`} className="block p-4 bg-card border rounded-lg hover:shadow-sm hover:border-primary/50 transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-sm">{q.title}</h3>
                    <span className="text-xs text-muted-foreground">{q.category}</span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="p-8 text-center border border-dashed rounded-lg text-muted-foreground text-sm">
                You haven't viewed any questions yet.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
