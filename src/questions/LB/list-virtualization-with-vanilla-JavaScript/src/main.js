import { generateItems } from "./data.js";

import { VirtualListScroll } from "./VirtualListScroll.js";
import { VirtualListObserver } from "./VirtualListObserver.js";

/* Generate dataset */
const items = generateItems(10000);

const container = document.getElementById("list-container");

/* -----------------------------------------
   Choose Implementation
----------------------------------------- */

// ✅ Scroll Windowing
const virtualList = new VirtualListScroll(container, {
  items,
  itemHeight: 60,
  buffer: 8,
  renderItem: (item) => `
    <strong>${item.name}</strong>
    <span>${item.description}</span>
  `,
});

/*
// ✅ Observer Chunking
const virtualList = new VirtualListObserver(container, {
  items,
  itemHeight: 60,
  chunkSize: 25,
  renderItem: (item) => `
    <strong>${item.name}</strong>
    <span>${item.description}</span>
  `,
});
*/

/* -----------------------------------------
   Buttons
----------------------------------------- */

document.getElementById("scrollBtn").onclick = () => {
  virtualList.scrollToIndex(5000);
};

document.getElementById("destroyBtn").onclick = () => {
  virtualList.destroy();
  alert("Virtual List Destroyed!");
};
