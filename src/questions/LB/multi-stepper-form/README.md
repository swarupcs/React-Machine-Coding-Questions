![Image](https://www.codevertiser.com/static/002b80bd6489843c7548265c6bffa1ee/120f1/progress-steps-cover.png)

![Image](https://cdn.dribbble.com/userupload/42176526/file/original-ef593d29153ba02c3b5f7f9bb9cd0387.jpg)

![Image](https://images.prismic.io/ebayevo/Zvy9QbVsGrYSwQxs_progress-stepper_I1570-1570579-4525-11331.png?auto=format%2Ccompress\&fit=max\&q=100\&w=3840)

Below is a **production-clean, interview-ready solution** for the **Zepto SDE-3 Extended Stepper component**, written exactly how a **senior frontend engineer** is expected to structure and explain it.

This answer includes:

* ✅ Clear **folder structure**
* ✅ **Complete working code**
* ✅ Step-by-step **design reasoning**
* ✅ **Validation-aware navigation**
* ✅ Easily extensible for icons, context, API calls

---

# 📁 Folder Structure

```
extended-stepper/
│
├── src/
│   ├── components/
│   │   ├── Stepper.jsx
│   │   ├── Form1.jsx
│   │   ├── Form2.jsx
│   │   └── Form3.jsx
│   │
│   ├── styles/
│   │   └── stepper.css
│   │
│   ├── App.jsx
│   └── index.js
│
└── index.html
```

### Why this structure (important for SDE-3)?

* **Stepper is generic** → reusable anywhere
* **Forms are isolated** → independent validation
* **Styles are centralized**
* **Easy to scale** to 10+ steps or API-driven forms

---

# 1️⃣ Stepper Component (Core Logic)

### `src/components/Stepper.jsx`

```jsx
import React, { useState } from "react";
import "../styles/stepper.css";

const Stepper = ({ list }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = list.length;

  const progressWidth = (100 / (totalSteps - 1)) * currentStep;

  const onNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const onPrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  return (
    <section className="stepper">
      {/* Step Indicators */}
      <div className="steps-container">
        <div className="steps-wrapper">
          {list.map((_, i) => (
            <div
              key={i}
              className={`step ${i <= currentStep ? "active" : ""}`}
              onClick={() => setCurrentStep(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Current Step Content */}
      <div className="step-content">
        {React.cloneElement(list[currentStep], {
          onNext,
          onPrev,
          hasNext: currentStep < totalSteps - 1,
          hasPrevious: currentStep > 0,
        })}
      </div>
    </section>
  );
};

export default Stepper;
```

### 💡 Interview reasoning

* **Stepper owns navigation state**
* Forms only **request navigation**
* `cloneElement` injects control → clean separation
* Clicking steps is allowed (like Zepto UI)

---

# 2️⃣ Form Components

---

### `src/components/Form1.jsx` (Validated Step)

```jsx
import { useState } from "react";

const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Form1 = ({ onNext, hasPrevious, onPrev }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!username || !email) {
      setError("All fields are required");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    onNext();
  };

  return (
    <form onSubmit={submit}>
      <h3>User Info</h3>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <div className="actions">
        {hasPrevious && <button onClick={onPrev}>Prev</button>}
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form1;
```

---

### `src/components/Form2.jsx`

```jsx
const Form2 = ({ onNext, onPrev, hasPrevious, hasNext }) => (
  <div>
    <h3>Address Details</h3>

    <div className="actions">
      {hasPrevious && <button onClick={onPrev}>Prev</button>}
      {hasNext && <button onClick={onNext}>Next</button>}
    </div>
  </div>
);

export default Form2;
```

---

### `src/components/Form3.jsx`

```jsx
const Form3 = ({ onPrev, hasPrevious }) => (
  <div>
    <h3>Confirmation</h3>
    {hasPrevious && <button onClick={onPrev}>Prev</button>}
    <button disabled>Submit</button>
  </div>
);

export default Form3;
```

---

# 3️⃣ App Entry

### `src/App.jsx`

```jsx
import Stepper from "./components/Stepper";
import Form1 from "./components/Form1";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";

export default function App() {
  return <Stepper list={[<Form1 />, <Form2 />, <Form3 />]} />;
}
```

---

# 4️⃣ Styling (Stepper UI)

### `src/styles/stepper.css`

```css
.stepper {
  width: 600px;
  margin: 40px auto;
}

.steps-container {
  position: relative;
  margin-bottom: 20px;
}

.steps-wrapper {
  display: flex;
  justify-content: space-between;
}

.step {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ccc;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.step.active {
  background: #000;
  color: white;
}

.progress-bar {
  height: 4px;
  background: #ddd;
  margin-top: 10px;
}

.progress-fill {
  height: 100%;
  background: black;
  transition: width 0.3s ease;
}

.step-content {
  border: 1px solid #ddd;
  padding: 20px;
}

.actions {
  margin-top: 10px;
  display: flex;
  gap: 8px;
}

.error {
  color: red;
}
```

---

# 5️⃣ index.js

```jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);
```

---

# ✅ What This Solves (Zepto Expectations)

✔️ Step indicators
✔️ Progress bar sync
✔️ Controlled navigation
✔️ Validation-aware steps
✔️ Clickable steps
✔️ Scalable architecture

---

# 🎯 How to Explain This in SDE-3 Interview

> “I separated navigation logic from step content.
> Stepper owns progression, while forms decide when navigation is allowed.
> This makes validation, API calls, and conditional navigation trivial to add.”

---

# 🔥 Possible Follow-ups (Be Ready)

| Question                       | Answer                               |
| ------------------------------ | ------------------------------------ |
| Share data between steps?      | Context / React Hook Form            |
| Prevent clicking future steps? | Disable click when `i > currentStep` |
| Icons instead of numbers?      | Add `{icon}` to list metadata        |
| Async validation?              | Return promise before `onNext()`     |
| Save draft?                    | Persist state in localStorage        |

---

If you want, I can next:

* Convert this to **React Hook Form**
* Add **icons + labels**
* Add **API-driven steps**
* Add **step-level permissions**
* Convert to **TypeScript (Zepto-grade)**

Just tell me 👌
