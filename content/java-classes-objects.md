Object-oriented programming (OOP) models real-life things. A **class** is a blueprint. An **object** is one thing built from it.

## Syntax

```java
public class ClassName {
    type field;                     // data

    ClassName(type param) {         // constructor
        this.field = param;
    }

    returnType method() {           // action
        // ...
    }
}

ClassName obj = new ClassName(args);
obj.method();
```

## A class

```java
public class Student {
    String name;
    int age;

    Student(String name, int age) {   // constructor
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("I am " + name + ", " + age);
    }
}
```

## Create objects

```java
Student a = new Student("Dara", 16);
Student b = new Student("Sokha", 17);
a.introduce();
```

- Fields (`name`, `age`) hold data. Methods (`introduce`) hold actions.
- The constructor runs when you write `new`. `this` means the current object.

## Try it

Make a `Book` class with a title and price, and a method that prints them.
