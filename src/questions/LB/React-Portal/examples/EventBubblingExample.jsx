import ReactDOM from "react-dom";

export default function EventBubblingExample() {
  const handleParentClick = () => {
    alert("Parent clicked (bubbled through React tree)");
  };

  return (
    <div onClick={handleParentClick}>
      <h3>Event Bubbling Example</h3>

      {ReactDOM.createPortal(
        <button
          onClick={() => alert("Portal Button Clicked")}
        >
          Click Portal Button
        </button>,
        document.body
      )}
    </div>
  );
}
