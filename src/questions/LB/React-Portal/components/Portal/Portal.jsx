import ReactDOM from "react-dom";
import { usePortal } from "./usePortal";

/**
 * Portal Component Wrapper
 */
export default function Portal({ children, id }) {
  const portalRoot = usePortal(id);

  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
}
