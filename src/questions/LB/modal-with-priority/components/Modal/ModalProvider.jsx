import { useState } from "react";
import { ModalContext } from "./ModalContext";
import Modal from "./Modal";

/**
 * ModalProvider manages:
 * - list of open modals
 * - priority logic
 */
export function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);

  /**
   * Open modal with priority logic
   *
   * Rule:
   * - Close all modals with LOWER priority
   * - Keep same or higher priority stacked
   */
  const openModal = (modal) => {
    setModals((prev) => {
      const remaining = prev.filter(
        (m) => m.priority >= modal.priority
      );

      return [...remaining, modal];
    });
  };

  /**
   * Close a specific modal by id
   */
  const closeModal = (id) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  /**
   * Close all modals
   */
  const closeAll = () => setModals([]);

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        closeAll,
      }}
    >
      {children}

      {/* Render all modals */}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          {...modal}
          onClose={() => closeModal(modal.id)}
        />
      ))}
    </ModalContext.Provider>
  );
}
