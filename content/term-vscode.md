**Visual Studio Code** (VS Code) is the free code editor that most web developers use. It colors your code, finishes words for you, and has a terminal built in. This lesson sets it up the way professionals use it.

## Install it

1. Search for "VS Code download" and install the free version for your system.
2. Open it. The first time, close any welcome tab.

## The screen

| Part | What it is |
|---|---|
| **Explorer** (left) | The files and folders of your project |
| **Editor** (middle) | Where you write code. Each file is a tab |
| **Terminal** (bottom) | A real terminal, already inside your project folder |
| **Extensions** (left icon) | A store of add-ons |

## Open your project folder

Always open the **folder** of your project, not a single file. Then VS Code can see all your files.

1. Choose **File**, then **Open Folder**, and pick your project.
2. Or, from a terminal inside the folder, type:

```bash
code .
```

## Three extensions worth installing

Open the Extensions icon, search for the name, and click **Install**.

| Extension | What it does |
|---|---|
| **Live Server** | Opens your page in the browser and reloads it every time you save |
| **Prettier** | Formats your code so it is always neat |
| **Code Spell Checker** | Underlines spelling mistakes in your code and text |

## See your page: Live Server

1. Open your project folder.
2. Right-click `index.html` and choose **Open with Live Server**.
3. Your browser opens an address like `http://127.0.0.1:5500/`.
4. Edit the code, press `Ctrl + S`, and the page updates by itself.

## Why not just double-click the file?

A page opened from your disk has an address like `file:///C:/...`. A real website has an address like `http://...`. Some things only work on `http://`, for example loading data with `fetch`, and paths that start with `/`. A **local server** shows your page the same way the real website will. Live Server is one. You can also start one yourself with Python:

```bash
python3 -m http.server 8000
```

On Windows, use `py -m http.server 8000` instead.

```plaintext
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

Open `http://localhost:8000` in your browser. Press `Ctrl + C` in the terminal to stop the server.

## Settings that help

Open **File**, **Preferences**, **Settings**, and search for:

- **Auto Save**: choose `afterDelay`, so you never lose work.
- **Format On Save**: tick it. Prettier then tidies your code each time you save.
- **Font Size**: make it comfortable for your eyes.

## Type less with Emmet

VS Code can expand short codes into HTML. Type the short code, then press **Tab**.

| You type | You get |
|---|---|
| `!` | A complete HTML page skeleton |
| `ul>li*3` | A list with three items |
| `h1` | `<h1></h1>` |
| `a` | `<a href=""></a>` |

## Shortcuts to learn first

On macOS, use `Cmd` instead of `Ctrl`.

| Keys | What it does |
|---|---|
| `Ctrl + S` | Save |
| `Ctrl + P` | Open any file by typing its name |
| `Ctrl + Shift + P` | Command palette: search every command |
| ``Ctrl + ` `` | Show or hide the terminal |
| `Ctrl + /` | Comment or uncomment the line |
| `Alt + Up` or `Alt + Down` | Move the line |
| `Shift + Alt + Down` | Copy the line |
| `Ctrl + D` | Select the next same word, to edit many at once |

> **Key idea**
> You do not need to remember all of these. Learn **Ctrl + S**, **Ctrl + P** and **Ctrl + Shift + P** first. The command palette finds anything else you forget.

## Try it

1. Install VS Code, Live Server and Prettier.
2. Make a folder, open it in VS Code, and create `index.html`. Type `!` and press Tab.
3. Open it with Live Server, change the heading, and watch the browser update when you save.
