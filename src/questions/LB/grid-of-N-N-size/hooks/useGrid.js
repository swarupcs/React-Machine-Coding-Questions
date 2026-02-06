import { useCallback, useRef, useState } from 'react';

export const useGrid = (size) => {
  const [grid, setGrid] = useState(Array(size * size).fill(null));

  // Track max efficiently without recalculating every time
  const maxRef = useRef(0);

  const handleCellClick = useCallback((index) => {
    setGrid((prev) => {
      const newGrid = [...prev];

      if (newGrid[index] === null) {
        maxRef.current += 1;
        newGrid[index] = maxRef.current;
      } else {
        newGrid[index] = maxRef.current;
      }

      return newGrid;
    });
  }, []);

  return { grid, handleCellClick };
};
