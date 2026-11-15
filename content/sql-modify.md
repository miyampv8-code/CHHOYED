Until now you only **read** data. Real apps also add, change and remove it. Three commands do this: `INSERT`, `UPDATE` and `DELETE`.

## INSERT: add a new row

```sql
INSERT INTO table_name (column1, column2)
VALUES (value1, value2);
```

```sql
INSERT INTO students (id, name, age, city, score)
VALUES (7, 'Ouk Dany', 18, 'Kampot', 81);

SELECT * FROM students WHERE id = 7;
```

Result:

| id | name | age | city | score |
|---|---|---|---|---|
| 7 | Ouk Dany | 18 | Kampot | 81 |

List the columns in the same order as the values. You can leave out a column, and it becomes NULL (or its default value).

```sql
INSERT INTO students (id, name) VALUES (8, 'Meas Bopha');

SELECT * FROM students WHERE id = 8;
```

Result:

| id | name | age | city | score |
|---|---|---|---|---|
| 8 | Meas Bopha | NULL | NULL | NULL |

To add several rows at once, separate them with commas.

```sql
INSERT INTO students (id, name, age, city, score) VALUES
  (9, 'Tep Sokha', 19, 'Kampot', 70),
  (10, 'Yim Channary', 18, 'Siem Reap', 88);
```

## UPDATE: change existing rows

```sql
UPDATE table_name
SET column1 = value1, column2 = value2
WHERE condition;
```

```sql
UPDATE students
SET score = 55
WHERE id = 3;

SELECT id, name, score FROM students WHERE id = 3;
```

Result:

| id | name | score |
|---|---|---|
| 3 | Kim Vanna | 55 |

`SET` can change several columns at once, and you can calculate from the old value.

```sql
UPDATE students
SET score = score + 5, city = 'Phnom Penh'
WHERE name = 'Heng Rithy';

SELECT name, city, score FROM students WHERE name = 'Heng Rithy';
```

Result:

| name | city | score |
|---|---|---|
| Heng Rithy | Phnom Penh | 69 |

Give the missing score to Pov Malis:

```sql
UPDATE students
SET score = 60
WHERE score IS NULL;

SELECT name, score FROM students WHERE id = 6;
```

Result:

| name | score |
|---|---|
| Pov Malis | 60 |

## DELETE: remove rows

```sql
DELETE FROM table_name
WHERE condition;
```

```sql
DELETE FROM students
WHERE id = 6;

SELECT COUNT(*) AS students_left FROM students;
```

Result:

| students_left |
|---|
| 5 |

> **Remember**
> **Never forget the `WHERE`.** `DELETE FROM students;` deletes **every** row. `UPDATE students SET score = 0;` changes **every** row. There is no undo button in most tools.

## A safe habit

Before you run an `UPDATE` or `DELETE`, run a `SELECT` with the **same** `WHERE`, and check that it shows exactly the rows you expect.

```sql
-- 1. Look first
SELECT * FROM students WHERE city = 'Kampot';

-- 2. Then, if the rows are right, delete
DELETE FROM students WHERE city = 'Kampot';
```

In real projects, also keep **backups** of your database.

## The four basic operations

Almost every app is built on these four actions. Developers call them **CRUD**.

| Letter | Action | SQL | HTTP method |
|---|---|---|---|
| **C** | Create | `INSERT` | POST |
| **R** | Read | `SELECT` | GET |
| **U** | Update | `UPDATE` | PUT / PATCH |
| **D** | Delete | `DELETE` | DELETE |

This is the same table you met in the book "Before You Code" when you learned about HTTP methods.

## Try it

1. Add two new students of your own.
2. Raise the score of every student from Siem Reap by 3 points.
3. Delete one student by `id`, after checking with a `SELECT` first.
