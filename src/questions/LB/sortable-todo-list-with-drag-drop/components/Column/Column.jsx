import Card from "../Card/Card";
import "./column.css";

/*
  Column renders cards.
  Also handles drag over empty space.
*/

export default function Column({
  title,
  items,
  containerId,
  onDelete,
  onDragStart,
  onItemDragOver,
  onColumnDragOver,
  onDrop,
  dropIndicator,
}) {
  return (
    <div
      className="column"
      onDragOver={(e) => onColumnDragOver(e, containerId)}
      onDrop={onDrop}
    >
      <h3 className="column-title">{title}</h3>

      {items.map((item, index) => (
        <div key={item.id}>
          {/* Drop indicator line */}
          {dropIndicator?.containerId === containerId &&
            dropIndicator.index === index && (
              <div className="drop-indicator"></div>
            )}

          <Card
            item={item}
            containerId={containerId}
            onDelete={onDelete}
            onDragStart={onDragStart}
            onDragOver={(e) => onItemDragOver(e, containerId, index)}
          />
        </div>
      ))}

      {/* Indicator at end */}
      {dropIndicator?.containerId === containerId &&
        dropIndicator.index === items.length && (
          <div className="drop-indicator"></div>
        )}

      {/* Empty column */}
      {items.length === 0 && (
        <p className="empty-drop">Drop here</p>
      )}
    </div>
  );
}
