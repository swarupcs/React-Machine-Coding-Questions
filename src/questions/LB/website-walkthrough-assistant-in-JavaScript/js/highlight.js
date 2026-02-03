function createHighlight(rect) {
  const highlight = document.createElement("div");
  highlight.id = "lb-highlight";

  highlight.style.position = "absolute";
  highlight.style.top = rect.top + window.scrollY - 4 + "px";
  highlight.style.left = rect.left + window.scrollX - 4 + "px";
  highlight.style.width = rect.width + "px";
  highlight.style.height = rect.height + "px";
  highlight.style.transition = "border 0.2s ease";

  document.body.appendChild(highlight);

  setTimeout(() => {
    highlight.style.border = "4px solid black";
  }, 0);
}

function removeHighlight() {
  document.getElementById("lb-highlight")?.remove();
}
