A variable is a named box that stores a value so you can use it later.

## Syntax

```javascript
let name = value;
const name = value;
```

- `let` creates a variable whose value **can** change.
- `const` creates a variable whose value **cannot** change.

## Examples

```javascript
let score = 0;
score = 10;            // allowed, score is now 10

const school = "CHHOYED";
// school = "Other";   // error! const cannot change
```

> Use `const` by default. Use `let` only when the value must change. Avoid the old `var`.

## Data types

| Type | Example | Meaning |
|---|---|---|
| Number | `42`, `3.14` | Whole and decimal numbers |
| String | `"Hello"`, `'Hi'` | Text |
| Boolean | `true`, `false` | Yes or no |
| Undefined | `undefined` | A variable with no value yet |
| Null | `null` | An empty value, on purpose |

```javascript
const age = 18;
const name = "Dara";
const isStudent = true;

console.log(typeof age);      // "number"
console.log(typeof name);     // "string"
console.log(typeof isStudent);// "boolean"
```

## Joining text

```javascript
const first = "Sok";
const last = "Dara";

console.log(first + " " + last);              // Sok Dara
console.log(`Hello, ${first}! You are ${age}.`); // template string
```

A **template string** uses backticks and `${ }` to place values inside text. It is easier to read than joining with `+`.

## Naming rules

- Use letters, numbers, `_` and `$`. Do not start with a number.
- Use **camelCase**: `totalPrice`, `firstName`.
- Names are case-sensitive: `age` and `Age` are different.

## Try it

Store your name, age and favourite subject in variables, and print one sentence about yourself using a template string.
