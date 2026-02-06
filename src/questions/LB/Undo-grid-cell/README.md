Great question — this one is **very common in SDE-2 frontend rounds** because it tests:

* grid rendering
* controlled interactions
* ordered state
* async effects (`setTimeout`)
* and clean React design under time pressure

Below is a **clean, interview-ready solution** with:

* ✅ Proper folder structure
* ✅ Clear separation of concerns
* ✅ Correct unwinding logic (no state mutation bugs)
* ✅ Delay-based undo in click order
* ✅ Easy explanation you can say out loud in an interview

---

# 📁 Recommended Folder Structure

```
src/
│
├── components/
│   ├── Grid/
│   │   ├── Grid.jsx
│   │   └── Grid.css
│   │
│   ├── Cell/
│   │   └── Cell.jsx
│   │
│   └── Controls/
│       └── Controls.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

Why this structure?

* **Cell** → purely presentational
* **Grid** → holds interaction + unwinding logic
* **Controls** → buttons & actions
* **App** → grid size + bootstrapping

This mirrors how real production React apps are structured.

---

# 🧠 High-Level Approach (Interview Explanation)

> “Each cell has a unique ID.
> When clicked, I store the ID in an array representing the click order.
> On `Start`, I sequentially remove IDs from the array using a timed effect, reverting the cells back to their original color.
> While unwinding, user interaction is disabled.”

---

# 🧩 Full Code

---

## 1️⃣ `Cell.jsx`

📍 `components/Cell/Cell.jsx`

```jsx
const Cell = ({ id, isActive, onClick, disabled }) => {
  return (
    <div
      className={`cell ${isActive ? "active" : ""}`}
      onClick={() => {
        if (!disabled && !isActive) {
          onClick(id);
        }
      }}
    >
      {id}
    </div>
  );
};

export default Cell;
```

**Why this is good**

* Stateless
* Prevents double clicks
* No logic leakage

---

## 2️⃣ `Controls.jsx`

📍 `components/Controls/Controls.jsx`

```jsx
const Controls = ({ onStart, isUnwinding, disabled }) => {
  return (
    <button onClick={onStart} disabled={disabled}>
      {isUnwinding ? "Unwinding..." : "Start"}
    </button>
  );
};

export default Controls;
```

---

## 3️⃣ `Grid.jsx`

📍 `components/Grid/Grid.jsx`

```jsx
import { useEffect, useRef, useState } from "react";
import Cell from "../Cell/Cell";
import Controls from "../Controls/Controls";
import "./Grid.css";

const Grid = ({ size }) => {
  const [clickedOrder, setClickedOrder] = useState([]);
  const [isUnwinding, setIsUnwinding] = useState(false);
  const timerRef = useRef(null);

  const handleCellClick = (id) => {
    if (isUnwinding) return;
    setClickedOrder((prev) => [...prev, id]);
  };

  const startUnwinding = () => {
    if (clickedOrder.length === 0) return;
    setIsUnwinding(true);
  };

  useEffect(() => {
    if (!isUnwinding) return;

    if (clickedOrder.length === 0) {
      setIsUnwinding(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setClickedOrder((prev) => prev.slice(1));
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [clickedOrder, isUnwinding]);

  const renderGrid = () => {
    let id = 1;
    const rows = [];

    for (let i = 0; i < size; i++) {
      const cells = [];
      for (let j = 0; j < size; j++) {
        cells.push(
          <Cell
            key={id}
            id={id}
            isActive={clickedOrder.includes(id)}
            onClick={handleCellClick}
            disabled={isUnwinding}
          />
        );
        id++;
      }
      rows.push(
        <div key={i} className="grid-row">
          {cells}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="grid-area">
      <Controls
        onStart={startUnwinding}
        isUnwinding={isUnwinding}
        disabled={clickedOrder.length === 0 || isUnwinding}
      />
      <div className="grid">{renderGrid()}</div>
    </div>
  );
};

export default Grid;
```

---

## 4️⃣ `Grid.css`

📍 `components/Grid/Grid.css`

```css
.grid-area {
  margin-top: 20px;
}

.grid-row {
  display: flex;
  justify-content: center;
}

.cell {
  width: 70px;
  height: 70px;
  border: 1px solid #333;
  background-color: aqua;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cell.active {
  background-color: bisque;
}

button {
  margin-bottom: 15px;
}
```

---

## 5️⃣ `App.jsx`

```jsx
import { useState } from "react";
import Grid from "./components/Grid/Grid";

function App() {
  const [size, setSize] = useState("");
  const [showGrid, setShowGrid] = useState(false);

  const handleSubmit = () => {
    if (size > 0) setShowGrid(true);
  };

  return (
    <div className="App">
      <input
        type="number"
        placeholder="Enter grid size"
        onChange={(e) => {
          setSize(e.target.value);
          setShowGrid(false);
        }}
      />
      <button onClick={handleSubmit}>Submit</button>

      {showGrid && <Grid size={Number(size)} />}
    </div>
  );
}

export default App;
```

---

## 6️⃣ `main.jsx`

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

## 7️⃣ `index.css`

```css
body {
  font-family: sans-serif;
  text-align: center;
}

.App {
  max-width: 600px;
  margin: 40px auto;
}
```

---

# ✅ Requirement Checklist

| Requirement                       | Status |
| --------------------------------- | ------ |
| Dynamic grid                      | ✅      |
| Cell click color change           | ✅      |
| Track click order                 | ✅      |
| Delayed undo                      | ✅      |
| Exact click order                 | ✅      |
| Disable interaction during unwind | ✅      |
| Reusable components               | ✅      |

---

# 🎯 What Interviewers Look For (You’ve Covered)

* No direct state mutation
* Clean async handling
* Correct effect cleanup
* Logical separation
* Clear mental model

---

# 💬 How to Explain in 30 Seconds

> “I store clicked cell IDs in an array to preserve order.
> When Start is clicked, I trigger an effect that removes one ID at a time using `setTimeout`.
> While unwinding, clicks are disabled to avoid race conditions.
> Once the array is empty, the grid resets automatically.”

---

If you want next:

* 🔥 TypeScript version
* 🧠 Optimized version using `useReducer`
* 🎤 Mock interview walkthrough
* ⏱️ How to code this **within 25–30 minutes live**

Just say the word 👌
