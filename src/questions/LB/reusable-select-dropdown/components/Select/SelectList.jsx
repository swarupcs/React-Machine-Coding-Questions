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
