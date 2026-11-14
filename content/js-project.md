Now combine HTML, CSS and JavaScript in one real project: a **to-do list**. You will use variables, arrays, functions, the DOM and events.

## What it does

- Type a task and press **Add**.
- Click a task to mark it as done.
- Click **Delete** to remove it.

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>To-do list</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="box">
    <h1>My to-do list</h1>
    <form id="form">
      <input id="task" placeholder="New task" required>
      <button type="submit">Add</button>
    </form>
    <ul id="list"></ul>
  </main>
  <script src="script.js"></script>
</body>
</html>
```

## style.css

```css
* { box-sizing: border-box; }

body {
  font-family: Arial, sans-serif;
  background: #f0f2f8;
  margin: 0;
  padding: 20px;
}

.box {
  max-width: 420px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

form { display: flex; gap: 8px; }
input { flex: 1; padding: 10px; }
button { padding: 10px 14px; cursor: pointer; }

ul { list-style: none; padding: 0; }

li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

li.done span { text-decoration: line-through; color: gray; }
```

## script.js

```javascript
const form = document.querySelector("#form");
const input = document.querySelector("#task");
const list = document.querySelector("#list");

let tasks = [];

function render() {
  list.textContent = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const text = document.createElement("span");
    text.textContent = task.text;
    text.addEventListener("click", () => {
      task.done = !task.done;
      render();
    });

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      tasks.splice(index, 1);
      render();
    });

    li.append(text, del);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  tasks.push({ text: input.value, done: false });
  input.value = "";
  render();
});
```

## How it works

1. `tasks` is an **array of objects**. It is the single source of truth.
2. `render()` clears the list and rebuilds it from the array, so the screen always matches the data.
3. Each click or delete changes the array, then calls `render()` again.

> This idea, "change the data, then redraw the screen", is the foundation of React, Vue and Flutter.

## Make it better

1. Save the tasks in the browser with `localStorage.setItem("tasks", JSON.stringify(tasks))` and load them with `JSON.parse(localStorage.getItem("tasks"))`.
2. Add a counter that shows how many tasks are left.
3. Add a **Clear done tasks** button using `tasks.filter(...)`.
4. Show a friendly message when the list is empty.
