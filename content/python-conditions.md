Conditions let your program choose what to run.

## Syntax

```python
if condition:
    # runs when the condition is true
elif other_condition:
    # runs when this one is true
else:
    # runs when none are true
```

The `:` at the end of each line and the indentation are required.

## if, elif and else

```python
score = 72

if score >= 90:
    print("Excellent")
elif score >= 50:
    print("Pass")
else:
    print("Try again")
```

- Python checks from the top and runs the first block whose condition is `True`.
- The `:` and the indented lines below it belong together. Indent with 4 spaces.

## match

```python
day = 3

match day:
    case 1:
        print("Monday")
    case 2:
        print("Tuesday")
    case 3:
        print("Wednesday")
    case _:
        print("Another day")
```

`case _` runs when nothing else matches. `match` needs Python 3.10 or newer.

## One-line version

```python
age = 20
status = "adult" if age >= 18 else "minor"
```

> Every `if` block must be indented. Forgetting the indent gives an `IndentationError`.

## Try it

Ask for a number and print whether it is positive, negative or zero.
