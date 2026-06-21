Below is a **complete, interview-ready Pagination implementation in React**, written exactly the way **machine-coding / MTS / SDE frontend interviews** expect for a basic pagination without ellipsis logic.

You’ll get:

* ✅ **Clean folder structure**
* ✅ **Controlled (stateless) Pagination component**
* ✅ **Basic pagination** (rendering all pages)
* ✅ **CSS Modules**
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
* Clean logic for page generation
* Reusability
* Edge cases (handling previous/next limits)

---

# 🔢 Pagination Component

## `src/components/Pagination/Pagination.jsx`

```jsx
import React from 'react';
import PropTypes from 'prop-types';
import styles from './Pagination.module.css';
import cx from 'classnames';

const Pagination = ({ perPage, current, onChange, totalItems }) => {
  //Get total no of pages needed
  const getTotalPages = () => {
    return Math.ceil(totalItems / perPage);
  };

  const next = () => {
    const total = getTotalPages();

    if (current < total) {
      const start = current * perPage;
      const end = (current + 1) * perPage;
      onChange && onChange({ start, end, current: current + 1 });
    }
  };

  const prev = () => {
    const total = getTotalPages();

    if (current > 1 && current <= total) {
      const start = (current - 2) * perPage;
      const end = (current - 1) * perPage;
      onChange && onChange({ start, end, current: current - 1 });
    }
  };

  const direct = (i) => {
    if (current !== i) {
      const start = (i - 1) * perPage;
      const end = i * perPage;
      onChange && onChange({ start, end, current: i });
    }
  };

  const total = getTotalPages();

  let links = [];
  for (let i = 1; i <= total; i++) {
    links.push(
      <li
        onClick={() => direct(i)}
        key={i}
        className={cx({ [styles.active]: current === i })}
      >
        {i}
      </li>,
    );
  }

  return (
    <ul className={styles.wrapper}>
      <li onClick={prev}>&lt;</li>
      {links}
      <li onClick={next}>&gt;</li>
    </ul>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

Pagination.defaultProps = {
  totalItems: 36,
  perPage: 5,
  current: 1,
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

.wrapper li {
  padding: 8px 14px;
  cursor: pointer;
  border-right: 1px solid #607d8b;
}

.wrapper li:last-child {
  border-right: none;
}

.active {
  background-color: #e9e9eb;
  font-weight: bold;
}

.wrapper li:hover {
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

---

# ✅ Final Verdict

This solution is:

* ✔ **Interview-grade**
* ✔ **Easy to explain**
* ✔ **Great starting point for basic pagination requirements**

If the interviewer asks for large datasets, be prepared to modify this to include ellipsis logic!
