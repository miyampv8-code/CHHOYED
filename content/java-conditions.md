Conditions let your program make decisions.

## if / else

```java
int score = 72;
if (score >= 80) {
    System.out.println("Great!");
} else if (score >= 50) {
    System.out.println("Pass");
} else {
    System.out.println("Try again");
}
```

Java checks from the top and runs the first block whose condition is true.

## switch

```java
int day = 3;
switch (day) {
    case 1: System.out.println("Monday"); break;
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Another day");
}
```

> Without `break`, Java keeps running the next case.

## Try it

Read a number and print whether it is positive, negative or zero.
