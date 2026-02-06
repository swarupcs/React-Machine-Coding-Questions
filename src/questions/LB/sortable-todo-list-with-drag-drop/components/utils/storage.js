const KEY = "KANBAN_STATE";

export const saveState = (state) => {
  localStorage.setItem(KEY, JSON.stringify(state));
};

export const loadState = () => {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : null;
};
