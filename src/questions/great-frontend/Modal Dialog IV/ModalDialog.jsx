import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function ModalDialog({ open = false, ...props }) {
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
        fn(event);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [fn, key]);
}

/**
 * Invokes a function when clicking outside an element.
 */
function useOnClickOutside(elRef, fn) {
  useEffect(() => {
    function onClickOutside(event) {
      if (
        event.target instanceof Node &&
        elRef.current &&
        !elRef.current.contains(event.target)
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

function getTabbableElements(elRef) {
  if (!elRef.current) {
    return [];
  }

  return elRef.current.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

/**
 * Focus on the first tabbable element on mount.
 */
function useFocusOnFirstTabbableElement(elRef) {
  useEffect(() => {
    const tabbableElements = getTabbableElements(elRef);
    const firstElement = tabbableElements[0];
    if (firstElement instanceof HTMLElement) {
      firstElement.focus();
    }
  }, []);
}

/**
 * Trap focus within an element.
 */
function useFocusTrap(elRef) {
  function trapFocus(event) {
    if (!elRef.current) return;

    const tabbableElements = getTabbableElements(elRef);
    const firstElement = tabbableElements[0];
    const lastElement = tabbableElements[tabbableElements.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === firstElement && lastElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement && firstElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  useOnKeyDown('Tab', trapFocus);
}

/**
 * Retain reference to trigger element and focus that element when closed.
 */
function useReturnFocusToTrigger() {
  const triggerElRef = useRef(null);

  useEffect(() => {
    triggerElRef.current = document.activeElement;

    return () => {
      if (triggerElRef.current instanceof HTMLElement) {
        triggerElRef.current.focus();
      }
    };
  }, []);
}

function ModalDialogImpl({ children, title, onClose }) {
  const titleId = useId();
  const contentId = useId();
  const dialogRef = useRef(null);

  // Closing-related hooks
  useOnKeyDown('Escape', onClose);
  useOnClickOutside(dialogRef, onClose);

  // Focus-related hooks
  useReturnFocusToTrigger();
  useFocusOnFirstTabbableElement(dialogRef);
  useFocusTrap(dialogRef);

  return createPortal(
    <div className='modal-overlay'>
      <div
        role='dialog'
        aria-labelledby={titleId}
        aria-describedby={contentId}
        className='modal'
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
