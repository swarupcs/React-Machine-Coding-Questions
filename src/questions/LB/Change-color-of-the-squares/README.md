Got it 😄
You want the **FULL working Uber SDE2 Machine Coding solution** with:

✅ Complete React project code
✅ Proper folder structure
✅ Separate CSS file
✅ Detailed notes like interview explanation
✅ Correct unwinding (reverse order + 1s delay)
✅ Prevent clicks during unwinding

So below is the **production-clean full implementation**.

---

# ✅ Uber SDE2 Machine Coding

## C-Shape Squares with Reverse Unwinding

---

# 📂 Folder Structure

```
uber-c-shape-unwinding/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   └── CSquares/
│   │       ├── CSquares.jsx
│   │       └── CSquares.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

---

# ✅ Step 1: Entry HTML

---

## `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Uber C Shape Unwinding</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

---

# ✅ Step 2: React Entry Point

---

## `src/main.jsx`

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

---

---

# ✅ Step 3: App Component

---

## `src/App.jsx`

```jsx
import CSquares from "./components/CSquares/CSquares";

export default function App() {
  return (
    <div>
      <h1>Uber Machine Coding: C Shape Unwinding</h1>
      <CSquares />
    </div>
  );
}
```

---

---

# ✅ Step 4: Main Component Logic

---

## `src/components/CSquares/CSquares.jsx`

```jsx
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
```

---

---

# ✅ Step 5: CSS Styling

---

## `src/components/CSquares/CSquares.css`

```css
/* Wrapper Center */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 20px;
}

/* C Shape Layout */
.c-shape {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Square Box */
.square {
  width: 25px;
  height: 25px;
  border: 2px solid black;
  background: white;
  cursor: pointer;
  transition: background 0.3s;
}

/* Move first + last square right */
.square:first-child,
.square:last-child {
  margin-left: 35px;
}

/* Active Green */
.square.green {
  background-color: green;
}
```

---

---

# ✅ Step 6: Global CSS

---

## `src/index.css`

```css
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #f8f8f8;
}

h1 {
  margin-top: 20px;
}
```

---

---

# ✅ How It Works (Detailed Notes)

---

## ✅ 1. Stack Maintains Click Order

Example:

```
Click order: 0 → 2 → 1

stack = [0, 2, 1]
```

---

## ✅ 2. When Stack Length == COUNT

```
if (stack.length === 3)
   unwinding starts
```

---

## ✅ 3. Reverse Unwinding

We do:

```js
copy.pop();
```

So:

```
[0,2,1] → [0,2] → [0] → []
```

Each step after **1 second delay**.

---

## ✅ 4. Clicks Disabled During Unwinding

```js
if (unwinding) return;
```

So user cannot interrupt the process.

---

# ✅ Final Output

✔ Click all squares → green
✔ Auto rollback → reverse order
✔ Delay 1 second each
✔ Clean interview-ready solution

---

# 🚀 Extra Improvements (If You Want)

I can extend this into:

✅ Dynamic NxN C shape
✅ Any number of squares
✅ Animations
✅ Configurable delay
✅ Support multiple rounds

Just tell me 😄
