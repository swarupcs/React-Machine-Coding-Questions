Below is a **complete, interview-ready Pagination implementation in React with Ellipsis Logic**, written exactly the way **machine-coding / MTS / SDE frontend interviews** expect.

You’ll get:

* ✅ **Clean folder structure**
* ✅ **Controlled (stateless) Pagination component**
* ✅ **Pagination with ellipsis (hiding unnecessary pages)**
* ✅ **CSS Modules**
* ✅ **Clear math + interview notes**
* ✅ **Usage example**

This is **production-quality but interview-friendly**.

---

# 📁 Folder Structure

```
src/
│
├── components/
│   └── Pagination/
│       ├── Pagination.jsx
│       ├── Pagination.module.css
│       ├── getPages.js
│       └── index.js
│
├── pages/
│   └── PaginationDemo.jsx
```

---

# 🧠 High-Level Interview Explanation

> “Pagination is a **presentational component**.
> It does not store data, it only tells the parent *which page was requested*.
> The parent decides what data to show.”

**Key things interviewers look for**

* Stateless component
* Clear math
* Reusability
* Edge cases
* Ellipsis logic (hiding unnecessary pages)

---

# 🧮 Ellipsis Page Logic (Most Important Part)

## `src/components/Pagination/getPages.js`

```js
/**
 * Returns pages to render with ellipsis
 */
const getPages = (currentPage, totalPages) => {
  if (totalPages === 1) return [1];

  const pages = [];
  const firstPage = 1;
  const lastPage = totalPages;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  pages.push(firstPage);

  if (Math.abs(firstPage - prevPage) > 1) {
    pages.push("...");
  }

  if (prevPage > firstPage) {
    pages.push(prevPage);
  }

  if (currentPage !== firstPage && currentPage !== lastPage) {
    pages.push(currentPage);
  }

  if (nextPage < lastPage) {
    pages.push(nextPage);
  }

  if (Math.abs(nextPage - lastPage) > 1) {
    pages.push("...");
  }

  pages.push(lastPage);

  return pages;
};

export default getPages;
```

### 📝 Interview Note

* **O(1)** logic
* Avoids rendering 100s of page buttons
* Clean mental model

---

# 🔢 Pagination Component

## `src/components/Pagination/Pagination.jsx`

```jsx
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Pagination.module.css";
import getPages from "./getPages";

const Pagination = ({ totalItems, perPage, current, onChange }) => {
  const totalPages = Math.ceil(totalItems / perPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === current) return;

    const start = (page - 1) * perPage;
    const end = page * perPage;

    onChange?.({ start, end, current: page });
  };

  const prev = () => goToPage(current - 1);
  const next = () => goToPage(current + 1);

  const pages = getPages(current, totalPages);

  return (
    <ul className={styles.wrapper}>
      <li onClick={prev} className={styles.nav}>
        &lt;
      </li>

      {pages.map((page, idx) => (
        <li
          key={page + idx}
          className={cx(styles.page, {
            [styles.active]: page === current,
            [styles.disabled]: page === "..."
          })}
          onClick={() => typeof page === "number" && goToPage(page)}
        >
          {page}
        </li>
      ))}

      <li onClick={next} className={styles.nav}>
        &gt;
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func
};

Pagination.defaultProps = {
  current: 1
};

export default Pagination;
```

---

# 🎨 Pagination Styles

## `src/components/Pagination/Pagination.module.css`

```css
.wrapper {
  display: inline-flex;
  border: 1px solid #607d8b;
  padding: 0;
  list-style: none;
  user-select: none;
}

.page,
.nav {
  padding: 8px 14px;
  cursor: pointer;
  border-right: 1px solid #607d8b;
}

.page:last-child,
.nav:last-child {
  border-right: none;
}

.active {
  background-color: #e9e9eb;
  font-weight: bold;
}

.disabled {
  cursor: default;
  color: #999;
}

.nav:hover,
.page:not(.disabled):hover {
  background-color: #f5f5f5;
}
```

---

# 🧪 Usage Example (Controlled by Parent)

## `src/pages/PaginationDemo.jsx`

```jsx
import React, { useState } from "react";
import Pagination from "../components/Pagination";

const PaginationDemo = () => {
  const [current, setCurrent] = useState(1);

  const onChange = ({ current }) => {
    setCurrent(current);
  };

  return (
    <div>
      <h3>Current Page: {current}</h3>

      <Pagination
        totalItems={43}
        perPage={7}
        current={current}
        onChange={onChange}
      />
    </div>
  );
};

export default PaginationDemo;
```

---

# 🧠 Interview Talking Points (VERY IMPORTANT)

### Why stateless?

* Pagination should **not own data**
* Makes component reusable
* Parent stays source of truth

### Why return `start` & `end`?

* Makes slicing data trivial
* Parent doesn’t recompute offsets

### Why ellipsis?

* Avoids rendering hundreds of buttons
* Improves UX & performance

---

# ✅ Final Verdict

This solution is:

* ✔ **Interview-grade**
* ✔ **Senior-level**
* ✔ **Scalable**
* ✔ **Easy to explain**
* ✔ **Used in real products**
