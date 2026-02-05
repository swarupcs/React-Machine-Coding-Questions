import { useState, useRef, useEffect } from "react";
import Portal from "../Portal/Portal";
import "./tooltip.css";

export default function Tooltip({ content, children }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const triggerRef = useRef(null);

  useEffect(() => {
    if (visible && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      setPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
      });
    }
  }, [visible]);

  return (
    <>
      <span
        ref={triggerRef}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </span>

      {visible && (
        <Portal>
          <div
            className="tooltip"
            style={{
              top: pos.top,
              left: pos.left,
            }}
          >
            {content}
          </div>
        </Portal>
      )}
    </>
  );
}
