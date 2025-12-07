import "./Timer.css"
import { useState, useRef, useEffect } from 'react';
function Timer() {
  const [time, setTime] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);

  const [format, setFormat] = useState([
    { h: 0, f: 60 * 60 * 1000 },
    { m: 0, f: 60 * 1000 },
    { s: 0, f: 1000 },
  ]);
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

      // start();
    }
  }

  function start() {
    let timeInSeconds = 0;

    format.forEach((d) => {
      const keys = Object.keys(d);
      const k = keys[0];
      console.log(d, k);
      if (!isNaN(d[k])) {
        timeInSeconds += Number(d[k]) * d.f;
      }
    });

    console.log(timeInSeconds);
    if (intervalRef.current) {
      return;
    }

    startedSinceRef.current = Date.now() + timeInSeconds;
    setTime(() => {
      return startedSinceRef.current - Date.now();
    });
    intervalRef.current = setInterval(() => {
      if (startedSinceRef.current - Date.now() <= 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTime(0);
        setTimerEnded(true);
      }
      setTime(() => {
        return startedSinceRef.current - Date.now();
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

  function handleChange(k, i) {
    return (e) => {
      const new1 = structuredClone(format);
      new1[i][k] = e.target.value;
      console.log(new1);
      setFormat(new1);
    };
  }

  if (timerEnded) {
    return <h1>Congratulations</h1>;
  }

  return (
    <div className='stopwatch'>
      <div>
        {format.map((d, i) => {
          const keys = Object.keys(d);
          const k = keys[0];
          const value = d[k];
          const kk = `${k}list`;
          return (
            <div key={k}>
              <input
                id={k}
                list={kk}
                type='text'
                min={0}
                onChange={handleChange(k, i)}
                value={value}
              />
              <datalist id={kk}>
                <option value='4' />
                <option value='41' />
                <option value='Chrome' />
                <option value='Opera' />
                <option value='Safari' />
              </datalist>
            </div>
          );
        })}
      </div>
      <span className='time'>{getTime()}</span>
      <button className='error' onClick={start}>
        Start
      </button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Timer;
