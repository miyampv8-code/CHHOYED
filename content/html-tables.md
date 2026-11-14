A table shows data in rows and columns, such as a timetable or a list of prices.

## Syntax

```html
<table>
  <tr>
    <th>Heading</th>
  </tr>
  <tr>
    <td>Data</td>
  </tr>
</table>
```

- `<table>` is the whole table.
- `<tr>` is one row.
- `<th>` is a heading cell (bold and centered by default).
- `<td>` is a normal data cell.

## Example: a class timetable

```html
<table border="1">
  <tr>
    <th>Day</th>
    <th>Subject</th>
    <th>Time</th>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Math</td>
    <td>8:00</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Coding</td>
    <td>9:30</td>
  </tr>
</table>
```

`border="1"` draws simple lines so you can see the cells. Later, you will draw borders with CSS instead.

## Joining cells

```html
<td colspan="2">This cell is two columns wide</td>
<td rowspan="2">This cell is two rows tall</td>
```

## Better structure

```html
<table>
  <thead>
    <tr><th>Item</th><th>Price</th></tr>
  </thead>
  <tbody>
    <tr><td>Notebook</td><td>$1</td></tr>
  </tbody>
</table>
```

`<thead>` and `<tbody>` separate the heading from the body. They help CSS and screen readers.

> Use tables only for **data**. Do not use them to arrange the layout of a page. That is the job of CSS.

## Try it

Make a table of three friends with their name, age and favourite color.
