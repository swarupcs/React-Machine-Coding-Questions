export default function Breadcrumb({ path, onNavigate }) {
  return (
    <div className="breadcrumb-bar">
      {path.map((item, index) => (
        <span key={item.id ?? "home"}>
          <span
            className={index !== path.length - 1 ? "breadcrumb" : ""}
            onClick={() => onNavigate(item.id)}
          >
            {item.name}
          </span>
          {index !== path.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
}
