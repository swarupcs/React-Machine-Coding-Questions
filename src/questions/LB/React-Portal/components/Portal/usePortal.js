import { useEffect, useState } from "react";

/**
 * Custom Hook: usePortal
 * Creates or finds a portal root dynamically
 */
export function usePortal(id = "portal-root") {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    let element = document.getElementById(id);

    // Create portal container if missing
    if (!element) {
      element = document.createElement("div");
      element.id = id;
      document.body.appendChild(element);
    }

    setPortalElement(element);

    // Cleanup if empty
    return () => {
      if (element.childNodes.length === 0) {
        element.remove();
      }
    };
  }, [id]);

  return portalElement;
}
