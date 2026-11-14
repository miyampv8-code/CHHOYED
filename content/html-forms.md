A form lets visitors send information: a login, a registration, a message. Forms are how a page talks back to a server.

## Syntax

```html
<form action="/send" method="post">
  <label for="name">Name</label>
  <input type="text" id="name" name="name">
  <button type="submit">Send</button>
</form>
```

- `<form>` wraps all the fields. `action` is where the data is sent.
- `<label>` names a field. `for` must match the field's `id`, so clicking the label selects the field.
- `<input>` is the field. `type` decides what kind of field it is.
- `name` is the label the server uses to read the value.

## Common input types

| Type | Used for |
|---|---|
| `text` | One line of text |
| `email` | An email address (the browser checks the format) |
| `password` | Hidden characters |
| `number` | Numbers only |
| `date` | A date picker |
| `checkbox` | Tick one or more options |
| `radio` | Choose exactly one option |

## A complete example

```html
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required>

  <label for="pass">Password</label>
  <input type="password" id="pass" name="pass" minlength="6" required>

  <label for="msg">Message</label>
  <textarea id="msg" name="msg" rows="4"></textarea>

  <p>Choose your level:</p>
  <input type="radio" id="b" name="level" value="beginner">
  <label for="b">Beginner</label>
  <input type="radio" id="a" name="level" value="advanced">
  <label for="a">Advanced</label>

  <label for="city">City</label>
  <select id="city" name="city">
    <option>Phnom Penh</option>
    <option>Siem Reap</option>
  </select>

  <button type="submit">Register</button>
</form>
```

- `required` stops the form from sending if the field is empty.
- `<textarea>` is for long text. `<select>` with `<option>` makes a drop-down list.
- Radio buttons with the **same** `name` belong to one group.

> The browser checks `required`, `type="email"` and `minlength` for you. But always check the data again on the server, because anyone can bypass the browser.

## Try it

Build a sign-up form with name, email, password and a drop-down list of your favourite subject.
