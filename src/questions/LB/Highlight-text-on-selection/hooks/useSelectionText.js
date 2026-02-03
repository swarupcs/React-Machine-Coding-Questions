import { useEffect, useState } from "react";

/**
 * Hook that returns selected text and its coordinates
 * Restricts selection to the provided ref
 */
const useSelectionText = (ref) => {
  const [data, setData] = useState({
    showTools: false,
  });

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) {
      setData({ showTools: false });
      return;
    }

    const startNode = range.startContainer.parentNode;
    const endNode = range.endContainer.parentNode;

    // Ensure selection is inside the target container
    if (!ref.current?.contains(startNode) || !ref.current?.contains(endNode)) {
      setData({ showTools: false });
      return;
    }

    const rect = range.getBoundingClientRect();

    if (!rect.width) {
      setData({ showTools: false });
      return;
    }

    setData({
      selectedText,
      showTools: true,
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY - 30, // show popup above text
      width: rect.width,
    });
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return data;
};

export default useSelectionText;
