The **terminal** is a window where you give your computer commands by typing, instead of clicking. It looks old-fashioned, but developers use it every day, because it is fast, and because tools like Git, Python, Node.js and Flutter are controlled from it.

You do not need to be an expert. About ten commands cover most of what you will ever do.

## Open a terminal

| System | How to open it |
|---|---|
| **Windows** | Open **Git Bash** (it is installed together with Git), or search for **Windows Terminal** or **PowerShell** |
| **macOS** | Press `Cmd + Space`, type `Terminal` and press Enter |
| **Linux** | Press `Ctrl + Alt + T` |
| **VS Code** | Press ``Ctrl + ` `` (the key above Tab) to open a terminal inside your editor |

> **Remember**
> On Windows, **Git Bash** uses the same commands as macOS and Linux, and the lessons of this site use them. If you use PowerShell, many commands also work, and the table at the end of the lesson shows the differences.

## The prompt

When the terminal is ready, it shows a **prompt**:

```plaintext
dara@laptop:~$
```

- `dara` is your user name and `laptop` is the computer name.
- `~` is the folder you are in. It is a short way to write your **home folder**.
- `$` means "I am ready. Type a command."

You type after the `$` and press **Enter**.

## The shape of a command

```bash
ls -l projects
```

| Part | Name | Meaning |
|---|---|---|
| `ls` | command | What to do (list files) |
| `-l` | option | How to do it (long, detailed list) |
| `projects` | argument | What to do it on |

## Where am I? pwd

`pwd` means "print working directory". It shows the folder you are in right now.

```bash
pwd
```

```plaintext
/home/dara
```

## What is here? ls

```bash
ls
```

```plaintext
projects
```

`ls` lists the files and folders in the current folder.

## Move around: cd

`cd` means "change directory".

```bash
cd projects
pwd
```

```plaintext
/home/dara/projects
```

To go **up** one folder, use two dots:

```bash
cd ..
pwd
```

```plaintext
/home/dara
```

## Paths

A **path** is the address of a file or folder.

| Symbol | Meaning |
|---|---|
| `/` | The very top of the computer (the root) |
| `~` | Your home folder |
| `.` | The folder you are in now |
| `..` | The folder above |

An **absolute path** starts from the top, such as `/home/dara/projects`. A **relative path** starts from where you are, such as `projects/my-site` or `../images`.

On Windows, Git Bash shows a path like `/c/Users/Dara/projects`, where `/c/` means the C: drive.

## Keyboard tricks that save time

| Keys | What they do |
|---|---|
| `Tab` | Finishes a name for you. Type `cd pro` then press Tab |
| `Up arrow` | Brings back the previous command |
| `Ctrl + C` | Stops a command that is running |
| `Ctrl + L` or `clear` | Cleans the screen |

> **Key idea**
> Press **Tab** all the time. It saves typing, and it prevents spelling mistakes, because the terminal only completes names that really exist.

## The same commands on Windows (PowerShell and Command Prompt)

| Task | Git Bash, macOS, Linux | PowerShell | Command Prompt |
|---|---|---|---|
| Show the current folder | `pwd` | `pwd` | `cd` |
| List files | `ls` | `ls` or `dir` | `dir` |
| Change folder | `cd folder` | `cd folder` | `cd folder` |
| Clear the screen | `clear` | `cls` | `cls` |

## Try it

1. Open a terminal and run `pwd` to see where you are.
2. Run `ls`, then go into one of the folders with `cd` and use Tab to finish the name.
3. Go back up with `cd ..`, and check with `pwd`.
