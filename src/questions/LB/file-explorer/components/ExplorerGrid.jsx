import ExplorerItem from "./ExplorerItem";

export default function ExplorerGrid({ items, onOpen }) {
  return (
    <div className="grid">
      {items.map((item) => (
        <ExplorerItem key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}
