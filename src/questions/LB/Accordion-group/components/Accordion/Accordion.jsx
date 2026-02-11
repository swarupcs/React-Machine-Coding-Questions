import { createContext, useContext, useState } from "react";
import "./Accordion.css";

/* ---------------------------------------------------
   1. Accordion Group Context
--------------------------------------------------- */

const AccordionContext = createContext(null);

function useAccordion() {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("Accordion components must be used inside <Accordion>");
  }

  return context;
}

/* ---------------------------------------------------
   2. Accordion Item Context
--------------------------------------------------- */

const AccordionItemContext = createContext(null);

function useAccordionItem() {
  const context = useContext(AccordionItemContext);

  if (!context) {
    throw new Error(
      "Accordion.Item subcomponents must be inside Accordion.Item"
    );
  }

  return context;
}

/* ---------------------------------------------------
   3. Main Accordion Component
--------------------------------------------------- */

function Accordion({
  children,
  allowMultiple = false,
  defaultValue = allowMultiple ? [] : null,
}) {
  const [openItems, setOpenItems] = useState(defaultValue);

  /* Toggle accordion item */
  const toggleItem = (id) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev === id ? null : id));
    }
  };

  /* Check if accordion item is open */
  const isItemOpen = (id) => {
    return allowMultiple ? openItems.includes(id) : openItems === id;
  };

  return (
    <AccordionContext.Provider value={{ toggleItem, isItemOpen }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

/* ---------------------------------------------------
   4. Accordion.Item Component
--------------------------------------------------- */

function AccordionItem({ value, disabled = false, children }) {
  const { toggleItem, isItemOpen } = useAccordion();

  const isOpen = isItemOpen(value);

  const toggle = () => {
    if (!disabled) toggleItem(value);
  };

  return (
    <AccordionItemContext.Provider
      value={{ isOpen, toggle, disabled }}
    >
      <div
        className={`accordion-item ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

/* ---------------------------------------------------
   5. Accordion.Trigger Component
--------------------------------------------------- */

function AccordionTrigger({ children }) {
  const { isOpen, toggle, disabled } = useAccordionItem();

  return (
    <button
      className="accordion-trigger"
      onClick={toggle}
      disabled={disabled}
      aria-expanded={isOpen}
    >
      <span>{children}</span>

      {/* Chevron Icon */}
      <span className={`chevron ${isOpen ? "rotate" : ""}`}>
        ▼
      </span>
    </button>
  );
}

/* ---------------------------------------------------
   6. Accordion.Content Component
--------------------------------------------------- */

function AccordionContent({ children }) {
  const { isOpen } = useAccordionItem();

  return (
    <div
      className={`accordion-content ${isOpen ? "show" : ""}`}
    >
      <div className="accordion-inner">{children}</div>
    </div>
  );
}

/* ---------------------------------------------------
   7. Compound API Attachments
--------------------------------------------------- */

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
