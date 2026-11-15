Have you ever saved files like `report_final.docx`, `report_final2.docx` and `report_REALLY_final.docx`? **Git** solves that problem for code. It records every version of your project, so you can go back in time, see what changed, and work with other people without overwriting each other's work.

## Git and GitHub are not the same thing

| | Git | GitHub |
|---|---|---|
| What is it? | A program on your computer | A website |
| Job | Records the history of your project | Stores your Git projects online and lets people share them |
| Needs internet? | No | Yes |
| Free? | Yes | Yes (for public and private projects) |

Think of Git as the camera that takes the photos of your project, and GitHub as the online album where you keep and share them. Other sites, such as GitLab and Bitbucket, do the same job as GitHub.

## Words you will meet

| Word | Meaning |
|---|---|
| **Repository** (repo) | A project folder that Git is tracking, with its full history |
| **Commit** | One saved snapshot of your project, with a short message |
| **Branch** | A separate line of work, so you can try ideas safely |
| **Remote** | A copy of the repository on another computer, such as GitHub |
| **Clone** | Download a copy of a remote repository |

## Install Git

1. Go to the official Git website (search for "git download") and install it. On Windows, accept the default options.
2. Open a **terminal**: on Windows use *Git Bash* (installed with Git), on macOS or Linux use *Terminal*.
3. Check that it works:

```bash
git --version
```

```plaintext
git version 2.43.0
```

Your version number may be different. That is fine.

## Tell Git who you are

Every commit records its author. Set your name and email **once** on your computer.

```bash
git config --global user.name "Sok Dara"
git config --global user.email "dara@example.com"
```

Use the same email you will use for your GitHub account.

## The terminal commands you need

You learned these in the book "Before You Code". Here is a quick reminder:

| Command | What it does |
|---|---|
| `pwd` | Shows the folder you are in |
| `ls` (or `dir` on Windows Command Prompt) | Lists the files |
| `cd folder` | Goes into a folder |
| `cd ..` | Goes up one folder |
| `mkdir name` | Makes a new folder |

> **Key idea**
> You do not need to memorize Git. About ten commands cover almost everything you will do. This course teaches them one by one, and the last lesson has a cheat sheet.

## Try it

Install Git, set your name and email, and run `git config --global --list` to see that your settings were saved.
