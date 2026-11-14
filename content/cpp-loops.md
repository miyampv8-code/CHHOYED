A loop repeats code so you don't have to write it many times.

## Syntax

```cpp
for (start; test; step) {
    // repeated code
}

while (test) {
    // repeated code
}

do {
    // runs at least once
} while (test);
```

`break` leaves the loop. `continue` skips to the next round.

## The for loop

Use `for` when you know how many times to repeat.

```cpp
for (int i = 1; i <= 5; i++) {
    std::cout << "Number " << i << "\n";
}
```

The three parts are: the start (`int i = 1`), the test (`i <= 5`) and the step (`i++`, which adds 1).

## The while loop

```cpp
int count = 3;
while (count > 0) {
    std::cout << count << "\n";
    count--;
}
std::cout << "Go!\n";
```

## The do-while loop

```cpp
int n;
do {
    std::cout << "Enter a number above 0: ";
    std::cin >> n;
} while (n <= 0);
```

A `do-while` loop always runs at least once, because it checks the test at the end.

## break and continue

`break` stops the loop. `continue` skips to the next round.

> If the test never becomes false, the loop never ends. Make sure something inside the loop changes.

## Try it

Print the 5 times table with a `for` loop.
