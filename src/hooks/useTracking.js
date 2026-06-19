import { useState, useEffect } from 'react';

function getStored(key, defaultValue) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

function setStored(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key "${key}":`, error);
  }
}

export function useTracking() {
  const [bookmarks, setBookmarks] = useState(() => getStored('mcq-bookmarks', []));
  const [completed, setCompleted] = useState(() => getStored('mcq-completed', []));
  const [viewed, setViewed] = useState(() => getStored('mcq-viewed', []));

  useEffect(() => {
    setStored('mcq-bookmarks', bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    setStored('mcq-completed', completed);
  }, [completed]);

  useEffect(() => {
    setStored('mcq-viewed', viewed);
  }, [viewed]);

  const toggleBookmark = (id) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  };

  const toggleCompleted = (id) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const markViewed = (id) => {
    setViewed(prev => {
      // Remove if exists to move it to the front
      const filtered = prev.filter(v => v !== id);
      return [id, ...filtered].slice(0, 50); // Keep last 50 viewed
    });
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked: (id) => bookmarks.includes(id),
    
    completed,
    toggleCompleted,
    isCompleted: (id) => completed.includes(id),
    
    viewed,
    markViewed,
  };
}
