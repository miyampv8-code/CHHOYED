The data is now spread over three tables. A **JOIN** puts it back together in one answer. This is the most powerful idea in SQL.

## Why we need it

The `enrollments` table only holds numbers:

```sql
SELECT * FROM enrollments;
```

Result:

| id | student_id | course_id |
|---|---|---|
| 1 | 1 | 1 |
| 2 | 1 | 3 |
| 3 | 2 | 1 |
| 4 | 2 | 2 |
| 5 | 2 | 3 |
| 6 | 3 | 2 |
| 7 | 4 | 1 |
| 8 | 6 | 3 |

Numbers like `student_id = 1` are not friendly. We want names and course titles. A join matches the rows of two tables using the key.

## Syntax

```sql
SELECT columns
FROM table_a
JOIN table_b ON table_a.column = table_b.column;
```

`ON` says how the rows match: here, a foreign key equals a primary key.

## INNER JOIN

`INNER JOIN` (or just `JOIN`) keeps only the rows that have a match on **both** sides.

```sql
SELECT students.name, enrollments.course_id
FROM students
INNER JOIN enrollments ON enrollments.student_id = students.id;
```

Result:

| name | course_id |
|---|---|
| Sok Dara | 1 |
| Sok Dara | 3 |
| Chan Sophea | 1 |
| Chan Sophea | 2 |
| Chan Sophea | 3 |
| Kim Vanna | 2 |
| Lim Sreyneang | 1 |
| Pov Malis | 3 |

Now the names appear, but the course is still a number. Join a third table to get the title:

```sql
SELECT students.name, courses.title
FROM students
INNER JOIN enrollments ON enrollments.student_id = students.id
INNER JOIN courses ON courses.id = enrollments.course_id
ORDER BY students.name, courses.title;
```

Result:

| name | title |
|---|---|
| Chan Sophea | CSS |
| Chan Sophea | HTML |
| Chan Sophea | JavaScript |
| Kim Vanna | CSS |
| Lim Sreyneang | HTML |
| Pov Malis | JavaScript |
| Sok Dara | HTML |
| Sok Dara | JavaScript |

Read it from top to bottom: start with students, attach their enrollments, then attach the course of each enrollment.

## Table aliases make it shorter

Give each table a short name right after it. This is the style professionals use.

```sql
SELECT s.name, c.title
FROM students s
JOIN enrollments e ON e.student_id = s.id
JOIN courses c ON c.id = e.course_id
WHERE c.title = 'JavaScript';
```

Result:

| name | title |
|---|---|
| Sok Dara | JavaScript |
| Chan Sophea | JavaScript |
| Pov Malis | JavaScript |

You can use `WHERE`, `ORDER BY` and every other clause as before.

## LEFT JOIN: keep everything from the left table

Look at the result above: Heng Rithy is missing. He takes no course at all, so `INNER JOIN` dropped him. A `LEFT JOIN` keeps **every row of the left table**, and fills NULL where there is no match.

```sql
SELECT s.name, e.course_id
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
ORDER BY s.id;
```

Result:

| name | course_id |
|---|---|
| Sok Dara | 1 |
| Sok Dara | 3 |
| Chan Sophea | 1 |
| Chan Sophea | 2 |
| Chan Sophea | 3 |
| Kim Vanna | 2 |
| Lim Sreyneang | 1 |
| Heng Rithy | NULL |
| Pov Malis | 3 |

This is perfect for questions like "which students have **no** course?":

```sql
SELECT s.name
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
WHERE e.id IS NULL;
```

Result:

| name |
|---|
| Heng Rithy |

| Join | Keeps |
|---|---|
| `INNER JOIN` | Only rows that match in both tables |
| `LEFT JOIN` | All rows from the left table, plus matches from the right (NULL if none) |

## Join and group together

How many courses does each student take?

```sql
SELECT s.name, COUNT(e.id) AS courses_taken
FROM students s
LEFT JOIN enrollments e ON e.student_id = s.id
GROUP BY s.id, s.name
ORDER BY courses_taken DESC, s.name;
```

Result:

| name | courses_taken |
|---|---|
| Chan Sophea | 3 |
| Sok Dara | 2 |
| Kim Vanna | 1 |
| Lim Sreyneang | 1 |
| Pov Malis | 1 |
| Heng Rithy | 0 |

And how many students are in each course?

```sql
SELECT c.title, COUNT(e.id) AS students
FROM courses c
LEFT JOIN enrollments e ON e.course_id = c.id
GROUP BY c.id, c.title
ORDER BY students DESC, c.title;
```

Result:

| title | students |
|---|---|
| HTML | 3 |
| JavaScript | 3 |
| CSS | 2 |
| SQL | 0 |

The SQL course has 0 students. A `LEFT JOIN` from `courses` makes sure it still appears in the list.

> **Key idea**
> Think of a join as a **question that follows a key**: "for each enrollment, go to the student with this id, and to the course with this id." Once you can see the keys, joins stop being scary.

## Try it

1. List each course title together with the teacher and the number of students in it.
2. List the names of all students who take the HTML course.
3. Find the courses that have no students (use `LEFT JOIN` and `IS NULL`).
