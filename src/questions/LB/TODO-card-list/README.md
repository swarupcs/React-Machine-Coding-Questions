![Image](https://cdn.dribbble.com/userupload/13279054/file/original-ca357431322aabb9f78361dcce17b489.png?crop=0x0-3201x2401\&format=webp\&resize=400x300\&vertical=center)

![Image](https://a.storyblok.com/f/99519/2032x1426/f9d3bc430f/weekly_to-do_image_2.png)

![Image](https://miro.medium.com/1%2ASq3gIFG4MtV6mWOYd1Qs8Q.jpeg)

Below is a **complete, interview-ready Vanilla JavaScript solution** for the **Atlassian Karat Todo Card List question**, written exactly the way an interviewer expects: **clean DOM APIs, no frameworks, good performance, and extensible design**.

I’ll walk you through:

1. ✅ Folder structure
2. ✅ Full working code (HTML, CSS, JS)
3. ✅ Explanation of each part (what & why)
4. ✅ Pagination-ready enhancement (follow-up)

---

## 📁 Folder Structure

```
todo-card-list/
│
├── index.html
├── styles.css
└── script.js
```

Why this structure?

* **index.html** → only entry markup
* **styles.css** → presentation only
* **script.js** → logic & DOM manipulation
* Clean separation = strong frontend fundamentals

---

## 1️⃣ HTML (Entry Point Only)

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Todo Card List</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>

  <!-- Root element provided in interview -->
  <div id="root"></div>

  <!-- Optional pagination controls -->
  <div class="controls">
    <button id="prev">Prev</button>
    <button id="next">Next</button>
  </div>

  <script src="script.js"></script>
</body>
</html>
```

🧠 **Interview note**
At Atlassian, they often give you **only a root div** and expect everything else to be created dynamically.

---

## 2️⃣ CSS (Card Layout & Styling)

### `styles.css`

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  background: #000;
}

/* Root container */
#root {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 10px;
}

/* Todo card */
.todo-card {
  background: #fff;
  border-radius: 6px;
  padding: 10px;
  width: 220px;
}

.todo-card span {
  font-weight: bold;
  display: block;
  margin-bottom: 6px;
}

.todo-card p {
  margin: 0;
  font-size: 14px;
}

/* Pagination controls */
.controls {
  padding: 10px;
  background: #000;
}

.controls button {
  margin-right: 8px;
}
```

🧠 **Why this matters**

* Cards wrap automatically
* Fixed card width mimics Atlassian UI blocks
* Minimal but readable styling

---

## 3️⃣ JavaScript – Core Logic

### `script.js`

---

### ✅ Create a single Todo Card

```js
const createTodoCard = (todoObj) => {
  const { userId, todo } = todoObj;

  const card = document.createElement("div");
  card.className = "todo-card";

  const title = document.createElement("span");
  title.innerText = `User #${userId}`;

  const desc = document.createElement("p");
  desc.innerText = todo;

  card.appendChild(title);
  card.appendChild(desc);

  return card;
};
```

🧠 **Explain this in interview**

* No templates
* No innerHTML injection
* Pure DOM creation → safer & predictable

---

### ✅ Fetch Todos and Render

```js
const fetchAndRenderTodos = async (page = 0, limit = 10) => {
  const root = document.getElementById("root");

  // Clear existing content (important for pagination)
  root.innerHTML = "";

  const skip = page * limit;

  try {
    const res = await fetch(
      `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
    );
    const data = await res.json();

    // Use fragment to minimize reflows
    const fragment = document.createDocumentFragment();

    data.todos.forEach((todo) => {
      fragment.appendChild(createTodoCard(todo));
    });

    root.appendChild(fragment);
  } catch (err) {
    console.error("Failed to fetch todos", err);
  }
};
```

🧠 **Why DocumentFragment?**

* Avoids multiple DOM reflows
* Faster rendering
* Interviewers LOVE this optimization

---

### ✅ Initial Load

```js
let currentPage = 0;
const LIMIT = 10;

fetchAndRenderTodos(currentPage, LIMIT);
```

---

## 4️⃣ Pagination (Follow-up Ready)

### Buttons logic

```js
document.getElementById("next").addEventListener("click", () => {
  currentPage++;
  fetchAndRenderTodos(currentPage, LIMIT);
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    fetchAndRenderTodos(currentPage, LIMIT);
  }
});
```

🧠 **What interviewer checks here**

* Page → skip calculation
* Clearing previous content
* State tracking without frameworks

---

## 🔍 Final Behavior

* Fetches todos from API
* Creates **individual cards**
* Displays **User ID as card title**
* Supports pagination
* Zero framework usage
* Performance optimized

---

## 💬 How to Explain This in Atlassian Interview

> “I avoided frameworks and templates and used pure DOM APIs.
> I used `DocumentFragment` to batch DOM updates and structured the code so pagination and grouping can be added easily.”

If asked next:

* Group todos by userId → use `Map`
* Lazy load → IntersectionObserver
* Accessibility → semantic tags

---

## 🚀 Bonus: Group by User (if asked)

```js
const groupByUser = (todos) => {
  const map = new Map();

  todos.forEach(todo => {
    if (!map.has(todo.userId)) {
      map.set(todo.userId, []);
    }
    map.get(todo.userId).push(todo);
  });

  return map;
};
```

---

If you want, next I can:

* Convert this to **React (interview-grade)**
* Add **grouped user blocks**
* Add **infinite scroll**
* Add **loading & error states**
* Optimize further for **Karat constraints**

Just tell me 👌
