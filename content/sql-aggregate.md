So far each row of the answer was one row of the table. **Aggregate functions** are different: they look at many rows and give one number, such as a total or an average.

## Syntax

```sql
SELECT COUNT(*) FROM table_name;
```

## The five main functions

| Function | Returns |
|---|---|
| `COUNT(*)` | How many rows |
| `COUNT(column)` | How many rows have a value in that column (NULL is skipped) |
| `SUM(column)` | The total |
| `AVG(column)` | The average |
| `MIN(column)` / `MAX(column)` | The smallest / biggest |

```sql
SELECT COUNT(*) AS how_many_students
FROM students;
```

Result:

| how_many_students |
|---|
| 6 |

```sql
SELECT COUNT(score) AS scores_entered
FROM students;
```

Result:

| scores_entered |
|---|
| 5 |

There are 6 students, but only 5 scores, because `COUNT(score)` skips the NULL.

```sql
SELECT
  MIN(score) AS lowest,
  MAX(score) AS highest,
  SUM(score) AS total,
  ROUND(AVG(score), 1) AS average
FROM students;
```

Result:

| lowest | highest | total | average |
|---|---|---|---|
| 48 | 92 | 365 | 73.0 |

`AVG` also ignores NULL, so it divides by 5, not 6. `ROUND(x, 1)` keeps one decimal.

You can combine aggregates with `WHERE`. The filter happens first.

```sql
SELECT ROUND(AVG(score), 1) AS average_in_phnom_penh
FROM students
WHERE city = 'Phnom Penh';
```

Result:

| average_in_phnom_penh |
|---|
| 66.5 |

## GROUP BY: one answer for each group

`GROUP BY` splits the rows into groups, and the aggregate runs once per group.

```sql
SELECT city, COUNT(*) AS students
FROM students
GROUP BY city;
```

Result:

| city | students |
|---|---|
| Battambang | 1 |
| Phnom Penh | 3 |
| Siem Reap | 2 |

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

> **Key idea**
> When you use `GROUP BY`, every column in `SELECT` must either be in the `GROUP BY` or be inside an aggregate function. Otherwise the database does not know which value to show for the group.

## HAVING: filter the groups

`WHERE` filters **rows before** they are grouped. `HAVING` filters **groups after** they are made.

```sql
SELECT city, COUNT(*) AS students
FROM students
GROUP BY city
HAVING COUNT(*) >= 2;
```

Result:

| city | students |
|---|---|
| Phnom Penh | 3 |
| Siem Reap | 2 |

| | `WHERE` | `HAVING` |
|---|---|---|
| Works on | Single rows | Groups |
| Runs | Before `GROUP BY` | After `GROUP BY` |
| Can use `COUNT`, `AVG`... | No | Yes |

## Try it

1. Find the average age of all students.
2. Count how many students are 18 or older.
3. For each age, count the students, and show only the ages that have more than one student.
