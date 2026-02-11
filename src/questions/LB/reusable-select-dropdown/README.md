Got it 😄
This Razorpay dropdown question is **one of the best SDE2+ machine coding problems** because it touches:

✅ Compound Components
✅ Controlled State
✅ Search + Filtering
✅ Keyboard Navigation
✅ Accessibility (ARIA)
✅ Virtualized Rendering (10k+ options)
✅ Multi Select

So below is the **FULL clean reusable project** with:

* Proper folder structure
* Modular components
* Full working dropdown
* Search + multi-select
* Virtualization support
* Detailed notes inline

---

# ✅ Reusable Dropdown (Select) with Search + Virtualization

---

# 📂 Folder Structure

```
react-select-dropdown/
│
├── public/
│   └── index.html
│
├── src/
│   │
│   ├── components/
│   │   └── Select/
│   │        ├── Select.jsx
│   │        ├── SelectContext.jsx
│   │        ├── SelectTrigger.jsx
│   │        ├── SelectDropdown.jsx
│   │        ├── SelectSearch.jsx
│   │        ├── SelectList.jsx
│   │        ├── VirtualizedList.jsx
│   │        └── index.js
│   │
│   ├── data/
│   │   └── options.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── package.json
└── README.md
```

---

---

# ✅ Step 1: Install Dependencies

```bash
npm install lucide-react
```

---

---

# ✅ Step 2: Tailwind CDN Setup

## `public/index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Reusable Dropdown</title>

    <!-- Tailwind CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

---

---

# ✅ Step 3: Select Context (Central Store)

## `src/components/Select/SelectContext.jsx`

```jsx
import { createContext, useContext } from "react";

/**
 * This context allows all compound components
 * (Trigger, Search, List) to share dropdown state.
 */
const SelectContext = createContext(null);

export const useSelectContext = () => {
  const ctx = useContext(SelectContext);

  if (!ctx) {
    throw new Error("Select components must be used inside <Select>");
  }

  return ctx;
};

export default SelectContext;
```

---

---

# ✅ Step 4: Main Select Wrapper

## `src/components/Select/Select.jsx`

```jsx
import { useState, useRef, useEffect } from "react";
import SelectContext from "./SelectContext";

/**
 * Main Select Component (Provider)
 * Controls dropdown open/close + shared state.
 */
export default function Select({
  children,
  value,
  onChange,
  placeholder = "Select...",
  multiple = false,
  virtualized = false,
  itemHeight = 40,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  /**
   * Close dropdown when clicked outside
   */
  useEffect(() => {
    const outsideClick = (e) => {
      if (!containerRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchQuery("");
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", outsideClick);
    return () => document.removeEventListener("mousedown", outsideClick);
  }, []);

  /**
   * Auto focus search input when dropdown opens
   */
  useEffect(() => {
    if (isOpen) {
      searchInputRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <SelectContext.Provider
      value={{
        isOpen,
        setIsOpen,
        value,
        onChange,
        placeholder,
        multiple,
        virtualized,
        itemHeight,
        searchQuery,
        setSearchQuery,
        highlightedIndex,
        setHighlightedIndex,
        containerRef,
        searchInputRef,
      }}
    >
      <div ref={containerRef} className="relative w-full">
        {children}
      </div>
    </SelectContext.Provider>
  );
}
```

---

---

# ✅ Step 5: Trigger Button

## `src/components/Select/SelectTrigger.jsx`

```jsx
import { ChevronDown } from "lucide-react";
import { useSelectContext } from "./SelectContext";

/**
 * Trigger button (Combobox)
 */
export default function SelectTrigger() {
  const {
    isOpen,
    setIsOpen,
    value,
    placeholder,
    multiple,
  } = useSelectContext();

  const displayText = () => {
    if (multiple && Array.isArray(value)) {
      return value.length > 0 ? `${value.length} selected` : placeholder;
    }

    return value || placeholder;
  };

  return (
    <button
      role="combobox"
      aria-expanded={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex justify-between items-center px-4 py-2 border rounded-lg bg-white"
    >
      <span>{displayText()}</span>

      <ChevronDown
        className={`w-5 h-5 transition-transform ${
          isOpen ? "rotate-180" : ""
        }`}
      />
    </button>
  );
}
```

---

---

# ✅ Step 6: Dropdown Wrapper

## `src/components/Select/SelectDropdown.jsx`

```jsx
import { useSelectContext } from "./SelectContext";

/**
 * Dropdown popup container
 */
export default function SelectDropdown({ children }) {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg overflow-hidden">
      {children}
    </div>
  );
}
```

---

---

# ✅ Step 7: Search Input

## `src/components/Select/SelectSearch.jsx`

```jsx
import { Search, X } from "lucide-react";
import { useSelectContext } from "./SelectContext";

/**
 * Search box inside dropdown
 */
export default function SelectSearch() {
  const { searchQuery, setSearchQuery, searchInputRef } =
    useSelectContext();

  return (
    <div className="p-2 border-b">
      <div className="relative">
        <Search className="absolute left-2 top-2 w-4 h-4 text-gray-400" />

        <input
          ref={searchInputRef}
          value={searchQuery}
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-8 py-2 border rounded-md"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-2"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}
```

---

---

# ✅ Step 8: Virtualized List Component

## `src/components/Select/VirtualizedList.jsx`

