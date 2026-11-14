A variable stores a value. In C++ you must say its **type**.

## Syntax

```cpp
type name = value;
const type NAME = value;
```

`type` is `int`, `double`, `bool`, `char` or `std::string`. `const` makes the value fixed.

## Common types

```cpp
#include <iostream>
#include <string>

int main() {
    int age = 16;
    double price = 2.5;
    bool isStudent = true;
    char grade = 'A';
    std::string name = "Dara";

    std::cout << name << " is " << age << " years old\n";
    return 0;
}
```

`int` is a whole number, `double` a decimal, `bool` is `true` or `false`, `char` is one character in single quotes, and `std::string` is text in double quotes. Text needs `#include <string>`.

## Constants

```cpp
const double PI = 3.14159;
```

> Always give a variable a starting value. A variable you never set holds a random leftover number. A variable's type cannot change, and `const` means its value cannot change either.

## Try it

Store your name, age and favourite number, then print them in one sentence.
