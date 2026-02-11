import { createContext, useContext } from "react";

/**
 * ModalContext stores:
 * - active modals list
 * - openModal()
 * - closeModal()
 * - closeAll()
 */
export const ModalContext = createContext(null);

export function useModalContext() {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return ctx;
}
