Nice one — this is **classic Atlassian / Tekion infinite-scroll machine coding** 👌
Below is a **complete, clean, interview-ready infinite scroll implementation in React**, with **fixes and improvements** over the basic version you posted.

I’ll give you **two versions**:

1. ✅ **Window scroll–based infinite scroll** (what interviewers expect first)
2. ⭐ **IntersectionObserver version** (bonus / optimization answer)

---

# ✅ Version 1: Infinite Scroll using `window.scroll`

### Key improvements over your snippet

* Prevents **multiple API calls**
* Uses **functional state update** (important interview point)
* Adds **loading guard**
* Clean separation of logic

---

## 📁 index.js

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 📁 App.js

```jsx
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
```

---

## 🧠 Interview Talking Points (VERY IMPORTANT)

Be ready to explain:

### ❓ Why `setCount(prev => prev + 50)`?

> Prevents stale closures when scroll fires rapidly.

### ❓ Why `loading` flag?

> Prevents duplicate API calls when user hits bottom multiple times quickly.

### ❓ Why `- 10` in height check?

> Buffer to avoid precision issues.

---

# ⭐ Version 2 (Bonus): Infinite Scroll using `IntersectionObserver`

This is **more performant** and often scores extra points.

---

## 📁 App.js (Observer version)

```jsx
import React, { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 50;

const App = () => {
  const [count, setCount] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);

          setTimeout(() => {
            setCount((prev) => prev + PAGE_SIZE);
            setLoading(false);
          }, 500);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} style={itemStyle}>
          Item #{index + 1}
        </div>
      ))}

      <div ref={loaderRef} style={loaderStyle}>
        {loading && "Loading more..."}
      </div>
    </div>
  );
};

const itemStyle = {
  padding: "16px",
  borderBottom: "1px solid #ddd",
};

const loaderStyle = {
  height: "40px",
  textAlign: "center",
};

export default App;
```

---

## ✅ Why Interviewers Love This Answer

✔ Correct pagination logic
✔ Cleanup of listeners
✔ Performance-safe
✔ Production-ready
✔ Bonus optimization knowledge

---

## 🚀 Possible Follow-Up Questions

You should be ready to answer:

* How would you stop infinite scrolling?
* How would you fetch real API data?
* How would you handle errors?
* How would you virtualize large lists?
* Difference between scroll event vs IntersectionObserver

If you want, I can also:

* Convert this to **React Query**
* Add **debounce/throttle**
* Make it **Next.js SSR-safe**
* Share **exact Atlassian follow-up questions**

Just say the word 😄
