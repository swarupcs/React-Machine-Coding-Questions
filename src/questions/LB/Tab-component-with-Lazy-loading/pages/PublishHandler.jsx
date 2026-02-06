import { useEffect } from "react";

export default function PublishHandler() {
  useEffect(() => {
    console.log("PublishHandler Mounted");

    return () => {
      console.log("PublishHandler Unmounted");
    };
  }, []);

  return (
    <div>
      <h2>🚀 Publish Handler Loaded!</h2>
      <p>This tab content was lazy-loaded only when visible.</p>
    </div>
  );
}
