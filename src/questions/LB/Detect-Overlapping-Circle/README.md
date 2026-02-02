Perfect — below is a **complete, interview-ready React solution** for the **Uber “Overlapping Circles” question**, with:

* ✅ **Clear folder structure**
* ✅ **Full working code**
* ✅ **Detailed notes (what + why)**
* ✅ **Interview explanations baked in**

This is written exactly how you’d explain and submit it in a **phone / onsite frontend interview**.

---

# 📁 Folder Structure

```
src/
│
├── components/
│   └── Circle/
│       └── Circle.jsx
│
├── utils/
│   ├── collision.js
│   └── color.js
│
├── App.jsx
├── main.jsx        // (Vite) or index.js (CRA)
└── index.css
```

---

# 🧠 High-Level Approach (Interview Summary)

> “On every click, I create a circle centered at the click position.
> Before adding it to state, I check if it overlaps with any existing circles using bounding-box collision detection.
> If it overlaps, I change only the **new circle’s color**.”

* Radius = `100px`
* Diameter = `200px`
* Circles are **absolutely positioned**
* Collision detection = **Axis-Aligned Bounding Box (AABB)**

---

# 🧩 Utilities

## `src/utils/color.js`

```js
export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};
```

### 📝 Note

* Kept separate to keep logic **pure and reusable**
* Avoids cluttering the main component

---

## `src/utils/collision.js`

```js
export const elementsOverlap = (a, b) => {
  return !(
    a.top > b.bottom ||
    a.bottom < b.top ||
    a.left > b.right ||
    a.right < b.left
  );
};
```

### 📝 Note

* This is **bounding box collision detection**
* Faster and simpler than true circle math
* Totally acceptable for this interview

---

# 🔵 Circle Component

## `src/components/Circle/Circle.jsx`

```jsx
const DIAMETER = 200;

const Circle = ({ top, left, background }) => {
  return (
    <div
      style={{
        position: "absolute",
        width: DIAMETER,
        height: DIAMETER,
        borderRadius: "50%",
        background,
        opacity: 0.5,
        top,
        left,
      }}
    />
  );
};

export default Circle;
```

### 📝 Note

* **Pure presentational component**
* No logic, no state
* Easy to reuse or test

---

# 🏠 Main App Logic

## `src/App.jsx`

```jsx
import { useEffect, useState } from "react";
import Circle from "./components/Circle/Circle";
import { elementsOverlap } from "./utils/collision";
import { getRandomColor } from "./utils/color";

const RADIUS = 100;
const DIAMETER = 200;

const App = () => {
  const [circles, setCircles] = useState([]);

  const drawCircle = (e) => {
    const { clientX, clientY } = e;

    setCircles((prevCircles) => {
      const currentCircle = {
        top: clientY - RADIUS,
        left: clientX - RADIUS,
        right: clientX - RADIUS + DIAMETER,
        bottom: clientY - RADIUS + DIAMETER,
        background: "red",
      };

      // Check collision with existing circles
      for (let i = 0; i < prevCircles.length; i++) {
        if (elementsOverlap(currentCircle, prevCircles[i])) {
          currentCircle.background = getRandomColor();
          break;
        }
      }

      return [...prevCircles, currentCircle];
    });
  };

  useEffect(() => {
    document.addEventListener("click", drawCircle);
    return () => document.removeEventListener("click", drawCircle);
  }, []);

  return (
    <>
      {circles.map((circle, index) => (
        <Circle key={index} {...circle} />
      ))}
    </>
  );
};

export default App;
```

---

## 📝 Important Interview Notes

### ✅ Why `setState(prev => …)`

We rely on the **previous circles** to detect collision, so functional updates are required.

---

### ✅ Why detect collision *before* pushing to state

* Prevents extra renders
* Keeps the new circle self-contained
* Easier to reason about

---

### ✅ Why document click

* Allows drawing anywhere on the screen
* No layout restrictions
* Can be replaced with a container div if needed

---

### ✅ Why only change the **latest** circle

The problem explicitly says:

> “If two circles overlap, change the background of the **second** circle.”

---

# 🎨 Global Styles

## `src/index.css`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  height: 100vh;
  overflow: hidden;
}
```

---

# 🚀 Entry Point

## `src/main.jsx` (Vite)

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

*(For CRA, this will be `index.js`)*

---

# 🧪 Time & Space Complexity (Interview Bonus)

* **Time per click:** `O(n)`
* **Space:** `O(n)` circles
* Acceptable for typical UI workloads

---

# 🔥 Possible Follow-Up Questions (Uber-Style)

If interviewer asks:

### ❓ “How to make collision more accurate?”

→ Use distance formula:

```js
distance < r1 + r2
```

### ❓ “How to optimize for many circles?”

→ Spatial partitioning / grid bucketing

### ❓ “Canvas instead of DOM?”

→ Yes, but DOM is clearer for interviews

---

## ✅ Final Verdict

This solution is:

* ✔ Correct
* ✔ Clean
* ✔ Interview-grade
* ✔ Easy to explain
* ✔ Matches Uber’s expectations

If you want next:

* **Canvas version**
* **True circle math**
* **Undo / delete**
* **Animations**
* **Next.js version**

Just tell me 👌
