Now you give the skeleton its looks: colors, spacing, layout, and a version for phones. Your HTML does not change at all. CSS reads the same elements and styles them.

## Your HTML (from the last lesson)

This is the page you built. It is repeated here so the **Try it** button of the CSS below can show a real preview. If you finished the last lesson, you already have this file.

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

## The complete style.css

Type this into `style.css`, and press **Try it** to see the result. Try changing `--accent` to another color.

```css
/* 1. Colors and sizes, saved once as variables */
:root {
  --bg: #ffffff;
  --text: #1a1a2e;
  --muted: #5b6078;
  --card: #f4f5fb;
  --line: #e3e6f0;
  --accent: #5b3df5;
  --accent-text: #ffffff;
  --radius: 14px;
}

:root[data-theme="dark"] {
  --bg: #0f1020;
  --text: #eceefb;
  --muted: #a0a6c8;
  --card: #181a33;
  --line: #2a2d52;
  --accent: #9b8cff;
  --accent-text: #0f1020;
}

/* 2. Basics */
* { box-sizing: border-box; }

html { scroll-behavior: smooth; scroll-padding-top: 80px; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
}

.container { width: min(1000px, 92%); margin: 0 auto; }

h1, h2, h3 { line-height: 1.2; }
a { color: var(--accent); }

/* 3. Header and menu */
.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: var(--bg);
  border-bottom: 1px solid var(--line);
}

.bar { display: flex; align-items: center; gap: 14px; min-height: 64px; }
.brand { font-weight: 800; font-size: 1.2rem; text-decoration: none; color: var(--text); }
.nav { display: flex; gap: 20px; margin-left: auto; }
.nav a { text-decoration: none; color: var(--muted); font-weight: 600; }
.nav a:hover { color: var(--accent); }

.icon-btn {
  padding: 8px 14px;
  border: 1px solid var(--line);
  border-radius: 99px;
  background: var(--card);
  color: var(--text);
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

.menu-btn { display: none; }

/* 4. Hero */
.hero {
  display: grid;
  gap: 30px;
  align-items: center;
  padding: 60px 0 40px;
}

.eyebrow { margin: 0; color: var(--accent); font-weight: 700; }
.hero h1 { margin: 6px 0 12px; font-size: clamp(2.4rem, 7vw, 4rem); }
.lead { font-size: 1.15rem; color: var(--muted); max-width: 34em; }
.actions { display: flex; gap: 12px; flex-wrap: wrap; }

.btn {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 99px;
  background: var(--accent);
  color: var(--accent-text);
  font-weight: 700;
  text-decoration: none;
  transition: transform .2s, box-shadow .2s;
}

.btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px -10px var(--accent); }
.btn.alt { background: transparent; color: var(--text); border: 2px solid var(--line); }

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 3.4rem;
  font-weight: 800;
  color: #fff;
  background: linear-gradient(135deg, #5b3df5, #ff7a59);
}

/* 5. Sections */
.section { padding: 40px 0; }
.section h2 { font-size: 1.8rem; margin: 0 0 14px; }

.chips { list-style: none; display: flex; flex-wrap: wrap; gap: 10px; padding: 0; margin: 0; }
.chips li, .chip {
  padding: 8px 16px;
  border-radius: 99px;
  background: var(--card);
  border: 1px solid var(--line);
  font: inherit;
  font-weight: 600;
  color: var(--text);
}

.filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; }
.filters .chip { cursor: pointer; }
.filters .chip.active { background: var(--accent); border-color: var(--accent); color: var(--accent-text); }

/* 6. Project cards */
.grid { display: grid; gap: 18px; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }

.card {
  padding: 22px;
  border-radius: var(--radius);
  background: var(--card);
  border: 1px solid var(--line);
  transition: transform .2s, box-shadow .2s;
}

.card:hover { transform: translateY(-4px); box-shadow: 0 16px 30px -18px rgba(0, 0, 0, .35); }
.card h3 { margin: 0 0 8px; }
.card p { color: var(--muted); }
.card[hidden] { display: none; }

/* 7. Footer */
.site-footer { margin-top: 40px; padding: 24px 0; border-top: 1px solid var(--line); color: var(--muted); text-align: center; }

/* 8. Larger screens: two columns in the hero */
@media (min-width: 800px) {
  .hero { grid-template-columns: 1fr auto; }
  .avatar { width: 240px; height: 240px; font-size: 4.4rem; }
}

/* 9. Phones: the menu opens and closes with the button */
@media (max-width: 700px) {
  .menu-btn { display: inline-block; }
  .nav {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    padding: 8px 4%;
    background: var(--bg);
    border-bottom: 1px solid var(--line);
  }
  .nav.open { display: flex; }
  .nav a { padding: 12px 0; }
  .icon-btn:first-of-type { margin-left: auto; }
}
```

## What each part does

| Part | What it does |
|---|---|
| **1. Variables** | The colors and the corner size are saved once, in `:root`, and used everywhere with `var(--accent)`. To change the whole design, you change one line |
| **2. Basics** | `box-sizing: border-box` makes sizes easier to calculate. `scroll-behavior: smooth` makes menu links glide. `scroll-padding-top` stops the sticky header from covering the section title |
| **3. Header** | `position: sticky` keeps the header at the top while you scroll. Flexbox puts the brand, menu and buttons in one row, and `margin-left: auto` pushes the menu to the right |
| **4. Hero** | `clamp(2.4rem, 7vw, 4rem)` makes the title grow and shrink with the screen, but never too small or too big |
| **5. Sections** | The skills are rounded "chips". The `.active` chip shows which filter is chosen |
| **6. Cards** | CSS Grid with `repeat(auto-fit, minmax(250px, 1fr))` builds as many columns as fit. On a phone you get one column, on a laptop three, with no media query |
| **7. Footer** | A thin line on top and calm, grey text |
| **8. Larger screens** | `@media (min-width: 800px)` makes the hero two columns, and the avatar bigger |
| **9. Phones** | `@media (max-width: 700px)` hides the menu behind the **Menu** button. The class `.open`, which JavaScript adds, shows it |

## Dark mode with variables

Look at this block:

```css
:root[data-theme="dark"] {
  --bg: #0f1020;
  --text: #eceefb;
  --accent: #9b8cff;
}
```

When the `<html>` tag has the attribute `data-theme="dark"`, the same variable names get **new values**. Because every rule uses the variables, the whole page changes colors at once. In the next lesson, JavaScript will set this attribute when the visitor presses the **Dark** button.

## Smooth little effects

Buttons and cards use `transition` and `transform: translateY(-2px)` on `:hover`, so they lift a little when the mouse is over them. Keep effects small and fast. Too much motion tires the reader.

> **Key idea**
> **Mobile first** thinking: the base CSS works for a small screen, and the `@media (min-width: ...)` rules add changes for bigger screens. This is how most professional sites are built.

## Save your work

```bash
git add .
git commit -m "Add portfolio styles"
```

## Try it

1. Change `--accent` to a color you like, and see the whole page change.
2. Change the `minmax(250px, 1fr)` to `minmax(180px, 1fr)` and watch the cards.
3. Open the browser tools (F12) and use the phone icon to test a narrow screen. Open the **Elements** tab and change a color live.
