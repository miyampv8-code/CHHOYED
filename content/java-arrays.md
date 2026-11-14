An array stores many values of the same type.

## Syntax

```java
type[] name = {value1, value2, value3};
type[] name = new type[size];

name[index]          // one item, counting starts at 0
name.length          // how many items

for (type item : name) {
    // runs once for every item
}
```

## Create and use

```java
int[] scores = {80, 65, 90};
System.out.println(scores[0]);      // 80
System.out.println(scores.length);  // 3
scores[1] = 70;
```

The first index is **0**. Going past the end throws `ArrayIndexOutOfBoundsException`.

## Loop over an array

```java
int sum = 0;
for (int s : scores) {
    sum += s;
}
System.out.println("Average: " + (double) sum / scores.length);
```

## Try it

Find the biggest number in an array.
