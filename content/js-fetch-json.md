Most apps get their data from a server. In the browser you do this with `fetch()`. The server usually answers with **JSON**, which you learned about in the book "Before You Code".

## Syntax

```javascript
fetch(url)
  .then(response => response.json())
  .then(data => { /* use the data */ });
```

Loading data takes time, so `fetch` works **asynchronously**: the page keeps running while it waits.

## A modern way: async and await

```javascript
async function loadUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  console.log(users);
}

loadUsers();
```

- `async` marks a function that waits for things.
- `await` pauses **inside that function** until the result arrives.
- `response.json()` turns the JSON text into a JavaScript array or object.

## Show the data on the page

```html
<ul id="users"></ul>

<script>
  async function loadUsers() {
    const list = document.querySelector("#users");
    list.textContent = "Loading...";

    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();

    list.textContent = "";
    for (const user of users) {
      const li = document.createElement("li");
      li.textContent = user.name + " (" + user.email + ")";
      list.appendChild(li);
    }
  }

  loadUsers();
</script>
```

`jsonplaceholder.typicode.com` is a free practice API that returns fake users.

## Handle errors

The network can fail. Always prepare for it:

```javascript
async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Server error " + response.status);
    }
    const users = await response.json();
    console.log(users);
  } catch (error) {
    console.log("Could not load data:", error.message);
  }
}
```

## Sending data

```javascript
await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "My first post" })
});
```

This is the **POST** method from the HTTP table: it creates data on the server.

## Try it

Fetch the list of posts from `https://jsonplaceholder.typicode.com/posts`, and show the titles of the first ten posts in a list on your page.
