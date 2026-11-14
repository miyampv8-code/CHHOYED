**CSS** (Cascading Style Sheets) controls how a web page **looks**: colors, fonts, spacing and layout. HTML is the skeleton of the house. CSS is the paint and decoration.

## Syntax

```css
selector {
  property: value;
}
```

- The **selector** says which elements to style.
- A **property** is what you want to change.
- A **value** is the new setting. Each line ends with `;`.

## Your first style

```css
h1 {
  color: darkblue;
  text-align: center;
}

p {
  font-size: 18px;
}
```

This makes every `<h1>` dark blue and centered, and every paragraph 18 pixels tall.

## Three ways to add CSS

**1. Inline**, inside one tag (avoid this, it is hard to maintain):

```html
<p style="color: red;">Red text</p>
```

**2. Internal**, inside `<style>` in the `<head>`:

```html
<head>
  <style>
    p { color: green; }
  </style>
</head>
```

**3. External**, in a separate file (the best way):

```html
<head>
  <link rel="stylesheet" href="style.css">
</head>
```

Put the CSS rules in `style.css`. One file can style every page of your website.

## Comments

```css
/* This is a CSS comment */
```

> "Cascading" means that when two rules clash, the browser picks the winner by clear rules. A later rule beats an earlier one, and a more specific selector beats a general one.

## Try it

Create `style.css`, link it to your profile page and give your `<h1>` a color and a centered position.
