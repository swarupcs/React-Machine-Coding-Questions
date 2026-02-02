const Modal = ({ children, show, onClose, title }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-wrapper">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <div className="modal-close" onClick={onClose}>
              X
            </div>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
