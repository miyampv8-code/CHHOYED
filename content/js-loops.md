A loop repeats code so you don't have to write it many times.

## Syntax

```javascript
for (start; test; step) {
  // repeated code
}

while (test) {
  // repeated code
}
```

`break` leaves the loop. `continue` skips to the next round.

## The for loop

```javascript
for (let i = 1; i <= 5; i++) {
  console.log("Number " + i);
}
```

It has three parts: start (`let i = 1`), condition (`i <= 5`), step (`i++`).

## The while loop

```javascript
let count = 3;

while (count > 0) {
  console.log(count);
  count--;
}

console.log("Go!");
```

> If the condition never becomes false, the loop never ends and the page freezes.

## Looping over a list

```javascript
const fruits = ["Mango", "Banana", "Orange"];

for (const fruit of fruits) {
  console.log(fruit);
}
```

`for...of` takes each item in turn. This is the most common loop in real projects.

## break and continue

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue;   // skip 3
  if (i === 6) break;      // stop at 6
  console.log(i);          // 1 2 4 5
}
```

## Try it

Print the 5 times table with a `for` loop. Then add up the numbers from 1 to 100 and print the total.
