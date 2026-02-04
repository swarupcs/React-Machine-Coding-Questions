![Image](https://miro.medium.com/v2/resize%3Afit%3A1400/1%2AYoe024CnUToreUcNOMd62Q.jpeg)

![Image](https://raw.githubusercontent.com/mdbassit/Coloris/gh-pages/images/coloris-light-dark-polaroid.jpg)

![Image](https://miro.medium.com/v2/resize%3Afit%3A1200/1%2Acs_nZYc1g1-R5mqUdCkMLQ.png)

Below is a **clean, interview-ready Vanilla JavaScript solution** for the **Zeta SDE-1 Frontend machine-coding question**, including:

* ✅ **Proper folder structure**
* ✅ **Complete HTML / CSS / JS**
* ✅ **Clear explanation of core logic**
* ✅ **Follow-up throttle (sampling) implementation**
* ✅ **Why each decision was made (interviewer POV)**

This is exactly how you should present and reason during a **frontend interview**.

---

# 📁 Folder Structure (Vanilla JS – No Framework)

```
color-swatch-app/
│
├── index.html
├── styles.css
└── script.js
```

Simple. Clean. Interview-friendly.

---

# 1️⃣ HTML (Structure Only)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Color Swatch Picker</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <section class="app">
    <!-- Display Area -->
    <div id="display-area"></div>

    <!-- Color Swatches -->
    <div id="color-swatches">
      <div class="color-box red"></div>
      <div class="color-box blue"></div>
      <div class="color-box green"></div>
      <div class="color-box purple"></div>
      <div class="color-box pink"></div>
      <div class="color-box yellow"></div>
      <div class="color-box white"></div>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>
```

### 🧠 Why this structure?

* HTML defines **only layout**
* No inline JS → better separation of concerns
* IDs for **unique elements**
* Classes for **reusable styling**

---

# 2️⃣ CSS (Styling Only)

### `styles.css`

```css
body {
  font-family: sans-serif;
}

.app {
  margin: 40px;
}

/* Display Area */
#display-area {
  width: 100px;
  height: 100px;
  border: 2px solid black;
  margin-bottom: 12px;
}

/* Swatch Container */
#color-swatches {
  display: flex;
  gap: 6px;
}

/* Swatches */
.color-box {
  width: 30px;
  height: 30px;
  border: 1px solid black;
  cursor: pointer;
}

/* Colors */
.red { background-color: red; }
.blue { background-color: blue; }
.green { background-color: green; }
.purple { background-color: purple; }
.pink { background-color: pink; }
.yellow { background-color: yellow; }
.white { background-color: white; }
```

### 🧠 Interview Notes

* Swatches are **pure CSS**
* No inline styles → easier DOM manipulation
* Cursor pointer improves UX (nice touch 👍)

---

# 3️⃣ JavaScript – Core Logic

### `script.js`

```js
// Select elements
const displayAreaElm = document.querySelector("#display-area");
const colorBoxElms = document.querySelectorAll(".color-box");

// Attach click listeners
colorBoxElms.forEach((box) => {
  box.addEventListener("click", () => {
    // Get computed background color
    const computedStyle = getComputedStyle(box);
    const bgColor = computedStyle.getPropertyValue("background-color");

    // Apply to display area
    displayAreaElm.style.backgroundColor = bgColor;
  });
});
```

---

## 🧠 How This Works (Explain to Interviewer)

1. Query **all swatches**
2. Attach click listener to each
3. On click:

   * Read its computed `background-color`
   * Apply that color to display box
4. No hardcoding → scalable

This avoids:

* switch cases
* data attributes
* color maps

---

# 4️⃣ Follow-up: Throttle / Sampling Function

> **Requirement**:
> Change color only after **N clicks** (e.g. every 4th click)

This is **sampling**, not classic throttle.

---

### 🔁 Sampling Helper Function

```js
function sampler(fn, count, context) {
  let counter = 0;

  return function (...args) {
    counter++;
    context = context || this;

    if (counter !== count) return;

    fn.apply(context, args);
    counter = 0;
  };
}
```

### 🧠 What this does

* Counts number of calls
* Executes function only on **Nth call**
* Resets counter
* Perfect for click-based throttling

---

### 🎯 Apply Sampler to Swatches

```js
colorBoxElms.forEach((box) => {
  box.addEventListener(
    "click",
    sampler(() => {
      const computedStyle = getComputedStyle(box);
      const bgColor = computedStyle.getPropertyValue("background-color");
      displayAreaElm.style.backgroundColor = bgColor;
    }, 4) // change color on every 4th click
  );
});
```

---

# 🧪 Example Behavior

| Click Count | Action          |
| ----------- | --------------- |
| 1           | ❌ No change     |
| 2           | ❌ No change     |
| 3           | ❌ No change     |
| 4           | ✅ Color updates |
| 8           | ✅ Color updates |

---

# 🧠 Why Interviewers Like This Solution

✔ Vanilla JS (no frameworks)
✔ Clean DOM queries
✔ No unnecessary re-renders
✔ Efficient event handling
✔ Advanced follow-up handled correctly
✔ Correct usage of `getComputedStyle`
✔ Separation of concerns

---

# 🔥 Common Follow-ups (Be Ready)

| Question                   | Answer                        |
| -------------------------- | ----------------------------- |
| Can we optimize listeners? | Use event delegation          |
| Keyboard accessible?       | Add `tabindex` + keydown      |
| Dynamic swatches?          | Query parent, delegate        |
| Memory leaks?              | None – static listeners       |
| Why not inline styles?     | Scalability & maintainability |

---

If you want next:

* Event delegation version
* Dynamic swatch generation
* Debounce vs throttle comparison
* React conversion
* Accessibility-enhanced version

Just say the word 👌
