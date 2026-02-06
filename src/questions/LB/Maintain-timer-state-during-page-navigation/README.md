Got it 😄
This is a **very real Senior Staff UI Engineer machine-coding question** because it tests:

✅ Routing + Layouts
✅ Component mount/unmount behavior
✅ Timer cleanup
✅ State persistence across navigation
✅ Correct resume logic
✅ Avoiding memory leaks
✅ Interview-level architectural thinking

So let’s build the **complete professional React app** with:

* Sidebar Navigation (Sidenav)
* 3 Pages (Home, About, Settings)
* Timer runs only on Home
* Timer pauses when leaving Home
* Timer resumes when coming back
* Timer persists even after reload (localStorage)

---

# ✅ React Sidenav + Timer Resume App

---

# 📂 Folder Structure (Production-Ready)

```
react-sidenav-timer/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── layout/
│   │   └── DashboardLayout.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   └── Settings.jsx
│   │
│   ├── styles/
│   │   └── dashboard.css
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

# ✅ Step 1: Install React Router

```bash
npm install react-router-dom
```

---

---

# ✅ Step 2: Entry Point

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

# ✅ Step 3: App Router Setup

### Interview Note

We create a **layout route** so that sidebar stays fixed while pages change.

---

## `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout Wrapper */}
        <Route element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

---

# ✅ Step 4: Dashboard Layout (Sidebar + Outlet)

### Interview Note

* `NavLink` automatically adds active styling
* `Outlet` renders the current page

---

## `src/layout/DashboardLayout.jsx`

```jsx
import { NavLink, Outlet } from "react-router-dom";
import "../styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">MyApp</h2>

        <NavLink to="/" end className="nav-item">
          Home
        </NavLink>

        <NavLink to="/about" className="nav-item">
          About
        </NavLink>

        <NavLink to="/settings" className="nav-item">
          Settings
        </NavLink>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
```

---

---

# ✅ Step 5: Home Page with Timer Pause/Resume

### Interview Notes (Important)

This is the core:

* Timer starts when Home mounts
* Timer stops when Home unmounts
* Timer resumes from last saved value
* localStorage ensures reload persistence
* `useLayoutEffect` prevents UI flicker

---

## `src/pages/Home.jsx`

```jsx
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
  const timerRef = useRef(null);

  const [time, setTime] = useState(0);
  const [ready, setReady] = useState(false);

  /*
    Step 1: Load saved timer immediately
    useLayoutEffect runs BEFORE browser paint
  */
  useLayoutEffect(() => {
    const saved = localStorage.getItem("timer");

    setTime(saved ? parseInt(saved) : 0);
    setReady(true);
  }, []);

  /*
    Step 2: Start ticking only when Home is active
    Cleanup stops timer when user navigates away
  */
  useEffect(() => {
    if (!ready) return;

    // Persist latest time
    localStorage.setItem("timer", time);

    timerRef.current = setTimeout(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // Cleanup: stops timer on unmount
    return () => clearTimeout(timerRef.current);
  }, [time, ready]);

  return (
    <div>
      <h1>🏠 Home Page</h1>
      <p>
        Timer runs only when Home is active.
      </p>

      <h2>⏱ Time: {time} seconds</h2>
    </div>
  );
}
```

---

---

# ✅ Step 6: About Page

## `src/pages/About.jsx`

```jsx
export default function About() {
  return (
    <div>
      <h1>ℹ️ About Page</h1>
      <p>
        Timer should stop when you are here.
      </p>
    </div>
  );
}
```

---

---

# ✅ Step 7: Settings Page

## `src/pages/Settings.jsx`

```jsx
export default function Settings() {
  return (
    <div>
      <h1>⚙️ Settings Page</h1>
      <p>
        Timer is paused while this page is active.
      </p>
    </div>
  );
}
```

---

---

# ✅ Step 8: Sidebar + Layout CSS

## `src/styles/dashboard.css`

```css
.dashboard {
  display: flex;
  height: 100vh;
  font-family: sans-serif;
}

/* Sidebar */
.sidebar {
  width: 220px;
  background: #111;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.logo {
  font-size: 22px;
  margin-bottom: 20px;
}

/* Navigation Links */
.nav-item {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  transition: 0.2s;
}

.nav-item:hover {
  background: #333;
}

/* Active NavLink */
.nav-item.active {
  background: #00c853;
  font-weight: bold;
}

/* Main Content */
.content {
  flex: 1;
  padding: 30px;
  background: #f4f4f4;
}
```

---

---

# ✅ Step 9: Global CSS

## `src/index.css`

```css
body {
  margin: 0;
  padding: 0;
}
```

---

---

# ✅ Final Behavior (Matches Interview Requirement)

| Feature                       | Works? |
| ----------------------------- | ------ |
| Sidebar navigation            | ✅ Yes  |
| Timer runs on Home            | ✅ Yes  |
| Timer stops when leaving Home | ✅ Yes  |
| Timer resumes when returning  | ✅ Yes  |
| Timer persists after reload   | ✅ Yes  |
| Cleanup avoids memory leaks   | ✅ Yes  |

---

---

# ⭐ Senior Staff Discussion Points (What Interviewers Expect)

If asked further, mention:

### Why cleanup matters?

Without cleanup:

* Timer keeps running in background
* Memory leaks happen
* Unexpected state updates after unmount

### Why localStorage?

* In-memory state resets on reload
* localStorage provides persistence
* For production → backend persistence

### Why useLayoutEffect?

* Prevents flicker where UI shows `0` briefly
* Synchronizes state before paint

---

---

# 🚀 Extra Enhancements (Staff+ Level)

If you want, I can add:

✅ Pause/Resume button
✅ Timer reset
✅ Context-based global timer
✅ Redux persistence
✅ Server sync
✅ Multiple timers per route

Just tell me what level you want next 😄
