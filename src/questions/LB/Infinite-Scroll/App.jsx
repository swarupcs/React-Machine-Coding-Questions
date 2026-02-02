import React, { useEffect, useState } from "react";

const PAGE_SIZE = 50;

const App = () => {
  const [count, setCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10;

      if (scrolledToBottom && !loading) {
        setLoading(true);

        // simulate API delay
        setTimeout(() => {
          setCount((prev) => prev + PAGE_SIZE);
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loading]);

  const items = Array.from({ length: count }, (_, index) => (
    <div key={index} style={itemStyle}>
      Item #{index + 1}
    </div>
  ));

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Infinite Scroll Demo</h2>
      {items}
      {loading && <p style={loaderStyle}>Loading more...</p>}
    </div>
  );
};

const itemStyle = {
  padding: "16px",
  borderBottom: "1px solid #ddd",
};

const loaderStyle = {
  textAlign: "center",
  padding: "20px",
};

export default App;
