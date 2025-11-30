import { useEffect } from 'react';

export default function useDynamicCss(cssUrl) {
  useEffect(() => {
    if (!cssUrl) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssUrl;
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [cssUrl]);
}
