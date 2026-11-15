Now you will create your first repository and save your first versions.

## Create a project

```bash
mkdir my-site
cd my-site
git init -b main
```

```plaintext
Initialized empty Git repository in /home/dara/my-site/.git/
```

`git init` turns the folder into a repository. It creates a hidden `.git` folder where Git keeps the history. Never edit that folder by hand. The `-b main` part names the first branch `main`.

Now create a file, for example `index.html`, with a heading inside, and ask Git what it sees.

## git status: what is going on?

```bash
git status
```

```plaintext
On branch main

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	index.html

nothing added to commit but untracked files present (use "git add" to track)
```

`git status` is the command you will use the most. Run it often. It always tells you what to do next. Here, `index.html` is **untracked**: Git sees the file but is not recording it yet.

## The three areas

Git does not save everything at once. A change travels through three areas:

| Area | Meaning | Command to move forward |
|---|---|---|
| **Working folder** | The files you edit | `git add` |
| **Staging area** | The changes you chose for the next snapshot | `git commit` |
| **Repository** | The saved history | (done) |

The staging area lets you choose exactly what goes into each commit.

## git add: choose the changes

```bash
git add index.html
git status
```

```plaintext
On branch main

No commits yet

Changes to be committed:
  (use "git rm --cached <file>..." to unstage)
	new file:   index.html
```

To stage everything that changed, use a dot:

```bash
git add .
```

## git commit: save the snapshot

```bash
git commit -m "Add home page"
```

```plaintext
[main (root-commit) 035f9f2] Add home page
 1 file changed, 1 insertion(+)
 create mode 100644 index.html
```

`-m` gives the **commit message**. Write what you did, in a short sentence that starts with a verb: "Add contact form", "Fix broken link", "Update lesson text". Your future self will thank you.

```bash
git status
```

```plaintext
On branch main
nothing to commit, working tree clean
```

"Working tree clean" means everything is saved.

## The daily routine

Edit some files, then repeat these three steps:

```bash
git status          # what changed?
git add .           # choose the changes
git commit -m "Describe what you did"
```

## git log: the history

```bash
git log --oneline
```

```plaintext
0a0284a Add style
035f9f2 Add home page
```

Each line is one commit: a short code (the **hash**, yours will be different) and the message. The newest commit is at the top.

## .gitignore: files Git should skip

Some files should never be saved: passwords, secret keys, and big folders that can be rebuilt. List them in a file named `.gitignore`:

```plaintext
node_modules/
.env
*.log
.DS_Store
```

Now Git ignores the `node_modules` folder, the `.env` file (often used for secrets), every `.log` file, and the macOS `.DS_Store` file.

> **Remember**
> Never commit passwords, API keys or secret tokens. If you commit a secret and push it to GitHub, treat it as stolen, and create a new one.

## Try it

1. Create a folder with an `index.html` file and make your first commit.
2. Add a `style.css` file and make a second commit.
3. Run `git log --oneline` and check that you see two commits.
