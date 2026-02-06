import "./card.css";

/*
  Card is draggable.
  Supports delete.
*/

export default function Card({
  item,
  containerId,
  onDelete,
  onDragStart,
  onDragOver,
}) {
  return (
    <div
      className="card"
      draggable
      onDragStart={() => onDragStart(item, containerId)}
      onDragOver={onDragOver}
    >
      <div className="card-content">
        <span>{item.content}</span>

        <span
          className="card-delete"
          onClick={() => onDelete(containerId, item.id)}
        >
          ✖
        </span>
      </div>
    </div>
  );
}
