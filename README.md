# CHHOYED

A static website where teachers' lessons are posted by the admin. No backend needed.

## Run on your computer
Open a terminal in this folder and run `python3 -m http.server 8000`, then visit http://localhost:8000.
(Opening index.html by double-click will not work, because browsers block loading the JSON files.)

## Add a teacher
Add an object to `data/teachers.json`. The `id` must be lowercase with dashes and never change. `photo` is optional: put an image in `images/teachers/` and write `images/teachers/name.jpg`. Without a photo, the teacher's initials are shown.

## How subjects are organised
`data/subjects.json` lists the subjects. A subject can have `topics`, like **Coding**, which has one topic per programming language (Java, Python, ...). Math, Physics and News have no topics. Each topic has its own page, its own colour and its own lesson order.

## Add a lesson
1. Write the lesson in `content/your-lesson.md`.
2. Add an entry to `data/posts.json`. `teacherId` must match a teacher `id`, and `subject` must match a subject `id` in `data/subjects.json`.
3. If the subject has topics (like Coding), also add `"topic": "java"` (the topic `id`).
4. For a step-by-step course, add `"order": 1, 2, 3...`. The order is counted separately inside each topic.
5. Check the browser console (F12) for messages about unknown teachers, subjects or topics.

## Add a new programming language
Add an object to the `topics` list of Coding in `data/subjects.json`:

    { "id": "cpp", "name": "C++", "color": "#00599c", "tagline": "Learn C++ from the basics" }

Then write lessons with `"subject": "coding"` and `"topic": "cpp"`. Nothing else needs to change.

## Publish on GitHub Pages
1. Create a repo named `CHHOYED` and push these files to the `main` branch.
2. Go to Settings, then Pages. Choose branch `main` and folder `/ (root)`, then Save.
3. Your site will be at https://YOUR-USERNAME.github.io/CHHOYED/
