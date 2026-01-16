import { ComponentProps, RefObject, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ModalDialog({
  open = false,
  ...props
}) {
  if (!open) {
    return null;
  }

  return <ModalDialogImpl {...props} />;
}

/**
 * Invokes a function when a key is pressed.
 */
function useOnKeyDown(key, fn) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === key) {
        fn();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [fn]);
}

/**
 * Invokes a function when clicking outside an element.
 */
function useOnClickOutside(elRef, fn) {
  // Add event handling for close when clicking outside.
  useEffect(() => {
    function onClickOutside(event) {
      // No-op if clicked element is a descendant of element's contents.
      if (
        event.target instanceof Node &&
        elRef.current != null &&
        !elRef.current?.contains(event.target)
      ) {
        fn();
      }
    }

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('touchstart', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('touchstart', onClickOutside);
    };
  }, [fn]);
}

function ModalDialogImpl({
  children,
  title,
  onClose,
}) {
  const titleId = useId();
  const contentId = useId();
  const dialogRef = useRef < HTMLDivElement > null;

  useOnKeyDown('Escape', onClose);
  useOnClickOutside(dialogRef, onClose);

  return createPortal(
    <div className='modal-overlay'>
      <div
        aria-describedby={contentId}
        aria-labelledby={titleId}
        className='modal'
        role='dialog'
        ref={dialogRef}
      >
        <h1 className='modal-title' id={titleId}>
          {title}
        </h1>
        <div id={contentId}>{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}
