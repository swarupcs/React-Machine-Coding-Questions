Nice question — this is a **very common Atlassian-style machine coding round problem** 👍
Below is a **complete, clean, production-ready feature flag implementation in React**, end-to-end.

I’ll include:

1. Feature flag context + provider
2. API simulation (can be replaced with real API)
3. LocalStorage caching
4. `useFeature` hook
5. `<Feature />` wrapper component
6. Example usage (`App`, `Example`, `Chat`)

---

## 📁 Project Structure

```
src/
│── FeatureFlagContext.js
│── Feature.js
│── App.js
│── Example.js
│── Chat.js
│── index.js
```

---

## 1️⃣ FeatureFlagContext.js

This is the **single source of truth**.

```jsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const FeatureFlagContext = createContext(null);

// Fake API call (replace with real API)
const fetchFeatureFlags = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        darkMode: true,
        chatEnabled: false,
        betaDashboard: true,
      });
    }, 800);
  });

export const FeatureFlagProvider = ({ children }) => {
  const [features, setFeatures] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem("featureFlags");

    if (cached) {
      setFeatures(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetchFeatureFlags().then((flags) => {
      setFeatures(flags);
      localStorage.setItem("featureFlags", JSON.stringify(flags));
      setLoading(false);
    });
  }, []);

  return (
    <FeatureFlagContext.Provider value={{ features, loading }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

// Custom hook (recommended)
export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error("useFeatureFlags must be used inside FeatureFlagProvider");
  }

  return context;
};
```

---

## 2️⃣ Feature.js (Reusable Feature Wrapper)

This abstracts **conditional rendering logic**.

```jsx
import { useFeatureFlags } from "./FeatureFlagContext";

const Feature = ({ name, value = true, children, fallback = null }) => {
  const { features, loading } = useFeatureFlags();

  if (loading) return null;

  return features[name] === value ? children : fallback;
};

export default Feature;
```

---

## 3️⃣ Chat.js (Dummy Feature Component)

```jsx
const Chat = () => {
  return <div>💬 Chat feature enabled</div>;
};

export default Chat;
```

---

## 4️⃣ Example.js (Using Feature Flags)

```jsx
import Feature from "./Feature";
import { useFeatureFlags } from "./FeatureFlagContext";
import Chat from "./Chat";

const Example = () => {
  const { features, loading } = useFeatureFlags();

  if (loading) return <p>Loading features...</p>;

  return (
    <div>
      <h2>Feature Flags Demo</h2>

      <Feature name="darkMode">
        <p>🌙 Dark Mode Enabled</p>
      </Feature>

      <Feature name="darkMode" value={false}>
        <p>☀️ Light Mode</p>
      </Feature>

      <Feature name="chatEnabled">
        <Chat />
      </Feature>

      <Feature name="betaDashboard">
        <p>🚀 Beta Dashboard Access</p>
      </Feature>

      <pre>{JSON.stringify(features, null, 2)}</pre>
    </div>
  );
};

export default Example;
```

---

## 5️⃣ App.js

```jsx
import { FeatureFlagProvider } from "./FeatureFlagContext";
import Example from "./Example";

export default function App() {
  return (
    <FeatureFlagProvider>
      <Example />
    </FeatureFlagProvider>
  );
}
```

---

## 6️⃣ index.js

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## ✅ What Interviewers Like About This

✔ Centralized feature management
✔ Context API usage
✔ API + caching
✔ Clean abstraction (`Feature` component + hook)
✔ Scalable for large apps
✔ Easy to swap API → React Query / Zustand later

---

## ⭐ Possible Follow-ups in Interview

If they push further, be ready to explain:

* How to invalidate cache
* Role-based feature flags
* Environment-based flags
* Server-side feature flags
* A/B testing

If you want, I can also give:

* **React Query version**
* **Zustand version**
* **SSR-safe Next.js version**
* **Atlassian-style follow-up questions**

Just tell me 🚀
