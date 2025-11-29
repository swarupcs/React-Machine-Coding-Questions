import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

export default function ShadowWrapper({ children }) {
  const hostRef = useRef(null);
  const shadowRootRef = useRef(null);
  const reactRootRef = useRef(null);

  useEffect(() => {
    // CREATE SHADOW ROOT ONLY ONCE
    if (!shadowRootRef.current) {
      shadowRootRef.current = hostRef.current.attachShadow({ mode: 'open' });

      // container where React will mount inside the shadowDOM
      const mountPoint = document.createElement('div');
      shadowRootRef.current.appendChild(mountPoint);

      // Create react root only once
      reactRootRef.current = ReactDOM.createRoot(mountPoint);
    }

    // Render children into shadow DOM root
    reactRootRef.current.render(children);

    // Cleanup: unmount only when this wrapper is fully destroyed
    return () => {
      // Important: unmount safely without causing race condition
      if (reactRootRef.current) {
        reactRootRef.current.unmount();
      }
    };
  }, [children]);

  return <div ref={hostRef}></div>;
}
