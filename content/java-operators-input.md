Programs become useful when they calculate and listen to the user.

## Syntax

```java
result = a + b;                       // + - * / %

Scanner in = new Scanner(System.in);  // import java.util.Scanner;
int n = in.nextInt();                 // also nextDouble(), nextLine()
```

`%` gives the remainder.

## Operators

```java
int a = 10, b = 3;
System.out.println(a + b);         // 13
System.out.println(a / b);         // 3 (whole numbers)
System.out.println(a % b);         // 1 (remainder)
System.out.println(a > b && b > 0); // true
```

Use `+ - * / %` for math, `== != < > <= >=` to compare, and `&& || !` to combine conditions.

> Dividing two ints drops the decimals. Write `10 / 3.0` to get 3.33.

## Reading input

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        System.out.print("Your name: ");
        String name = in.nextLine();
        System.out.print("Your age: ");
        int age = in.nextInt();
        System.out.println(name + ", " + age);
    }
}
```

## Try it

Ask for two numbers and print their sum and average.
