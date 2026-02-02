Below is a **clean, interview-ready Scroll Indicator implementation in React**, written exactly the way **frontend machine-coding rounds (SDE-1 / SDE-2)** expect.

You’ll get:

* ✅ **Clear folder structure**
* ✅ **Full working React code**
* ✅ **Well-explained math & logic**
* ✅ **Proper cleanup**
* ✅ **Smooth animated progress bar**
* ✅ **Easy extension to any scroll container**

---

## 🔍 What We’re Building (Visual Reference)

![Image](https://www.jqueryscript.net/images/scroll-progress-indicator-ws-scroLi.jpg)

![Image](https://www.jqueryscript.net/images/Customizable-Page-Scroll-Progress-Indicator-Plugin-For-jQuery.jpg)

![Image](https://miro.medium.com/0%2ANodbPhiyfoqNxfFb.gif)

---

# 📁 Folder Structure

```
src/
│
├── components/
│   └── ScrollIndicator/
│       ├── ScrollIndicator.jsx
│       ├── ScrollIndicator.css
│       └── index.js
│
├── pages/
│   └── ScrollDemo.jsx
│
├── App.jsx
├── main.jsx          // (Vite) or index.js (CRA)
└── index.css
```

---

# 🧠 High-Level Interview Explanation

> “A scroll indicator computes how much of the page has been scrolled as a percentage.
> We listen to the scroll event, calculate progress, and update a fixed progress bar.”

**Concepts being tested**

* DOM scroll properties
* Event listeners & cleanup
* React state & effects
* Performance awareness
* UI feedback patterns

---

# 🧩 ScrollIndicator Component

## `src/components/ScrollIndicator/ScrollIndicator.jsx`

```jsx
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
```

---

## 📝 Why This Logic Works

### 1️⃣ How much has user scrolled?

```js
document.documentElement.scrollTop
```

### 2️⃣ How much *can* user scroll?

```js
scrollHeight - clientHeight
```

### 3️⃣ Percentage

```js
(scrolled / total) * 100
```

---

# 🎨 Styling (Progress Bar)

## `src/components/ScrollIndicator/ScrollIndicator.css`

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f44336;
  color: white;
  text-align: center;
  z-index: 100;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.progressContainer {
  width: 100%;
  height: 8px;
  background-color: #ccc;
}

.progressBar {
  height: 8px;
  background-color: #4caf50;
  width: 0%;
  transition: width 0.2s linear;
}
```

---

# 📦 Barrel Export

## `src/components/ScrollIndicator/index.js`

```js
export { default } from "./ScrollIndicator";
```

---

# 🧪 Demo Page (Scrollable Content)

## `src/pages/ScrollDemo.jsx`

```jsx
import ScrollIndicator from "../components/ScrollIndicator";

const ScrollDemo = () => {
  return (
    <>
      <ScrollIndicator />
      <div style={{ height: "200vh", paddingTop: "80px" }}>
        <p style={{ padding: "20px" }}>
          Scroll down to see the progress indicator in action.
        </p>
      </div>
    </>
  );
};

export default ScrollDemo;
```

---

# 🏠 App Entry

## `src/App.jsx`

```jsx
import ScrollDemo from "./pages/ScrollDemo";

const App = () => {
  return <ScrollDemo />;
};

export default App;
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

---

# 🌍 Global Styles

## `src/index.css`

```css
body {
  margin: 0;
  font-family: sans-serif;
}
```

---

# 🧠 Interview Talking Points (VERY IMPORTANT)

### ❓ Why not calculate on every render?

* Scroll is event-driven
* We only update state when user scrolls

### ❓ Why cleanup is required?

* Prevents memory leaks
* Avoids duplicate listeners

### ❓ How to optimize further?

* Throttle scroll handler
* Use `requestAnimationFrame`

---

# 🔥 Common Follow-Up Questions

| Question                           | Answer                          |
| ---------------------------------- | ------------------------------- |
| Scroll container instead of window | Use `ref` + `element.scrollTop` |
| Horizontal scroll                  | Use `scrollLeft`                |
| Performance                        | Throttle / debounce             |
| Accessibility                      | `aria-valuenow`                 |
| Sticky header                      | Already supported               |

---

# ✅ Final Verdict

This solution is:

* ✔ **Interview-grade**
* ✔ **Clean & minimal**
* ✔ **Memory-safe**
* ✔ **Reusable**
* ✔ **Easy to explain verbally**

If you want next:

* **Container-based scroll indicator**
* **requestAnimationFrame version**
* **Throttled version**
* **TypeScript**
* **Progress indicator with labels**

Just say the word 🚀
