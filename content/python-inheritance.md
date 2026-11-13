Inheritance lets one class reuse another. The child class gets everything the parent has.

## A parent and a child

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(self.name, "is eating")

class Dog(Animal):   # Dog inherits from Animal
    def bark(self):
        print(self.name, "says Woof")

d = Dog("Rex")
d.eat()    # Rex is eating, from Animal
d.bark()   # Rex says Woof
```

Write the parent in brackets after the class name: `class Dog(Animal)`.

## super()

```python
class Cat(Animal):
    def __init__(self, name, indoor):
        super().__init__(name)   # run the parent's constructor
        self.indoor = indoor
```

> Use inheritance for an "is-a" relationship. A Dog **is an** Animal.

## Try it

Make a `Puppy` class that extends `Dog` and has a `play` method.
