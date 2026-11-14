Time to put everything together. In this lesson you build a complete personal profile page using only HTML.

## What you will use

Headings, paragraphs, an image, links, lists, a table, a form and semantic tags from the earlier lessons.

## The plan

1. A `<header>` with your name and a navigation menu.
2. An "About me" section with a photo and a paragraph.
3. A "My skills" section with a list.
4. A "My timetable" section with a table.
5. A "Contact me" section with a form.
6. A `<footer>`.

## Starter code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sok Dara - Profile</title>
</head>
<body>
  <header>
    <h1>Sok Dara</h1>
    <nav>
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>

  <main>
    <section id="about">
      <h2>About me</h2>
      <img src="images/me.jpg" alt="Photo of Sok Dara" width="200">
      <p>I am a student who loves coding.</p>
    </section>

    <section id="skills">
      <h2>My skills</h2>
      <ul>
        <li>HTML</li>
        <li>Math</li>
      </ul>
    </section>

    <section id="contact">
      <h2>Contact me</h2>
      <form>
        <label for="n">Your name</label>
        <input type="text" id="n" name="n">
        <label for="m">Message</label>
        <textarea id="m" name="m"></textarea>
        <button type="submit">Send</button>
      </form>
    </section>
  </main>

  <footer>
    <p>Copyright 2026 Sok Dara</p>
  </footer>
</body>
</html>
```

> The links `#about`, `#skills` and `#contact` jump to the section with the matching `id` on the same page.

## Your turn

Replace the sample text with your own information, and add the timetable section using a table. Your page will look plain. That is normal. In the CSS lessons you will make it beautiful.
