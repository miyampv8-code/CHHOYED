C++ is a fast, powerful language used for games, operating systems and devices. Every C++ program starts from a function called `main`.

## Syntax

```cpp
#include <iostream>

int main() {
    std::cout << value;   // print
    return 0;
}
```

Every statement ends with `;`. Chain values with `<<`, and use `"\n"` for a new line.

## Your first program

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

## How it works

- `#include <iostream>` brings in the tools for input and output.
- `main` is where the program starts. `return 0;` means "finished without errors".
- `std::cout` prints. `<<` sends text into it, and `std::endl` ends the line. Every statement ends with `;`.

## Compile and run

C++ must be **compiled** into a program before it runs. Install a compiler such as g++, save the code as `main.cpp`, then run:

```bash
g++ main.cpp -o main
./main
```

On Windows, run `main.exe` instead of `./main`.

> You will see `using namespace std;` in many tutorials. It lets you write `cout` instead of `std::cout`. In these lessons we write `std::` so you can see where each name comes from.

## Try it

Change the text so the program prints your name on two lines.
