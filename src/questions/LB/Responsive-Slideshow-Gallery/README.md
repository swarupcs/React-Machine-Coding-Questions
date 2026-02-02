Below is the **FULL, COMPLETE, COPY-PASTE-READY code** for a **Responsive Slideshow Gallery in React** (big preview + thumbnail strip + next/prev navigation), exactly matching the tutorial you described.

This version is **clean**, **responsive**, and **interview-ready**.

---

# 📁 Project Structure

```
src/
│── index.js
│── App.jsx
│── Slider.jsx
│── Slide.jsx
│── styles.css
```

---

## 1️⃣ `index.js`

**App entry point**

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

## 2️⃣ `App.jsx`

**Pass images array to the Slider**

```jsx
import Slider from "./Slider";

export default function App() {
  const images = [
    {
      image_url:
        "https://img.freepik.com/free-photo/young-female-jacket-shorts-presenting-comparing-something-looking-confident-front-view_176474-37521.jpg",
      caption: "Image 1",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-grey-shirt-showing-something-her-hand_144627-51099.jpg",
      caption: "Image 2",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg",
      caption: "Image 3",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg",
      caption: "Image 4",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/young-lady-shirt-jacket-making-scales-gesture-looking-cheerful-front-view_176474-85195.jpg",
      caption: "Image 5",
    },
    {
      image_url:
        "https://img.freepik.com/free-photo/girl-wide-opening-hands-giving-explanation-high-quality-photo_144627-60466.jpg",
      caption: "Image 6",
    },
  ];

  return (
    <div className="App">
      <h2>Responsive Slideshow Gallery</h2>
      <Slider images={images} />
    </div>
  );
}
```

---

## 3️⃣ `Slide.jsx`

**Single slide (large canvas)**

```jsx
const Slide = ({ image_url, caption, active }) => {
  return (
    <div className={`slide ${active ? "active" : ""}`}>
      <img src={image_url} alt={caption} />
      <span>{caption}</span>
    </div>
  );
};

export default Slide;
```

---

## 4️⃣ `Slider.jsx`

**Main slideshow logic (state + navigation)**

```jsx
import { useState } from "react";
import Slide from "./Slide";

const Slider = ({ images }) => {
  const [active, setActive] = useState(0);

  const onNext = () => {
    if (active < images.length - 1) {
      setActive(active + 1);
    }
  };

  const onPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  return (
    <div className="slider">
      {/* Slides */}
      <div className="slides">
        {images.map((img, index) => (
          <Slide
            key={img.caption}
            {...img}
            active={index === active}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="navigation">
        {/* Thumbnails */}
        <div className="navigation-bottom">
          {images.map((img, index) => (
            <img
              key={img.caption}
              src={img.image_url}
              alt={img.caption}
              className={`preview ${index === active ? "active" : ""}`}
              style={{ width: `${100 / images.length}%` }}
              onClick={() => setActive(index)}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="navigation-next-prev">
          <div className="next-prev prev" onClick={onPrev}>
            &lt;
          </div>
          <div className="next-prev next" onClick={onNext}>
            &gt;
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
```

---

## 5️⃣ `styles.css`

**Responsive styling + animation**

```css
.App {
  font-family: sans-serif;
  text-align: center;
}

/* Slider */
.slider {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

/* Slide */
.slide {
  position: relative;
  display: none;
}

.slide img {
  width: 100%;
  border-radius: 6px;
}

/* Caption */
.slide span {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  padding: 6px 12px;
  border-radius: 4px;
}

/* Fade animation */
@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

.slide.active {
  display: block;
  animation: fade 1.5s;
}

/* Thumbnails */
.navigation-bottom {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.preview {
  margin: 0 2px;
  cursor: pointer;
  border: 3px solid gray;
  transition: all 0.2s ease;
}

.preview.active {
  border-color: skyblue;
}

/* Prev / Next */
.navigation-next-prev .next-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.5em;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 10px;
  border-radius: 50%;
  user-select: none;
}

.next {
  right: 10px;
}

.prev {
  left: 10px;
}
```

---

## ✅ How This Works (Quick Interview Explanation)

* `active` state tracks the currently visible image
* Only the active slide is displayed
* Clicking thumbnails directly sets the active index
* Next/Prev buttons increment or decrement the index
* CSS handles animations and responsiveness

---

## 🚀 Optional Enhancements (Interview Follow-ups)

* Infinite looping
* Auto-play
* Keyboard navigation
* Swipe gestures (mobile)
* Lazy loading thumbnails
* Accessibility (ARIA roles)

If you want **any enhancement implemented**, just tell me 👍
