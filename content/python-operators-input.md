Operators do math and compare values. `input` reads from the keyboard.

## Syntax

```python
result = a + b                # + - * / // % **
text = input("Question: ")   # always gives text
number = int(text)           # or float(text)
```

`//` divides and drops the decimals. `%` gives the remainder.

## Math

```python
a = 7
b = 2
print(a + b)    # 9
print(a - b)    # 5
print(a * b)    # 14
print(a / b)    # 3.5, always a decimal
print(a // b)   # 3, whole-number division
print(a % b)    # 1, the remainder
print(a ** b)   # 49, the power
```

## Comparing

`==` equal, `!=` not equal, `<` `>` `<=` `>=`. The result is `True` or `False`. Join tests with `and`, `or` and `not`.

```python
age = 16
print(age >= 13 and age <= 19)   # True
```

## Reading input

```python
name = input("Your name: ")
age = int(input("Your age: "))
print(f"Hello {name}, next year you will be {age + 1}.")
```

`input` always gives text. Use `int()` or `float()` to turn it into a number.

> `=` stores a value. `==` compares two values. Mixing them up is a very common mistake.

## Try it

Ask for two numbers, then print their sum and their average.
