import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export const useCountDown = (expiryTime) => {
  const [duration, setDuration] = useState(
    Math.max(expiryTime - Date.now(), 0)
  );
  const timerRef = useRef();

  useEffect(() => {
    if (duration <= 0) return;

    timerRef.current = setTimeout(() => {
      setDuration((d) => Math.max(d - 1000, 0));
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [duration]);

  const format = useCallback((ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${String(h).padStart(2, "0")}:${String(
      m % 60
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }, []);

  return useMemo(
    () => ({
      hasExpired: duration === 0,
      time: format(duration),
    }),
    [duration, format]
  );
};
