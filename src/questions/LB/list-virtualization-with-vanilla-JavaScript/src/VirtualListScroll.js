export class VirtualListScroll {
  constructor(container, options = {}) {
    this.container = container;
    this.items = options.items || [];
    this.itemHeight = options.itemHeight || 50;
    this.buffer = options.buffer || 5;

    this.renderItem =
      options.renderItem ||
      ((item) => `<div>${item.name}</div>`);

    this.content = null;

    this.onScroll = this.onScroll.bind(this);

    this.init();
  }

  /* -------------------------------------------
     INIT
  ------------------------------------------- */
  init() {
    this.container.style.position = "relative";
    this.container.style.overflow = "auto";

    /* Fake full height wrapper */
    this.content = document.createElement("div");
    this.content.style.height = `${this.items.length * this.itemHeight}px`;
    this.content.style.position = "relative";

    this.container.appendChild(this.content);

    /* Initial render */
    this.renderVisibleItems();

    /* Attach scroll listener */
    this.container.addEventListener("scroll", this.onScroll);
  }

  /* -------------------------------------------
     SCROLL HANDLER
  ------------------------------------------- */
  onScroll() {
    this.renderVisibleItems();
  }

  /* -------------------------------------------
     MAIN WINDOWING LOGIC
  ------------------------------------------- */
  renderVisibleItems() {
    this.content.innerHTML = "";

    const scrollTop = this.container.scrollTop;
    const containerHeight = this.container.clientHeight;

    /* Find first visible index */
    const startIndex = Math.floor(scrollTop / this.itemHeight);

    /* Items visible in viewport */
    const visibleCount = Math.ceil(containerHeight / this.itemHeight);

    /* Add buffer before + after */
    const from = Math.max(0, startIndex - this.buffer);
    const to = Math.min(
      this.items.length - 1,
      startIndex + visibleCount + this.buffer
    );

    const fragment = document.createDocumentFragment();

    for (let i = from; i <= to; i++) {
      const item = this.items[i];

      const row = document.createElement("div");
      row.className = "virtual-item";

      row.style.position = "absolute";
      row.style.top = `${i * this.itemHeight}px`;
      row.style.height = `${this.itemHeight}px`;
      row.style.width = "100%";

      row.innerHTML = this.renderItem(item, i);

      fragment.appendChild(row);
    }

    this.content.appendChild(fragment);
  }

  /* -------------------------------------------
     PUBLIC API
  ------------------------------------------- */

  scrollToIndex(index) {
    this.container.scrollTop = index * this.itemHeight;
  }

  destroy() {
    this.container.removeEventListener("scroll", this.onScroll);
    this.container.innerHTML = "";
  }
}
