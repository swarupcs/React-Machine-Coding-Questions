import { useState } from "react";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <button onClick={() => setShowModal(true)}>
        Open Modal
      </button>

      <Modal
        show={showModal}
        title="My Modal"
        onClose={() => setShowModal(false)}
      >
        <h2>Welcome 👋</h2>
        <p>This is a reusable React modal component.</p>
        <button onClick={() => setShowModal(false)}>
          Close
        </button>
      </Modal>
    </div>
  );
};

export default App;
