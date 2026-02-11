import { useEffect, useRef, useState } from "react";
import { formatTime } from "../utils/formatTime";

export default function Stopwatch() {
  // Tracks elapsed time in milliseconds
  const [time, setTime] = useState(0);

  // Controls whether stopwatch is running
  const [running, setRunning] = useState(false);

  // Stores timer reference so we can clear it
  const timerRef = useRef(null);

  // ✅ Timer Effect
  useEffect(() => {
    if (running) {
      timerRef.current = setTimeout(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    }

    // Cleanup prevents memory leaks
    return () => clearTimeout(timerRef.current);
  }, [running, time]);

  // ✅ Start / Pause / Resume
  const handleStartPause = () => {
    setRunning((prev) => !prev);
  };

  // ✅ Reset Stopwatch
  const handleReset = () => {
    setRunning(false);
    setTime(0);
    clearTimeout(timerRef.current);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Time Display */}
      <h1 style={{ fontSize: "60px" }}>{formatTime(time)}</h1>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "15px" }}>
        <button
          onClick={handleStartPause}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {running ? "Pause" : time > 0 ? "Resume" : "Start"}
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
