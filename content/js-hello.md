**JavaScript** is the language that makes web pages **do** things: react to clicks, check forms, load data and update the screen without reloading. HTML is the skeleton, CSS is the paint, and JavaScript is the electricity and plumbing.

## Syntax

```javascript
console.log(value);
```

Each statement usually ends with `;`.

## Your first program

Add JavaScript to a page with the `<script>` tag, just before `</body>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello JS</title>
</head>
<body>
  <h1>Hello</h1>

  <script>
    console.log("Hello, World!");
    alert("Welcome to my page!");
  </script>
</body>
</html>
```

## How it works

- `console.log()` prints a message to the **console**, a tool for developers. Press **F12** in your browser and open the **Console** tab to see it.
- `alert()` shows a pop-up message to the visitor.
- The code runs from top to bottom.

## Put JavaScript in its own file

Like CSS, it is better to keep JavaScript in a separate file:

```html
<script src="script.js"></script>
```

```javascript
// script.js
console.log("Hello from a file!");
```

## Comments

```javascript
// A one-line comment

/* A comment
   over several lines */
```

> The console is your best friend. When something does not work, look at the console. Errors appear there in red, with the line number.

## Try it

Create `script.js`, link it to your page and print your name with `console.log`. Then show a welcome message with `alert`.
