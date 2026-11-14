Programs make decisions. First you need operators to calculate and compare, then `if` to choose what runs.

## Operators

```javascript
let a = 10;
let b = 3;

console.log(a + b);   // 13
console.log(a - b);   // 7
console.log(a * b);   // 30
console.log(a / b);   // 3.333...
console.log(a % b);   // 1 (the remainder)
console.log(a ** 2);  // 100 (power)
```

Shortcuts: `x += 5` means `x = x + 5`. `x++` adds 1.

## Comparing

| Operator | Meaning |
|---|---|
| `===` | Equal (value **and** type) |
| `!==` | Not equal |
| `>` `<` `>=` `<=` | Bigger, smaller |
| `&&` | AND: both must be true |
| `\|\|` | OR: at least one must be true |
| `!` | NOT: flips true and false |

> Always use `===`, not `==`. The double-equals converts types and gives surprising results, such as `"5" == 5` being true.

## Syntax

```javascript
if (condition) {
  // runs when the condition is true
} else if (otherCondition) {
  // runs when this one is true
} else {
  // runs otherwise
}
```

## Example

```javascript
const score = 75;

if (score >= 90) {
  console.log("Excellent");
} else if (score >= 50) {
  console.log("Pass");
} else {
  console.log("Try again");
}
```

## Combining conditions

```javascript
const age = 20;
const hasTicket = true;

if (age >= 18 && hasTicket) {
  console.log("Welcome in");
}
```

## Shorter: the ternary operator

```javascript
const message = age >= 18 ? "Adult" : "Minor";
```

## switch

```javascript
const day = "Mon";

switch (day) {
  case "Mon":
    console.log("Start of week");
    break;
  case "Fri":
    console.log("Almost weekend");
    break;
  default:
    console.log("Normal day");
}
```

## Try it

Write a program with a variable `temperature`. Print "Hot" above 30, "Nice" from 20 to 30, and "Cold" below 20.
