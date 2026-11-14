Lists and dictionaries keep many values in one variable.

## Syntax

```python
name = [value1, value2, value3]
name[index]            # one item, counting starts at 0
name.append(value)     # add to the end
len(name)              # how many items

for item in name:
    # runs once for every item
```

## Lists

```python
fruits = ["apple", "banana", "mango"]

print(fruits[0])        # apple, counting starts at 0
fruits.append("kiwi")   # add to the end
fruits[1] = "orange"    # change an item
print(len(fruits))      # 4

for fruit in fruits:
    print(fruit)
```

## Dictionaries

A dictionary stores **key: value** pairs.

```python
student = {"name": "Dara", "age": 16}

print(student["name"])           # Dara
student["age"] = 17              # change a value
student["city"] = "Phnom Penh"   # add a new pair

for key, value in student.items():
    print(key, value)
```

> Lists use `[ ]` and dictionaries use `{ }`. A tuple uses `( )` and cannot be changed after it is made, like `point = (3, 4)`.

## Try it

Make a list of 5 numbers. Print the biggest with `max()` and the total with `sum()`.
