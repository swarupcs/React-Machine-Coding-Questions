Absolutely 👍
Below is the **FULL, COMPLETE, WORKING editable Todo List app in React**, with **ALL features**, **clean separation**, and **DETAILED NOTES** explaining **why each part exists** — exactly how you’d explain it in a frontend interview.

---

# 📁 Project Structure

```
src/
│── index.js
│── App.jsx
│── Item.jsx
│── useCountDown.js
│── styles.css
```

---

# 1️⃣ index.js

### Entry point – mounts React app to the DOM

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

### 📝 Notes

* `createRoot` enables React 18 features
* `StrictMode` helps catch side-effect bugs in development

---

# 2️⃣ App.jsx

### Parent component – **single source of truth**

```jsx
import { useRef, useState, useMemo } from "react";
import Item from "./Item";
import "./styles.css";

const TABS = ["all", "completed", "in-progress", "deleted"];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const inputRef = useRef();

  // Add todo on Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: e.target.value,
          completed: false,
          deleted: false,
          expireTime: Date.now() + 15000, // 15 sec expiry
        },
      ]);
      inputRef.current.value = "";
    }
  };

  // Toggle completed state
  const updateCompleted = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Soft delete
  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, deleted: true } : t
      )
    );
  };

  // Update text after editing
  const updateText = (id, text) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text } : t
      )
    );
  };

  // Filter todos based on active tab
  const filteredTodos = useMemo(() => {
    if (activeTab === "completed") {
      return todos.filter((t) => t.completed && !t.deleted);
    }
    if (activeTab === "in-progress") {
      return todos.filter((t) => !t.completed && !t.deleted);
    }
    if (activeTab === "deleted") {
      return todos.filter((t) => t.deleted);
    }
    return todos;
  }, [todos, activeTab]);

  return (
    <div className="App">
      <h2>Editable Todo List</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Add todo and press Enter"
        onKeyDown={handleKeyPress}
      />

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredTodos.map((todo) => (
        <Item
          key={todo.id}
          {...todo}
          updateCompleted={updateCompleted}
          deleteTodo={deleteTodo}
          updateText={updateText}
        />
      ))}
    </div>
  );
}
```

---

### 📝 Notes (VERY IMPORTANT)

✅ `App` owns **all state** → avoids inconsistencies
✅ Uses **immutable updates** (`map`, `filter`)
✅ `useMemo` avoids unnecessary filtering on every render
✅ `Item` is **rendered once per todo**

---

# 3️⃣ Item.jsx

### Child component – **presentation + UI behavior**

```jsx
import { useEffect, useState } from "react";
import { useCountDown } from "./useCountDown";

const Item = ({
  id,
  text,
  completed,
  deleted,
  expireTime,
  updateCompleted,
  deleteTodo,
  updateText,
}) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(text);
  const { hasExpired, time } = useCountDown(expireTime);

  // Auto complete when expired
  useEffect(() => {
    if (hasExpired && !completed) {
      updateCompleted(id);
    }
  }, [hasExpired, completed, id, updateCompleted]);

  return (
    <div className={`item ${deleted ? "deleted" : ""}`}>
      {/* Complete toggle */}
      <div
        className="circle"
        onClick={() => !deleted && updateCompleted(id)}
      >
        {completed && <span>✓</span>}
      </div>

      {/* Text / Edit mode */}
      <div
        className={completed || deleted ? "strike" : ""}
        onDoubleClick={() => !completed && !deleted && setEdit(true)}
      >
        {edit ? (
          <input
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onBlur={() => {
              setEdit(false);
              updateText(id, editText);
            }}
          />
        ) : (
          <>
            <span className="time">{time}</span> {text}
          </>
        )}
      </div>

      {/* Delete */}
      <div className="close" onClick={() => deleteTodo(id)}>
        ✕
      </div>
    </div>
  );
};

export default Item;
```

---

### 📝 Notes

✔ Local state for **edit mode only**
✔ Parent updates state → child emits intent
✔ Countdown handled via **custom hook**
✔ `autoFocus` improves UX

---

# 4️⃣ useCountDown.js

### Custom Hook – reusable countdown logic

```jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export const useCountDown = (expiryTime) => {
  const [duration, setDuration] = useState(
    Math.max(expiryTime - Date.now(), 0)
  );
  const timerRef = useRef();

  useEffect(() => {
    if (duration <= 0) return;

    timerRef.current = setTimeout(() => {
      setDuration((d) => Math.max(d - 1000, 0));
    }, 1000);

    return () => clearTimeout(timerRef.current);
  }, [duration]);

  const format = useCallback((ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${String(h).padStart(2, "0")}:${String(
      m % 60
    ).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }, []);

  return useMemo(
    () => ({
      hasExpired: duration === 0,
      time: format(duration),
    }),
    [duration, format]
  );
};
```

---

### 📝 Notes

✔ Custom hook = reusable logic
✔ `useRef` avoids stale timers
✔ Memoized formatting
✔ Prevents memory leaks

---

# 5️⃣ styles.css

### Styling

```css
.App {
  max-width: 360px;
  margin: auto;
  font-family: sans-serif;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 6px;
}

.circle {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid green;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.close {
  cursor: pointer;
  opacity: 0;
}

.item:hover .close {
  opacity: 1;
}

.strike {
  text-decoration: line-through;
  opacity: 0.6;
}

.deleted {
  background: #ffdddd;
}

.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

.tabs button {
  cursor: pointer;
  text-transform: capitalize;
}

.tabs .active {
  background: aqua;
}

.time {
  font-size: 0.75em;
  margin-right: 6px;
  color: #888;
}
```

---

# 🎯 Interview Summary (Say This)

> “The parent owns state, the child emits intent, updates are immutable, side-effects are isolated, and countdown logic is abstracted into a custom hook.”

---

If you want:

* **Redux / Zustand version**
* **LocalStorage persistence**
* **Drag & Drop**
* **Undo delete**
* **Test cases**
* **Performance tuning**

Just tell me 🚀
