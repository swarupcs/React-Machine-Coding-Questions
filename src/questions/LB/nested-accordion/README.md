Great question 👍
This is a **classic Apple IC3–level frontend problem** that tests three core skills:

1. **Data transformation** (flat → hierarchical)
2. **Recursive rendering**
3. **Component design & state isolation**

Below is a **clean, interview-ready solution** with:

* ✅ Proper folder structure
* ✅ Container–presentation separation
* ✅ Optimized data handling
* ✅ Clear recursion
* ✅ Simple accordion behavior
* ✅ Easy explanation you can say during interview

---

# 📁 Recommended Folder Structure

```
src/
│
├── components/
│   ├── Accordion/
│   │   ├── AccordionItem.jsx
│   │   └── Accordion.css
│   │
│   └── AccordionTree.jsx
│
├── data/
│   └── tabs.js
│
├── utils/
│   └── buildTree.js
│
├── App.jsx
├── index.css
└── main.jsx
```

### Why this structure?

* **data/** → raw API-like input
* **utils/** → transformation logic (important for Apple interviews)
* **AccordionTree** → container
* **AccordionItem** → presentational + recursive
* Clear separation of concerns

---

# 🧠 High-Level Approach (Interview Explanation)

> “I first transform the flat list into a tree structure using a map for O(n) complexity.
> Then I recursively render the tree using a reusable AccordionItem component, where each node controls its own open/close state.”

---

# 🧩 Step-by-Step Code

---

## 1️⃣ Data Source

📍 `src/data/tabs.js`

```js
export const tabs = [
  { id: 1, name: "Parent 1", parentId: null },
  { id: 2, name: "Child 1.1", parentId: 1 },
  { id: 3, name: "Child 1.2", parentId: 1 },
  { id: 4, name: "Parent 2", parentId: null },
  { id: 5, name: "Child 2.1", parentId: 4 },
  { id: 6, name: "Child 2.2", parentId: 4 },
  { id: 7, name: "Child 1.1.1", parentId: 2 },
  { id: 8, name: "Child 1.2.1", parentId: 3 },
];
```

---

## 2️⃣ Build Tree Utility (Important Optimization)

📍 `src/utils/buildTree.js`

```js
export const buildTree = (list) => {
  const map = {};
  const roots = [];

  // Create lookup map
  list.forEach((item) => {
    map[item.id] = { ...item, children: [] };
  });

  // Build tree
  list.forEach((item) => {
    if (item.parentId === null) {
      roots.push(map[item.id]);
    } else {
      map[item.parentId]?.children.push(map[item.id]);
    }
  });

  return roots;
};
```

### Why this matters

* Avoids repeated `filter()` calls
* O(n) time complexity
* Interviewers **love this improvement**

---

## 3️⃣ Accordion Item (Recursive Component)

📍 `src/components/Accordion/AccordionItem.jsx`

```jsx
import { useState } from "react";

const AccordionItem = ({ item, level = 0 }) => {
  const [open, setOpen] = useState(true);
  const hasChildren = item.children.length > 0;

  return (
    <div>
      <div
        className="accordion-item"
        style={{ paddingLeft: level * 16 }}
        onClick={() => hasChildren && setOpen((prev) => !prev)}
      >
        <span className="icon">
          {hasChildren ? (open ? "▼" : "▶") : "—"}
        </span>
        <span>{item.name}</span>
      </div>

      {open &&
        hasChildren &&
        item.children.map((child) => (
          <AccordionItem
            key={child.id}
            item={child}
            level={level + 1}
          />
        ))}
    </div>
  );
};

export default AccordionItem;
```

### Key Points

* Local state per node
* Recursive rendering
* Indentation based on depth
* No unnecessary re-renders

---

## 4️⃣ Accordion Tree (Container)

📍 `src/components/AccordionTree.jsx`

```jsx
import AccordionItem from "./Accordion/AccordionItem";
import { buildTree } from "../utils/buildTree";
import { tabs } from "../data/tabs";

const AccordionTree = () => {
  const treeData = buildTree(tabs);

  return (
    <div>
      {treeData.map((item) => (
        <AccordionItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AccordionTree;
```

---

## 5️⃣ Styles

📍 `src/components/Accordion/Accordion.css`

```css
.accordion-item {
  cursor: pointer;
  padding: 6px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.accordion-item:hover {
  background-color: #f5f5f5;
}

.icon {
  width: 16px;
  display: inline-block;
}
```

📍 `src/index.css`

```css
body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont;
}

.App {
  max-width: 500px;
  margin: 40px auto;
}
```

---

## 6️⃣ App Entry

📍 `src/App.jsx`

```jsx
import AccordionTree from "./components/AccordionTree";
import "./components/Accordion/Accordion.css";

const App = () => {
  return (
    <div className="App">
      <h2>Nested Tabs / Accordion</h2>
      <AccordionTree />
    </div>
  );
};

export default App;
```

---

## 7️⃣ main.jsx

📍 `src/main.jsx`

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

# ✅ Output

```
▼ Parent 1
   ▼ Child 1.1
      — Child 1.1.1
   ▼ Child 1.2
      — Child 1.2.1
▼ Parent 2
   — Child 2.1
   — Child 2.2
```

---

# 🎯 What Apple Interviewers Are Evaluating

| Skill                 | Covered |
| --------------------- | ------- |
| Data transformation   | ✅       |
| Recursion             | ✅       |
| Component design      | ✅       |
| State isolation       | ✅       |
| Performance awareness | ✅       |
| Clean UI logic        | ✅       |

---

# 🎤 30-Second Interview Explanation

> “I convert the flat list into a tree using a lookup map to avoid repeated filtering.
> Then I recursively render the tree with an AccordionItem component, where each node manages its own expanded state.
> Indentation is controlled via depth.”

That answer is **IC3-level solid**.

---

# 🚀 Optional Enhancements (If Asked)

* Controlled accordion (only one open)
* Keyboard accessibility
* Lazy rendering of children
* Add / delete nodes dynamically

If you want:

* 🔥 TypeScript version
* 🧠 Live coding strategy for Apple
* 📂 File/folder version for MakeMyTrip / Uber variant

Just tell me 👍
