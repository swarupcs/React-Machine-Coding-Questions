Create a star rating widget that allows users to select a rating value.

## Requirements

- The widget accepts two parameters: the maximum number of stars and the number of currently filled stars.
- When a star is clicked, it is filled along with all the stars to its left.
- Hovering over a star fills that star and all stars to its left.
  - The stars which need to be filled during hover take priority over existing filled state.
  - If the cursor leaves the widget and no new selection is made, the appropriate stars revert to the filled state before the hovering.
- Make the star rating widget reusable such that multiple instances can be rendered within the same page.

The star icons, both empty and filled, are provided to you as SVGs.

A `StarRating.js` skeleton component has been created for you. You are free to decide the props of `<StarRating />`.


# Editorial

## Solution

The solution is much shorter using framework/library as compared to the Vanilla version.

We can create a `Star` component that takes in a `filled` prop which conditionally renders the appropriate classnames.

The component will need a state `hoveredIndex` which is used to track the index of the currently hovered star.

To determine whether a `Star` should be highlighted/filled, we check if any stars are currently hovered. If so, that takes priority and any star with `index <= hoveredIndex` should be highlighted. Otherwise, any star where `index < value` can be highlighted/filled.

## Notes

The Star Rating widget can be improved in the following ways:

- Allow the value to be part of a form submit event data by embedding an `<input>`.
- Add keyboard support for better a11y.
- Add RTL (right-to-left) support.

## Test cases

- Click on each star and move the cursor away, see that the highlighted state is correct.
- Hover over each star, see that every star under the cursor and to its left are highlighted.
  - Remove cursor over widget, see that the highlighted state is back to before the hovering.
- Render multiple components, ensure that each can maintain its own state and interacting with a widget does not affect other onscreen components.
