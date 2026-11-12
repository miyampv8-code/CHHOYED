A loop repeats code so you don't write it many times.

## The for loop

```java
for (int i = 1; i <= 5; i++) {
    System.out.println("Number " + i);
}
```

It has three parts: start, condition, step.

## The while loop

```java
int count = 3;
while (count > 0) {
    System.out.println(count);
    count--;
}
System.out.println("Go!");
```

> If the condition never becomes false, the loop never ends.

Use `break` to leave a loop early and `continue` to skip to the next round.

## Try it

Print the 5 times table with a `for` loop.
