Your page looks good. Now you make it **do** things, with four small features: a menu that opens on phones, a dark-mode button that remembers the choice, a project filter, and an automatic year in the footer. You do not change the HTML or the CSS. JavaScript only finds elements by their `id` and reacts to clicks.

## The parts of the page that the script uses

This is a short version of your page with only the elements the script touches. It is here so **Try it** can run the script below. Your real `index.html` already has all of them.

```html
<header class="site-header">
  <div class="container bar">
    <a class="brand" href="#top">Sok Dara</a>
    <nav id="nav" class="nav">
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
    </nav>
    <button class="icon-btn" id="theme-btn" type="button">Dark</button>
    <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>
  </div>
</header>

<section id="projects" class="container section">
  <div class="filters" id="filters">
    <button type="button" class="chip active" data-filter="all">All</button>
    <button type="button" class="chip" data-filter="web">Websites</button>
    <button type="button" class="chip" data-filter="app">Small apps</button>
  </div>
  <div class="grid" id="grid">
    <article class="card" data-type="web"><h3>Profile page</h3></article>
    <article class="card" data-type="app"><h3>To-do list</h3></article>
    <article class="card" data-type="app"><h3>Quiz game</h3></article>
  </div>
</section>

<p>&copy; <span id="year">2026</span> Sok Dara</p>
```

## The complete script.js

Type this into `script.js`, press **Try it**, then click **Run**. (The preview has no CSS, so the page is plain, but the buttons work.)

```javascript
// 1. Footer: show the current year
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Mobile menu: open and close
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// Close the menu after the visitor taps a link
nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// 3. Dark mode: remember the choice
const themeBtn = document.getElementById("theme-btn");
const root = document.documentElement;

function setTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.textContent = theme === "dark" ? "Light" : "Dark";
  themeBtn.setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  try { localStorage.setItem("theme", theme); } catch (e) { }
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) { }
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(saved || (prefersDark ? "dark" : "light"));

themeBtn.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// 4. Project filter: show only one kind of project
const filters = document.getElementById("filters");
const cards = document.querySelectorAll("#grid .card");

filters.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  filters.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  button.classList.add("active");

  const type = button.dataset.filter;
  cards.forEach((card) => {
    card.hidden = type !== "all" && card.dataset.type !== type;
  });
});
```

## How it works

**1. The year.** `new Date().getFullYear()` reads the year from the computer clock, so you never edit the footer again.

**2. The mobile menu.** `nav.classList.toggle("open")` adds the class `open` if it is missing, and removes it if it is there. It also returns `true` or `false`, which the script copies into `aria-expanded`, so screen readers know the state. The second listener closes the menu when a link inside it is tapped. It uses **event delegation**: one listener on the `<nav>` handles all four links.

**3. Dark mode.**

| Line | What it does |
|---|---|
| `root.dataset.theme = theme` | Sets `data-theme="dark"` on `<html>`. Your CSS variables do the rest |
| `localStorage.setItem("theme", theme)` | Saves the choice in the visitor's browser |
| `try ... catch` | Storage can fail (private mode, blocked cookies). The page must still work |
| `matchMedia("(prefers-color-scheme: dark)")` | Asks the phone or computer: "does the person use dark mode?" |
| `saved or the system choice or light` | Uses the saved choice first, then the system choice, then light |

**4. The project filter.** The script listens for clicks on the whole `#filters` box. It finds the button with `closest("button")`, marks it `active`, then goes through every card. The card's `hidden` property is `true` when its `data-type` is not the chosen one. Your CSS rule `.card[hidden]` hides it.

> **Key idea**
> Three habits make this script professional: it **waits for nothing it does not need** (the script is at the end of the page), it **never crashes** if storage is blocked, and it uses **classes and data attributes** to change the page. JavaScript decides **when**, and CSS decides **how it looks**.

## Make it better

1. Show a small message in the footer when the theme changes.
2. Add a "Back to top" button that appears after the visitor scrolls down.
3. Make the cards fade in when they enter the screen (search for `IntersectionObserver`).
4. Add a new filter button and a fourth project, then change **only** the HTML. The script already handles it. That is the point of using `data-filter` and `data-type`.

## Save your work

```bash
git add .
git commit -m "Add portfolio menu, dark mode and filter"
```

## Try it

1. Open your page, press **Dark**, then refresh. Is the dark theme still there?
2. Open the browser console (F12). Are there any red errors?
3. Test the menu on a narrow screen, using the phone icon in the browser tools.
