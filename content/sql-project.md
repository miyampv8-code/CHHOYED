Now use everything: `SELECT`, `WHERE`, `GROUP BY`, `INSERT`, `UPDATE`, `DELETE` and joins. You will work on the school database you built in this course, then see how a real app talks to a database.

## Your database

You have three tables:

| Table | Columns |
|---|---|
| `students` | id, name, age, city, score |
| `courses` | id, title, teacher |
| `enrollments` | id, student_id, course_id |

## Part 1: answer the questions

Write one query for each task. Try them **before** you look at the solutions.

1. Show the names and cities of all students, sorted by name.
2. Show the students who live in Phnom Penh and scored more than 50.
3. Show the average score of each city, from highest to lowest.
4. Show the names of the students who take the CSS course.
5. Show every course title with the number of students in it.
6. Show the students who are enrolled in **more than one** course.
7. Show the teacher "Mr. Dara" with the total number of enrollments in all his courses.
8. Enroll Heng Rithy (student 5) in the SQL course (course 4), then show the course list again.

## Solutions

Compare your queries with these. There is often more than one correct way.

**Task 3: average score of each city**

```sql
SELECT city, ROUND(AVG(score), 1) AS average_score
FROM students
GROUP BY city
ORDER BY average_score DESC;
```

Result:

| city | average_score |
|---|---|
| Siem Reap | 78.0 |
| Battambang | 76.0 |
| Phnom Penh | 66.5 |

**Task 4: students who take CSS**

```sql
SELECT s.name
FROM students s
JOIN enrollments e ON e.student_id = s.id
JOIN courses c ON c.id = e.course_id
WHERE c.title = 'CSS'
ORDER BY s.name;
```

Result:

| name |
|---|
| Chan Sophea |
| Kim Vanna |

**Task 5: students in every course**

```sql
SELECT c.title, COUNT(e.id) AS students
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY c.id;
```

Result:

| title | students |
|---|---|
| HTML | 3 |
| CSS | 2 |
| JavaScript | 3 |
| SQL | 0 |

**Task 6: students in more than one course**

```sql
SELECT s.name, COUNT(*) AS courses_taken
FROM students s
JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id, s.name
HAVING COUNT(*) > 1
ORDER BY s.name;
```

Result:

| name | courses_taken |
|---|---|
| Chan Sophea | 3 |
| Sok Dara | 2 |

**Task 7: Mr. Dara's enrollments**

```sql
SELECT c.teacher, COUNT(e.id) AS total_enrollments
FROM courses c
JOIN enrollments e ON e.course_id = c.id
WHERE c.teacher = 'Mr. Dara'
GROUP BY c.teacher;
```

Result:

| teacher | total_enrollments |
|---|---|
| Mr. Dara | 6 |

**Task 8: enroll a student**

```sql
INSERT INTO enrollments (id, student_id, course_id)
VALUES (9, 5, 4);

SELECT c.title, COUNT(e.id) AS students
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY c.id;
```

Result:

| title | students |
|---|---|
| HTML | 3 |
| CSS | 2 |
| JavaScript | 3 |
| SQL | 1 |

## Part 2: how a real app uses SQL

In the book "Before You Code", you learned that an app is a **frontend**, a **backend** and a **database**. SQL lives in the backend. The frontend never talks to the database directly. It asks the backend through an **API**, and the backend runs SQL.

**A visitor opens the page "students from Siem Reap":**

1. The browser sends `GET /students?city=Siem Reap` to the backend.
2. The backend runs `SELECT * FROM students WHERE city = 'Siem Reap'`.
3. The database returns rows. The backend turns them into **JSON**.
4. The frontend receives the JSON and shows it on the page, with the `fetch` skills you learned in JavaScript.

## The most important security rule: SQL injection

Look at a backend that builds the query by **joining text** with what the visitor typed:

```javascript
// DANGEROUS: never do this
const city = request.query.city;
db.query("SELECT * FROM students WHERE city = '" + city + "'");
```

If a visitor types `x' OR '1'='1` as the city, the query becomes:

```sql
SELECT * FROM students WHERE city = 'x' OR '1'='1'
```

The condition is always true, so the visitor receives **every row**. A worse input can delete tables. This attack is called **SQL injection**, and it is one of the most common ways websites are hacked.

The fix is to use a **parameterized query**. You write the query with a placeholder, and send the value separately. The database treats it as plain data, never as SQL.

```javascript
// SAFE
db.query("SELECT * FROM students WHERE city = ?", [city]);
```

> **Remember**
> Never build SQL by joining text with user input. Always use placeholders (`?` or `$1`, depending on the library). Every backend language, such as Node.js, PHP, Python and Java, supports them.

## What to learn next

| Goal | Next step |
|---|---|
| Build the backend | Node.js with Express, or PHP with Laravel |
| Make your own API | A REST API that returns JSON from your database |
| A ready-made database for apps | Firebase or Supabase |
| Go deeper in SQL | Indexes, transactions and `UNION` |

## Try it

Design a small database for a project you like (a library, a shop, a clinic). Draw the tables on paper, mark the primary and foreign keys, create them with `CREATE TABLE`, add sample data, and write five queries with a join.
