import React, { useState } from "react";
import Column from "../Column/Column";
import "./board.css";

/*
  Board contains all columns.
  It also manages:
   - drag state
   - drop indicator
   - create new cards
*/

export default function Board() {
  // ✅ Normalized Column State
  const [containers, setContainers] = useState({
    todo: [
      { id: "1", content: "Task 1" },
      { id: "2", content: "Task 2" },
    ],
    "in-progress": [
      { id: "3", content: "Task 3" },
      { id: "4", content: "Task 4" },
    ],
    completed: [],
  });

  // Track dragged item
  const [draggedItem, setDraggedItem] = useState(null);

  // Track drop position
  const [dropIndicator, setDropIndicator] = useState(null);

  // ✅ Add new task in TODO
  const handleCreate = (e) => {
    if (e.key === "Enter") {
      const text = e.target.value.trim();
      if (!text) return;

      setContainers((prev) => ({
        ...prev,
        todo: [...prev.todo, { id: Date.now(), content: text }],
      }));

      e.target.value = "";
    }
  };

  // ✅ Delete card
  const handleDelete = (containerId, itemId) => {
    setContainers((prev) => ({
      ...prev,
      [containerId]: prev[containerId].filter((i) => i.id !== itemId),
    }));
  };

  // ✅ Drag Start
  const handleDragStart = (item, containerId) => {
    const index = containers[containerId].findIndex((i) => i.id === item.id);

    setDraggedItem({
      item,
      sourceContainer: containerId,
      sourceIndex: index,
    });
  };

  // ✅ Drag Over Card (Sorting)
  const handleItemDragOver = (e, containerId, index) => {
    e.preventDefault();

    if (!draggedItem) return;

    setDropIndicator({
      containerId,
      index,
    });
  };

  // ✅ Drag Over Empty Column
  const handleColumnDragOver = (e, containerId) => {
    e.preventDefault();

    if (!draggedItem) return;

    setDropIndicator({
      containerId,
      index: containers[containerId].length,
    });
  };

  // ✅ Drop Logic
  const handleDrop = () => {
    if (!draggedItem || !dropIndicator) return;

    const { item, sourceContainer, sourceIndex } = draggedItem;
    const { containerId: targetContainer, index: targetIndex } =
      dropIndicator;

    setContainers((prev) => {
      const newState = { ...prev };

      // Remove item from source
      const sourceItems = [...newState[sourceContainer]];
      sourceItems.splice(sourceIndex, 1);

      // Insert item into target
      const targetItems =
        sourceContainer === targetContainer
          ? sourceItems
          : [...newState[targetContainer]];

      targetItems.splice(targetIndex, 0, item);

      newState[sourceContainer] = sourceItems;
      newState[targetContainer] = targetItems;

      return newState;
    });

    setDraggedItem(null);
    setDropIndicator(null);
  };

  return (
    <div className="board">
      {/* Input to add tasks */}
      <input
        placeholder="Press Enter to add task..."
        className="board-input"
        onKeyDown={handleCreate}
      />

      {/* Render Columns */}
      <div className="columns-wrapper">
        {Object.entries(containers).map(([id, items]) => (
          <Column
            key={id}
            title={id}
            items={items}
            containerId={id}
            onDelete={handleDelete}
            onDragStart={handleDragStart}
            onItemDragOver={handleItemDragOver}
            onColumnDragOver={handleColumnDragOver}
            onDrop={handleDrop}
            dropIndicator={dropIndicator}
          />
        ))}
      </div>
    </div>
  );
}
