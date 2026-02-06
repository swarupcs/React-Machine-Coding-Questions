import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const timerRef = useRef(null);

  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);

  /*
    Step 1: Load saved timer immediately
    useLayoutEffect runs BEFORE browser paint
  */
  useLayoutEffect(() => {
    const saved = localStorage.getItem("timer");

    setTime(saved ? parseInt(saved) : 0);
    setReady(true);
  }, []);

  /*
    Step 2: Start ticking only when Home is active
    Cleanup stops timer when user navigates away
  */
  useEffect(() => {
    if (!ready) return;

    // Persist latest time
    localStorage.setItem("timer", time);

    timerRef.current = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // Cleanup: stops timer on unmount
    return () => clearTimeout(timerRef.current);
  }, [time, ready]);

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>
        Timer runs only when Home is active.
      </p>

      <h2>⏱ Time: {time} seconds</h2>
    </div>
  );
}
