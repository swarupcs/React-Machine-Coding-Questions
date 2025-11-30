Building forms is a common task in Front End. In this exercise, we will build a basic "Contact Us" form, commonly seen on marketing websites for visitors to ask questions or provide feedback.

## Requirements

- The form should contain the following elements:
  - Name field.
  - Email field.
  - Message field. Since the message can be long, a `<textarea>` will be more suitable.
  - Submit button
    - Contains the text "Send".
    - Clicking on the submit button submits the form.
- The form and submission should be implemented entirely in HTML. Do not use any JavaScript or framework-specific features for this question.
- There is no need to do any client-side validation on the fields. Validation will be done on the server side.

## Submission API

Upon submission, `POST` the form data to:

```

[https://questions.greatfrontend.com/api/questions/contact-form](https://questions.greatfrontend.com/api/questions/contact-form)

```

with the following fields in the **request body**: `name`, `email`, `message`.

If all the form fields are correctly filled up, you will see an alert containing a success message. Congratulations!

## Notes

You do not need JavaScript for this question, the focus is on HTML form validation and submission.

# Editorial

## Solution

This is a basic question which evaluates your knowledge of the web platform. Forms and form submissions can entirely be built without any JavaScript! As a Front End Engineer, it's important to know what the platform provides and not resort to JavaScript for everything.

The first thing we need to do is to wrap the fields in a `<form>`, which is already given in the template. To tell the `<form>` which URL to submit the data to, we use the `action` attribute with the API URL as the value. The API URL is expecting a HTTP `POST` request, hence we also use `method="post"` on the `<form>`.

Form fields with the `name` attribute will have the attribute value become the key in the form data. Hence we can add `name="name"`, `name="email"`, `name="message"` to the various form fields. Do also add `<label>`s to label your `<input>`s.

Lastly, submit buttons can be implemented in two ways:

1. `<button type="submit">`: By default, `<button>`s have `type="submit"` as default and when used in `<form>`s, will trigger a form submission.
2. `<input type="submit">`: The element will be rendered as a button and clicking the `<input>` will trigger a form submission.

### Test cases

- **Fields**
  - All the fields can be updated.
- **Submission**
  - Clicking on the submit button triggers form submission.
  - Hitting Enter on the fields triggers form submission if form is valid (except for `<textarea>` which will add a new line).
  - Success alert is seen if all fields are filled during submission.

### Accessibility

- Link `<label>`s to `<input>`s so that clicking on the `<label>` will focus on the corresponding `<input>`.
  - Use `<label for="some-id">` and `<input id="some-id">` to define the relation between `<label>` and `<input>`.
  - Avoid nesting `<input>` inside of `<label>` because some assistive technologies (e.g. Dragon NaturallySpeaking) do not support it.

### Follow up

Now that you are familiar with form submission, try out a follow up question, **Signup Form**, where you will be asked to make an AJAX-based form request and client-side validation.
