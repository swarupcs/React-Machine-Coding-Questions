import { useEffect } from "react";

/*
  Tab button component.
  Clicking updates activeTab inside store.
*/

export default function Tab({ id, label, store, defaultActive }) {
  const { activeTab, setActiveTab } = store;

  // Set default active tab on mount
  useEffect(() => {
    if (defaultActive) {
      setActiveTab(id);
    }
  }, []);

  return (
    <button
      role="tab"
      aria-selected={activeTab === id}
      className={activeTab === id ? "active" : ""}
      onClick={() => setActiveTab(id)}
    >
      {label}
    </button>
  );
}
