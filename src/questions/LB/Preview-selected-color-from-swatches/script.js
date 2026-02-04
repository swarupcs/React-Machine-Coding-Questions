// Select elements
const displayAreaElm = document.querySelector("#display-area");
const colorBoxElms = document.querySelectorAll(".color-box");

// Attach click listeners
colorBoxElms.forEach((box) => {
  box.addEventListener("click", () => {
    // Get computed background color
    const computedStyle = getComputedStyle(box);
    const bgColor = computedStyle.getPropertyValue("background-color");

    // Apply to display area
    displayAreaElm.style.backgroundColor = bgColor;
  });
});
