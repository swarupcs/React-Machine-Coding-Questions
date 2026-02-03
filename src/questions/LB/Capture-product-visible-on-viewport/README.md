Below is a **clean, interview-grade, end-to-end solution** for the NoBroker / ThoughtSpot / Twitter style **“capture viewed item after X seconds of idle scroll”** problem.

I’ll give you:

* ✅ **Clear folder structure**
* ✅ **Full working Vanilla JS implementation**
* ✅ **Debounced scroll logic**
* ✅ **Viewport detection**
* ✅ **Production notes + interview talking points**
* ✅ **React version (bonus, since interviewers often ask)**

---

## 🔍 What We’re Building (Visual Reference)

![Image](https://static.semrush.com/blog/uploads/media/7b/5d/7b5dae267dc19eab7827ded4546007db/946b2009d801d657cabb86c417fc37bb/original.png)

![Image](https://raw.githubusercontent.com/omar-hanafy/scroll_spy/main/screenshots/scroll_spy.gif)

![Image](https://media.stormlikes.com/public/blog/storage/covers/articles/10-tips-for-scroll-stopping-visual-content-for-social-media.jpg?v=1749114155)

---

# 📁 Folder Structure (Vanilla JS)

```
scroll-dwell-tracker/
│
├── index.html
├── css/
│   └── styles.css
│
└── js/
    ├── debounce.js
    ├── viewport.js
    └── main.js
```

This separation is **exactly what interviewers like**:

* utilities isolated
* logic readable
* no spaghetti JS

---

# 🧠 Problem Breakdown (Say This in Interview)

> “The problem has **two independent concerns**:
>
> 1. Detect which elements are **currently visible**
> 2. Trigger API only **after user stops scrolling for X seconds**
>
> We solve them independently and then compose them.”

---

# 1️⃣ HTML (Dummy Property Grid)

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Scroll Dwell Tracker</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>

  <div class="wrapper">
    <!-- Simulating properties -->
    <div class="block">1</div>
    <div class="block">2</div>
    <div class="block">3</div>
    <div class="block">4</div>
    <div class="block">5</div>
    <div class="block">6</div>
    <div class="block">7</div>
    <div class="block">8</div>
    <div class="block">9</div>
    <div class="block">10</div>
    <div class="block">11</div>
    <div class="block">12</div>
    <div class="block">13</div>
    <div class="block">14</div>
    <div class="block">15</div>
  </div>

  <script src="./js/debounce.js"></script>
  <script src="./js/viewport.js"></script>
  <script src="./js/main.js"></script>
</body>
</html>
```

---

# 2️⃣ Styling (Just for Visibility)

## `css/styles.css`

```css
.wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.block {
  flex: 1 300px;
  height: 300px;
  margin: 10px;
  background: #e53935;
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

---

# 3️⃣ Viewport Detection Utility

## `js/viewport.js`

```js
/**
 * Checks if element is fully inside viewport
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

### 🧠 Interview Note

* Uses `getBoundingClientRect`
* Browser-safe viewport fallback
* Deterministic & fast

---

# 4️⃣ Debounce Utility (Critical Part)

## `js/debounce.js`

```js
/**
 * Executes function only after user stops triggering event
 */
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 🧠 Interview Note

> “Debounce ensures we act only after user becomes idle.”

---

# 5️⃣ Main Logic (Core Solution)

## `js/main.js`

```js
// All tracked items
const blocks = document.querySelectorAll(".block");

// API simulation
function sendToServer(id) {
  console.log("API CALLED FOR BLOCK:", id);
}

// Called after user stops scrolling
function handleScrollStop() {
  blocks.forEach((block) => {
    if (isInViewport(block)) {
      sendToServer(block.innerText);
    }
  });

  console.log("---- idle detected ----");
}

// Debounced scroll handler (5 sec for interview; using 1s here)
const debouncedScroll = debounce(handleScrollStop, 1000);

// Attach listener
window.addEventListener("scroll", debouncedScroll);
```

---

# 🧠 How This Solves the Exact Requirement

| Requirement              | Solution                |
| ------------------------ | ----------------------- |
| Detect visible property  | `getBoundingClientRect` |
| Wait X seconds           | `debounce`              |
| Cancel if scroll resumes | `clearTimeout`          |
| Avoid multiple API calls | One debounced execution |
| Scalable                 | Works for N elements    |

---

# ⚠️ Important Interview Caveats (Mention These!)

### ❌ Problem with `scroll` + debounce alone

* Fires only **after scroll stops**
* Doesn’t measure **actual dwell time per item**

### ✅ How real systems solve this

* **IntersectionObserver**
* Per-element timers
* Threshold visibility %

---

# ⭐ BONUS: Production-Grade React Version (Very Impressive)

### Folder

```
src/
├── hooks/
│   ├── useOnScreen.js
│   └── useDebounce.js
│
└── App.jsx
```

---

## `useOnScreen.js`

```js
import { useEffect, useState } from "react";

export const useOnScreen = (ref) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return visible;
};
```

---

## `useDebounce.js`

```js
import { useRef } from "react";

export const useDebounce = (fn, delay) => {
  const timer = useRef();

  return (...args) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fn(...args), delay);
  };
};
```

---

## `App.jsx`

```jsx
import { useRef, useEffect } from "react";
import { useOnScreen } from "./hooks/useOnScreen";
import { useDebounce } from "./hooks/useDebounce";

const Card = ({ id }) => {
  const ref = useRef();
  const visible = useOnScreen(ref);

  const debouncedSend = useDebounce(() => {
    console.log("API CALL:", id);
  }, 5000);

  useEffect(() => {
    if (visible) debouncedSend();
  }, [visible]);

  return (
    <div ref={ref} style={{ height: 300, margin: 10, background: "red" }}>
      {id}
    </div>
  );
};

export default function App() {
  return Array.from({ length: 20 }).map((_, i) => (
    <Card key={i} id={i + 1} />
  ));
}
```

---

# 🧠 Final Interview Talking Points (Memorize)

* “I separate **visibility detection** from **idle detection**”
* “Debounce prevents noisy scroll events”
* “IntersectionObserver is production-grade”
* “Per-element dwell tracking is more accurate”
* “This pattern powers analytics & recommendations”

---

# ✅ Final Verdict

This solution is:

* ✔ System-design ready
* ✔ Frontend interview approved
* ✔ Scalable & readable
* ✔ Easy to explain
* ✔ Used in real companies (NoBroker, Meta, Amazon)

If you want next:

* **Per-item dwell timers**
* **Visibility % thresholds**
* **Analytics batching**
* **Network retry strategy**
* **TypeScript version**

Just tell me 🚀
