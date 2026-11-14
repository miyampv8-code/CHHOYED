The last two pillars of OOP finish the picture.

## Syntax

```java
Parent x = new Child();    // a parent variable can hold a child object
x.method();                // runs the Child version

abstract class Name {
    abstract returnType method();      // no body
}

interface Name {
    returnType method();
}

class Impl implements Name {
    public returnType method() { /* ... */ }
}
```

## Polymorphism

One call, different behaviour:

```java
class Animal { void speak() { System.out.println("..."); } }
class Dog extends Animal { @Override void speak() { System.out.println("Woof"); } }
class Cat extends Animal { @Override void speak() { System.out.println("Meow"); } }

Animal[] pets = { new Dog(), new Cat() };
for (Animal p : pets) p.speak();   // Woof, Meow
```

## Abstraction

```java
abstract class Shape {
    abstract double area();
}

class Circle extends Shape {
    double r;
    Circle(double r) { this.r = r; }
    double area() { return Math.PI * r * r; }
}

interface Drawable { void draw(); }
```

- An abstract class cannot be created with `new`. It forces children to write the missing methods.
- An interface is a contract. A class can implement many.

## The four pillars

Encapsulation, inheritance, polymorphism and abstraction. You now know all four.

## Try it

Make a `Rectangle` that extends `Shape`, then print the area of both shapes in a loop.
