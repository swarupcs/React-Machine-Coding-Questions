Below is the **FULL, COMPLETE, COPY-PASTE-READY implementation** of a **Lightbox / Modal Image Gallery in React**, exactly matching the tutorial you described.

This includes:

* Modal component
* Slider (slideshow) inside modal
* Image gallery grid
* Next / Previous navigation
* Active image syncing between gallery & modal
* Responsive styling

---

# 📁 Project Structure

```
src/
│── index.js
│── App.jsx
│── Modal.jsx
│── Slider.jsx
│── Slide.jsx
│── styles.css
│── modal.css
```

---

## 1️⃣ `index.js`

**App entry point**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./modal.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 2️⃣ `Modal.jsx`

**Reusable modal component**

```jsx
const Modal = ({ children, show, onClose, title }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-close" onClick={onClose}>
              X
            </div>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
```

---

## 3️⃣ `Slide.jsx`

**Single slide inside slideshow**

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

**Controlled slideshow inside modal**

```jsx
import Slide from "./Slide";

const Slider = ({ images, active, setActive }) => {
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
      <div className="slides">
        {images.map((img, index) => (
          <Slide
            key={img.caption}
            {...img}
            active={index === active}
          />
        ))}
      </div>

      <div className="navigation-next-prev">
        <div className="next-prev prev" onClick={onPrev}>
          &lt;
        </div>
        <div className="next-prev next" onClick={onNext}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default Slider;
```

---

## 5️⃣ `App.jsx`

**Main Lightbox Gallery**

```jsx
import { useState } from "react";
import Modal from "./Modal";
import Slider from "./Slider";

export default function App() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState(0);

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

  const handleClick = (index) => {
    setActive(index);
    setShow(true);
  };

  return (
    <div className="App">
      <h2>Lightbox Image Gallery</h2>

      <Modal show={show} title="Lightbox" onClose={() => setShow(false)}>
        <Slider
          images={images}
          active={active}
          setActive={setActive}
        />
      </Modal>

      {/* Image Grid */}
      <div className="image-list">
        {images.map((img, index) => (
          <div
            key={img.caption}
            className={index === active ? "active" : ""}
            onClick={() => handleClick(index)}
          >
            <img src={img.image_url} alt={img.caption} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 6️⃣ `modal.css`

**Modal styling**

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
}

.modal-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #fff;
  width: 100%;
  max-width: 500px;
  padding: 12px;
  box-shadow: 0 4px 10px #000;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.modal-close {
  cursor: pointer;
  background: gray;
  color: white;
  width: 28px;
  height: 28px;
  text-align: center;
  border-radius: 50%;
}
```

---

## 7️⃣ `styles.css`

**Gallery + Slider styling**

```css
* {
  box-sizing: border-box;
}

.App {
  font-family: sans-serif;
  text-align: center;
}

/* Slider */
.slider {
  position: relative;
  max-width: 500px;
  margin: auto;
}

.slide {
  display: none;
  position: relative;
}

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

.slide img {
  width: 100%;
}

.slide span {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}

/* Prev / Next */
.next-prev {
  position: absolute;
  top: 50%;
  font-size: 1.5em;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 6px 10px;
  border-radius: 50%;
}

.next {
  right: 10px;
}

.prev {
  left: 10px;
}

/* Image grid */
.image-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.image-list > div {
  flex: 1 33%;
  padding: 5px;
  cursor: pointer;
}

.image-list img {
  width: 100%;
  border: 3px solid gray;
}

.image-list .active img {
  border-color: skyblue;
}
```

---

## ✅ How This Works (Interview Summary)

* Gallery grid controls the active image index
* Modal visibility is controlled via state
* Slider is **fully controlled** by parent state
* Navigation updates the same active index
* Modal click outside closes it

---

## 🚀 Possible Enhancements (Follow-ups)

* Keyboard navigation (← → ESC)
* Infinite looping
* Swipe gestures
* Image preloading
* Accessibility (ARIA roles)
* Zoom / pan

If you want **any enhancement implemented**, just say the word 👌
