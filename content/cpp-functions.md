A function is a named block of code that you can reuse.

## Syntax

```cpp
returnType name(type param1, type param2) {
    // ...
    return value;
}

name(arg1, arg2);                // call it
```

Use `void` as the return type when nothing is returned. Write the function before the line that calls it.

## Define and call

```cpp
#include <iostream>
#include <string>

int add(int a, int b) {
    return a + b;
}

void greet(std::string name) {
    std::cout << "Hello, " << name << "\n";
}

int main() {
    greet("Dara");
    int total = add(3, 4);
    std::cout << total << "\n";   // 7
    return 0;
}
```

- Write the **return type** first. `void` means the function returns nothing.
- A function must be written above the place where you use it.

## Pass by reference

```cpp
void addOne(int& n) {
    n++;
}

int x = 5;
addOne(x);
std::cout << x << "\n";   // 6
```

Normally a function gets a **copy** of the value. `&` makes it work on the original variable instead. For big values you only read, use `const std::string&` to avoid copying.

## Default values

```cpp
void greet(std::string name = "friend") {
    std::cout << "Hello, " << name << "\n";
}
```

> Variables made inside a function exist only inside that function.

## Try it

Write `bool isEven(int n)` that returns `true` when `n` is even.
