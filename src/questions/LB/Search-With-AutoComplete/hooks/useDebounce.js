import { useCallback, useRef } from "react";

/**
 * useDebounce
 * Delays execution of a function until user stops triggering it
 */
const useDebounce = (fn, delay) => {
  const timer = useRef(null);

  const debouncedFn = useCallback(
    (...args) => {
      clearTimeout(timer.current);

      timer.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default useDebounce;
