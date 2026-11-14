Object-oriented programming (OOP) models real-life things. A **class** is a blueprint. An **object** is one thing built from it.

## Syntax

```cpp
class ClassName {
public:
    type field;                   // data

    ClassName(type param) {       // constructor
        field = param;
    }

    returnType method() {         // action
        // ...
    }
};                                // a class ends with };

ClassName obj(args);              // make an object
obj.method();
```

## A class

```cpp
class Student {
public:
    std::string name;
    int age;

    Student(std::string name, int age) {   // constructor
        this->name = name;
        this->age = age;
    }

    void introduce() {
        std::cout << "I am " << name << ", " << age << "\n";
    }
};
```

## Create objects

```cpp
Student a("Dara", 16);
Student b("Sokha", 17);
a.introduce();   // I am Dara, 16
```

- Fields (`name`, `age`) hold data. Methods (`introduce`) hold actions.
- The constructor has the same name as the class and runs when the object is created. `this` points to the current object.
- `public:` means code outside the class can use what follows.

> Don't forget the `;` after the closing `}` of a class.

## Try it

Make a `Book` class with a title and price, and a method that prints them.
