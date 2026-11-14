Selectors choose **which** elements a rule applies to. Good selectors let you style exactly what you want, and nothing more.

## Syntax

```css
p { }          /* every p element */
.card { }      /* every element with class="card" */
#title { }     /* the one element with id="title" */
```

## Element, class and id

```html
<h1 id="title">My page</h1>
<p class="note">A note</p>
<p class="note">Another note</p>
<p>A normal paragraph</p>
```

```css
#title {
  color: crimson;
}

.note {
  background: lightyellow;
  padding: 8px;
}
```

| Selector | Matches | Rule of thumb |
|---|---|---|
| `p` | All `<p>` tags | Basic styling |
| `.name` | Elements with that class | Use for repeated styles |
| `#name` | The one element with that id | An id must be unique |

> Prefer **classes**. They can be used many times and are easy to reuse.

## Grouping and descendants

```css
h1, h2, h3 {
  font-family: Arial, sans-serif;
}

nav a {
  text-decoration: none;
}
```

- A comma means "this **and** that".
- A space means "inside": `nav a` matches links that are inside a `<nav>`.

## Pseudo-classes

A pseudo-class styles an element in a special state.

```css
a:hover {
  color: orange;
}

li:first-child {
  font-weight: bold;
}
```

## Try it

Give three paragraphs the class `note`, and style them with a yellow background. Then make links turn orange when the mouse is over them.
