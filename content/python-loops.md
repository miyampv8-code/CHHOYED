A loop repeats code so you don't have to write it many times.

## The for loop

Use `for` when you know how many times to repeat.

```python
for i in range(1, 6):
    print("Number", i)
```

`range(1, 6)` gives 1, 2, 3, 4, 5. It stops before 6.

## The while loop

Use `while` to repeat until something changes.

```python
count = 3
while count > 0:
    print(count)
    count = count - 1
print("Go!")
```

> If the condition never becomes false, the loop never ends. Always change something inside the loop.

## Try it

Print the 5 times table with a `for` loop.
