Every HTML element is a rectangular **box**. Understanding the box model is the key to controlling spacing and size.

## The four layers

From the inside out:

| Layer | Meaning | Property |
|---|---|---|
| Content | The text or image itself | `width`, `height` |
| Padding | Space **inside** the box, around the content | `padding` |
| Border | A line around the padding | `border` |
| Margin | Space **outside** the box, between it and its neighbours | `margin` |

## Syntax

```css
.card {
  width: 300px;
  padding: 16px;
  border: 2px solid steelblue;
  margin: 20px;
}
```

## Shortcuts for the four sides

```css
padding: 10px;                 /* all four sides */
padding: 10px 20px;            /* top and bottom, then left and right */
padding: 5px 10px 15px 20px;   /* top, right, bottom, left (clockwise) */
margin-bottom: 30px;           /* one side only */
```

## Border, radius and shadow

```css
.card {
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

## A problem and its fix

By default, `width: 300px` sets only the **content** width. The padding and border are added on top, so the box ends up wider than you expected. Fix it once for the whole page:

```css
* {
  box-sizing: border-box;
}
```

Now `width` includes the padding and border. Almost every modern website starts with this rule.

## Centering a block

```css
.container {
  max-width: 800px;
  margin: 0 auto;
}
```

`margin: 0 auto` centers a box with a set width. `max-width` lets it shrink on small screens.

## Try it

Create a `.card` with a border, rounded corners, a shadow and padding. Put your profile text inside, and center it on the page.
