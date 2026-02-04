![Image](https://images.openai.com/static-rsc-3/wEVpJnbMDt5A-3gAINmrxEu74eY__f0prZD54x11D6n4hs2DBLX8L1NsciNZOER_-dkrKpxUGb16i554dezpLgRjSjhWeRR16Ls4Qj1YNp0?purpose=fullsize\&v=1)

![Image](https://blog.openreplay.com/images/creating-dynamic-loading-spinners-with-just-css/images/image14.gif)

![Image](https://raw.githubusercontent.com/lukehaas/css-loaders/step2/images/css-loaders-screenshot.jpg)

Below is a **clean, interview-ready implementation** of a **CSS-based spinner/loader**, exactly the kind Microsoft expects you to reason about in a frontend SDE-2 interview.

I’ll show:

* ✅ Proper **folder structure**
* ✅ **Pure HTML + CSS** solution (no libraries)
* ✅ Optional **React component** version
* ✅ **Why this approach is preferred in interviews**

---

## 📁 Folder Structure (Vanilla JS / HTML)

```
spinner-loader/
│
├── index.html
├── styles/
│   └── spinner.css
└── README.md
```

> 💡 Microsoft interviewers usually prefer **minimal dependencies** and **clear separation of concerns**

---

## 1️⃣ HTML Markup

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>CSS Spinner Loader</title>
    <link rel="stylesheet" href="./styles/spinner.css" />
  </head>

  <body>
    <main class="container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </main>
  </body>
</html>
```

### 🔍 Why this markup?

* Spinner is **purely presentational**
* No JS needed → **less CPU, better performance**
* Easy to plug into any framework later

---

## 2️⃣ CSS Spinner Logic

### `styles/spinner.css`

```css
/* Global reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Center spinner */
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: Arial, sans-serif;
}

/* Spinner */
.spinner {
  width: 50px;
  height: 50px;

  /* Base border */
  border: 8px solid #f3f3f3;

  /* Highlighted edge */
  border-top: 8px solid #2563eb;

  /* Make it circular */
  border-radius: 50%;

  /* Rotation animation */
  animation: spin 1s linear infinite;
}

/* Animation */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

---

## 🧠 How This Works (Interview Explanation)

1. **Square div**
2. Apply a **thick border**
3. Change **one border side color**
4. Apply `border-radius: 50%`
5. Rotate using `transform: rotate()`

> 💬 **Interview-ready explanation**:
>
> “Instead of images or SVGs, I use CSS borders and transforms to create a lightweight spinner.
> This avoids network requests and performs smoothly using GPU acceleration.”

---

## 3️⃣ Optional Enhancements (Good Follow-ups)

### 🎨 Multiple colored sides

```css
border-top: 8px solid red;
border-right: 8px solid blue;
border-bottom: 8px solid green;
```

### 🐢 Slower animation

```css
animation: spin 2s linear infinite;
```

### ⏸ Pause animation

```css
.spinner.paused {
  animation-play-state: paused;
}
```

---

## 4️⃣ React Version (Bonus – Often Asked)

### 📁 React Folder Structure

```
react-spinner/
│
├── src/
│   ├── components/
│   │   └── Spinner.jsx
│   ├── styles/
│   │   └── spinner.css
│   ├── App.jsx
│   └── main.jsx
```

---

### `Spinner.jsx`

```jsx
import "../styles/spinner.css";

const Spinner = ({ size = 50, color = "#2563eb" }) => {
  return (
    <div
      className="spinner"
      style={{
        width: size,
        height: size,
        borderTopColor: color,
      }}
    />
  );
};

export default Spinner;
```

---

### `App.jsx`

```jsx
import Spinner from "./components/Spinner";

export default function App() {
  return (
    <div className="container">
      <Spinner />
      <Spinner size={30} color="red" />
    </div>
  );
}
```

---

## 🏆 Why This Scores Well in Microsoft Interviews

✔ No JS timers
✔ GPU-accelerated animation
✔ Zero dependencies
✔ Accessible (easy to add ARIA)
✔ Easy to theme & reuse

---

## 🔥 Likely Follow-up Questions

| Question               | Answer                             |
| ---------------------- | ---------------------------------- |
| Why CSS over JS?       | Better performance, no blocking    |
| How to stop spinner?   | Toggle class or conditional render |
| Accessibility?         | `role="status"` + `aria-live`      |
| Replace with SVG?      | For complex shapes only            |
| Server-side rendering? | CSS works immediately              |

---

If you want, I can also:

* Add **ARIA accessibility**
* Convert to **Tailwind**
* Create **skeleton loaders**
* Build **spinner variants** (dots, pulse, bars)
* Explain **paint vs composite animations**

Just say the word 👌
