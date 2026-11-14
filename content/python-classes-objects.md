Object-oriented programming (OOP) models real-life things. A **class** is a blueprint. An **object** is one thing built from it.

## Syntax

```python
class ClassName:
    def __init__(self, param):     # constructor
        self.field = param

    def method(self):               # action
        # ...

obj = ClassName(arg)
obj.method()
```

Every method has `self` as its first parameter.

## A class

```python
class Student:
    def __init__(self, name, age):   # constructor
        self.name = name
        self.age = age

    def introduce(self):
        print(f"I am {self.name}, {self.age}")
```

## Create objects

```python
a = Student("Dara", 16)
b = Student("Sokha", 17)
a.introduce()   # I am Dara, 16
b.introduce()   # I am Sokha, 17
```

- Fields (`self.name`, `self.age`) hold data. Methods (`introduce`) hold actions.
- `__init__` runs when you write `Student(...)`. `self` means the current object and is the first parameter of every method.

## Try it

Make a `Book` class with a title and price, and a method that prints them.
