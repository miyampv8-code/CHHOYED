`SELECT` is the command you will use most. It reads data from a table and shows it to you. It never changes the data.

## Syntax

```sql
SELECT column1, column2
FROM table_name;
```

`SELECT` says which columns. `FROM` says which table.

## All columns, or only some

An asterisk `*` means "every column".

```sql
SELECT * FROM students;
```

Result:

| id | name | age | city | score |
|---|---|---|---|---|
| 1 | Sok Dara | 18 | Phnom Penh | 85 |
| 2 | Chan Sophea | 17 | Siem Reap | 92 |
| 3 | Kim Vanna | 19 | Phnom Penh | 48 |
| 4 | Lim Sreyneang | 18 | Battambang | 76 |
| 5 | Heng Rithy | 20 | Siem Reap | 64 |
| 6 | Pov Malis | 17 | Phnom Penh | NULL |

Usually you only need a few columns. List them, separated by commas.

```sql
SELECT name, city
FROM students;
```

Result:

| name | city |
|---|---|
| Sok Dara | Phnom Penh |
| Chan Sophea | Siem Reap |
| Kim Vanna | Phnom Penh |
| Lim Sreyneang | Battambang |
| Heng Rithy | Siem Reap |
| Pov Malis | Phnom Penh |

> **Remember**
> In real apps, avoid `SELECT *` on big tables. Ask only for the columns you need. It is faster and clearer.

## Rename a column with AS

`AS` gives a column a friendlier name in the result. This is called an **alias**.

```sql
SELECT name AS student_name, score AS points
FROM students;
```

Result:

| student_name | points |
|---|---|
| Sok Dara | 85 |
| Chan Sophea | 92 |
| Kim Vanna | 48 |
| Lim Sreyneang | 76 |
| Heng Rithy | 64 |
| Pov Malis | NULL |

## Calculate in a query

You can do math on the columns.

```sql
SELECT name, age, age + 1 AS age_next_year
FROM students;
```

Result:

| name | age | age_next_year |
|---|---|---|
| Sok Dara | 18 | 19 |
| Chan Sophea | 17 | 18 |
| Kim Vanna | 19 | 20 |
| Lim Sreyneang | 18 | 19 |
| Heng Rithy | 20 | 21 |
| Pov Malis | 17 | 18 |

## DISTINCT: remove repeated values

Three students live in Phnom Penh, but you may want each city only once.

```sql
SELECT DISTINCT city
FROM students;
```

Result:

| city |
|---|
| Phnom Penh |
| Siem Reap |
| Battambang |

## ORDER BY: sort the result

Without `ORDER BY`, the database may return rows in any order. Add it when order matters. `ASC` means smallest first (this is the default). `DESC` means biggest first.

```sql
SELECT name, score
FROM students
ORDER BY score DESC;
```

Result:

| name | score |
|---|---|
| Chan Sophea | 92 |
| Sok Dara | 85 |
| Lim Sreyneang | 76 |
| Heng Rithy | 64 |
| Kim Vanna | 48 |
| Pov Malis | NULL |

Notice that NULL is placed last when sorting `DESC` in SQLite. Other databases may place it differently.

You can sort by two columns. The second one breaks ties.

```sql
SELECT name, city, score
FROM students
ORDER BY city ASC, score DESC;
```

Result:

| name | city | score |
|---|---|---|
| Lim Sreyneang | Battambang | 76 |
| Sok Dara | Phnom Penh | 85 |
| Kim Vanna | Phnom Penh | 48 |
| Pov Malis | Phnom Penh | NULL |
| Chan Sophea | Siem Reap | 92 |
| Heng Rithy | Siem Reap | 64 |

## LIMIT: take only the first rows

```sql
SELECT name, score
FROM students
ORDER BY score DESC
LIMIT 3;
```

Result:

| name | score |
|---|---|
| Chan Sophea | 92 |
| Sok Dara | 85 |
| Lim Sreyneang | 76 |

This is the "top 3 students". (SQL Server uses `SELECT TOP 3` instead of `LIMIT`.)

## The order of the clauses

A query is written in this fixed order. You will meet all of them in this course.

| Order | Clause | Job |
|---|---|---|
| 1 | `SELECT` | Which columns |
| 2 | `FROM` | Which table |
| 3 | `WHERE` | Which rows |
| 4 | `GROUP BY` | Make groups |
| 5 | `HAVING` | Which groups |
| 6 | `ORDER BY` | Sort |
| 7 | `LIMIT` | How many |

## Try it

1. Show only the `name` and `age` of every student.
2. Show the names of the students from the youngest to the oldest.
3. Show the single oldest student.
