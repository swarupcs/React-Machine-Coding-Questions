Below is a **clean, interview-ready, production-style solution** for building a **Walkthrough / Product Tour Assistant in Vanilla JavaScript**, similar to **IntroJS**, with **clear folder structure, full code, and detailed notes**.

This answer is written the way you would **explain + submit** it in a frontend machine-coding or system-design interview.

---

## 📸 What we’re building (visual reference)

![Image](https://cdn.prod.website-files.com/659415b46df8ea43c3877776/674ef8d9bbcb08e5172773bb_674ef898699f723f6964ee38_second-step-of-create-website-overlay.jpeg)

![Image](https://cdn.prod.website-files.com/685d3f27e667cdf05fe197f8/685d3f27e667cdf05fe1b879_6733598f4506d436a24c804c_5c9be7a15bef7848eba93e82_5c9b96d360ff96a59b5fa23b_humanity.png)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1200/1%2A3zLjsUOdyBxvNPdUSpHuxw.jpeg)

---

# 🧠 Problem Summary (Interview Framing)

> “We want to guide first-time users through the UI by highlighting elements one-by-one, scrolling to them if needed, and showing navigation controls.”

Core requirements:

* Highlight DOM elements step-by-step
* Show a popover with **Next / Prev**
* Scroll to element if not visible
* Clean up previous step before next
* Plain JavaScript (no libraries)

---

# 📁 Folder Structure (Clean & Scalable)

```
walkthrough-assistant/
│
├── index.html
│
├── css/
│   └── styles.css
│
└── js/
    ├── steps.js        # walkthrough steps config
    ├── highlight.js    # highlight overlay logic
    ├── popover.js      # popover + navigation
    └── main.js         # orchestration logic
```

👉 **Why this matters in interviews**
Shows separation of concerns and maintainability.

---

# 1️⃣ HTML Layout (Dummy Website)

## `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Website Walkthrough</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>
<body>

  <header id="header" class="section">Header</header>

  <main id="wrapper">
    <div id="1" class="block">1</div>
    <div id="2" class="block">2</div>
    <div id="3" class="block">3</div>
    <div id="4" class="block">4</div>
    <div id="5" class="block">5</div>
    <div id="6" class="block">6</div>
    <div id="7" class="block">7</div>
    <div id="8" class="block">8</div>
    <div id="9" class="block">9</div>
  </main>

  <footer id="footer" class="section">Footer</footer>

  <script src="./js/steps.js"></script>
  <script src="./js/highlight.js"></script>
  <script src="./js/popover.js"></script>
  <script src="./js/main.js"></script>
</body>
</html>
```

---

# 2️⃣ Styling (Simple but Clear)

## `css/styles.css`

```css
body {
  font-family: sans-serif;
}

.section {
  height: 100px;
  background: #ffeb3b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

#wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.block {
  width: 300px;
  height: 100px;
  margin: 10px;
  background: #f44336;
  color: white;
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Highlight overlay */
#lb-highlight {
  pointer-events: none;
  box-sizing: border-box;
}

/* Popover */
#lb-popover {
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
```

---

# 3️⃣ Walkthrough Steps Configuration

## `js/steps.js`

```js
const STEPS = ["3", "header", "8", "footer", "5"];
let currentStepIndex = 0;
```

👉 Interview note:
**Config-driven design** → easy to extend like IntroJS.

---

# 4️⃣ Highlight Overlay Logic

## `js/highlight.js`

```js
function createHighlight(rect) {
  const highlight = document.createElement("div");
  highlight.id = "lb-highlight";

  highlight.style.position = "absolute";
  highlight.style.top = rect.top + window.scrollY - 4 + "px";
  highlight.style.left = rect.left + window.scrollX - 4 + "px";
  highlight.style.width = rect.width + "px";
  highlight.style.height = rect.height + "px";
  highlight.style.transition = "border 0.2s ease";

  document.body.appendChild(highlight);

  setTimeout(() => {
    highlight.style.border = "4px solid black";
  }, 0);
}

function removeHighlight() {
  document.getElementById("lb-highlight")?.remove();
}
```

---

# 5️⃣ Popover + Navigation

## `js/popover.js`

```js
function createPopover(rect, onNext, onPrev) {
  const popover = document.createElement("div");
  popover.id = "lb-popover";

  popover.style.position = "absolute";
  popover.style.top = rect.bottom + window.scrollY + 10 + "px";
  popover.style.left =
    (rect.left + rect.right) / 2 - 50 + window.scrollX + "px";
  popover.style.background = "#fff";
  popover.style.width = "120px";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.onclick = onPrev;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.onclick = onNext;

  popover.appendChild(prevBtn);
  popover.appendChild(nextBtn);

  document.body.appendChild(popover);
}

function removePopover() {
  document.getElementById("lb-popover")?.remove();
}
```

---

# 6️⃣ Orchestration (Main Logic)

## `js/main.js`

```js
function scrollToElement(el) {
  window.scrollTo({
    top: el.offsetTop - 80,
    behavior: "smooth"
  });
}

function showStep(stepId) {
  removeHighlight();
  removePopover();

  const element = document.getElementById(stepId);
  if (!element) return;

  scrollToElement(element);

  const rect = element.getBoundingClientRect();

  createHighlight(rect);

  createPopover(
    rect,
    () => {
      if (currentStepIndex < STEPS.length - 1) {
        currentStepIndex++;
        showStep(STEPS[currentStepIndex]);
      }
    },
    () => {
      if (currentStepIndex > 0) {
        currentStepIndex--;
        showStep(STEPS[currentStepIndex]);
      }
    }
  );
}

// Start walkthrough
showStep(STEPS[currentStepIndex]);
```

---

# ✅ Final Behavior Checklist

✔ Highlights element
✔ Scrolls to off-screen elements
✔ Shows next / prev controls
✔ Cleans previous step
✔ Config-driven steps
✔ No external libraries

---

# 🎯 Interview Talking Points (Very Important)

Say these explicitly:

* “I separated **configuration, UI, and orchestration**”
* “All overlays are dynamically mounted and cleaned up”
* “BoundingClientRect + scroll offsets ensure accurate positioning”
* “This mirrors how IntroJS works internally”
* “Could be extended with persistence (localStorage)”

---

# 🚀 Possible Follow-Ups Interviewers Ask

| Question                | Answer                                   |
| ----------------------- | ---------------------------------------- |
| How to show only once?  | `localStorage.setItem("tourSeen", true)` |
| Accessibility?          | ARIA roles, focus trapping               |
| Performance?            | Single overlay, reuse DOM                |
| Production alternative? | `IntersectionObserver`                   |
| React version?          | useRef + portals                         |

---

## ✅ You now have a **complete, interview-ready walkthrough assistant**

If you want next:

* React / Next.js version
* Keyboard navigation
* Tooltip positioning engine
* Masked overlay (dark background)
* Persistent progress state

Just say the word 🚀
