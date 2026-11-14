A variable is a name that stores a value. In Python you do not write the type. Python works it out for you.

## Syntax

```python
name = value
int(x)   float(x)   str(x)    # convert between types
```

No type is written: Python sees it from the value. Use lowercase names with underscores, like `student_name`.

## Common types

```python
age = 16            # int, a whole number
price = 2.5         # float, a decimal
is_student = True   # bool, True or False
name = "Dara"       # str, text
```

Use `type()` to check what a value is:

```python
print(type(age))    # <class 'int'>
```

## Using variables

```python
print(name, "is", age, "years old")
print(f"{name} is {age} years old")
```

The second line uses an **f-string**. Put `f` before the quotes and write variables inside `{ }`.

> Name variables in lowercase with underscores, like `is_student`. By convention, a value that should never change is written in capitals, like `PI = 3.14`. Python will not stop you from changing it, so be careful.

## Try it

Store your name, age and favourite number, then print them in one sentence with an f-string.
