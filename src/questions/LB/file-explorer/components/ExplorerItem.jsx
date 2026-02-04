export default function ExplorerItem({ item, onOpen }) {
  return (
    <div
      className={`box ${item.type}`}
      onClick={() => item.type === "folder" && onOpen(item.id)}
    >
      {item.name}
    </div>
  );
}
