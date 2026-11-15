You have used a table that was already made. Now you will design your own. Good table design is the secret of a good database.

## CREATE TABLE

```sql
CREATE TABLE table_name (
  column1 TYPE constraints,
  column2 TYPE constraints
);
```

Here is the `students` table again, with its parts explained:

```sql
CREATE TABLE students (
  id    INTEGER PRIMARY KEY,
  name  TEXT NOT NULL,
  age   INTEGER,
  city  TEXT,
  score INTEGER DEFAULT 0
);
```

## Common data types

| Type | Stores | Example |
|---|---|---|
| `INTEGER` | Whole numbers | `18` |
| `REAL` / `DECIMAL` | Numbers with decimals | `9.99` |
| `TEXT` / `VARCHAR(n)` | Text | `'Sok Dara'` |
| `DATE` | A date | `'2026-11-15'` |
| `BOOLEAN` | True or false | `TRUE` |

Type names differ a little between databases (for example `VARCHAR(100)` in MySQL and `TEXT` in SQLite), but the idea is the same.

## Constraints: rules for the data

A constraint makes the database refuse bad data.

| Constraint | Meaning |
|---|---|
| `PRIMARY KEY` | Identifies each row. Must be unique and never NULL. |
| `NOT NULL` | The value is required. |
| `UNIQUE` | No two rows can have the same value, such as an email. |
| `DEFAULT value` | Used when you do not provide a value. |
| `CHECK (condition)` | The value must pass a test, such as `CHECK (age >= 0)`. |
| `FOREIGN KEY` | Points to a row in another table (explained below). |

## The primary key

Names can repeat: two students may both be called "Dara". So every table needs a column that is **different for every row**. This is the **primary key**, usually called `id`.

```sql
-- This fails: id 1 already exists
INSERT INTO students (id, name) VALUES (1, 'Another Student');
```

## One table is not enough

Imagine that students take courses. You could write the course name into every student row, but that repeats the same text again and again, and one typing mistake creates a "different" course. The better design is to use **separate tables**, connected by keys.

```sql
CREATE TABLE courses (
  id      INTEGER PRIMARY KEY,
  title   TEXT NOT NULL,
  teacher TEXT
);

CREATE TABLE enrollments (
  id          INTEGER PRIMARY KEY,
  student_id  INTEGER NOT NULL,
  course_id   INTEGER NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id)  REFERENCES courses(id)
);
```

A **foreign key** is a column that holds the primary key of a row in another table. Here, `enrollments.student_id` points to a student, and `enrollments.course_id` points to a course.

Add some data. Run this script after creating the tables:

```sql
INSERT INTO courses (id, title, teacher) VALUES
  (1, 'HTML', 'Mr. Dara'),
  (2, 'CSS', 'Ms. Sokha'),
  (3, 'JavaScript', 'Mr. Dara'),
  (4, 'SQL', 'Ms. Sokha');

INSERT INTO enrollments (id, student_id, course_id) VALUES
  (1, 1, 1), (2, 1, 3),
  (3, 2, 1), (4, 2, 2), (5, 2, 3),
  (6, 3, 2),
  (7, 4, 1),
  (8, 6, 3);
```

Read `(2, 1, 3)` as "enrollment number 2: student 1 takes course 3", which means Sok Dara takes JavaScript.

> **Note:** SQLite only checks foreign keys if you run `PRAGMA foreign_keys = ON;` first. MySQL and PostgreSQL check them automatically.

## Types of relationships

| Relationship | Example | How to build it |
|---|---|---|
| **One to many** | One teacher has many courses | Put the teacher's id in the courses table |
| **Many to many** | Students take many courses, and courses have many students | Use a middle table, like `enrollments` |
| **One to one** | A user has one profile | Put a unique foreign key in one table |

## Change or remove a table

```sql
ALTER TABLE students ADD COLUMN email TEXT;  -- add a column
DROP TABLE enrollments;                      -- delete the whole table
```

> **Remember**
> `DROP TABLE` deletes the table **and all its data**. Be as careful with it as with `DELETE` without `WHERE`.

## Try it

Design a `books` table (id, title, author, year) and a `loans` table that records which student borrowed which book. Decide which columns are primary keys and which are foreign keys.
