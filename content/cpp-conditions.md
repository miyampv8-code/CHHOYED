Conditions let your program choose what to run.

## Syntax

```cpp
if (condition) {
    // runs when the condition is true
} else if (other condition) {
    // runs when this one is true
} else {
    // runs when none are true
}

switch (value) {
    case 1:
        // ...
        break;
    default:
        // ...
}
```

Conditions go inside `( )` and use `==`, `!=`, `<`, `>`, `<=`, `>=`, `&&`, `||` and `!`.

## if, else if and else

```cpp
int score = 72;

if (score >= 90) {
    std::cout << "Excellent\n";
} else if (score >= 50) {
    std::cout << "Pass\n";
} else {
    std::cout << "Try again\n";
}
```

The condition goes in `( )` and the code goes in `{ }`. C++ runs the first block whose condition is true.

## switch

```cpp
int day = 3;

switch (day) {
    case 1: std::cout << "Monday\n"; break;
    case 2: std::cout << "Tuesday\n"; break;
    case 3: std::cout << "Wednesday\n"; break;
    default: std::cout << "Another day\n";
}
```

## One-line version

```cpp
std::string status = (age >= 18) ? "adult" : "minor";
```

> Without `break`, a `switch` keeps running into the next case. And remember: `=` stores, `==` compares.

## Try it

Ask for a number and print whether it is positive, negative or zero.
