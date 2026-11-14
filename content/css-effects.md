A little motion and a few smart tricks make a page feel polished and professional.

## Hover effects

```css
.button {
  background: royalblue;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
}

.button:hover {
  background: navy;
}
```

## Transitions

A transition animates a change smoothly instead of jumping.

```css
.button {
  background: royalblue;
  transition: background 0.3s, transform 0.3s;
}

.button:hover {
  background: navy;
  transform: translateY(-3px);
}
```

`0.3s` is the duration. `transform` can also `scale()` or `rotate()` an element.

## CSS variables

Store a value once and reuse it everywhere. To change your whole color scheme, you edit one line.

```css
:root {
  --main-color: #5b3df5;
  --radius: 12px;
}

.button {
  background: var(--main-color);
  border-radius: var(--radius);
}

h1 {
  color: var(--main-color);
}
```

## Simple animation

```css
@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fade-in 0.6s ease;
}
```

## Dark mode

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111;
    --text: #eee;
  }
}
```

The page follows the visitor's phone or computer setting.

> Use motion gently. Too many animations distract readers and can make some people feel unwell.

## Try it

Add a `:root` variable for your main color, a button with a smooth hover effect, and a fade-in animation for your cards.
