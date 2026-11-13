Operators do math and compare values. `std::cin` reads from the keyboard.

## Math

```cpp
int a = 7;
int b = 2;

std::cout << a + b << "\n";   // 9
std::cout << a - b << "\n";   // 5
std::cout << a * b << "\n";   // 14
std::cout << a / b << "\n";   // 3, whole numbers drop the decimals
std::cout << a % b << "\n";   // 1, the remainder
std::cout << static_cast<double>(a) / b << "\n";   // 3.5
```

## Comparing

`==` equal, `!=` not equal, `<` `>` `<=` `>=`. The result is `true` or `false`. Join tests with `&&` (and), `||` (or) and `!` (not).

```cpp
int age = 16;
bool teen = age >= 13 && age <= 19;   // true
```

## Reading input

```cpp
std::string name;
int age;

std::cout << "Your name: ";
std::cin >> name;
std::cout << "Your age: ";
std::cin >> age;

std::cout << "Hello " << name << ", next year you will be " << age + 1 << "\n";
```

> `std::cin >> name` stops at the first space. To read a whole line, use `std::getline(std::cin, name);`.

## Try it

Ask for two numbers and print their sum and their average. Use `double` so the average keeps its decimals.