```jsx
import { useState, useMemo } from "react";
import { useSelectContext } from "./SelectContext";

/**
 * VirtualizedList renders only visible options
 * to support huge datasets (10k+ items)
 */
export default function VirtualizedList({ options, renderOption }) {
  const { itemHeight } = useSelectContext();

  const containerHeight = 250;
  const buffer = 5;

  const [scrollTop, setScrollTop] = useState(0);

  /**
   * Compute visible window range
   */
  const range = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(containerHeight / itemHeight);

    return {
      start: Math.max(0, start - buffer),
      end: Math.min(options.length, end + buffer),
    };
  }, [scrollTop, options.length, itemHeight]);

  const visibleOptions = options.slice(range.start, range.end);

  return (
    <div
      style={{ height: containerHeight }}
      className="overflow-y-auto"
      onScroll={(e) => setScrollTop(e.target.scrollTop)}
    >
      {/* Fake total height */}
      <div style={{ height: options.length * itemHeight, position: "relative" }}>
        {/* Offset visible items */}
        <div style={{ transform: `translateY(${range.start * itemHeight}px)` }}>
          {visibleOptions.map((opt, idx) =>
            renderOption(opt, range.start + idx)
          )}
        </div>
      </div>
    </div>
  );
}
```

---

---

# ✅ Step 9: Select List Options

## `src/components/Select/SelectList.jsx`

```jsx
import { Check } from "lucide-react";
import { useMemo } from "react";
import { useSelectContext } from "./SelectContext";
import VirtualizedList from "./VirtualizedList";

/**
 * Options List Component
 */
export default function SelectList({ options }) {
  const {
    value,
    onChange,
    multiple,
    searchQuery,
    virtualized,
    setIsOpen,
  } = useSelectContext();

  /**
   * Filter options based on search query
   */
  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;

    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  /**
   * Select option handler
   */
  const selectOption = (opt) => {
    if (multiple) {
      const arr = Array.isArray(value) ? value : [];

      if (arr.includes(opt.value)) {
        onChange(arr.filter((v) => v !== opt.value));
      } else {
        onChange([...arr, opt.value]);
      }
    } else {
      onChange(opt.value);
      setIsOpen(false);
    }
  };

  /**
   * Render each option row
   */
  const renderOption = (opt) => {
    const selected = multiple
      ? value.includes(opt.value)
      : value === opt.value;

    return (
      <div
        key={opt.value}
        onClick={() => selectOption(opt)}
        className="px-4 py-2 cursor-pointer flex justify-between hover:bg-gray-100"
      >
        {opt.label}
        {selected && <Check className="w-4 h-4 text-blue-500" />}
      </div>
    );
  };

  if (filteredOptions.length === 0) {
    return <p className="p-4 text-gray-500">No options found</p>;
  }

  return virtualized ? (
    <VirtualizedList options={filteredOptions} renderOption={renderOption} />
  ) : (
    <div className="max-h-[250px] overflow-y-auto">
      {filteredOptions.map(renderOption)}
    </div>
  );
}
```

---

---

# ✅ Step 10: Export Compound API

## `src/components/Select/index.js`

```jsx
import Select from "./Select";
import SelectTrigger from "./SelectTrigger";
import SelectDropdown from "./SelectDropdown";
import SelectSearch from "./SelectSearch";
import SelectList from "./SelectList";

Select.Trigger = SelectTrigger;
Select.Dropdown = SelectDropdown;
Select.Search = SelectSearch;
Select.List = SelectList;

export default Select;
```

---

---

# ✅ Step 11: Options Dataset

## `src/data/options.js`

```js
export const countries = [
  { value: "in", label: "India" },
  { value: "us", label: "USA" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "jp", label: "Japan" },
];

export const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i}`,
}));
```

---

---

# ✅ Step 12: App Usage

## `src/App.jsx`

```jsx
import { useState } from "react";
import Select from "./components/Select";
import { countries, largeDataset } from "./data/options";

export default function App() {
  const [single, setSingle] = useState("");
  const [multi, setMulti] = useState([]);
  const [large, setLarge] = useState([]);

  return (
    <div className="p-10 space-y-8 max-w-xl mx-auto">
      {/* Single Select */}
      <div>
        <h2 className="font-bold mb-2">Single Select</h2>

        <Select value={single} onChange={setSingle}>
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={countries} />
          </Select.Dropdown>
        </Select>

        <p className="mt-2">Selected: {single}</p>
      </div>

      {/* Multi Select */}
      <div>
        <h2 className="font-bold mb-2">Multi Select</h2>

        <Select value={multi} onChange={setMulti} multiple>
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={countries} />
          </Select.Dropdown>
        </Select>

        <p className="mt-2">Selected: {multi.join(", ")}</p>
      </div>

      {/* Virtualized Select */}
      <div>
        <h2 className="font-bold mb-2">Virtualized Select (10,000)</h2>

        <Select
          value={large}
          onChange={setLarge}
          multiple
          virtualized
          itemHeight={40}
        >
          <Select.Trigger />
          <Select.Dropdown>
            <Select.Search />
            <Select.List options={largeDataset} />
          </Select.Dropdown>
        </Select>
      </div>
    </div>
  );
}
```

---

---

# ✅ Step 13: React Entry

## `src/main.jsx`

```jsx
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```

---

---

# ✅ Output Features

✅ Searchable dropdown
✅ Multi select
✅ Virtualized list for 10,000+ options
✅ Compound API (Razorpay style)
✅ Modular + reusable design

---

# ⭐ Interview Follow-ups (Razorpay)

If interviewer asks improvements:

### Add:

* Keyboard full navigation (Arrow + Enter)
* Close on Escape
* Typeahead selection
* Async options loading
* Controlled open state
* Accessibility (aria-activedescendant)

---

---

# 🚀 Next?

If you want, I can provide a **perfect Senior Staff version** with:

✅ Full ARIA compliance
✅ Arrow navigation + scroll sync
✅ Portal rendering
✅ Async remote search
✅ React hook `useSelect()` API

Just tell me 😄
