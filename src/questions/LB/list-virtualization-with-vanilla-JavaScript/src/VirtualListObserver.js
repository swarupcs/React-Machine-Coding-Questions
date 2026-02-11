export class VirtualListObserver {
  constructor(container, options = {}) {
    this.container = container;
    this.items = options.items || [];
    this.itemHeight = options.itemHeight || 50;
    this.chunkSize = options.chunkSize || 20;

    this.renderItem =
      options.renderItem ||
      ((item) => `<div>${item.name}</div>`);

    this.chunks = new Map();
    this.observer = null;

    this.init();
  }

  /* -------------------------------------------
     INIT
  ------------------------------------------- */
  init() {
    this.container.style.position = "relative";
    this.container.style.overflow = "auto";

    this.content = document.createElement("div");
    this.content.style.height = `${this.items.length * this.itemHeight}px`;
    this.content.style.position = "relative";

    this.container.appendChild(this.content);

    this.setupObserver();
    this.createChunks();
  }

  /* Total chunk count */
  get totalChunks() {
    return Math.ceil(this.items.length / this.chunkSize);
  }

  /* -------------------------------------------
     OBSERVER SETUP
  ------------------------------------------- */
  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const chunkIndex = Number(entry.target.dataset.chunk);

          if (entry.isIntersecting) {
            this.mountChunk(chunkIndex);
          } else {
            this.unmountChunk(chunkIndex);
          }
        });
      },
      {
        root: this.container,
        rootMargin: "300px",
      }
    );
  }

  /* -------------------------------------------
     CREATE PLACEHOLDER CHUNKS
  ------------------------------------------- */
  createChunks() {
    for (let i = 0; i < this.totalChunks; i++) {
      const chunkEl = document.createElement("div");

      chunkEl.dataset.chunk = i;
      chunkEl.style.position = "absolute";
      chunkEl.style.top = `${i * this.chunkSize * this.itemHeight}px`;
      chunkEl.style.width = "100%";
      chunkEl.style.height = `${this.chunkSize * this.itemHeight}px`;

      this.content.appendChild(chunkEl);

      this.chunks.set(i, { element: chunkEl, mounted: false });

      this.observer.observe(chunkEl);
    }
  }

  /* -------------------------------------------
     RENDER CHUNK ITEMS
  ------------------------------------------- */
  mountChunk(chunkIndex) {
    const chunk = this.chunks.get(chunkIndex);
    if (!chunk || chunk.mounted) return;

    const start = chunkIndex * this.chunkSize;
    const end = Math.min(start + this.chunkSize, this.items.length);

    let html = "";

    for (let i = start; i < end; i++) {
      html += `
        <div class="virtual-item" style="height:${this.itemHeight}px">
          ${this.renderItem(this.items[i], i)}
        </div>
      `;
    }

    chunk.element.innerHTML = html;
    chunk.mounted = true;
  }

  unmountChunk(chunkIndex) {
    const chunk = this.chunks.get(chunkIndex);
    if (!chunk || !chunk.mounted) return;

    chunk.element.innerHTML = "";
    chunk.mounted = false;
  }

  /* -------------------------------------------
     PUBLIC API
  ------------------------------------------- */

  scrollToIndex(index) {
    this.container.scrollTop = index * this.itemHeight;
  }

  destroy() {
    this.observer.disconnect();
    this.container.innerHTML = "";
    this.chunks.clear();
  }
}
