Excellent problem choice 👍
This **file explorer with dynamic nested folders/files** is a **high-signal SDE-2 machine coding question**. Interviewers use it to test:

* Recursive rendering
* Normalized state design
* State updates at arbitrary depth
* Component + context architecture
* Practical UI composition (modal, tree, actions)

Below is a **clean, production-grade solution** with:

* ✅ Proper folder structure
* ✅ Normalized state (`byId` pattern)
* ✅ Recursive tree rendering
* ✅ Centralized context for mutations
* ✅ Modal-based creation flow
* ✅ Arbitrarily deep nesting

---

# 📁 Folder Structure (Interview-Ready)

```
src/
│
├── components/
│   ├── Explorer/
│   │   ├── ExplorerTree.jsx
│   │   ├── ExplorerItem.jsx
│   │   └── explorer.css
│   │
│   ├── Modal/
│   │   ├── Modal.jsx
│   │   └── modal.css
│   │
│   └── CreateItemForm.jsx
│
├── context/
│   └── FileExplorerContext.jsx
│
├── utils/
│   └── treeUtils.js
│
├── App.jsx
├── index.css
└── main.jsx
```

### Why this structure works well in interviews

* **ExplorerItem** → recursive UI
* **ExplorerTree** → root container
* **Context** → centralized mutations
* **Utils** → pure data logic
* Easy to extend (rename, delete, drag & drop)

---

# 🧠 High-Level Architecture (What to Explain)

> “I use a normalized `byId` data structure to store files and folders.
> Rendering is done recursively by resolving children via `parentId`.
> Creation is handled via a modal, and mutations are centralized in a context so any node can create children.”

---

# 🧩 Complete Implementation

---

## 1️⃣ Normalized State Utilities

📍 `src/utils/treeUtils.js`

```js
export const getChildren = (parentId, items) => {
  return Object.values(items).filter(
    (item) => item.parentId === parentId
  );
};
```

---

## 2️⃣ File Explorer Context (Core Logic)

📍 `src/context/FileExplorerContext.jsx`

```jsx
import { createContext, useContext, useState } from "react";
import Modal from "../components/Modal/Modal";
import CreateItemForm from "../components/CreateItemForm";

const FileExplorerContext = createContext(null);

export const useFileExplorer = () => useContext(FileExplorerContext);

export const FileExplorerProvider = ({ children }) => {
  const [items, setItems] = useState({});
  const [modalParentId, setModalParentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const createItem = ({ name, type }) => {
    const id = `${type}_${Date.now()}`;

    setItems((prev) => ({
      ...prev,
      [id]: {
        id,
        name,
        type,
        parentId: modalParentId,
      },
    }));

    setShowModal(false);
    setModalParentId(null);
  };

  const openCreateModal = (parentId) => {
    setModalParentId(parentId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalParentId(null);
  };

  return (
    <FileExplorerContext.Provider
      value={{ items, createItem, openCreateModal }}
    >
      {children}

      <Modal show={showModal} onClose={closeModal} title="Create Item">
        <CreateItemForm onSubmit={createItem} />
      </Modal>
    </FileExplorerContext.Provider>
  );
};
```

### Why normalized state?

* O(1) create/update/delete
* Easy parent-child lookup
* Scales to large trees

---

## 3️⃣ Create Item Form (Modal Body)

📍 `src/components/CreateItemForm.jsx`

```jsx
import { useState } from "react";

const CreateItemForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("folder");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name, type });
    setName("");
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="folder">Folder</option>
        <option value="file">File</option>
      </select>
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
};

export default CreateItemForm;
```

---

## 4️⃣ Recursive Explorer Item

📍 `src/components/Explorer/ExplorerItem.jsx`

```jsx
import { useState } from "react";
import { useFileExplorer } from "../../context/FileExplorerContext";
import { getChildren } from "../../utils/treeUtils";

const ExplorerItem = ({ item, allItems, level = 0 }) => {
  const { openCreateModal } = useFileExplorer();
  const [open, setOpen] = useState(false);

  const children = getChildren(item.id, allItems);
  const isFolder = item.type === "folder";

  return (
    <>
      <div
        className="explorer-item"
        style={{ paddingLeft: level * 16 }}
      >
        <span onClick={() => isFolder && setOpen(!open)}>
          {isFolder ? (open ? "📂" : "📁") : "📄"} {item.name}
        </span>

        {isFolder && (
          <button onClick={() => openCreateModal(item.id)}>+</button>
        )}
      </div>

      {open &&
        children.map((child) => (
          <ExplorerItem
            key={child.id}
            item={child}
            allItems={allItems}
            level={level + 1}
          />
        ))}
    </>
  );
};

export default ExplorerItem;
```

---

## 5️⃣ Explorer Tree (Root Renderer)

📍 `src/components/Explorer/ExplorerTree.jsx`

```jsx
import { useFileExplorer } from "../../context/FileExplorerContext";
import ExplorerItem from "./ExplorerItem";
import { getChildren } from "../../utils/treeUtils";
import "./explorer.css";

const ExplorerTree = () => {
  const { items, openCreateModal } = useFileExplorer();
  const roots = getChildren(null, items);

  if (roots.length === 0) {
    return (
      <button onClick={() => openCreateModal(null)}>
        Create src
      </button>
    );
  }

  return (
    <>
      {roots.map((root) => (
        <ExplorerItem
          key={root.id}
          item={root}
          allItems={items}
        />
      ))}
    </>
  );
};

export default ExplorerTree;
```

---

## 6️⃣ Modal Component

📍 `src/components/Modal/Modal.jsx`

```jsx
import "./modal.css";

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal">
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Modal;
```

---

## 7️⃣ Styles

📍 `src/components/Explorer/explorer.css`

```css
.explorer-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
}

.explorer-item button {
  margin-left: auto;
}
```

📍 `src/components/Modal/modal.css`

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 16px;
  width: 300px;
}
```

---

## 8️⃣ App Entry

📍 `src/App.jsx`

```jsx
import { FileExplorerProvider } from "./context/FileExplorerContext";
import ExplorerTree from "./components/Explorer/ExplorerTree";

export default function App() {
  return (
    <FileExplorerProvider>
      <h2>File Explorer</h2>
      <ExplorerTree />
    </FileExplorerProvider>
  );
}
```

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

# ✅ Functional Requirements Checklist

| Requirement          | Covered |
| -------------------- | ------- |
| Create root folder   | ✅       |
| Nested folders/files | ✅       |
| Recursive rendering  | ✅       |
| Modal for creation   | ✅       |
| Centralized state    | ✅       |
| Unlimited depth      | ✅       |

---

# 🎤 How to Explain in Interview (30–45 sec)

> “I store files and folders in a normalized object keyed by id with parent references.
> The tree is rendered recursively by resolving children at each level.
> Creation is handled through a modal, and mutations are centralized via context so any node can add children.”

That answer alone signals **strong SDE-2 readiness**.

---

# 🚀 Optional Follow-Ups Interviewers May Ask

* Rename / delete items
* Persist to backend
* Drag-and-drop
* Virtualized rendering
* Permissions

If you want next:

* 🔥 TypeScript version
* 🧠 useReducer + immutable updates
* 🎯 Live 45-minute interview coding plan
* 📂 Google Drive–style explorer

Just say the word 👍
