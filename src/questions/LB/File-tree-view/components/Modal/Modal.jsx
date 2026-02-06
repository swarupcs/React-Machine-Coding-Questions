import './modal.css';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <>
      <div className='modal-backdrop' onClick={onClose} />
      <div className='modal'>
        <header>
          <h3>{title}</h3>
          <button onClick={onClose}>✕</button>
        </header>
        <div>{children}</div>
      </div>
    </>
  );
};

export default Modal;
