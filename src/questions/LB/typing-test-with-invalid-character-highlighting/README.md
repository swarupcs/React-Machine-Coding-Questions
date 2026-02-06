Got it 😄
Now you want the **full Typeracer / MonkeyType clone** machine coding solution with:

✅ Complete React project code
✅ Proper folder structure
✅ Full CSS included
✅ Detailed interview-level notes
✅ WPM calculation + completion logic
✅ Correct/incorrect highlighting + cascading red
✅ Cursor blinking indicator
✅ Start/Reset button

So let’s build it properly like a real SDE2 machine coding answer.

---

# ✅ Typing Speed Test App (MakeMyTrip SDE2)

---

# 📂 Folder Structure

```
react-typeracer/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   ├── TypingTest/
│   │   │   ├── TypingTest.jsx
│   │   │   ├── Paragraph.jsx
│   │   │   ├── wpm.js
│   │   │   └── typingTest.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

---

# ✅ Step 1: Install Dependency

We use `txtgen` to generate random paragraphs.

```bash
npm install txtgen
```

---

---

# ✅ Step 2: React Entry

## `src/main.jsx`

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

---

# ✅ Step 3: App Component

## `src/App.jsx`

```jsx
import TypingTest from "./components/TypingTest/TypingTest";

export default function App() {
  return (
    <div>
      <TypingTest />
    </div>
  );
}
```

---

---

# ✅ Step 4: WPM Calculation Helper

### Interview Note

WPM is calculated as:

[
WPM = \frac{\text{Words Typed}}{\text{Minutes Taken}}
]

---

## `src/components/TypingTest/wpm.js`

```js
export function calculateWPM(text, startTime, endTime) {
  const wordCount = text.trim().split(/\s+/).length;

  const timeInMinutes = (endTime - startTime) / 1000 / 60;

  if (timeInMinutes === 0) return 0;

  return Math.round(wordCount / timeInMinutes);
}
```

---

---

# ✅ Step 5: Paragraph Renderer (Character Highlighting)

### Interview Note

We render each character separately inside `<span>` so we can:

* Turn correct letters green
* Turn wrong letters red
* Cascade red after first mistake
* Show cursor blinking

---

## `src/components/TypingTest/Paragraph.jsx`

```jsx
export default function Paragraph({ paragraph, typedText }) {
  const letters = paragraph.split("");

  return (
    <p className="paragraph">
      {letters.map((char, index) => {
        const typedChar = typedText[index];

        const isCorrect =
          typedChar?.toLowerCase() === char.toLowerCase();

        let className = "black";

        // If user typed this position
        if (typedChar != null) {
          className = isCorrect ? "valid" : "invalid";
        }

        // If last typed char was wrong → cascade red
        if (typedText.length <= index && typedText.length > 0) {
          const lastTypedIndex = typedText.length - 1;

          const lastTypedChar = typedText[lastTypedIndex];
          const actualChar = letters[lastTypedIndex];

          if (
            lastTypedChar?.toLowerCase() !== actualChar?.toLowerCase()
          ) {
            className = "invalid";
          }
        }

        // Cursor blinking effect
        const showCursor = index === typedText.length;

        return (
          <span
            key={index}
            className={showCursor ? `${className} blink` : className}
          >
            {char}
          </span>
        );
      })}
    </p>
  );
}
```

---

---

# ✅ Step 6: Main TypingTest Component

### Responsibilities:

✅ Generate paragraph
✅ Listen to keyboard typing
✅ Track typed characters
✅ Prevent typing before Start
✅ Stop typing after completion
✅ Show WPM at end
✅ Reset game

---

## `src/components/TypingTest/TypingTest.jsx`

```jsx
import { useEffect, useState } from "react";
import { paragraph } from "txtgen";

import Paragraph from "./Paragraph";
import { calculateWPM } from "./wpm";

import "./typingTest.css";

/*
  Generate paragraph only once globally
*/
const TEXT = paragraph(1);

export default function TypingTest() {
  const [typedText, setTypedText] = useState([]);

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  /*
    Check mismatch
  */
  const mismatch = typedText.some((char, i) => {
    return char?.toLowerCase() !== TEXT[i]?.toLowerCase();
  });

  /*
    Typing completed only if:
    - All characters typed
    - No mismatch
  */
  const completed =
    typedText.length === TEXT.length && !mismatch;

  /*
    Stop timer when completed
  */
  useEffect(() => {
    if (completed) {
      setEndTime(Date.now());
    }
  }, [completed]);

  /*
    Keyboard Listener
  */
  useEffect(() => {
    function handleKeyDown(e) {
      // Do nothing if not started or already finished
      if (!startTime || completed) return;

      // Backspace handling
      if (e.key === "Backspace") {
        setTypedText((prev) => prev.slice(0, -1));
        return;
      }

      // Ignore non-character keys
      if (e.key.length > 1) return;

      // Add typed character
      setTypedText((prev) => [...prev, e.key]);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [startTime, completed]);

  /*
    Start / Reset Button
  */
  function handleStartReset() {
    // Reset after completion
    if (endTime) {
      setTypedText([]);
      setStartTime(Date.now());
      setEndTime(0);
      return;
    }

    // Start game
    if (!startTime) {
      setStartTime(Date.now());
    }
  }

  return (
    <div className="typing-container">
      <h1>⌨️ Typing Speed Test</h1>

      <button onClick={handleStartReset}>
        {endTime ? "Reset Game" : startTime ? "Typing..." : "Start"}
      </button>

      <Paragraph paragraph={TEXT} typedText={typedText} />

      {completed && (
        <h2 className="result">
          ✅ Completed! WPM:{" "}
          {calculateWPM(TEXT, startTime, endTime)}
        </h2>
      )}
    </div>
  );
}
```

---

---

# ✅ Step 7: CSS Styling

## `src/components/TypingTest/typingTest.css`

```css
.typing-container {
  max-width: 800px;
  margin: 40px auto;
  text-align: center;
}

button {
  padding: 10px 20px;
  margin-bottom: 20px;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  background: black;
  color: white;
  font-size: 16px;
}

.paragraph {
  font-size: 1.5rem;
  line-height: 2rem;
  text-align: left;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
}

/* Character States */
.black {
  color: black;
}

.valid {
  color: green;
}

.invalid {
  color: red;
  background: rgba(255, 0, 0, 0.2);
}

/* Cursor Blink */
@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.blink::before {
  content: "";
  display: inline-block;
  width: 3px;
  height: 20px;
  background: #ff0080;
  margin-right: 2px;
  animation: blink 1s infinite;
}

.result {
  margin-top: 20px;
  color: darkblue;
}
```

---

---

# ✅ Step 8: Global CSS

## `src/index.css`

```css
body {
  font-family: sans-serif;
  background: #f9f9f9;
}
```

---

---

# ✅ Final Output Features

✔ Random paragraph generated
✔ Characters start black
✔ Correct letters → green
✔ Wrong letter → red
✔ Subsequent letters cascade red
✔ Cursor blinking
✔ Start button prevents typing early
✔ Auto stops after completion
✔ WPM displayed at end
✔ Reset game works

---

# ⭐ Interview-Level Improvements (If Asked)

I can extend this into:

✅ Timer countdown mode
✅ Accuracy % calculation
✅ Word-by-word typing instead of character-based
✅ Highlight current word
✅ Proper MonkeyType UI
✅ Mobile input support
✅ Leaderboard storage

Just tell me what version you want next 😄
