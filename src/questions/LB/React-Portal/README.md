Got it 😄
You want the **full production-style React Portal project** with:

✅ Folder structure
✅ Full working code
✅ Modal + Tooltip + Custom Portal Hook
✅ Event bubbling + Context preservation examples
✅ Notes like interview explanation
✅ Clean reusable components

So let’s build a complete **React Portal Playground App**.

---

# ✅ React Portal Full Project (Interview Ready)

---

# 📁 Folder Structure

```
react-portal-playground/
│
├── public/
│   ├── index.html
│   └── portal-root.html
│
├── src/
│   │
│   ├── components/
│   │   ├── Modal/
│   │   │   ├── Modal.jsx
│   │   │   └── modal.css
│   │   │
│   │   ├── Tooltip/
│   │   │   ├── Tooltip.jsx
│   │   │   └── tooltip.css
│   │   │
│   │   ├── Portal/
│   │   │   ├── Portal.jsx
│   │   │   └── usePortal.js
│   │
│   ├── examples/
│   │   ├── EventBubblingExample.jsx
│   │   └── ContextPortalExample.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── package.json
└── README.md
```

---

---

# 1️⃣ Setup Portal Root in HTML

### `public/index.html`

```html
<body>
  <div id="root"></div>

  <!-- Portal mount point -->
  <div id="portal-root"></div>
</body>
```

✅ This ensures modals/tooltips render outside React root.

---

---

# 2️⃣ Custom Portal Hook

---

## `src/components/Portal/usePortal.js`

```js
import { useEffect, useState } from "react";

/**
 * Custom Hook: usePortal
 * Creates or finds a portal root dynamically
 */
export function usePortal(id = "portal-root") {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    let element = document.getElementById(id);

    // Create portal container if missing
    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    }

    setPortalElement(element);

    // Cleanup if empty
    return () => {
      if (element.childNodes.length === 0) {
        element.remove();
      }
    };
  }, [id]);

  return portalElement;
}
```

---

---

## `src/components/Portal/Portal.jsx`

```jsx
import ReactDOM from "react-dom";
import { usePortal } from "./usePortal";

/**
 * Portal Component Wrapper
 */
export default function Portal({ children, id }) {
  const portalRoot = usePortal(id);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
}
```

---

### ✅ Notes

* Hook ensures portal root exists
* Portal works anywhere in app
* Cleanup avoids DOM leaks

---

---

# 3️⃣ Modal Component Using Portal

---

## `src/components/Modal/Modal.jsx`

```jsx
import Portal from "../Portal/Portal";
import "./modal.css";

/**
 * Modal Component rendered using Portal
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="overlay" onClick={onClose}>
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>

          {children}
        </div>
      </div>
    </Portal>
  );
}
```

---

## `src/components/Modal/modal.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
}

.modal {
  background: white;
  width: 400px;
  padding: 20px;
  border-radius: 10px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.close-btn {
  float: right;
  cursor: pointer;
}
```

---

### ✅ Notes

* Portal avoids overflow clipping
* Modal is mounted at body level
* Clicking outside closes modal

---

---

# 4️⃣ Tooltip Component Using Portal

---

## `src/components/Tooltip/Tooltip.jsx`

```jsx
import { useState, useRef, useEffect } from "react";
import Portal from "../Portal/Portal";
import "./tooltip.css";

export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const triggerRef = useRef(null);

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [visible]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>

      {visible && (
        <Portal>
          <div
            className="tooltip"
            style={{
              top: pos.top,
              left: pos.left,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}
```

---

## `src/components/Tooltip/tooltip.css`

```css
.tooltip {
  position: absolute;
  background: black;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 9999;
}
```

---

### ✅ Notes

* Tooltip escapes `overflow:hidden`
* Uses DOM-level positioning
* Perfect for dropdown/popover UI

---

---

# 5️⃣ Event Bubbling Example

---

## `src/examples/EventBubblingExample.jsx`

```jsx
import ReactDOM from "react-dom";

export default function EventBubblingExample() {
  const handleParentClick = () => {
    alert("Parent clicked (bubbled through React tree)");
  };

  return (
    <div onClick={handleParentClick}>
      <h3>Event Bubbling Example</h3>

      {ReactDOM.createPortal(
        <button
          onClick={() => alert("Portal Button Clicked")}
        >
          Click Portal Button
        </button>,
        document.body
      )}
    </div>
  );
}
```

---

### ✅ Notes

Even though DOM is outside parent, React events bubble normally.

---

---

# 6️⃣ Context Preservation Example

---

## `src/examples/ContextPortalExample.jsx`

```jsx
import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom";

const ThemeContext = createContext("light");

function PortalChild() {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "10px",
        background: theme === "dark" ? "black" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      Portal Theme: {theme}
    </div>
  );
}

export default function ContextPortalExample() {
  return (
    <ThemeContext.Provider value="dark">
      <h3>Context Preservation Example</h3>

      {ReactDOM.createPortal(
        <PortalChild />,
        document.body
      )}
    </ThemeContext.Provider>
  );
}
```

---

### ✅ Notes

Portals do NOT break React context.

---

---

# 7️⃣ Main App Playground

---

## `src/App.jsx`

```jsx
import { useState } from "react";
import Modal from "./components/Modal/Modal";
import Tooltip from "./components/Tooltip/Tooltip";

import EventBubblingExample from "./examples/EventBubblingExample";
import ContextPortalExample from "./examples/ContextPortalExample";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 30 }}>
      <h1>🚀 React Portal Playground</h1>

      {/* Modal */}
      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Hello from Portal Modal</h2>
        <p>This modal is rendered outside root!</p>
      </Modal>

      <hr />

      {/* Tooltip */}
      <Tooltip content="Tooltip escapes overflow hidden!">
        <button>Hover me</button>
      </Tooltip>

      <hr />

      {/* Event Bubbling */}
      <EventBubblingExample />

      <hr />

      {/* Context Preservation */}
      <ContextPortalExample />
    </div>
  );
}
```

---

---

# 8️⃣ Entry Point

---

## `src/main.jsx`

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);
```

---

---

# 9️⃣ Global Styles

---

## `src/styles.css`

```css
body {
  font-family: sans-serif;
}
button {
  padding: 8px 14px;
  margin: 10px;
  cursor: pointer;
}
```

---

---

# ✅ What You Built (Interview Answer)

You implemented a full portal system supporting:

| Feature                   | Covered |
| ------------------------- | ------- |
| Modal via Portal          | ✅       |
| Tooltip escaping overflow | ✅       |
| Custom Portal Hook        | ✅       |
| Event Bubbling works      | ✅       |
| Context preserved         | ✅       |
| Cleanup + Best practices  | ✅       |

---

---

# 🚀 Next Interview-Level Enhancements

If you want, I can extend this into a **real UI library version**:

✅ Focus trap modal
✅ Escape key close
✅ Portal manager (single root)
✅ Nested portals
✅ Toast notifications system

Just tell me:
**Should I convert this into a reusable npm-style component library structure?**
