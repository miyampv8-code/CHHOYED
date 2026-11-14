Color and typography are the quickest way to change the feel of a page.

## Syntax

```css
color: value;              /* text color */
background-color: value;   /* background color */
font-family: name, fallback;
font-size: size;
```

## Ways to write a color

```css
p { color: tomato; }                 /* a color name */
p { color: #1e90ff; }                /* hex code */
p { color: rgb(30, 144, 255); }      /* red, green, blue (0-255) */
p { color: rgba(30, 144, 255, 0.5); }/* with transparency */
```

Use a color picker in your editor, or a website such as a "color palette generator", to find colors that go well together.

## Fonts and text

```css
body {
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 18px;
  line-height: 1.6;
  color: #222;
}

h1 {
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
  text-transform: uppercase;
}

a {
  text-decoration: none;
}
```

| Property | What it does |
|---|---|
| `font-family` | The typeface. List a fallback in case the first is missing. |
| `font-size` | The size of the text |
| `font-weight` | Thickness (400 normal, 700 bold) |
| `line-height` | Space between lines. `1.6` is comfortable to read. |
| `text-align` | `left`, `center`, `right` |
| `text-transform` | `uppercase`, `lowercase`, `capitalize` |

## Units

- `px` is a fixed size in pixels.
- `em` and `rem` scale with the text size. `1rem` is the default font size, usually 16px.
- `%` is a part of the parent.

> Use `rem` for font sizes so your page respects the visitor's own text-size setting.

## Try it

Style your profile page: a light gray background on `body`, a readable font, `line-height: 1.6` and a colored heading.
