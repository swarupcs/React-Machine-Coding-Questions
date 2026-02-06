import { useEffect, useRef, useState } from "react";
import "./CSquares.css";

/*
  REQUIREMENTS:
  1. Render C shape squares
  2. Click -> square becomes green
  3. After all 3 clicked -> start unwinding
  4. Reverse order + 1 second delay
*/

const COUNT = 3;

export default function CSquares() {
  // Stack stores clicked square indexes
  const [stack, setStack] = useState([]);

  // Prevent clicks during unwinding
  const [unwinding, setUnwinding] = useState(false);

  // Timer ref to clear timeout properly
  const timerRef = useRef(null);

  // ✅ Handle Square Click
  const handleClick = (index) => {
    // Stop clicks during unwinding
    if (unwinding) return;

    // Stop if already clicked max squares
    if (stack.length === COUNT) return;

    // Add clicked square to stack
    setStack((prev) => [...prev, index]);
  };

  // ✅ Unwinding Logic
  useEffect(() => {
    // Start unwinding when all squares clicked
    if (stack.length === COUNT && !unwinding) {
      setUnwinding(true);
      return;
    }

    // If unwinding is active
    if (unwinding && stack.length > 0) {
      timerRef.current = setTimeout(() => {
        setStack((prev) => {
          const copy = [...prev];
          copy.pop(); // remove last clicked square
          return copy;
        });
      }, 1000);
    }

    // Stop unwinding when stack is empty
    if (unwinding && stack.length === 0) {
      setUnwinding(false);
    }

    // Cleanup timer
    return () => clearTimeout(timerRef.current);
  }, [stack, unwinding]);

  // ✅ Generate Squares in C Shape
  const renderSquares = () => {
    const squares = [];

    for (let i = 0; i < COUNT; i++) {
      squares.push(
        <div
          key={i}
          className={`square ${stack.includes(i) ? "green" : ""}`}
          onClick={() => handleClick(i)}
        />
      );
    }

    return squares;
  };

  return (
    <div className="wrapper">
      <div className="c-shape">{renderSquares()}</div>

      {/* Status Display */}
      <p>
        {unwinding
          ? "Unwinding in progress..."
          : "Click squares to turn them green"}
      </p>
    </div>
  );
}
