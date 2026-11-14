An **event** is something that happens on the page: a click, a key press, a form submit. JavaScript can **listen** for events and run code when they happen. This is what makes pages interactive.

## Syntax

```javascript
element.addEventListener("event", function);
```

## A button that reacts

```html
<button id="btn">Click me</button>
<p id="msg"></p>

<script>
  const btn = document.querySelector("#btn");
  const msg = document.querySelector("#msg");

  btn.addEventListener("click", () => {
    msg.textContent = "You clicked the button!";
  });
</script>
```

## A counter

```html
<h2 id="count">0</h2>
<button id="plus">+1</button>

<script>
  let count = 0;
  const show = document.querySelector("#count");

  document.querySelector("#plus").addEventListener("click", () => {
    count++;
    show.textContent = count;
  });
</script>
```

## Common events

| Event | When it happens |
|---|---|
| `click` | The element is clicked or tapped |
| `input` | The visitor types in a field |
| `submit` | A form is sent |
| `keydown` | A key is pressed |
| `mouseover` | The mouse moves over an element |
| `change` | A select, checkbox or file input changes |

## Reading what the visitor types

```html
<input id="name" placeholder="Your name">
<p id="hello"></p>

<script>
  const input = document.querySelector("#name");

  input.addEventListener("input", () => {
    document.querySelector("#hello").textContent = "Hello, " + input.value;
  });
</script>
```

`input.value` holds the current text.

## Forms: stop the page from reloading

```javascript
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page from reloading
  console.log("Form sent");
});
```

The function receives an `event` object with details about what happened.

## Try it

Make a dark-mode button. When clicked, it toggles a class `dark` on `<body>`, and your CSS changes the background and text colors.
