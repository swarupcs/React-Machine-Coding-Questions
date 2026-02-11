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
