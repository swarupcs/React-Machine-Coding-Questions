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
