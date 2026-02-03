![Image](https://user-images.githubusercontent.com/5148596/126052111-635805d1-6583-45f2-a9c1-76a154eb39a0.gif)

![Image](https://cdn.prod.website-files.com/5beab1239ac8840644a660b4/679ad2b3aca6afdc495492ca_Webflow%20Before%20After%20Slider.jpg)

![Image](https://codyhouse.co/assets/img/gems/hero/image-comparison-slider-featured.svg)

Below is a **complete, interview-ready implementation** of an **Image Comparison Slider in React**, with **clean folder structure**, **full working code**, and **clear explanations** of *why* each piece exists.

This version sticks very close to your original logic (mouse + touch support, refs, no heavy state updates) and is exactly the kind of solution interviewers expect for a **frontend machine-coding round**.

---

# 📁 Recommended Folder Structure

```
image-comparison-slider/
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   └── ImageComparisonSlider/
│   │       ├── ImageComparisonSlider.jsx
│   │       └── styles.css
│   │
│   ├── App.jsx
│   ├── index.js
│   └── index.css
│
└── package.json
```

---

# 🧩 Component Responsibility Breakdown

| Part                        | Responsibility                      |
| --------------------------- | ----------------------------------- |
| `ImageComparisonSlider.jsx` | Slider logic + DOM interaction      |
| `styles.css`                | Overlay, slider handle, positioning |
| `App.jsx`                   | Demo / usage                        |
| `index.js`                  | React entry point                   |

---

# 1️⃣ ImageComparisonSlider Component

### `src/components/ImageComparisonSlider/ImageComparisonSlider.jsx`

```jsx
import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import "./styles.css";

const ImageComparisonSlider = ({
  image1,
  image2,
  width = "500px",
  height = "500px",
}) => {
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const sliderRef = useRef(null);

  const [canSlide, setCanSlide] = useState(false);
  const [imageWidth, setImageWidth] = useState(0);

  // Start sliding
  const slideStart = () => {
    setCanSlide(true);
  };

  // Stop sliding
  const slideEnd = () => {
    setCanSlide(false);
  };

  // Move slider
  const slideMove = (e) => {
    if (!canSlide) return;
    if (!imageRef.current || !overlayRef.current || !sliderRef.current) return;

    let pos = getCursorPosition(e);

    // Clamp within image bounds
    if (pos < 0) pos = 0;
    if (pos > imageWidth) pos = imageWidth;

    slide(pos);
  };

  // Get cursor position relative to image
  const getCursorPosition = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].pageX : e.pageX) - rect.left;
    return x - window.pageXOffset;
  };

  // Apply styles
  const slide = (x) => {
    overlayRef.current.style.width = `${x}px`;
    sliderRef.current.style.left = `${x}px`;
  };

  // Global listeners
  useEffect(() => {
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
    window.addEventListener("mouseup", slideEnd);
    window.addEventListener("touchend", slideEnd);

    if (imageRef.current) {
      setImageWidth(imageRef.current.offsetWidth);
    }

    return () => {
      window.removeEventListener("mousemove", slideMove);
      window.removeEventListener("touchmove", slideMove);
      window.removeEventListener("mouseup", slideEnd);
      window.removeEventListener("touchend", slideEnd);
    };
  }, [canSlide]);

  const dimension = { width, height };

  return (
    <div className="container" style={dimension}>
      {/* Base image */}
      <img src={image1} style={dimension} alt="Base" />

      {/* Overlay image */}
      <div ref={overlayRef} className={cx("image", "overlay")}>
        <img ref={imageRef} src={image2} style={dimension} alt="Overlay" />
      </div>

      {/* Slider handle */}
      <span
        ref={sliderRef}
        className="slider"
        onMouseDown={slideStart}
        onTouchStart={slideStart}
      />
    </div>
  );
};

export default ImageComparisonSlider;
```

---

# 2️⃣ Component Styles

### `src/components/ImageComparisonSlider/styles.css`

```css
.container {
  position: relative;
  display: inline-block;
  overflow: hidden;
  box-shadow: 0 1px 3px #000;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
}

.image img {
  display: block;
}

.overlay {
  width: 50%;
  z-index: 1;
}

.slider {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  transform: translate(-50%, -50%);
  background-color: red;
  border-radius: 50%;
  z-index: 2;
  cursor: ew-resize;
}
```

---

# 3️⃣ App Usage (Test Case)

### `src/App.jsx`

```jsx
import ImageComparisonSlider from "./components/ImageComparisonSlider/ImageComparisonSlider";

const App = () => {
  return (
    <div style={{ padding: "40px" }}>
      <ImageComparisonSlider
        image1="https://cdn.pixabay.com/photo/2019/12/30/13/10/lost-places-4729640_1280.jpg"
        image2="https://cdn.pixabay.com/photo/2018/09/16/15/31/boy-3681679_1280.jpg"
        width="600px"
        height="400px"
      />
    </div>
  );
};

export default App;
```

---

# 4️⃣ Entry Point

### `src/index.js`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

---

# 🧠 Key Design Decisions (Interview Notes)

### ✅ Why refs instead of state?

* Mouse move fires **many times per second**
* Updating state would cause unnecessary re-renders
* DOM style updates via refs are faster

### ✅ Why global listeners?

* Mouse can leave the slider handle during drag
* Ensures smooth dragging experience

### ✅ Why overlay width instead of resizing image?

* Preserves image aspect ratio
* Avoids expensive image scaling

---

# ⚠️ Common Interview Follow-ups (and Answers)

| Question              | Answer                                      |
| --------------------- | ------------------------------------------- |
| Mobile support?       | Yes (`touchstart`, `touchmove`, `touchend`) |
| Keyboard accessible?  | Can be extended with arrow keys             |
| Performance concerns? | No re-renders during drag                   |
| Resize support?       | Add `ResizeObserver`                        |
| Accessibility?        | Add ARIA roles to slider                    |

---

# ✅ What Interviewers Like About This Solution

✔ Correct event model
✔ No unnecessary state updates
✔ Mouse + touch handling
✔ Clean separation of logic & styles
✔ Real-world behavior match

---

If you want next:

* **Keyboard accessible slider**
* **Vertical image comparison**
* **TypeScript version**
* **Custom handle UI**
* **ResizeObserver support**

Just tell me 👍
