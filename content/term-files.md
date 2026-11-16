Now you will create, copy, move and delete files without touching the mouse. You will do the same things you do in a file manager, only faster.

## Make a folder: mkdir

```bash
mkdir projects
cd projects
mkdir my-site
cd my-site
```

`mkdir` means "make directory". To make several levels at once, add `-p`:

```bash
mkdir -p a/b/c
```

## Make files: touch

```bash
touch index.html style.css
ls
```

```plaintext
index.html
style.css
```

`touch` creates empty files. (On PowerShell, use `ni index.html` instead.)

## Put text into a file: echo

```bash
echo '<h1>Hello</h1>' > index.html
```

The `>` sends the text **into** the file and replaces what was there. Use `>>` to add to the end instead of replacing.

## Read a file: cat

```bash
cat index.html
```

```plaintext
<h1>Hello</h1>
```

`cat` prints the whole file on the screen.

## More detail: ls options

```bash
ls -l
```

```plaintext
total 4
-rw-r--r-- 1 dara dara 15 Nov 15 12:10 index.html
-rw-r--r-- 1 dara dara  0 Nov 15 12:10 style.css
```

The `-l` option shows the size and the date of each file.

```bash
ls -a
```

```plaintext
.
..
index.html
style.css
```

The `-a` option also shows **hidden** files. Their names start with a dot, such as `.gitignore` and the `.git` folder.

## Copy, move and rename: cp and mv

```bash
cp index.html backup.html
mv backup.html old.html
ls
```

```plaintext
index.html
old.html
style.css
```

- `cp from to` copies a file.
- `mv from to` moves a file. If you stay in the same folder, it is how you **rename**.

You can move a file into a folder too:

```bash
mv old.html ../
```

## Delete: rm

```bash
rm old.html
```

To delete a whole folder with everything inside, add `-r` (recursive):

```bash
rm -r a
```

> **Remember**
> **There is no recycle bin in the terminal.** `rm` deletes forever. Before you delete, run `ls` to check what is there, and read your command twice. Be extra careful with `rm -r`.

## Use * to match many files

The star `*` means "anything".

```bash
ls *.html
```

```plaintext
index.html
```

`*.html` means "every file whose name ends with .html".

## When something goes wrong

```bash
cd missing-folder
```

```plaintext
bash: cd: missing-folder: No such file or directory
```

```bash
foo
```

```plaintext
bash: foo: command not found
```

These messages are not scary. They say what is wrong: the folder does not exist (check the spelling, use Tab), or the command does not exist (check the spelling, or the tool is not installed).

## Cheat sheet

| I want to... | Command |
|---|---|
| Make a folder | `mkdir name` |
| Make an empty file | `touch name` |
| Show a file | `cat name` |
| Copy | `cp from to` |
| Move or rename | `mv from to` |
| Delete a file | `rm name` |
| Delete a folder | `rm -r name` |
| List files | `ls`, `ls -l`, `ls -a` |

## Try it

1. Make a folder `practice`, go into it, and create three files with `touch`.
2. Rename one file with `mv`, copy another with `cp`, and delete the third with `rm`.
3. Use `ls` after each step to check what happened.
