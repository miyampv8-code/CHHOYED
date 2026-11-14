A function is a reusable block of code with a name. Write it once and use it many times.

## Syntax

```javascript
function name(parameters) {
  // code
  return result;
}
```

## Example

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Dara"));   // Hello, Dara!
console.log(greet("Sophea")); // Hello, Sophea!
```

- `name` is a **parameter**, a value the function receives.
- `return` sends a result back to the caller.
- You **call** a function by writing its name with `()`.

## More than one parameter

```javascript
function total(price, qty) {
  return price * qty;
}

console.log(total(2.5, 4)); // 10
```

## Default values

```javascript
function greet(name = "friend") {
  return `Hello, ${name}!`;
}

greet();         // Hello, friend!
```

## Arrow functions

A shorter way to write a function, used everywhere in modern JavaScript:

```javascript
const double = (x) => x * 2;

const add = (a, b) => {
  return a + b;
};

console.log(double(5)); // 10
console.log(add(2, 3)); // 5
```

## Scope

A variable created inside a function exists only inside it.

```javascript
function test() {
  const secret = 42;
}
// console.log(secret); // error: secret is not defined here
```

> Give each function **one job** and a clear name, such as `calculateTotal` or `isAdult`. Small functions are easy to test and reuse.

## Try it

Write a function `isEven(number)` that returns `true` when a number is even. Test it with 4 and 7.
