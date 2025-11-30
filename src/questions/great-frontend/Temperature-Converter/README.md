Build a simple temperature converter widget that contains two text inputs temperatures in Celsius and Fahrenheit respectively, allowing for conversion between the temperature scales.

## Requirements

- Initially, both fields are empty. When a number value is entered into a text input, the other input will be calculated and reflected.
- Round to 4 decimal places where necessary.
- If a non-numerical string is entered into one input, the other input will be blank.

*The last two requirements might not be given to you during interviews, you're expected to clarify.*

P.S. To convert temperatures in degrees Celsius to Fahrenheit, multiply by 1.8 (or 9/5) and add 32.

Here's an example of [Google's temperature converter](https://www.google.com/search?q=celsius+to+fahrenheit) (ignore the bottom row showing the formula):

![Google's temperature converter widget](https://www.gfecdn.net/img/questions/temperature-converter/google-search-temperature-converter.png)


# Editorial

## Solution

This question evaluates whether you know how to attach events to form inputs and manipulate the values of other inputs in response.

Since the input fields are pretty symmetrical, we can extract out a conversion function to update the other input via a formula.

Probably the most tricky part of the question is the number formatting. Refer to the notes below.

## Notes

- Use a `<label>` for the form fields to indicate what the input is for.
- Using `<input type="number">` is helpful for allowing only numerical values and stepper controls.
- Number formatting is tricky:
  - `Number()` constructor: converts a value into a number or `NaN` if not possible. Note that `Number(anyFalseyValue)` gives 0, so we need to differentiate the empty string case from a real 0.
  - `Number.IsNaN()`: determine if a value is a number.
  - `/\.\d{5}/`: this regex tests if a number has 5 or more decimal places.

## Test cases

### Basic cases
- Enter **0 C** and see **32 F** (without decimals)
- Enter **32 F** and see **0 C**

### Invalid inputs
- Enter alphabets in either field → the other should be empty.

### Decimal cases
- Enter **1 C** and see **33.8 F** (1 d.p.)
- Enter **1 F** and see **-17.2222 C** (4 d.p.)
