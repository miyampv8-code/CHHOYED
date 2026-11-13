# CHHOYED

A static website where teachers' lessons are posted by the admin. No backend needed.

## Run on your computer
Open a terminal in this folder and run `python3 -m http.server 8000`, then visit http://localhost:8000.
(Opening index.html by double-click will not work, because browsers block loading the JSON files.)

## Add a teacher
Add an object to `data/teachers.json`. The `id` must be lowercase with dashes and never change. `photo` is optional: put an image in `images/teachers/` and write `images/teachers/name.jpg`. Without a photo, the teacher's initials are shown.

## How subjects are organised
`data/subjects.json` lists the subjects. A subject can have `topics`, like **Coding**, which has one topic per programming language (Java, Python, C++, ...). Math, Physics and News have no topics. Each topic has its own page, its own colour and its own lesson order.

## Add a lesson
1. Write the lesson in `content/your-lesson.md`.
2. Add an entry to `data/posts.json`. `teacherId` must match a teacher `id`, and `subject` must match a subject `id` in `data/subjects.json`.
3. If the subject has topics (like Coding), also add `"topic": "java"` (the topic `id`).
4. For a step-by-step course, add `"order": 1, 2, 3...`. The order is counted separately inside each topic.
5. To attach a PDF, put it in the `files/` folder and add `"file": "files/name.pdf"` to the post. The lesson page then shows Open and Download buttons.
6. Check the browser console (F12) for messages about unknown teachers, subjects or topics.

## Add a new programming language
Add an object to the `topics` list of Coding in `data/subjects.json`:

    { "id": "csharp", "name": "C#", "color": "#68217a", "tagline": "Learn C#, from Hello World to OOP" }

Then write lessons with `"subject": "coding"` and `"topic": "csharp"`. Nothing else needs to change.

## Publish on GitHub Pages
1. Create a repo named `CHHOYED` and push these files to the `main` branch.
2. Go to Settings, then Pages. Choose branch `main` and folder `/ (root)`, then Save.
3. Your site will be at https://YOUR-USERNAME.github.io/CHHOYED/

## Logo and icons
The logo lives in `images/logo.svg` (header and browser tab). `images/apple-touch-icon.png` is the icon used when someone adds the site to a phone's home screen. To change the logo, replace these files and keep the same names.

## Add a book (PDF shown as page images)
Visitors read the book on the site, without opening a PDF.

1. Make the images. In a terminal inside the project folder, run:

       py make_book_pages.py "path/to/book.pdf" --id mybook

   This creates `images/books/mybook/0001.webp`, `0002.webp`, ... (one per PDF page).
2. Add one entry to `data/posts.json` for each lesson. No `.md` file is needed:

       { "id": "mybook-part-1", "title": "Part 1", "summary": "What this part is about.",
         "subject": "math", "teacherId": "someone", "date": "2026-11-13",
         "book": "mybook", "pages": [8, 45] }

   `pages` is [first page, last page] of the PDF. Add `topic`, `order` and `part` if the subject uses them, as for the Integral calculus lessons. If you also add a `contentFile`, its text is shown above the pages.
3. A second book is the same steps with a different `--id`. Each book has its own folder.