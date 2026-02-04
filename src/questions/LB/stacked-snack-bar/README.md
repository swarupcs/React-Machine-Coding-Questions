Below is a **complete, interview-ready implementation** of a **stacked Snackbar (Toast) system in React**, exactly at the level expected for **Razorpay SDE-2** and similar frontend interviews.

I’ll give you:

* ✅ Clean **folder structure**
* ✅ **Reusable Snackbar Provider + Hook**
* ✅ **Auto-close + manual close**
* ✅ **Stacking with max limit**
* ✅ **Variants (success / error / default)**
* ✅ **Clear architectural notes (interview talking points)**

---

# 📁 Folder Structure

```
stacked-snackbar/
│
├── src/
│   ├── snackbar/
│   │   ├── SnackbarContext.jsx
│   │   ├── Snackbar.jsx
│   │   ├── SnackbarItem.jsx
│   │   └── snackbar.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── index.html
└── package.json
```

This mirrors **real production UI systems** (context + renderer separation).

---

# 1️⃣ Snackbar Context (Single Source of Truth)

### `snackbar/SnackbarContext.jsx`

```jsx
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo
} from "react";
import Snackbar from "./Snackbar";

const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children, maxSnack = 3 }) => {
  const [snackbars, setSnackbars] = useState([]);

  const addSnackbar = useCallback(
    ({ message, variant = "default", autoCloseDuration }) => {
      const id = Date.now();
      setSnackbars((prev) => [
        ...prev,
        { id, message, variant, autoCloseDuration }
      ]);
    },
    []
  );

  const removeSnackbar = useCallback((id) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      snackbars,
      maxSnack,
      addSnackbar,
      removeSnackbar
    }),
    [snackbars, maxSnack, addSnackbar, removeSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }
  return ctx;
};
```

### 🧠 Interview notes

* Context = **global UI service**
* Decouples snackbar logic from feature components
* Same pattern used by **Material-UI, Notistack, Chakra UI**

---

# 2️⃣ Snackbar Renderer (Stack Manager)

### `snackbar/Snackbar.jsx`

```jsx
import { useSnackbar } from "./SnackbarContext";
import SnackbarItem from "./SnackbarItem";

const Snackbar = () => {
  const { snackbars, maxSnack, removeSnackbar } = useSnackbar();

  return snackbars.slice(0, maxSnack).map((snack, index) => (
    <SnackbarItem
      key={snack.id}
      {...snack}
      onClose={removeSnackbar}
      offset={index * 48}
    />
  ));
};

export default Snackbar;
```

### 🧠 Interview notes

* Controls **stacking**
* `slice(0, maxSnack)` enforces stack limit
* Offset based on index = simple vertical stacking

---

# 3️⃣ Snackbar Item (Auto + Manual Close)

### `snackbar/SnackbarItem.jsx`

```jsx
import { useEffect } from "react";
import cx from "classnames";
import "./snackbar.css";

const DEFAULT_AUTO_CLOSE = 3500;

const SnackbarItem = ({
  id,
  message,
  variant,
  onClose,
  offset,
  autoCloseDuration
}) => {
  useEffect(() => {
    const timer = setTimeout(
      () => onClose(id),
      autoCloseDuration ?? DEFAULT_AUTO_CLOSE
    );

    return () => clearTimeout(timer);
  }, [id, onClose, autoCloseDuration]);

  return (
    <div
      className={cx("snackbar", variant)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)}>✕</button>
    </div>
  );
};

export default SnackbarItem;
```

### 🧠 Interview notes

* Cleanup prevents memory leaks
* Each snackbar is self-contained
* Supports per-snackbar duration

---

# 4️⃣ Snackbar Styles

### `snackbar/snackbar.css`

```css
.snackbar {
  position: fixed;
  top: 12px;
  right: 12px;
  min-width: 260px;
  padding: 12px 16px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.snackbar.default {
  background: #e0e0e0;
}

.snackbar.success {
  background: #a5f3a1;
}

.snackbar.error {
  background: #fca5a5;
}

.snackbar button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
  }
}
```

---

# 5️⃣ App Usage Example

### `App.jsx`

```jsx
import { useSnackbar } from "./snackbar/SnackbarContext";

const variants = ["success", "error", "default"];

export default function App() {
  const { addSnackbar } = useSnackbar();

  const handleClick = () => {
    const variant = variants[Math.floor(Math.random() * variants.length)];
    addSnackbar({
      message: `This is a ${variant} snackbar`,
      variant
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={handleClick}>Add Snackbar</button>
    </div>
  );
}
```

---

# 6️⃣ App Entry

### `main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "./snackbar/SnackbarContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>
);
```

---

# 🎯 Interview-Level Explanation (Say This)

> “I implemented Snackbar as a centralized UI service using Context.
> Snackbars are self-contained, auto-close safely with cleanup, and stack with a configurable maximum.
> The provider pattern makes it reusable across the application without prop drilling.”

---

# 🚀 Possible Follow-Ups (Bonus Points)

You can easily add:

* Pause auto-close on hover
* Exit animation before removal
* Queue instead of drop when maxSnack reached
* Position config (top-right, bottom-left)
* Promise-based snackbar API

---

If you want next:

* **Queue-based Snackbar**
* **Exit animations**
* **TypeScript version**
* **Notistack-style API**
* **Test cases (RTL/Jest)**

Just tell me 👌
