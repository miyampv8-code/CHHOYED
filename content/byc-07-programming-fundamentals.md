Frameworks come and go, but the logic of programming stays the same. Learn these ideas first and any language will feel easier.

| Concept | Meaning | Example idea |
|---|---|---|
| Variable | A named box that stores a value | `age = 18` |
| Data types | Kinds of values: number, text (string), true/false (boolean) | `42`, `"Hello"`, `true` |
| Operators | Math and comparison | `+ - * / == > <` |
| Condition | Choose between paths | `if age >= 18 then adult else minor` |
| Loop | Repeat actions | Print numbers 1 to 10 |
| Function | A reusable named block of code | `calculateTotal(price, qty)` |
| List / array | An ordered collection | `["Mon", "Tue", "Wed"]` |
| Object / class | Data and behavior grouped together | A User with name and login() |

## 7.1 The same idea in three languages

Here is the same condition written in Java, Kotlin and Dart. Notice how similar they are.

```java
// Java
int age = 18;
if (age >= 18) {
    System.out.println("Adult");
}
```

```kotlin
// Kotlin
val age = 18
if (age >= 18) println("Adult")
```

```java
// Dart
int age = 18;
if (age >= 18) print("Adult");
```

## 7.2 Object-oriented programming (OOP)

OOP organizes code around objects. Java, Kotlin, Dart and Swift are all object-oriented. Learn four core ideas:

- **Class and object:** a class is a blueprint (Car); an object is one real item (my red Car).
- **Encapsulation:** keep data and the code that uses it together, and hide the details.
- **Inheritance:** a class can reuse and extend another (ElectricCar extends Car).
- **Polymorphism:** different classes can respond to the same command in their own way.

## 7.3 Problem-solving method

1. Understand the problem; write it in your own words.
2. Break it into small steps (algorithm).
3. Write the steps in plain language (pseudocode).
4. Convert them into code, one small piece at a time.
5. Test, find bugs, fix, and repeat.

> **Key idea**
> Spend more time thinking and practicing logic than memorizing syntax. Programmers look up syntax all the time; logic is the real skill.

## Review Questions

1. What is the difference between a variable and a function?
2. Explain class and object with your own example.
3. Write the steps (pseudocode) to find the largest of three numbers.
