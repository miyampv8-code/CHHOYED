Real programs store many values together. JavaScript has two main tools: **arrays** (ordered lists) and **objects** (named properties).

## Arrays

```javascript
const days = ["Mon", "Tue", "Wed"];

console.log(days[0]);       // "Mon" (counting starts at 0)
console.log(days.length);   // 3

days.push("Thu");           // add to the end
days.pop();                 // remove from the end
```

## Useful array methods

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);          // [2, 4, 6, 8, 10]
const big     = numbers.filter(n => n > 2);       // [3, 4, 5]
const sum     = numbers.reduce((t, n) => t + n, 0); // 15
const found   = numbers.find(n => n > 3);         // 4

numbers.forEach(n => console.log(n));
```

| Method | What it does |
|---|---|
| `map` | Makes a **new array** by changing every item |
| `filter` | Keeps only the items that pass a test |
| `reduce` | Combines all items into one value |
| `find` | Returns the first item that passes a test |
| `forEach` | Runs code for each item |

## Objects

An object groups related data using **key: value** pairs.

```javascript
const student = {
  name: "Sok Dara",
  age: 18,
  skills: ["HTML", "CSS", "JavaScript"],
  greet() {
    return "Hi, I am " + this.name;
  }
};

console.log(student.name);       // "Sok Dara"
console.log(student["age"]);     // 18
console.log(student.skills[0]);  // "HTML"
console.log(student.greet());    // "Hi, I am Sok Dara"

student.age = 19;                // change a value
student.city = "Phnom Penh";     // add a new property
```

## An array of objects

This pattern is everywhere: it is what an API sends you.

```javascript
const students = [
  { name: "Dara", score: 85 },
  { name: "Sophea", score: 92 },
  { name: "Vanna", score: 48 }
];

const passed = students.filter(s => s.score >= 50);
console.log(passed.map(s => s.name)); // ["Dara", "Sophea"]
```

## JSON

JSON is a text format that looks like an object. Servers send and receive data as JSON.

```javascript
const text = JSON.stringify(student);   // object to JSON text
const back = JSON.parse(text);          // JSON text to object
```

## Try it

Make an array of three products, each with a `name` and a `price`. Print only the names of the products that cost more than 5.
