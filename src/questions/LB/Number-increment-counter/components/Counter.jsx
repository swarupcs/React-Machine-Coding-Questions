import React, { useRef } from "react";
import { animateCounter } from "../utils/animateCounter";

const Counter = ({ number, duration, start }) => {
  const countRef = useRef(null);

  if (start) {
    animateCounter(
      countRef.current,
      0,
      Number(number),
      Number(duration) * 1000
    );
  }

  return (
    <div className="counter">
      <span ref={countRef}>0</span>
    </div>
  );
};

export default Counter;
