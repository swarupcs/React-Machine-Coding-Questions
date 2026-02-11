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
