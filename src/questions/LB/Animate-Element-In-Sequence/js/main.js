const entry = document.getElementById("entry");
const button = document.getElementById("btn");

// BASE IMPLEMENTATION
const generateLoadingBar = () => {
  const bar = document.createElement("div");
  bar.className = "loading-bar";

  dynamicAnimation(
    "load100",
    `
      0% { width: 0%; }
      100% { width: 100%; }
    `
  );

  bar.style.animation = "load100 3s forwards";
  entry.appendChild(bar);

  bar.addEventListener("animationend", () => {
    updateCount(-1);
    if (count > 0) generateLoadingBar();
  });
};

// BUTTON CLICK
button.addEventListener("click", () => {
  if (count === 0) generateLoadingBar();
  updateCount(1);
});
