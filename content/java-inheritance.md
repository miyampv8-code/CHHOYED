A class can reuse another class with `extends`.

## Syntax

```java
class Child extends Parent {
    Child(args) {
        super(args);                // call the parent constructor
    }

    @Override
    returnType method() { /* ... */ }   // replaces the parent's version
}
```

## extends

```java
class Animal {
    String name;
    void eat() { System.out.println(name + " eats"); }
}

class Dog extends Animal {
    void bark() { System.out.println(name + " says Woof"); }
}
```

```java
Dog d = new Dog();
d.name = "Rex";
d.eat();    // inherited from Animal
d.bark();
```

A `Dog` **is an** `Animal`. Use `super(...)` to call the parent's constructor.

> A Java class can extend only one parent class.

## Try it

Create a `Cat` class that extends `Animal` and has its own `meow` method.
