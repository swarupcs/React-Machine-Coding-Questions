Perfect — this is a **very strong SDE-2 frontend system + machine-coding style question**.
What interviewers are really testing here is not “JWT theory”, but whether you can **design a clean auth architecture in React** with routing, state, and side-effects handled correctly.

Below is a **complete, production-grade solution** with:

* ✅ Proper folder structure
* ✅ Clean JWT auth flow
* ✅ Public / Protected / Restricted routes
* ✅ Axios interceptors
* ✅ Context-based auth state
* ✅ Clear explanations (what to say in interview)

You can copy-paste this into a fresh React app and it will work with mocked APIs.

---

# 📁 Folder Structure (Interview-Ready)

```
src/
│
├── components/
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   │   └── AuthenticatedRoute.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   └── About.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── services/
│   ├── authService.js
│   └── apiService.js
│
├── App.jsx
├── main.jsx
├── styles.css
└── index.css
```

### Why this structure works in interviews

* **contexts** → global auth state
* **services** → API + JWT logic
* **routes** → routing rules (auth vs public)
* **pages** → UI only, no auth logic leakage

---

# 🧠 Architecture Overview (What You Explain)

> “I centralized authentication using React Context.
> JWT is stored in localStorage and automatically attached to requests using Axios interceptors.
> Routing is handled using wrapper routes to enforce access control.”

---

# 🧩 FULL CODE

---

## 1️⃣ `AuthContext.jsx`

📍 `src/contexts/AuthContext.jsx`

```jsx
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const existingUser = authService.getCurrentUser();
    if (existingUser) setUser(existingUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.userDetails);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 2️⃣ Auth Services (JWT handling)

### `authService.js`

📍 `src/services/authService.js`

```js
const authService = {
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      throw new Error("Invalid credentials");
    }

    const response = {
      userDetails: {
        id: 1,
        email,
        username: "John Doe",
      },
      accessToken: "mock_jwt_token_" + Date.now(),
    };

    localStorage.setItem("user", JSON.stringify(response));
    return response;
  },

  logout: () => {
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.userDetails || null;
  },

  getToken: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken || null;
  },
};

export default authService;
```

---

### `apiService.js` (Axios interceptors)

📍 `src/services/apiService.js`

```js
import axios from "axios";
import authService from "./authService";

const api = axios.create({
  baseURL: "https://api.example.com",
});

api.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
```

---

## 3️⃣ Route Guards

### Protected Route

📍 `src/components/routes/ProtectedRoute.jsx`

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
```

---

### Authenticated Route (Block login if logged in)

📍 `src/components/routes/AuthenticatedRoute.jsx`

```jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthenticatedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};

export default AuthenticatedRoute;
```

---

## 4️⃣ Pages

### Login

📍 `src/components/pages/Login.jsx`

```jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={submit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
```

---

### Dashboard

📍 `src/components/pages/Dashboard.jsx`

```jsx
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
```

---

### About

📍 `src/components/pages/About.jsx`

```jsx
const About = () => <h1>About Us</h1>;
export default About;
```

---

## 5️⃣ App + Routing

📍 `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import AuthenticatedRoute from "./components/routes/AuthenticatedRoute";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import About from "./components/pages/About";
import "./styles.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            }
          />
          <Route path="/about-us" element={<About />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
```

---

## 6️⃣ Entry

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

## 7️⃣ Styles

📍 `src/styles.css`

```css
.login-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}

.login-form {
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
}

button {
  margin-top: 1rem;
}

.error-message {
  color: red;
}
```

---

# ✅ Requirements Checklist

| Feature            | Done |
| ------------------ | ---- |
| JWT login          | ✅    |
| Token persistence  | ✅    |
| Protected routes   | ✅    |
| Restricted routes  | ✅    |
| Logout             | ✅    |
| Axios interceptor  | ✅    |
| Clean architecture | ✅    |

---

# 🎤 30-Second Interview Explanation

> “I store JWT in localStorage and manage auth state via React Context.
> Axios interceptors attach the token and handle expiry globally.
> Routes are guarded using wrapper components to separate public, protected, and restricted access.”

That answer alone is **SDE-2 quality**.

---

# 🚀 Next (If You Want)

* 🔥 TypeScript version
* 🧠 Access + Refresh token flow
* 🔐 HttpOnly cookie version
* 🎯 How to code this live in **30 minutes**

Just tell me 👌
