import "./Modal.css";

const Modal = ({ title, children, show, onClose }) => {
  // If modal is not visible, render nothing
  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className={`modal-wrapper ${show ? "active" : ""}`}>
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-close" onClick={onClose}>
              ×
            </div>
          </div>

          {/* Body */}
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
