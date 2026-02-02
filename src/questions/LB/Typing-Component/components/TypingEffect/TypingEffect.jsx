import React, { useState, useEffect, useRef } from "react";
import "./TypingEffect.css";

const TypingEffect = ({
  text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
  wordsPerSecond = 10
}) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    const speed = 1000 / wordsPerSecond;

    timerRef.current = setTimeout(() => {
      if (indexRef.current < text.length) {
        setDisplayText((prev) => prev + text[indexRef.current]);
        indexRef.current += 1;
      }
    }, speed);

    return () => clearTimeout(timerRef.current);
  }, [displayText, text, wordsPerSecond]);

  return (
    <div className="typingArea">
      {displayText}
      <span className="blinkingCursor" />
    </div>
  );
};

export default TypingEffect;
