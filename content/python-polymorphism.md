The last two pillars of OOP finish the picture.

## Syntax

```python
class Parent:
    def method(self): ...

class Child(Parent):
    def method(self): ...     # replaces the parent's version

from abc import ABC, abstractmethod

class Shape(ABC):            # abstract class
    @abstractmethod
    def area(self): ...      # children must write this
```

## Polymorphism

One call, different behaviour:

```python
class Animal:
    def speak(self):
        print("...")

class Dog(Animal):
    def speak(self):
        print("Woof")

class Cat(Animal):
    def speak(self):
        print("Meow")

pets = [Dog(), Cat()]
for p in pets:
    p.speak()   # Woof, Meow
```

Python does not check types. If an object has a `speak` method, you can call it. This is called *duck typing*.

## Abstraction

```python
from abc import ABC, abstractmethod
import math

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return math.pi * self.r * self.r
```

- An abstract class cannot be created directly. `Shape()` gives an error. It forces children to write the missing methods.
- Python has no `interface` keyword. An abstract class with only abstract methods does the same job.

## The four pillars

Encapsulation, inheritance, polymorphism and abstraction. You now know all four.

## Try it

Make a `Rectangle` that extends `Shape`, then print the area of both shapes in a loop.
