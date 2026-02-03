// All tracked items
const blocks = document.querySelectorAll(".block");

// API simulation
function sendToServer(id) {
  console.log("API CALLED FOR BLOCK:", id);
}

// Called after user stops scrolling
function handleScrollStop() {
  blocks.forEach((block) => {
    if (isInViewport(block)) {
      sendToServer(block.innerText);
    }
  });

  console.log("---- idle detected ----");
}

// Debounced scroll handler (5 sec for interview; using 1s here)
const debouncedScroll = debounce(handleScrollStop, 1000);

// Attach listener
window.addEventListener("scroll", debouncedScroll);
