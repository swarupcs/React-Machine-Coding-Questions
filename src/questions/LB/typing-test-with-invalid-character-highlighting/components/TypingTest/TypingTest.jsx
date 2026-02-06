import { useEffect, useState } from "react";
import { paragraph } from "txtgen";

import Paragraph from "./Paragraph";
import { calculateWPM } from "./wpm";

import "./typingTest.css";

/*
  Generate paragraph only once globally
*/
const TEXT = paragraph(1);

export default function TypingTest() {
  const [typedText, setTypedText] = useState([]);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  /*
    Check mismatch
  */
  const mismatch = typedText.some((char, i) => {
    return char?.toLowerCase() !== TEXT[i]?.toLowerCase();
  });

  /*
    Typing completed only if:
    - All characters typed
    - No mismatch
  */
  const completed =
    typedText.length === TEXT.length && !mismatch;

  /*
    Stop timer when completed
  */
  useEffect(() => {
    if (completed) {
      setEndTime(Date.now());
    }
  }, [completed]);

  /*
    Keyboard Listener
  */
  useEffect(() => {
    function handleKeyDown(e) {
      // Do nothing if not started or already finished
      if (!startTime || completed) return;

      // Backspace handling
      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      // Ignore non-character keys
      if (e.key.length > 1) return;

      // Add typed character
      setTypedText((prev) => [...prev, e.key]);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startTime, completed]);

  /*
    Start / Reset Button
  */
  function handleStartReset() {
    // Reset after completion
    if (endTime) {
      setTypedText([]);
      setStartTime(Date.now());
      setEndTime(0);
      return;
    }

    // Start game
    if (!startTime) {
      setStartTime(Date.now());
    }
  }

  return (
    <div className="typing-container">
      <h1>⌨️ Typing Speed Test</h1>

      <button onClick={handleStartReset}>
        {endTime ? "Reset Game" : startTime ? "Typing..." : "Start"}
      </button>

      <Paragraph paragraph={TEXT} typedText={typedText} />

      {completed && (
        <h2 className="result">
          ✅ Completed! WPM:{" "}
          {calculateWPM(TEXT, startTime, endTime)}
        </h2>
      )}
    </div>
  );
}
