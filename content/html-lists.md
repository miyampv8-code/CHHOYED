Lists show several items in an organized way. HTML has two main kinds: **unordered** lists (bullets) and **ordered** lists (numbers).

## Syntax

```html
<ul>
  <li>item</li>
</ul>

<ol>
  <li>item</li>
</ol>
```

`<li>` means "list item". It always sits inside `<ul>` or `<ol>`.

## Unordered list

```html
<h2>Shopping list</h2>
<ul>
  <li>Rice</li>
  <li>Eggs</li>
  <li>Bananas</li>
</ul>
```

## Ordered list

```html
<h2>How to make tea</h2>
<ol>
  <li>Boil water</li>
  <li>Add the tea bag</li>
  <li>Wait three minutes</li>
</ol>
```

Use an ordered list when the **order matters**, such as steps.

## Nested lists

A list can live inside a list item.

```html
<ul>
  <li>Fruits
    <ul>
      <li>Mango</li>
      <li>Orange</li>
    </ul>
  </li>
  <li>Vegetables</li>
</ul>
```

## Try it

Make an ordered list of your daily routine, and a nested unordered list with three things you do in the evening.
