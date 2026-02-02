let count = 0;

const updateCount = (value) => {
  count += value;
  document.getElementById("queueCount").innerText = count;
};
