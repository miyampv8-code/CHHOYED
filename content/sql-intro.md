A **database** is an organized place to store data so that programs can find it, change it and keep it safe. Almost every app uses one: the accounts of a social network, the products of an online shop, even the lessons of a school website.

**SQL** (Structured Query Language, often said "sequel") is the language you use to talk to a database. You write a short command, and the database sends back an answer.

## Tables, rows and columns

Most databases are **relational**: the data lives in **tables**, like the sheets of a spreadsheet.

| Database word | Spreadsheet word | Meaning |
|---|---|---|
| Table | Sheet | One kind of thing, such as students |
| Column (field) | Column | One property, such as name or age |
| Row (record) | Row | One item, such as one student |

This is the `students` table you will use in all the lessons of this course:

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

Notice that Pov Malis has **NULL** in the score column. NULL means "no value": we do not know the score yet. It is not the same as 0.

## Popular databases

| Database | Good to know |
|---|---|
| **SQLite** | A tiny database stored in one file. Used inside phones and apps. Android apps use it through Room. |
| **MySQL** | Free and very popular for websites. Used with PHP and Laravel. |
| **PostgreSQL** | Free, powerful and strict. A favorite of professional backend developers. |
| **SQL Server** | Made by Microsoft, common in companies. |

The core of SQL is the same in all of them. If you learn it once, you can use it everywhere. Small differences exist, and this course tells you when they matter.

## Set up your practice table

Copy this script and run it. It creates the table and adds six students.

```sql
CREATE TABLE students (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  city TEXT,
  score INTEGER
);

INSERT INTO students (id, name, age, city, score) VALUES
  (1, 'Sok Dara', 18, 'Phnom Penh', 85),
  (2, 'Chan Sophea', 17, 'Siem Reap', 92),
  (3, 'Kim Vanna', 19, 'Phnom Penh', 48),
  (4, 'Lim Sreyneang', 18, 'Battambang', 76),
  (5, 'Heng Rithy', 20, 'Siem Reap', 64),
  (6, 'Pov Malis', 17, 'Phnom Penh', NULL);
```

**Where to run it.** You do not need to install a server. Pick one:

1. **In your browser:** search for "SQLite online" and open a free online SQLite tool. Paste the script and press Run.
2. **On your computer:** install the free app **DB Browser for SQLite**, create a new database, and paste the script into the "Execute SQL" tab.
3. **With Python**, which already includes SQLite:

```python
import sqlite3

db = sqlite3.connect("school.db")
db.executescript("""
-- paste the script here
""")
for row in db.execute("SELECT * FROM students"):
    print(row)
```

## Basic rules of SQL

- Every statement ends with a semicolon `;`.
- Keywords are not case-sensitive, but writing them in **UPPERCASE** makes queries easy to read.
- Text goes in **single quotes**: `'Phnom Penh'`.
- A comment starts with `--` and the database ignores it.

```sql
-- This is a comment
SELECT name FROM students; -- this one is a comment too
```

> **Key idea**
> A database does not guess what you mean. You describe exactly which rows and columns you want, and it answers. That is why SQL queries read almost like English sentences.

## Try it

Create the table, run `SELECT * FROM students;` and check that you see six rows. Then add a seventh student of your own, using the same pattern as the script.
