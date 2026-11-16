Every developer sees errors every day, beginners and experts alike. The difference is not that experts make fewer mistakes. They know how to **read** an error and how to **find help**. This lesson teaches both.

## An error message is a clue

Look at this Python error:

```plaintext
Traceback (most recent call last):
  File "oops.py", line 2, in <module>
    print("Hello, " + nmae)
                      ^^^^
NameError: name 'nmae' is not defined
```

Read it from the **bottom** to the top:

| Part | What it tells you |
|---|---|
| `NameError` | The **type** of the problem |
| `name 'nmae' is not defined` | The **message**: Python does not know a variable called `nmae` |
| `line 2` | **Where** to look |
| `^^^^` | The exact spot |

The cause is a typing mistake: `nmae` should be `name`. The error told you everything you needed.

Here is a different one:

```plaintext
  File "oops2.py", line 1
    print("Hello"
         ^
SyntaxError: '(' was never closed
```

The message says a bracket `(` was never closed. The fix is to add the missing `)`.

> **Remember**
> Do not panic and do not skip the message. **Read it slowly, out loud if it helps.** Most of the time, the answer is in the message and the line number.

## The same idea in the browser

In JavaScript, errors do not appear on the page. They appear in the **console**.

1. Press **F12** (or right-click and choose **Inspect**).
2. Open the **Console** tab.

```plaintext
Uncaught ReferenceError: userName is not defined
    at script.js:5:13
```

This says: the variable `userName` does not exist, in the file `script.js`, line 5. The red messages in the console are your best friends.

The other tabs of this tool are useful too:

| Tab | Use it to... |
|---|---|
| **Console** | Read errors and test small pieces of JavaScript |
| **Elements** | See and change the HTML and CSS of the page, live |
| **Network** | See which files loaded, and which ones failed (look for a red 404) |

## A calm routine for any bug

1. **Read** the error message and the line number.
2. **Reproduce** it: can you make it happen again, every time?
3. **Make the problem smaller.** Comment out code, or test one piece at a time.
4. **Change one thing at a time**, then test again. If you change five things, you will not know which one helped.
5. **Search** for the error message (see below).
6. **Take a break.** A short walk often finds a bug that an hour of staring did not.

> **Key idea**
> Save your work with **Git** before you experiment. If you break something, you can always go back to the last working version.

## Common errors and what they mean

| Message | Usually means |
|---|---|
| `command not found` | The tool is not installed, or the command is misspelled |
| `No such file or directory` | The path is wrong. Check spelling and capital letters |
| `Permission denied` | You are not allowed to do this here. Check the folder |
| `ReferenceError: x is not defined` | You used a name that does not exist. Check spelling |
| `SyntaxError` | A bracket, quote or comma is missing or extra |
| `404 Not Found` | The file or page is not at that address. Check the path and the name |
| `Failed to fetch` | The server or the address is wrong, or you are offline |

## How to search for help

1. **Copy the exact error message** (without your own file names), and paste it into a search engine.
2. **Add the language or tool**: `python NameError name is not defined`.
3. Open results from **official documentation** (such as MDN for web code), Stack Overflow, or GitHub issues.
4. Check that the answer matches **your** problem, then try it. Do not copy code you do not understand.

## How to ask a good question

When you ask a teacher, a friend or a community, include:

- What you **wanted** to happen.
- What **really** happened, with the exact error message.
- The **smallest** piece of code that shows the problem.
- What you already **tried**.

A good question often answers itself while you write it. Programmers call this **rubber duck debugging**: explain the problem out loud to a toy duck, and you will often see the answer.

## Try it

1. Make a Python or JavaScript file with a spelling mistake in a variable name. Read the error message and find the line.
2. Open any web page, press **F12**, and look at the Console and the Network tabs.
3. Search for the error `SyntaxError: '(' was never closed` and read two different answers.
