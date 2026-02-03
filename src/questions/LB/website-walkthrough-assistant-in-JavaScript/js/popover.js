function createPopover(rect, onNext, onPrev) {
  const popover = document.createElement("div");
  popover.id = "lb-popover";

  popover.style.position = "absolute";
  popover.style.top = rect.bottom + window.scrollY + 10 + "px";
  popover.style.left =
    (rect.left + rect.right) / 2 - 50 + window.scrollX + "px";
  popover.style.background = "#fff";
  popover.style.width = "120px";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.onclick = onPrev;

  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.onclick = onNext;

  popover.appendChild(prevBtn);
  popover.appendChild(nextBtn);

  document.body.appendChild(popover);
}

function removePopover() {
  document.getElementById("lb-popover")?.remove();
}
