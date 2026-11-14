Semantic tags describe the **meaning** of each part of a page. They help search engines, screen readers and other developers understand your page.

## Syntax

```html
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>
```

## The common semantic tags

| Tag | Meaning |
|---|---|
| `<header>` | The top of the page or section, often with the logo and title |
| `<nav>` | A group of navigation links |
| `<main>` | The main content of the page (use it once) |
| `<section>` | A themed group of content, usually with a heading |
| `<article>` | A piece that makes sense on its own, such as a blog post |
| `<aside>` | Side content, such as related links |
| `<footer>` | The bottom of the page or section |

## A typical page layout

```html
<body>
  <header>
    <h1>My School</h1>
    <nav>
      <a href="index.html">Home</a>
      <a href="courses.html">Courses</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Our courses</h2>
      <article>
        <h3>Web development</h3>
        <p>Learn HTML, CSS and JavaScript.</p>
      </article>
    </section>
    <aside>
      <p>New class starts in January.</p>
    </aside>
  </main>

  <footer>
    <p>Copyright 2026 My School</p>
  </footer>
</body>
```

## div and span

Sometimes no semantic tag fits. For those cases, HTML has two neutral containers:

- `<div>` is a **block** container. It starts on a new line.
- `<span>` is an **inline** container. It stays inside a line of text.

```html
<div class="card">
  <p>Price: <span class="price">$5</span></p>
</div>
```

They have no meaning on their own. You will style them with CSS using `class`.

## Try it

Rebuild your profile page with a `<header>`, a `<nav>` with three links, a `<main>` with two sections, and a `<footer>`.
