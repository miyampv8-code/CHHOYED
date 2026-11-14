A function is a named block of code that you can reuse.

## Syntax

```python
def name(param1, param2):
    # ...
    return value

name(arg1, arg2)       # call it
```

A function without `return` gives back `None`.

## Define and call

```python
def greet(name):
    print("Hello,", name)

greet("Dara")
greet("Sokha")
```

## Return values

```python
def add(a, b):
    return a + b

total = add(3, 4)
print(total)   # 7
```

- `def` starts a function. The names in `( )` are its parameters.
- `return` sends a result back. A function with no `return` gives back `None`.

## Default values

```python
def power(base, exp=2):
    return base ** exp

print(power(5))      # 25
print(power(2, 3))   # 8
```

> A variable made inside a function exists only inside that function.

## Try it

Write `is_even(n)` that returns `True` when `n` is even and `False` when it is odd.
