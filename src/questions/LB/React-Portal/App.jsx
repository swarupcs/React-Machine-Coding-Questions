import { useState } from "react";
import Modal from "./components/Modal/Modal";
import Tooltip from "./components/Tooltip/Tooltip";

import EventBubblingExample from "./examples/EventBubblingExample";
import ContextPortalExample from "./examples/ContextPortalExample";

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 30 }}>
      <h1>🚀 React Portal Playground</h1>

      {/* Modal */}
      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Hello from Portal Modal</h2>
        <p>This modal is rendered outside root!</p>
      </Modal>

      <hr />

      {/* Tooltip */}
      <Tooltip content="Tooltip escapes overflow hidden!">
        <button>Hover me</button>
      </Tooltip>

      <hr />

      {/* Event Bubbling */}
      <EventBubblingExample />

      <hr />

      {/* Context Preservation */}
      <ContextPortalExample />
    </div>
  );
}
