import { useEffect } from "react";
import cx from "classnames";
import "./snackbar.css";

const DEFAULT_AUTO_CLOSE = 3500;

const SnackbarItem = ({
  id,
  message,
  variant,
  onClose,
  offset,
  autoCloseDuration
}) => {
  useEffect(() => {
    const timer = setTimeout(
      () => onClose(id),
      autoCloseDuration ?? DEFAULT_AUTO_CLOSE
    );

    return () => clearTimeout(timer);
  }, [id, onClose, autoCloseDuration]);

  return (
    <div
      className={cx("snackbar", variant)}
      style={{ transform: `translateY(${offset}px)` }}
    >
      <span>{message}</span>
      <button onClick={() => onClose(id)}>✕</button>
    </div>
  );
};

export default SnackbarItem;
