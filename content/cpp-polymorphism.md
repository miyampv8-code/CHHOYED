The last two pillars of OOP finish the picture.

## Polymorphism

One call, different behaviour:

```cpp
class Animal {
public:
    virtual void speak() { std::cout << "...\n"; }
    virtual ~Animal() {}
};

class Dog : public Animal {
public:
    void speak() override { std::cout << "Woof\n"; }
};

class Cat : public Animal {
public:
    void speak() override { std::cout << "Meow\n"; }
};

Animal* pets[] = { new Dog(), new Cat() };
for (Animal* p : pets) {
    p->speak();   // Woof, Meow
}
for (Animal* p : pets) {
    delete p;
}
```

- `virtual` lets C++ pick the child's version at run time. Without it, `Animal`'s version would run.
- `override` makes the compiler check that you really are replacing a parent method.
- Give every parent class a `virtual` destructor, so `delete` cleans up the child correctly.

## Abstraction

```cpp
class Shape {
public:
    virtual double area() const = 0;   // pure virtual
    virtual ~Shape() {}
};

class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() const override { return 3.14159 * r * r; }
};
```

- `= 0` makes a method **pure virtual**. A class with one cannot be created with `Shape s;`. It forces children to write the missing method.
- C++ has no `interface` keyword. A class with only pure virtual methods does the same job.

## The four pillars

Encapsulation, inheritance, polymorphism and abstraction. You now know all four.

## Try it

Make a `Rectangle` that extends `Shape`, then print the area of both shapes in a loop.
