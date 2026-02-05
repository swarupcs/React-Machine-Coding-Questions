import Portal from "../Portal/Portal";
import "./modal.css";

/**
 * Modal Component rendered using Portal
 */
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="overlay" onClick={onClose}>
        <div
          className="modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>

          {children}
        </div>
      </div>
    </Portal>
  );
}
