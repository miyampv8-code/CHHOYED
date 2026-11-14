**Grid** arranges items in rows **and** columns at the same time. Use Flexbox for one direction (a row or a column), and Grid for whole-page or card-gallery layouts.

## Syntax

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
```

`1fr` means "one share of the free space". Three `1fr` columns are three equal columns.

## A gallery of cards

```html
<div class="gallery">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.item {
  background: lightblue;
  padding: 30px;
  text-align: center;
}
```

The six items fill two rows of three automatically.

## A grid that adapts by itself

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
```

Each column is at least 220px wide. The grid fits as many columns as there is room for. No media queries needed.

## A page layout

```css
.page {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  gap: 16px;
}

header  { grid-area: header; }
aside   { grid-area: sidebar; }
main    { grid-area: main; }
footer  { grid-area: footer; }
```

You draw the layout with names, and each element picks its area.

| Flexbox | Grid |
|---|---|
| One direction | Rows and columns |
| Content decides the layout | The layout decides the content |
| Menus, toolbars, small groups | Galleries, whole pages |

## Try it

Make a gallery of six cards that uses `repeat(auto-fit, minmax(220px, 1fr))`. Resize the browser window and watch the columns change.
