Below is the **FULL, CLEAN, COPY-PASTE-READY implementation** of a **Search + Pagination component in React**, built on top of the **Punk Beer API**, followed by **detailed notes explaining every decision** (interview-oriented).

This is written exactly at the level expected in **frontend interviews (Atlassian, Tekion, etc.)**.

---

# 📁 Project Structure

```
src/
│── index.js
│── App.jsx
│── Beer.jsx
│── styles.css
```

---

# 1️⃣ index.js

### App entry point

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

# 2️⃣ App.jsx

### Parent component – owns state & API logic

```jsx
import { useEffect, useState } from "react";
import Beer from "./Beer";

const API_URL = "https://api.punkapi.com/v2/beers";
const PER_PAGE = 25;

export default function App() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [beerName, setBeerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const makeApiCall = async () => {
    setLoading(true);
    setError("");

    try {
      const query = new URLSearchParams({
        page,
        per_page: PER_PAGE,
        ...(beerName && { beer_name: beerName }),
      });

      const response = await fetch(`${API_URL}?${query}`);
      const data = await response.json();

      if (!Array.isArray(data)) {
        setList([]);
      } else {
        setList(data);
      }
    } catch (err) {
      setError("Something went wrong");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever page or search term changes
  useEffect(() => {
    makeApiCall();
  }, [page, beerName]);

  return (
    <div className="App">
      <h1>Beer Search 🍺</h1>

      {/* Controls */}
      <div className="controls">
        <div>
          <label>Page: </label>
          <select
            value={page}
            onChange={(e) => setPage(Number(e.target.value))}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <input
          type="text"
          placeholder="Search beer name"
          value={beerName}
          onChange={(e) => {
            setPage(1); // reset page on new search
            setBeerName(e.target.value);
          }}
        />
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && list.length === 0 && <p>No results found</p>}

      {/* Results */}
      <div className="list">
        {list.map((beer) => (
          <Beer key={beer.id} {...beer} />
        ))}
      </div>
    </div>
  );
}
```

---

## 📝 Detailed Notes (Important for Interviews)

### Why these states?

```js
list        → API response data
page        → current pagination page
beerName   → search query
loading    → UX feedback
error      → API failure handling
```

---

### Why `useEffect([page, beerName])`?

> Because **API should refetch whenever page or search changes**
> This mirrors real-world pagination behavior.

---

### Why reset page on new search?

```js
setPage(1);
```

> Prevents requesting page 5 for a fresh query that only has 1 page.

---

### Why `URLSearchParams`?

Cleaner, safer query construction than string concatenation.

---

# 3️⃣ Beer.jsx

### Presentational component

```jsx
const Beer = ({ name, tagline, image_url }) => {
  return (
    <div className="beer">
      <img
        src={image_url}
        alt={name}
        loading="lazy"
      />
      <div>
        <h3>{name}</h3>
        <p>{tagline}</p>
      </div>
    </div>
  );
};

export default Beer;
```

---

## 📝 Notes

✔ Stateless component
✔ Only responsible for UI
✔ `loading="lazy"` improves performance
✔ Reusable & testable

---

# 4️⃣ styles.css

### Minimal styling

```css
.App {
  max-width: 800px;
  margin: auto;
  font-family: sans-serif;
}

.controls {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.controls input {
  padding: 6px;
  flex: 1;
}

.controls select {
  padding: 6px;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.beer {
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 6px;
}

.beer img {
  width: 100%;
  height: 160px;
  object-fit: contain;
}

.error {
  color: red;
}
```

---

# 🎯 Interview-Ready Explanation (Memorize This)

> “The parent component owns pagination and search state. API calls are triggered via `useEffect` when dependencies change. Presentation is delegated to a stateless child component. UX states like loading and empty results are handled explicitly.”

---

# 🚀 Common Follow-ups You’ll Be Asked

| Question                      | Answer                        |
| ----------------------------- | ----------------------------- |
| How to debounce search?       | `useDebounce` or `setTimeout` |
| How to cache results?         | React Query / memo map        |
| How to avoid duplicate calls? | AbortController               |
| Infinite scroll instead?      | IntersectionObserver          |
| SSR handling?                 | Fetch on server               |

---

If you want next:

* **Debounced search**
* **React Query version**
* **Infinite scroll**
* **Server-side pagination**
* **Test cases**

Just tell me 👍
