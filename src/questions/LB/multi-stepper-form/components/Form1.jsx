import { useState } from "react";

const isEmailValid = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const Form1 = ({ onNext, hasPrevious, onPrev }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!username || !email) {
      setError("All fields are required");
      return;
    }

    if (!isEmailValid(email)) {
      setError("Invalid email format");
      return;
    }

    setError("");
    onNext();
  };

  return (
    <form onSubmit={submit}>
      <h3>User Info</h3>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <div className="actions">
        {hasPrevious && <button onClick={onPrev}>Prev</button>}
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Form1;
