Below is a **complete, interview-ready Accordion implementation in React**, written exactly in the style expected in **Atlassian / Amazon / PhonePe / Frontend machine-coding rounds**.

You’ll get:

* ✅ Clean **folder structure**
* ✅ **Controlled accordion** (no internal state)
* ✅ **Accessible (ARIA-correct)**
* ✅ **Smooth expand / collapse animation**
* ✅ **Accordion Group** (only one open at a time – follow-up)
* ✅ Clear **interview notes** explaining *why*, not just *how*

---

## 🔍 What We’re Building

![Image](https://raw.githubusercontent.com/onesine/react-nested-accordion/master/assets/img/Screen_Shot_2022_10_21_at_12.12.47.png)

![Image](https://blazor.syncfusion.com/documentation/accordion/images/blazor-accordion-animation.gif)

![Image](https://reactjsexample.com/content/images/2018/04/react-accessible-accordion.gif)

---

# 📁 Folder Structure

```
src/
│
├── components/
│   └── Accordion/
│       ├── Accordion.jsx
│       ├── AccordionGroup.jsx
│       ├── Accordion.module.css
│       └── index.js
│
├── pages/
│   └── AccordionDemo.jsx
│
├── App.jsx
├── main.jsx        // Vite (or index.js for CRA)
└── index.css
```

---

# 🧠 Interview Design Explanation (Say This!)

> “Accordion should be **controlled by parent**,
> accessibility must be handled via **button + aria attributes**,
> and animation should be done using **height transitions**, not display none.”

Interviewers care about:

* Accessibility
* Controlled components
* Clean state ownership
* Smooth animation
* Extendability (group behavior)

---

# 🧩 Accordion Component (Single Panel)

## `src/components/Accordion/Accordion.jsx`

```jsx
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Accordion.module.css";

const Accordion = ({ isOpen, label, children, onChange, id }) => {
  const handleToggle = () => {
    onChange?.(!isOpen);
  };

  return (
    <div className={styles.wrapper}>
      {/* Toggle button (keyboard accessible) */}
      <button
        className={cx(styles.toggler, { [styles.active]: isOpen })}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        id={`accordion-${id}`}
      >
        {label}
      </button>

      {/* Panel */}
      <div
        id={`panel-${id}`}
        role="region"
        aria-labelledby={`accordion-${id}`}
        className={cx(styles.panel, { [styles.active]: isOpen })}
      >
        <div className={styles.contentWrapper}>{children}</div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  children: PropTypes.node
};

Accordion.defaultProps = {
  isOpen: false
};

export default Accordion;
```

---

# 🎨 Accordion Styles (Animation is the Key)

## `src/components/Accordion/Accordion.module.css`

```css
.wrapper {
  margin: 10px 0;
}

/* Toggle button */
.toggler {
  position: relative;
  width: 100%;
  padding: 10px;
  text-align: left;
  background: #f9f9f9;
  border: none;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.toggler::after {
  content: "+";
  position: absolute;
  right: 12px;
}

.toggler.active::after {
  content: "-";
}

/* Panel animation */
.panel {
  overflow: hidden;
  max-height: 0;
  background: #90a4ae;
  transition: max-height 0.4s ease;
}

.panel.active {
  max-height: 500px;
}

.contentWrapper {
  padding: 10px;
}
```

### 🧠 Interview Note

* ❌ `display: none` → no animation
* ✅ `max-height + overflow` → smooth expand

---

# 🔁 Follow-Up: Accordion Group (Only One Open)

> **This is a VERY common follow-up**

---

## `src/components/Accordion/AccordionGroup.jsx`

```jsx
import React, { useState } from "react";
import Accordion from "./Accordion";

const AccordionGroup = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {items.map((item, index) => (
        <Accordion
          key={index}
          id={String(index)}
          label={item.label}
          isOpen={openIndex === index}
          onChange={() =>
            setOpenIndex(openIndex === index ? null : index)
          }
        >
          {item.content}
        </Accordion>
      ))}
    </>
  );
};

export default AccordionGroup;
```

### 🧠 Interview Explanation

* State lifted to parent
* Only one index allowed
* Clicking same accordion closes it

---

# 📦 Barrel Export

## `src/components/Accordion/index.js`

```js
export { default as Accordion } from "./Accordion";
export { default as AccordionGroup } from "./AccordionGroup";
```

---

# 🧪 Demo Page

## `src/pages/AccordionDemo.jsx`

```jsx
import { AccordionGroup } from "../components/Accordion";

const data = [
  {
    label: "What is React?",
    content: "React is a JavaScript library for building UIs."
  },
  {
    label: "What is an Accordion?",
    content: "Accordion is a collapsible UI component."
  },
  {
    label: "Why controlled components?",
    content: "They give predictable data flow."
  }
];

const AccordionDemo = () => {
  return <AccordionGroup items={data} />;
};

export default AccordionDemo;
```

---

# 🏠 App Entry

## `src/App.jsx`

```jsx
import AccordionDemo from "./pages/AccordionDemo";

const App = () => {
  return <AccordionDemo />;
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

# 🧠 Accessibility Checklist (Interview Gold)

✅ Uses `<button>`
✅ `aria-expanded` reflects state
✅ `role="region"` for panel
✅ `aria-labelledby` links header & panel
✅ Keyboard friendly by default

---

# 🔥 Common Interview Follow-Ups & Answers

| Question              | What to Say                 |
| --------------------- | --------------------------- |
| Nested accordion      | Recursive rendering         |
| Animation height      | Measure scrollHeight        |
| Multiple open allowed | Store array of open indexes |
| Keyboard nav          | Arrow key handlers          |
| Performance           | Virtualization              |

---

# ✅ Final Verdict

This solution is:

* ✔ Interview-grade
* ✔ Accessible
* ✔ Extendable
* ✔ Clean architecture
* ✔ Matches real-world UI libraries

If you want next:

* **Nested accordions**
* **Dynamic height animation**
* **Keyboard navigation**
* **TypeScript**
* **ARIA-advanced version**

Just say the word 🚀
