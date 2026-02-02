import { useRef, useState, useMemo, useEffect } from "react";
import { useCountDown } from "./useCountDown";
import "./styles.css";

const TABS = ["all", "completed", "in-progress", "deleted"];

export default function App() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const inputRef = useRef();

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: e.target.value,
          completed: false,
          deleted: false,
          expireTime: Date.now() + 15000, // 15 sec expiry
        },
      ]);
      inputRef.current.value = "";
    }
  };

  const updateCompleted = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, deleted: true } : t
      )
    );
  };

  const updateText = (id, text) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text } : t
      )
    );
  };

  const filteredTodos = useMemo(() => {
    if (activeTab === "completed") {
      return todos.filter((t) => t.completed && !t.deleted);
    }
    if (activeTab === "in-progress") {
      return todos.filter((t) => !t.completed && !t.deleted);
    }
    if (activeTab === "deleted") {
      return todos.filter((t) => t.deleted);
    }
    return todos;
  }, [todos, activeTab]);

  return (
    <div className="App">
      <h2>Editable Todo List</h2>

      <input
        ref={inputRef}
        type="text"
        placeholder="Add todo and press Enter"
        onKeyDown={handleKeyPress}
      />

      <div className="tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredTodos.map((todo) => (
        <Item
          key={todo.id}
          {...todo}
          updateCompleted={updateCompleted}
          deleteTodo={deleteTodo}
          updateText={updateText}
        />
      ))}
    </div>
  );
}
