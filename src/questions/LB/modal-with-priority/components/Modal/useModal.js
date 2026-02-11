import { useModalContext } from "./ModalContext";

/**
 * Custom hook for easy access
 */
export function useModal() {
  return useModalContext();
}
