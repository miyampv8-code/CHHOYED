Inheritance lets one class reuse another. The child class gets everything the parent has.

## Syntax

```cpp
class Child : public Parent {
public:
    Child(args) : Parent(args) { }   // call the parent constructor
    // new members go here
};
```

`: public Parent` means Child inherits from Parent. `protected:` members are visible to children but hidden from outside code.

## A parent and a child

```cpp
class Animal {
public:
    std::string name;

    Animal(std::string name) : name(name) {}

    void eat() {
        std::cout << name << " is eating\n";
    }
};

class Dog : public Animal {
public:
    Dog(std::string name) : Animal(name) {}

    void bark() {
        std::cout << name << " says Woof\n";
    }
};

Dog d("Rex");
d.eat();    // Rex is eating, from Animal
d.bark();   // Rex says Woof
```

- `class Dog : public Animal` means Dog inherits from Animal.
- `: Animal(name)` calls the parent's constructor first. This is called an initializer list.

> Use inheritance for an "is-a" relationship. A Dog **is an** Animal. A `protected` member can be used by child classes but not by outside code.

## Try it

Make a `Puppy` class that extends `Dog` and has a `play` method.
