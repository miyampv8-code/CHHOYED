A **portfolio** is a small website about **you**: who you are, what you can do, and how to reach you. It is the best proof of your skills, because visitors can see real work instead of only reading "I know HTML" on a CV.

In this course you will build a complete, responsive portfolio with a dark mode, and publish it on the internet for free. You will use everything from the HTML, CSS, JavaScript, Terminal and Git courses.

## Who will read it?

Employers, clients and teachers look at a portfolio for about **30 seconds**. They want to know three things quickly: who you are, what you built, and how to contact you. So the page must be short, clear and easy to scan.

## The sections of your page

| Section | Purpose | What to write |
|---|---|---|
| **Header and menu** | Let visitors jump around | Your name and 4 links |
| **Hero** | The first thing people see | Your name, one sentence about you, two buttons |
| **About** | Who you are | 2 or 3 short sentences |
| **Skills** | What you can do | 5 or 6 skills |
| **Projects** | Proof of your work | 3 projects, one sentence each |
| **Contact** | How to reach you | Your email |
| **Footer** | A calm ending | Copyright line |

## Write the words first

Good websites start with good words, not with colors. Before you code, write these in a text file:

1. Your **name** and your **role** (for example "student web developer").
2. **One sentence** that says what you do and for whom.
3. **Three sentences** about you. Be honest and friendly.
4. A list of **5 skills** you really have.
5. **3 projects**: a name and one sentence each. Use projects from the courses of this site, such as your profile page and your to-do list.
6. Your **email address**.

> **Remember**
> Do not write "I am a hard-working and passionate person." Every portfolio says that. Say something specific: "I built a to-do list that saves tasks in the browser."

## Sketch on paper

Draw your page as boxes on paper, **for a phone first**, because most visitors will open it on a phone. Draw one column, the sections one under the other. Then draw how it grows on a laptop: the hero gets two columns, and the projects sit in a row.

## Choose a simple design

- **One accent color** for buttons and links. Purple, blue or green all work.
- **Light and dark** themes, which you will build with CSS variables.
- **System fonts**. They load instantly and look clean on every device.
- **Lots of space.** White space makes a page look professional.

## Create the project folder

Use the terminal and Git, as you learned in the earlier courses.

```bash
mkdir my-portfolio
cd my-portfolio
git init -b main
touch index.html style.css script.js
mkdir images
code .
```

Your folder now looks like this:

```plaintext
my-portfolio/
├── index.html     the structure and the words
├── style.css      the colors, layout and responsive rules
├── script.js      the menu, the dark mode and the filter
└── images/        photos and screenshots
```

> **Key idea**
> Name the home page exactly `index.html`, in lowercase. Web servers, including GitHub Pages, look for that file first. Use lowercase names without spaces for every file, such as `my-photo.jpg`.

## Try it

1. Write all the words from the list above in a text file.
2. Sketch the phone version and the laptop version on paper.
3. Create the folder, run `git init`, and make a first commit with the empty files.
