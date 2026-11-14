Arrays and vectors keep many values in one variable.

## Syntax

```cpp
type name[size] = {value1, value2, value3};
name[index]                      // one item, counting starts at 0

std::vector<type> name = {value1, value2};   // #include <vector>
name.push_back(value);           // add to the end
name.size()                      // how many items
```

## Arrays

```cpp
int scores[3] = {90, 75, 60};

std::cout << scores[0] << "\n";   // 90, counting starts at 0
scores[1] = 80;                   // change an item

for (int i = 0; i < 3; i++) {
    std::cout << scores[i] << "\n";
}
```

An array has a fixed size. You cannot add a fourth item to `scores[3]`.

## Vectors

A `std::vector` can grow. Add `#include <vector>` at the top.

```cpp
std::vector<std::string> fruits = {"apple", "banana", "mango"};

fruits.push_back("kiwi");                 // add to the end
std::cout << fruits.size() << "\n";       // 4

for (const std::string& f : fruits) {     // go through every item
    std::cout << f << "\n";
}
```

> C++ does not stop you from reading past the end of an array. The program may crash or print garbage. Prefer `std::vector`, and use `fruits.at(i)` when you want a safe, checked access.

## Try it

Make a vector of 5 numbers, then use a loop to find the biggest one.
