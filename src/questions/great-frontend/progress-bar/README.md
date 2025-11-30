Create a widget that renders the current time in HH:MM:SS format using a 7-segment digital display. You are free to choose to use 12-hour or a 24-hour display.

Here's an example of a digital clock. Each digit needs to be rendered by individual segments, but you can exercise your creativity by choosing different colors and styling it differently. It should however still function as a clock, allowing the user to read the time.

![Digital clock example](https://www.gfecdn.net/img/questions/digital-clock/digital-clock-example.jpg)


# Editorial

## Solution

We can separate out the solution into two parts, the update loop and the rendering.

### Update loop

We need a timer to refresh the page and display the current time every second. To create the timer, we can use a `setInterval` and kick off the update loop in a `useEffect`.

Do remember to clear the timer upon unmounting of the component to prevent "setState on unmounted component" errors and memory leaks.

Store the JavaScript `Date` object as state as it contains all the data we need.

For better reusability, these logic can be abstracted into a custom `useCurrentDate` hook.

This part is exactly the same as the [Analog Clock](/questions/user-interface/analog-clock) question.

### Rendering

Now that we have access to the most updated `Date` in the `Clock` component, we can render it. Firstly create two smaller components for the `Digit` and `Separator`.

- `Digit`: renders numbers from 0–9 using the segment display. We make use of two square `<div>`s and CSS borders to achieve the effect. For each number, create a configuration of the borders that need to be shown and retrieve the configuration for that number.
- `Separator`: renders the two circles that look like colons.

To get the first digit of an hour/minute/second, we can divide by 10 and round it down. To get the second digit, we do modulo 10 to leave only the value in the ones-place.

## Test cases

- See that the clock updates every second.
- Observe the clock for at least 10 seconds to see that each digit is displayed correctly.

## Notes

The update frequency of the timer depends on how accurate we want the clock to be. The maximum we can set is 1000ms, however, the clock's accuracy might be off by 1000ms in the case we load the page on the last millisecond of the second. However, using too small of an interval can be quite expensive. Hence a middleground we've chosen is 100ms. The clock can only ever be off by 100ms, which is not very noticeable by humans.

The current date/time should be polled in each loop, as opposed to recording the time when the clock was first rendered and incrementing based on the interval duration of the timer because the invocations of the loop can be delayed by processes hogging the main thread and the loop may not run at every fixed interval.

## Accessibility

For a11y reasons, use a `<time>` element with `datetime` attribute set to the current time in 24-hour format so that screen readers can read this component. Otherwise the component will be ignored by screen readers, which is bad. Add the `aria-hidden` attribute to the internals of `<time>` since they are for presentation purposes and not useful to screen readers.
