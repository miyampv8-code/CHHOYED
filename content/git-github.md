So far your repository lives only on your computer. **GitHub** keeps a copy online. This gives you a backup, lets you work from any computer, and lets other people see and share your code.

## Create a GitHub account

1. Go to github.com and choose **Sign up**.
2. Use the same email you set in Git. Pick a username you will be happy to show employers, because it becomes part of your web address.

## Create a repository on GitHub

1. Click the **+** button at the top right, then **New repository**.
2. Type a name, for example `my-site`. Use lowercase letters and hyphens.
3. Choose **Public** (anyone can see it) or **Private** (only you).
4. If you already have a project on your computer, **do not** tick "Add a README file". Leave the new repository empty.
5. Click **Create repository**.

GitHub now shows you the commands to connect. They look like this.

## Connect your project and push

Run these inside your project folder. Replace `dara` and `my-site` with your own names.

```bash
git remote add origin https://github.com/dara/my-site.git
git branch -M main
git push -u origin main
```

- `git remote add origin ...` gives the online copy a nickname, **origin**.
- `git branch -M main` makes sure your branch is called `main`.
- `git push -u origin main` uploads your commits. The `-u` remembers the connection, so next time `git push` alone is enough.

To check the connection:

```bash
git remote -v
```

```plaintext
origin	https://github.com/dara/my-site.git (fetch)
origin	https://github.com/dara/my-site.git (push)
```

The first time you push, Git needs to know it is really you. A browser window usually opens so you can sign in to GitHub. If Git asks for a password in the terminal, do **not** type your account password. GitHub no longer accepts it. Create a **personal access token** in your GitHub settings and use that instead. Many professionals use **SSH keys** instead, which you can learn later.

After the push, refresh your repository page on GitHub. Your files are there.

## The everyday cycle

```bash
git add .
git commit -m "Describe what you did"
git push
```

That is all. Edit, add, commit, push.

## Download a project: git clone

To copy any public repository, or your own project onto a new computer:

```bash
git clone https://github.com/dara/my-site.git
```

This creates a folder `my-site` with all the files and the whole history. The connection to `origin` is already set up.

## Get new changes: git pull

If someone else (or you, on another computer) pushed new commits, bring them to your computer with:

```bash
git pull
```

> **Remember**
> Make `git pull` a habit **before** you start working. It avoids most conflicts.

## "Rejected" when pushing?

```plaintext
! [rejected]        main -> main (fetch first)
error: failed to push some refs to 'https://github.com/dara/my-site.git'
hint: Updates were rejected because the remote contains work that you do not
hint: have locally.
```

This means GitHub has commits that your computer does not. Run `git pull`, fix any conflict, then `git push` again.

## Push, pull and clone

| Command | Direction | Meaning |
|---|---|---|
| `git push` | Computer to GitHub | Upload my commits |
| `git pull` | GitHub to computer | Download and merge new commits |
| `git clone` | GitHub to computer | Copy a whole repository the first time |

## README.md: the front page of your project

If your repository has a file named `README.md`, GitHub shows it on the project page. Use Markdown (the same simple format as these lessons) to explain what the project is and how to run it.

```markdown
# My Site

My personal profile page, built with HTML, CSS and JavaScript.

## How to use
Open `index.html` in your browser.
```

A good README is the first thing an employer reads on your GitHub profile.

## Try it

1. Create a GitHub account and a new empty repository.
2. Connect your project from lesson 2 with `git remote add origin` and `git push -u origin main`.
3. Add a `README.md`, then commit and push again.
