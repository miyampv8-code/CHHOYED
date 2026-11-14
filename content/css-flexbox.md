**Flexbox** is a layout tool that arranges items in a row or a column, and spaces them out for you. It is perfect for menus, card rows and centering.

## Syntax

```css
.container {
  display: flex;
}
```

The element with `display: flex` is the **container**. Its direct children become **flex items**.

## A navigation bar

```html
<nav class="menu">
  <a href="#">Home</a>
  <a href="#">Courses</a>
  <a href="#">Contact</a>
</nav>
```

```css
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}
```

## The key properties

| Property | What it does |
|---|---|
| `flex-direction` | `row` (default) or `column` |
| `justify-content` | Spacing along the **main** direction: `flex-start`, `center`, `space-between`, `space-around` |
| `align-items` | Alignment across the other direction: `flex-start`, `center`, `stretch` |
| `gap` | Space between the items |
| `flex-wrap` | `wrap` lets items move to a new line when there is no room |

## Centering anything

This is the famous trick that used to be hard:

```css
.center-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
```

`100vh` means the full height of the screen.

## Items that grow

```css
.sidebar { width: 200px; }
.content { flex: 1; }
```

`flex: 1` tells the content to take all the remaining space.

## A row of cards

```css
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 250px;
}
```

Each card is at least about 250px wide, and they wrap onto new lines on small screens.

## Try it

Turn your navigation links into a horizontal menu with Flexbox, then center a card in the middle of the screen.
