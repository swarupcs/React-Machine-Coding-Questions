import React, { useEffect, useState } from "react";
import "./ScrollIndicator.css";

const ScrollIndicator = () => {
  const [scrolledPercentage, setScrolledPercentage] = useState(0);

  const calculateScrolledInPercentage = () => {
    // Distance scrolled from top
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    // Total scrollable height
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // Calculate percentage
    const scrolled = (scrollTop / scrollHeight) * 100;

    setScrolledPercentage(scrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrolledInPercentage);

    return () => {
      window.removeEventListener("scroll", calculateScrolledInPercentage);
    };
  }, []);

  return (
    <header className="header">
      <h1>Scroll Indicator</h1>

      <div className="progressContainer">
        <div
          className="progressBar"
          style={{ width: `${scrolledPercentage}%` }}
        />
      </div>
    </header>
  );
};

export default ScrollIndicator;
