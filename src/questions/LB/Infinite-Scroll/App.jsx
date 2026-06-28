import React, { useEffect, useRef, useState } from 'react';

const PAGE_SIZE = 50;

const App = () => {
  const [count, setCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  // Prevent duplicate requests before React re-renders
  const loadingRef = useRef(false);

  // Store timeout ID for cleanup
  const timeoutRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      // Don't load if already loading
      if (loadingRef.current) return;

      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (!scrolledToBottom) return;

      // Lock immediately
      loadingRef.current = true;
      setLoading(true);

      // Simulate API request
      timeoutRef.current = setTimeout(() => {
        setCount((prev) => prev + PAGE_SIZE);

        setLoading(false);
        loadingRef.current = false;
      }, 500);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Infinite Scroll Demo</h2>

      {Array.from({ length: count }, (_, index) => (
        <div key={index} style={itemStyle}>
          Item #{index + 1}
        </div>
      ))}

      {loading && <p style={loaderStyle}>Loading more...</p>}
    </div>
  );
};

const itemStyle = {
  padding: '16px',
  borderBottom: '1px solid #ddd',
};

const loaderStyle = {
  textAlign: 'center',
  padding: '20px',
};

export default App;
