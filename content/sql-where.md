`WHERE` filters rows. Only the rows that pass your condition appear in the result.

## Syntax

```sql
SELECT columns
FROM table_name
WHERE condition;
```

## Comparison operators

| Operator | Meaning |
|---|---|
| `=` | Equal (one equals sign, not two) |
| `<>` or `!=` | Not equal |
| `>` `<` | Bigger, smaller |
| `>=` `<=` | Bigger or equal, smaller or equal |

```sql
SELECT name, score
FROM students
WHERE score >= 75;
```

Result:

| name | score |
|---|---|
| Sok Dara | 85 |
| Chan Sophea | 92 |
| Lim Sreyneang | 76 |

Text values need single quotes.

```sql
SELECT name, city
FROM students
WHERE city = 'Siem Reap';
```

Result:

| name | city |
|---|---|
| Chan Sophea | Siem Reap |
| Heng Rithy | Siem Reap |

> **Remember**
> A student with a NULL score does **not** appear in `score >= 75`, and does not appear in `score < 75` either. Comparing with NULL is never true. Use `IS NULL`, shown below.

## AND, OR and NOT

- `AND`: both conditions must be true.
- `OR`: at least one must be true.
- `NOT`: flips a condition.

```sql
SELECT name, age, city
FROM students
WHERE city = 'Phnom Penh' AND age >= 18;
```

Result:

| name | age | city |
|---|---|---|
| Sok Dara | 18 | Phnom Penh |
| Kim Vanna | 19 | Phnom Penh |

```sql
SELECT name, city
FROM students
WHERE city = 'Siem Reap' OR city = 'Battambang';
```

Result:

| name | city |
|---|---|
| Chan Sophea | Siem Reap |
| Lim Sreyneang | Battambang |
| Heng Rithy | Siem Reap |

When you mix `AND` and `OR`, use **parentheses** so the meaning is clear.

```sql
SELECT name, age, score
FROM students
WHERE (age = 17 OR age = 18) AND score > 80;
```

Result:

| name | age | score |
|---|---|---|
| Sok Dara | 18 | 85 |
| Chan Sophea | 17 | 92 |

## IN: a list of choices

`IN` is a short way to write many `OR` conditions.

```sql
SELECT name, city
FROM students
WHERE city IN ('Siem Reap', 'Battambang');
```

Result:

| name | city |
|---|---|
| Chan Sophea | Siem Reap |
| Lim Sreyneang | Battambang |
| Heng Rithy | Siem Reap |

## BETWEEN: a range

`BETWEEN` includes both ends.

```sql
SELECT name, score
FROM students
WHERE score BETWEEN 60 AND 80;
```

Result:

| name | score |
|---|---|
| Lim Sreyneang | 76 |
| Heng Rithy | 64 |

## LIKE: search inside text

`LIKE` finds text that matches a pattern. The symbol `%` means "any number of characters". The symbol `_` means "exactly one character".

```sql
SELECT name
FROM students
WHERE name LIKE 'S%';
```

Result:

| name |
|---|
| Sok Dara |

```sql
SELECT name
FROM students
WHERE name LIKE '%a%';
```

Result:

| name |
|---|
| Sok Dara |
| Chan Sophea |
| Kim Vanna |
| Lim Sreyneang |
| Pov Malis |

`'S%'` means "starts with S". `'%a%'` means "contains an a anywhere". In SQLite and MySQL, `LIKE` ignores uppercase and lowercase. In PostgreSQL it does not (use `ILIKE` there).

## IS NULL: find missing values

```sql
SELECT name, score
FROM students
WHERE score IS NULL;
```

Result:

| name | score |
|---|---|
| Pov Malis | NULL |

Use `IS NOT NULL` for the opposite.

```sql
SELECT name, score
FROM students
WHERE score IS NOT NULL
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

## Try it

1. Show the students who are older than 18.
2. Show the students from Phnom Penh whose score is below 80.
3. Show the students whose names end with `y` (hint: the pattern is `'%y'`).
