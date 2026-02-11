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
