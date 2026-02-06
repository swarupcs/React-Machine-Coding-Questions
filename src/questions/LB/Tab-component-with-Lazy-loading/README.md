Got it 😄
You want the **full Atlassian Principal Engineer Tabs component** with:

✅ Proper folder structure
✅ Full reusable Tabs + TabPanel abstraction
✅ Lazy loading content only when tab is visible
✅ Clean scalable API (like real design systems)
✅ CSS included
✅ Detailed notes (interview-level)

So below is the **complete production-ready implementation**.

---

# ✅ Tabs Component with Lazy Loaded Panels (Atlassian P60 / Okta)

---

# 📂 Folder Structure

```
react-tabs-lazy-loading/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   └── Tabs/
│   │       ├── Tabs.jsx
│   │       ├── Tab.jsx
│   │       ├── TabPanel.jsx
│   │       ├── useTabStore.js
│   │       └── tabs.css
│   │
│   ├── pages/
│   │   └── PublishHandler.jsx
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

# ✅ Step 1: Entry HTML

## `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Tabs with Lazy Loading</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

---

---

# ✅ Step 2: React Entry Point

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

# ✅ Step 3: Tab Store Hook (State Management)

### Interview Note

Instead of hardcoding tabs, we maintain a **store** so the component is scalable.

---

## `src/components/Tabs/useTabStore.js`

```js
import { useState } from "react";

/*
  Custom store hook for Tabs.
  Keeps activeTab in one place.
*/

export function useTabStore(defaultTabId = null) {
  const [activeTab, setActiveTab] = useState(defaultTabId);

  return {
    activeTab,
    setActiveTab,
  };
}
```

---

---

# ✅ Step 4: Tab Component

## `src/components/Tabs/Tab.jsx`

```jsx
import { useEffect } from "react";

/*
  Tab button component.
  Clicking updates activeTab inside store.
*/

export default function Tab({ id, label, store, defaultActive }) {
  const { activeTab, setActiveTab } = store;

  // Set default active tab on mount
  useEffect(() => {
    if (defaultActive) {
      setActiveTab(id);
    }
  }, []);

  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      className={activeTab === id ? "active" : ""}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );
}
```

---

---

# ✅ Step 5: TabPanel Component

### Interview Note

TabPanel supports:

* Lazy mounting (`unMountOnHide`)
* Hidden mode (`hidden` attribute)

---

## `src/components/Tabs/TabPanel.jsx`

```jsx
/*
  TabPanel shows children only when active.
*/

export default function TabPanel({
  tabId,
  store,
  unMountOnHide = false,
  children,
}) {
  const { activeTab } = store;

  // If unMountOnHide is true → completely remove from DOM
  if (unMountOnHide && activeTab !== tabId) {
    return null;
  }

  // Otherwise, just hide visually
  const hidden = activeTab !== tabId;

  return (
    <div
      role="tabpanel"
      hidden={hidden}
      className={`tab-panel-content ${hidden ? "hide" : ""}`}
    >
      {children}
    </div>
  );
}
```

---

---

# ✅ Step 6: Tabs Wrapper Component

## `src/components/Tabs/Tabs.jsx`

```jsx
import "./tabs.css";

/*
  Tabs wrapper component
*/

export default function Tabs({ children }) {
  return <div className="tabs-wrapper">{children}</div>;
}
```

---

---

# ✅ Step 7: Lazy Loaded Component

### This simulates a heavy component like "Publish Settings"

---

## `src/pages/PublishHandler.jsx`

```jsx
import { useEffect } from "react";

export default function PublishHandler() {
  useEffect(() => {
    console.log("PublishHandler Mounted");

    return () => {
      console.log("PublishHandler Unmounted");
    };
  }, []);

  return (
    <div>
      <h2>🚀 Publish Handler Loaded!</h2>
      <p>This tab content was lazy-loaded only when visible.</p>
    </div>
  );
}
```

---

---

# ✅ Step 8: App.jsx (Full Working Demo)

---

## `src/App.jsx`

```jsx
import { lazy, Suspense } from "react";

import Tabs from "./components/Tabs/Tabs";
import Tab from "./components/Tabs/Tab";
import TabPanel from "./components/Tabs/TabPanel";
import { useTabStore } from "./components/Tabs/useTabStore";

/*
  Lazy load PublishHandler only when tab opens
*/
const PublishHandler = lazy(() =>
  new Promise((resolve) =>
    setTimeout(() => resolve(import("./pages/PublishHandler")), 2000)
  )
);

export default function App() {
  const store = useTabStore("share");

  return (
    <div className="app">
      <h1>Atlassian Tabs with Lazy Loading</h1>

      <Tabs>
        {/* Tab Buttons */}
        <div className="tab-header">
          <Tab id="share" label="Share" store={store} defaultActive />
          <Tab id="publish" label="Publish" store={store} />
        </div>

        {/* Tab Panels */}
        <div className="tab-body">
          <TabPanel tabId="share" store={store}>
            <h2>Share Panel</h2>
            <p>This content loads instantly.</p>
          </TabPanel>

          <TabPanel tabId="publish" store={store} unMountOnHide>
            <Suspense fallback={<p>⏳ Loading Publish Module...</p>}>
              <PublishHandler />
            </Suspense>
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}
```

---

---

# ✅ Step 9: CSS Styling

---

## `src/components/Tabs/tabs.css`

```css
.tabs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 400px;
  margin: auto;
}

.tab-header {
  display: flex;
  gap: 10px;
}

.tab-header button {
  padding: 10px 15px;
  cursor: pointer;
  border: none;
  background: #eee;
  border-radius: 6px;
  transition: 0.2s;
}

.tab-header button.active {
  background: greenyellow;
  font-weight: bold;
}

.tab-body {
  border: 1px solid #ccc;
  padding: 15px;
  min-height: 120px;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.tab-panel-content.hide {
  display: none;
}
```

---

---

# ✅ Global Styling

## `src/index.css`

```css
body {
  font-family: sans-serif;
  background: #f9f9f9;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.app {
  margin-top: 40px;
}
```

---

---

# ✅ Interview Notes (What Principal Engineers Expect)

---

## Why Lazy Loading Tabs?

* Prevent heavy components from loading upfront
* Improves performance
* Useful for dashboards/settings pages

---

## Why `unMountOnHide`?

Two behaviors:

| Mode    | Behavior                                   |
| ------- | ------------------------------------------ |
| Hidden  | Keeps component mounted, just hides UI     |
| Unmount | Removes from DOM completely (memory freed) |

---

## Why Store-Based Approach Better Than Context?

* Context is overkill unless children need tab state deeply
* Store makes Tabs reusable and scalable
* Easier to extend for dynamic tab arrays

---

# ✅ Output Behavior

✔ Default tab = Share
✔ Clicking Publish triggers lazy loading
✔ Publish mounts only when opened
✔ Unmounts when switched away
✔ Clean scalable system-design-level solution

---

# 🚀 Next Enhancements (If You Want)

I can extend this into:

✅ Dynamic Tabs from JSON
✅ Keyboard navigation (Arrow keys)
✅ Animated underline indicator
✅ Fully accessible WAI-ARIA Tabs
✅ Nested Tabs support

Just tell me 😄
