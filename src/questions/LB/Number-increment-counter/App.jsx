import React, { useState } from "react";
import Counter from "./components/Counter";
import "./styles.css";

const App = () => {
  const [number, setNumber] = useState(0);
  const [duration, setDuration] = useState(0);
  const [start, setStart] = useState(false);

  const reset = () => {
    setStart(false);
    window.location.reload();
  };

  return (
    <main className="container">
      <h2>Animated Counter</h2>

      <div className="inputs">
        <label>
          Number:
          <input
            type="number"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              setStart(false);
            }}
          />
        </label>

        <label>
          Duration (seconds):
          <input
            type="number"
            value={duration}
            onChange={(e) => {
              setDuration(e.target.value);
              setStart(false);
            }}
          />
        </label>
      </div>

      <div className="buttons">
        <button onClick={() => setStart(true)}>Start</button>
        <button onClick={reset}>Reset</button>
      </div>

      <Counter number={number} duration={duration} start={start} />
    </main>
  );
};

export default App;
