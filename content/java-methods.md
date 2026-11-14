A method is a named block of code you can reuse.

## Syntax

```java
static returnType name(type param1, type param2) {
    // ...
    return value;
}

name(arg1, arg2);    // call it
```

Use `void` as the return type when nothing is returned.

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
