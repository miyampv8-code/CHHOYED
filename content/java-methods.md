A method is a named block of code you can reuse.

## Define and call

```java
static int add(int a, int b) {
    return a + b;
}

public static void main(String[] args) {
    System.out.println(add(2, 3)); // 5
}
```

- `int` before the name is the return type. Use `void` when nothing is returned.
- `a` and `b` are parameters.

## Overloading

Same name, different parameters:

```java
static double add(double a, double b) { return a + b; }
```

## Try it

Write `isEven(int n)` that returns true or false.
