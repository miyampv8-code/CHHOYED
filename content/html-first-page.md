**HTML** (HyperText Markup Language) is the language that gives a web page its structure. It does not calculate or decide anything. It simply tells the browser: "this is a heading, this is a paragraph, this is an image."

HTML is made of **tags**. Most tags come in pairs: an opening tag and a closing tag with a `/`.

## Syntax

```html
<tagname attribute="value">Content goes here</tagname>
```

The opening tag, the content and the closing tag together are called an **element**. An **attribute** gives the element extra information.

## The skeleton of every page

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>My first page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is my first web page.</p>
</body>
</html>
```

## How it works

- `<!DOCTYPE html>` tells the browser this is a modern HTML page.
- `<html>` wraps the whole page. `lang="en"` states the language.
- `<head>` holds information about the page that is **not** shown on screen, such as the title.
- `<title>` is the text on the browser tab.
- `<body>` holds everything the visitor sees.

## Run it

1. Install a code editor such as VS Code.
2. Create a file named `index.html` and paste the code above.
3. Double-click the file. It opens in your browser.

> Save the file after every change, then refresh the browser to see the result.

## Try it

Change the heading to your name and add a second paragraph about your favourite subject.
