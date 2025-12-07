import "./Stopwatch.css"
import { useState, useRef, useEffect } from 'react';
function Stopwatch() {
  const [time, setTime] = useState(0);
  const startedSinceRef = useRef(0);

  const intervalRef = useRef(null);

  const resumeRef = useRef(false);

  useEffect(() => {
    window.addEventListener('blur', handleBLur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBLur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [time]);

  function handleBLur() {
    resumeRef.current = !!intervalRef.current;
    pause();
  }

  function handleFocus() {
    if (resumeRef.current) {
      resumeRef.current = false;

      start();
    }
  }

  function start() {
    if (intervalRef.current) {
      return;
    }

    startedSinceRef.current = Date.now() - time;
    intervalRef.current = setInterval(() => {
      setTime(() => {
        return Date.now() - startedSinceRef.current;
      });
    }, 10);
  }

  function pause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function reset() {
    setTime(0);
    startedSinceRef.current = 0;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }

  function getTime() {
    const hours = Math.floor(time / (1000 * 3600))
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((time / (1000 * 60)) % 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60)
      .toString()
      .padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className='stopwatch'>
      <span className='time'>{getTime()}</span>
      <button className='error' onClick={start}>
        Start
      </button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Stopwatch;
