Got it 😄
Accordion Group with **compound components + context + single/multiple open support** is a *very Tekion/Senior Frontend style* question.

So below is the **FULL working project code** with:

✅ Folder structure
✅ Compound Pattern API (`Accordion.Item`, `Accordion.Trigger`, `Accordion.Content`)
✅ Single open mode
✅ Multiple open mode
✅ Disabled item support
✅ Smooth open/close animation
✅ Full CSS file (not only inline)
✅ Clean reusable architecture

---

# ✅ React Accordion Group (Compound Component Pattern)

---

# 📂 Folder Structure

```
react-accordion-compound/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   └── Accordion/
│   │       ├── Accordion.jsx
│   │       ├── Accordion.css
│   │       └── index.js
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

# ✅ Step 1: Entry Point

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

# ✅ Step 2: Global CSS

## `src/index.css`

```css
body {
  margin: 0;
  font-family: sans-serif;
  background: #f9fafb;
}

h1 {
  text-align: center;
}
```

---

---

# ✅ Step 3: Accordion Component (Compound Pattern)

---

## `src/components/Accordion/Accordion.jsx`

```jsx
import { createContext, useContext, useState } from "react";
import "./Accordion.css";

/* ---------------------------------------------------
   1. Accordion Group Context
--------------------------------------------------- */

const AccordionContext = createContext(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside <Accordion>");
  }

  return context;
}

/* ---------------------------------------------------
   2. Accordion Item Context
--------------------------------------------------- */

const AccordionItemContext = createContext(null);

function useAccordionItem() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "Accordion.Item subcomponents must be inside Accordion.Item"
    );
  }

  return context;
}

/* ---------------------------------------------------
   3. Main Accordion Component
--------------------------------------------------- */

function Accordion({
  children,
  allowMultiple = false,
  defaultValue = allowMultiple ? [] : null,
}) {
  const [openItems, setOpenItems] = useState(defaultValue);

  /* Toggle accordion item */
  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev === id ? null : id));
    }
  };

  /* Check if accordion item is open */
  const isItemOpen = (id) => {
    return allowMultiple ? openItems.includes(id) : openItems === id;
  };

  return (
    <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

/* ---------------------------------------------------
   4. Accordion.Item Component
--------------------------------------------------- */

function AccordionItem({ value, disabled = false, children }) {
  const { toggleItem, isItemOpen } = useAccordion();

  const isOpen = isItemOpen(value);

  const toggle = () => {
    if (!disabled) toggleItem(value);
  };

  return (
    <AccordionItemContext.Provider
      value={{ isOpen, toggle, disabled }}
    >
      <div
        className={`accordion-item ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

/* ---------------------------------------------------
   5. Accordion.Trigger Component
--------------------------------------------------- */

function AccordionTrigger({ children }) {
  const { isOpen, toggle, disabled } = useAccordionItem();

  return (
    <button
      className="accordion-trigger"
      onClick={toggle}
      disabled={disabled}
      aria-expanded={isOpen}
    >
      <span>{children}</span>

      {/* Chevron Icon */}
      <span className={`chevron ${isOpen ? "rotate" : ""}`}>
        ▼
      </span>
    </button>
  );
}

/* ---------------------------------------------------
   6. Accordion.Content Component
--------------------------------------------------- */

function AccordionContent({ children }) {
  const { isOpen } = useAccordionItem();

  return (
    <div
      className={`accordion-content ${isOpen ? "show" : ""}`}
    >
      <div className="accordion-inner">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------
   7. Compound API Attachments
--------------------------------------------------- */

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
```

---

---

# ✅ Step 4: Accordion Styling

## `src/components/Accordion/Accordion.css`

```css
.accordion {
  width: 600px;
  margin: 30px auto;
}

/* Accordion Item Box */
.accordion-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  background: white;
  transition: all 0.3s ease;
}

/* Disabled State */
.accordion-item.disabled {
  opacity: 0.6;
}

/* Trigger Button */
.accordion-trigger {
  width: 100%;
  padding: 16px;
  border: none;
  outline: none;
  background: white;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 16px;
  font-weight: 600;
}

.accordion-trigger:hover {
  background: #f3f4f6;
}

.accordion-trigger:disabled {
  cursor: not-allowed;
}

/* Chevron Animation */
.chevron {
  transition: transform 0.3s ease;
}

.chevron.rotate {
  transform: rotate(180deg);
}

/* Accordion Content Animation */
.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.accordion-content.show {
  max-height: 300px;
}

/* Inner Content */
.accordion-inner {
  padding: 16px;
  border-top: 1px solid #ddd;
  font-size: 14px;
  line-height: 1.6;
}
```

---

---

# ✅ Step 5: Export File

## `src/components/Accordion/index.js`

```jsx
import Accordion from "./Accordion";

export default Accordion;
```

---

---

# ✅ Step 6: Usage Examples

---

## `src/App.jsx`

```jsx
import Accordion from "./components/Accordion";

export default function App() {
  return (
    <div>
      <h1>Accordion Group Component</h1>

      {/* ✅ Single Open Mode */}
      <h2 style={{ textAlign: "center" }}>Single Open</h2>

      <Accordion defaultValue="react">
        <Accordion.Item value="react">
          <Accordion.Trigger>What is React?</Accordion.Trigger>
          <Accordion.Content>
            React is a JavaScript library for building UI components.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="compound">
          <Accordion.Trigger>
            What are Compound Components?
          </Accordion.Trigger>
          <Accordion.Content>
            Compound components share implicit state and create flexible APIs.
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="disabled" disabled>
          <Accordion.Trigger>This Item is Disabled</Accordion.Trigger>
          <Accordion.Content>
            This content cannot be opened.
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>

      {/* ✅ Multiple Open Mode */}
      <h2 style={{ textAlign: "center" }}>Multiple Open</h2>

      <Accordion allowMultiple defaultValue={["privacy", "account"]}>
        <Accordion.Item value="privacy">
          <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
          <Accordion.Content>
            <p>✔ Profile visibility</p>
            <p>✔ Search engine indexing</p>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="account">
          <Accordion.Trigger>Account Settings</Accordion.Trigger>
          <Accordion.Content>
            <button>Change Password</button>
          </Accordion.Content>
        </Accordion.Item>

        <Accordion.Item value="notifications">
          <Accordion.Trigger>Notifications</Accordion.Trigger>
          <Accordion.Content>
            <p>Email Alerts</p>
            <p>SMS Alerts</p>
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
```

---

---

# ✅ Output Features

### Single Open Mode

* Only one accordion can stay open at a time.

### Multiple Open Mode

* Many panels can expand simultaneously.

### Disabled Support

* Disabled accordion cannot be opened.

### Compound API

```jsx
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger />
    <Accordion.Content />
  </Accordion.Item>
</Accordion>
```

---

---

# ⭐ Interview Notes (Tekion Senior Expectation)

This solution shows:

✅ Compound component architecture
✅ Context-based isolation
✅ Controlled toggle logic
✅ Reusable scalable UI API
✅ Accessibility (`aria-expanded`)
✅ Animation with `max-height`
✅ Disabled state support

---

---

# 🚀 Follow-Up Enhancements (If Interviewer Asks)

I can extend this with:

* Keyboard navigation (Arrow Up/Down)
* Smooth height auto-resize (dynamic content)
* Controlled Accordion (`value` prop)
* Nested accordion support
* Framer Motion animations

---

If you want, I can provide the **fully controlled Accordion like Radix UI** (industry-level senior staff version).
