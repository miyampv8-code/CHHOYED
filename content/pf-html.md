Now you build the **skeleton** of the page with HTML only. Do not think about colors yet. If the structure is good, the styling will be easy.

## The complete index.html

Type this code into your `index.html` (do not only copy it, you learn more by typing). Then change the text to **your own** information.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sok Dara | Web Developer</title>
  <meta name="description" content="Portfolio of Sok Dara, a student web developer from Phnom Penh.">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <div class="container bar">
      <a class="brand" href="#top">Sok Dara</a>
      <nav id="nav" class="nav" aria-label="Main menu">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <button class="icon-btn" id="theme-btn" type="button" aria-label="Switch to dark mode">Dark</button>
      <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
    </div>
  </header>

  <main id="top">
    <section class="hero container">
      <div>
        <p class="eyebrow">Hello, I am</p>
        <h1>Sok Dara</h1>
        <p class="lead">I am a student web developer. I build simple, fast and friendly websites with HTML, CSS and JavaScript.</p>
        <p class="actions">
          <a class="btn" href="#projects">See my projects</a>
          <a class="btn alt" href="#contact">Contact me</a>
        </p>
      </div>
      <div class="avatar" aria-hidden="true">SD</div>
    </section>

    <section id="about" class="container section">
      <h2>About me</h2>
      <p>I live in Phnom Penh and I am learning to code every day. I like to turn an idea into a working page, and I enjoy explaining what I learn to my friends.</p>
    </section>

    <section id="skills" class="container section">
      <h2>Skills</h2>
      <ul class="chips">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>Git and GitHub</li>
        <li>SQL</li>
      </ul>
    </section>

    <section id="projects" class="container section">
      <h2>Projects</h2>
      <div class="filters" id="filters">
        <button type="button" class="chip active" data-filter="all">All</button>
        <button type="button" class="chip" data-filter="web">Websites</button>
        <button type="button" class="chip" data-filter="app">Small apps</button>
      </div>
      <div class="grid" id="grid">
        <article class="card" data-type="web">
          <h3>Profile page</h3>
          <p>My first web page, built with HTML and CSS. It is responsive and works on phones.</p>
          <a href="#">View project</a>
        </article>
        <article class="card" data-type="app">
          <h3>To-do list</h3>
          <p>Add, finish and delete tasks. Built with JavaScript and the DOM.</p>
          <a href="#">View project</a>
        </article>
        <article class="card" data-type="app">
          <h3>Quiz game</h3>
          <p>Ten questions with a score at the end. It checks each answer with JavaScript.</p>
          <a href="#">View project</a>
        </article>
      </div>
    </section>

    <section id="contact" class="container section">
      <h2>Contact</h2>
      <p>Do you want to work together, or just say hello? Send me an email.</p>
      <p><a class="btn" href="mailto:dara@example.com">dara@example.com</a></p>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; <span id="year">2026</span> Sok Dara. Built with HTML, CSS and JavaScript.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>
```

Press **Try it** to see the page. It looks plain without CSS, and that is correct. You will style it in the next lesson.

## How the page is built

**The `<head>`**

| Line | Why it is there |
|---|---|
| `<meta charset="UTF-8">` | Shows every letter correctly, including Khmer |
| `<meta name="viewport" ...>` | Makes the page fit phone screens. Without it, phones show a tiny zoomed-out page |
| `<title>` | The text on the browser tab, and the big blue link in Google |
| `<meta name="description">` | The short text Google shows under the title |
| `<link rel="stylesheet" ...>` | Connects `style.css` |

**The `<body>`** uses the semantic tags you learned: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` and `<footer>`. They tell browsers, search engines and screen readers what each part means.

## Ideas worth noticing

- **Menu links that jump.** `<a href="#about">` jumps to the element with `id="about"`. The `id` of each section matches a menu link.
- **One `<h1>`.** The page has a single main heading, your name. Each section uses `<h2>`, and each project uses `<h3>`.
- **A list for the skills.** Skills are a list, so they use `<ul>` and `<li>`.
- **Cards as articles.** Each project is an `<article>` with a `data-type` attribute. JavaScript will use it to filter projects.
- **`aria-label`, `aria-expanded` and `aria-controls`.** These small attributes help screen readers. The menu button tells them whether the menu is open.
- **`type="button"`** on buttons that are not in a form, so they never try to submit anything.
- **The `&copy;` symbol** is how you write the copyright sign in HTML.
- **`<script>` at the end of `<body>`**, so the page appears first and the script runs after.

> **Remember**
> Avoid links that go nowhere. The three `href="#"` in the project cards are placeholders. When you finish a project, replace them with a real address, such as the GitHub repository or the live page.

## Make it yours

1. Replace "Sok Dara", the description and the city with your own.
2. Change the skills, and write your three real projects.
3. Replace `dara@example.com` with your real email, in both places.
4. Optional: put a photo at `images/me.jpg`, and replace the `avatar` div with:

```html
<img class="avatar" src="images/me.jpg" alt="Photo of Sok Dara" width="240" height="240">
```

Always write a meaningful `alt` text for a photo.

## Save your work

```bash
git add .
git commit -m "Add portfolio HTML structure"
```

## Try it

1. Open the page in the browser with Live Server, and click each menu link. Does it jump to the right section?
2. Check your page with the **Elements** tab in the browser tools (F12). Can you find your `<h1>`?
3. Run the commit above.
