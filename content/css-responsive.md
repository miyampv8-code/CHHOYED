People open your website on phones, tablets, laptops and big screens. **Responsive design** means the page adapts to every screen size.

## Step 1: the viewport tag

Your HTML `<head>` must contain this line. Without it, phones show a tiny zoomed-out page.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

## Step 2: flexible sizes

```css
img {
  max-width: 100%;
  height: auto;
}

.container {
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
}
```

Use percentages, `max-width`, Flexbox and Grid instead of fixed pixel widths.

## Step 3: media queries

A media query applies CSS only when a condition is true.

```css
@media (max-width: 600px) {
  .menu {
    flex-direction: column;
  }
  h1 {
    font-size: 1.6rem;
  }
}
```

This means: "when the screen is 600px wide **or less**, stack the menu and make the heading smaller."

## Mobile first

Write the CSS for small screens first, then add rules for larger screens:

```css
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 700px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1000px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

One column on a phone, two on a tablet, three on a laptop.

## Common breakpoints

| Device | Width |
|---|---|
| Phone | up to about 600px |
| Tablet | about 600px to 1000px |
| Laptop and desktop | 1000px and above |

> Test your page on a real phone. In your browser, press **F12** and click the phone icon to simulate any device.

## Try it

Make your profile page show one column on a phone and two columns on a laptop. Test it in the browser's device mode.
