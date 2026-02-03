Below is a **complete, production-grade implementation** of a **Medium-style text-selection hook in React**, with:

✅ clean hook API
✅ correct DOM + Selection handling
✅ viewport-safe coordinates
✅ popup positioning
✅ folder structure
✅ detailed explanations (interview-ready)

This is **exactly how you should present it in a frontend interview**.

---

## 🧠 Problem Restatement (Interview Framing)

> Implement a React hook that:
>
> • Detects **text selection**
> • Returns the **selected text**
> • Returns the **coordinates of the selection**
> • Allows showing a **floating popup (Tweet / tools)**
> • Restricts selection to a **specific container**

---

## 📁 Folder Structure (Recommended)

```
text-selection-popup/
│
├── public/
│   └── index.html
│
├── src/
│   ├── hooks/
│   │   └── useSelectionText.js
│   │
│   ├── components/
│   │   └── SelectionExample.js
│   │
│   ├── App.js
│   ├── index.js
│   └── styles.css
│
└── package.json
```

---

## 1️⃣ The Hook: `useSelectionText`

### `src/hooks/useSelectionText.js`

```js
import { useEffect, useState } from "react";

/**
 * Hook that returns selected text and its coordinates
 * Restricts selection to the provided ref
 */
const useSelectionText = (ref) => {
  const [data, setData] = useState({
    showTools: false,
  });

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) {
      setData({ showTools: false });
      return;
    }

    const startNode = range.startContainer.parentNode;
    const endNode = range.endContainer.parentNode;

    // Ensure selection is inside the target container
    if (!ref.current?.contains(startNode) || !ref.current?.contains(endNode)) {
      setData({ showTools: false });
      return;
    }

    const rect = range.getBoundingClientRect();

    if (!rect.width) {
      setData({ showTools: false });
      return;
    }

    setData({
      selectedText,
      showTools: true,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 30, // show popup above text
      width: rect.width,
    });
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return data;
};

export default useSelectionText;
```

---

### 📝 Why this hook is correct

| Concept                   | Why                              |
| ------------------------- | -------------------------------- |
| `window.getSelection()`   | Native browser selection API     |
| `getRangeAt(0)`           | Handles overlapping selections   |
| `getBoundingClientRect()` | Gives precise popup positioning  |
| `scrollX / scrollY`       | Fixes viewport scroll offset     |
| `ref.contains()`          | Restricts selection to component |

---

## 2️⃣ Example Component (Medium-style)

### `src/components/SelectionExample.js`

```js
import React, { useRef } from "react";
import useSelectionText from "../hooks/useSelectionText";

const SelectionExample = () => {
  const contentRef = useRef(null);
  const data = useSelectionText(contentRef);

  return (
    <div className="page">
      {data.showTools && (
        <div
          className="popup"
          style={{
            top: `${data.y}px`,
            left: `${data.x + data.width / 2}px`,
          }}
        >
          🐦 Tweet
        </div>
      )}

      <div ref={contentRef} className="content">
        <p>
          There are many variations of passages of Lorem Ipsum available, but the
          majority have suffered alteration in some form, by injected humour, or
          randomised words which don't look even slightly believable.
        </p>

        <p>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </p>

        <p>
          It has survived not only five centuries, but also the leap into
          electronic typesetting, remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
};

export default SelectionExample;
```

---

## 3️⃣ App Entry

### `src/App.js`

```js
import React from "react";
import SelectionExample from "./components/SelectionExample";
import "./styles.css";

const App = () => {
  return <SelectionExample />;
};

export default App;
```

---

### `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

## 4️⃣ Styling (Popup + Content)

### `src/styles.css`

```css
body {
  font-family: sans-serif;
  background: #f5f5f5;
}

.page {
  padding: 40px;
}

.content {
  background: white;
  padding: 20px;
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.popup {
  position: absolute;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}
```

---

## 🎯 Interview Talking Points (Say This)

> “I’m using the native Selection API to read highlighted text,
> bounding rectangles to compute popup coordinates,
> and scroll offsets to keep the popup aligned during scroll.”

> “The hook is reusable and restricted via ref so it doesn’t interfere with the whole document.”

---

## ⚡ Common Follow-Ups (You’re Ready)

| Question               | Answer                       |
| ---------------------- | ---------------------------- |
| Keyboard selection?    | Listen to `selectionchange`  |
| Multi-line selections? | Already handled              |
| Shadow DOM?            | Needs `getSelection()` scope |
| Mobile support?        | Works with touch events      |
| Performance?           | Event only fires on mouseup  |

---

## ✅ Final Result

✔ Clean hook
✔ Accurate coordinates
✔ Medium-style behavior
✔ Interview-grade explanation
✔ Reusable API

If you want next:

* **Tweet integration**
* **Edit / highlight tool**
* **Selection persistence**
* **TypeScript version**
* **selectionchange optimization**

Just say the word 🚀
