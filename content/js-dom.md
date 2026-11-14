The **DOM** (Document Object Model) is the page as JavaScript sees it: a tree of objects, one for each HTML element. With the DOM, JavaScript can read, change, add and remove anything on the page.

## Syntax

```javascript
document.querySelector("selector")      // the first match
document.querySelectorAll("selector")   // all matches
```

You use the **same selectors as CSS**: `h1`, `.card`, `#title`.

## Change text and style

```html
<h1 id="title">Hello</h1>
<p class="note">A note</p>

<script>
  const title = document.querySelector("#title");

  title.textContent = "Welcome to my page";
  title.style.color = "tomato";
  title.classList.add("big");
</script>
```

| Code | What it does |
|---|---|
| `el.textContent = "..."` | Changes the text |
| `el.innerHTML = "..."` | Changes the HTML inside |
| `el.style.color = "red"` | Changes one style |
| `el.classList.add("x")` | Adds a CSS class |
| `el.classList.remove("x")` | Removes a CSS class |
| `el.classList.toggle("x")` | Adds it if missing, removes it if present |
| `el.setAttribute("src", "a.jpg")` | Changes an attribute |

## Create new elements

```html
<ul id="list"></ul>

<script>
  const list = document.querySelector("#list");
  const fruits = ["Mango", "Banana", "Orange"];

  for (const fruit of fruits) {
    const li = document.createElement("li");
    li.textContent = fruit;
    list.appendChild(li);
  }
</script>
```

The page now shows three list items that JavaScript built.

## Remove an element

```javascript
const old = document.querySelector(".note");
old.remove();
```

> Put your `<script>` at the end of the `<body>`, or add the attribute `defer`. The page elements must exist before JavaScript looks for them.

> Use `textContent` when you insert text typed by a visitor. `innerHTML` can run dangerous code if the text contains HTML.

## Try it

Create an empty `<ul>` in your page, and use a `for...of` loop to fill it with your five favourite foods.
