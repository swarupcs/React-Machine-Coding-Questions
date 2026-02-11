import { useEffect } from "react";

/**
 * Base Modal UI Component
 *
 * Props:
 * - title
 * - content
 * - primaryAction
 * - secondaryAction
 * - showCloseIcon
 * - priority
 * - onClose
 */
export default function Modal({
  title,
  content,
  primaryAction,
  secondaryAction,
  showCloseIcon = true,
  priority = 1,
  onClose,
}) {
  /**
   * Close on ESC key press
   */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  /**
   * Base z-index + priority stacking
   */
  const BASE_ZINDEX = 1000;
  const zIndex = BASE_ZINDEX + priority;

  return (
    <div
      style={{
        ...styles.backdrop,
        zIndex,
      }}
      onClick={onClose} // overlay click closes modal
    >
      {/* Stop propagation so click inside doesn't close */}
      <div
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>{title}</h2>

          {showCloseIcon && (
            <button style={styles.closeBtn} onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* Body */}
        <div style={styles.body}>{content}</div>

        {/* Footer */}
        <div style={styles.footer}>
          {secondaryAction && (
            <button
              style={styles.secondaryBtn}
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </button>
          )}

          {primaryAction && (
            <button
              style={styles.primaryBtn}
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Inline styles for clarity
 */
const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: "420px",
    maxWidth: "90%",
    background: "white",
    borderRadius: "10px",
    boxShadow: "0px 10px 40px rgba(0,0,0,0.25)",
    overflow: "hidden",
  },

  header: {
    padding: "16px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  body: {
    padding: "16px",
    fontSize: "15px",
    color: "#333",
  },

  footer: {
    padding: "16px",
    borderTop: "1px solid #eee",
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  closeBtn: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "8px 14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    cursor: "pointer",
  },

  primaryBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};
