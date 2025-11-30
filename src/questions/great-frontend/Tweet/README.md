Write HTML and CSS to build Twitter's tweet UI.

![Tweet demo](https://www.gfecdn.net/img/questions/tweet/tweet.png)

Follow the given specifications as closely as you can. An example thumbnail and icon SVGs are provided to you in the template.

## Requirements

![Tweet specifications](https://www.gfecdn.net/img/questions/tweet/tweet-specs.png)

- **Tweet**

  - Background color: `#fff`
  - Border color: `#cfd9de`
  - Border width: `1px`
  - Border radius: `16px`
  - Padding: `12px`

- **Thumbnail**

  - Size: `48px`
  - Fully rounded

- **Name**

  - Color: `#000`
  - Font family: `sans-serif`
  - Font size: `15px`
  - Font weight: `bold`

- **Metadata**

  - Color: `#71767b`
  - Font family: `sans-serif`
  - Font size: `15px`
  - Use `&middot;` for the dot

- **Message**

  - Color: `#0f1419`
  - Font family: `sans-serif`
  - Font size: `15px`

- **Actions Row**

  - Max width: `425px`
  - Equal spacing between each action

- **Icon**

  - Color: `#536471`
  - Size: `16px`
  - Vertically centered with the count

- **Action Count**
  - Color: `#536471`
  - Font size: `13px`


Here's a compact, accessible HTML + CSS implementation that follows the spec. Copy-paste into a single `.html` file and open in the browser.



**Notes / tips**

* Icons use `stroke: currentColor` so they inherit `--icon-color`.
* `.action.no-count` reduces gap when no count is present.
* `min-width:0` on content allows text to truncate inside a flex column when needed.
* To match pixel-perfect specs or add truncation for very long names/handles, you can add `text-overflow:ellipsis` and a fixed `max-width`.
