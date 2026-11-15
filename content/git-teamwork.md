Git was made for teams. This lesson shows how developers work together, and ends with a cheat sheet you can keep.

## Forks, issues and pull requests

| Word | Meaning |
|---|---|
| **Issue** | A note on GitHub: a bug, a question or an idea |
| **Fork** | Your own copy of someone else's repository, on your account |
| **Pull request** (PR) | A request: "please merge my changes into your project" |
| **Review** | Teammates read your PR, comment, and approve it |

## The pull request workflow

This is how most open-source projects, and most companies, work.

1. **Fork** the repository (or **clone** it, if you are a team member).
2. **Create a branch** for your change:

```bash
git switch -c fix-typo
```

3. **Edit, add and commit**:

```bash
git add .
git commit -m "Fix typo in the contact page"
```

4. **Push the branch** to GitHub:

```bash
git push -u origin fix-typo
```

5. On GitHub, click **Compare & pull request**. Write a title and a short explanation of what you changed and why.
6. Teammates **review** it. You may need to commit more changes to the same branch.
7. When it is approved, the owner clicks **Merge pull request**. Your work is now in `main`.
8. Update your computer and clean up:

```bash
git switch main
git pull
git branch -d fix-typo
```

## Good habits for teams

- Write clear commit messages and small commits.
- Always `git pull` before you start work.
- Work on a branch, never directly on `main`.
- Keep pull requests small, so they are easy to review.
- Use issues to discuss a problem **before** you write the code.
- Be kind in reviews. Comment on the code, not on the person.

## Contribute to open source

Open source projects welcome beginners. A fixed typo in the documentation is a real contribution, and it appears on your GitHub profile. Look for issues labeled **good first issue**.

## Cheat sheet

| I want to... | Command |
|---|---|
| Start tracking a folder | `git init -b main` |
| Copy a project from GitHub | `git clone URL` |
| See what changed | `git status` and `git diff` |
| Choose changes | `git add file` or `git add .` |
| Save a snapshot | `git commit -m "message"` |
| See the history | `git log --oneline` |
| Throw away my edits in a file | `git restore file` |
| Undo a commit safely | `git revert HEAD` |
| Make a branch | `git switch -c name` |
| Change branch | `git switch name` |
| Merge a branch | `git merge name` |
| Connect to GitHub | `git remote add origin URL` |
| Upload | `git push` |
| Download new work | `git pull` |

## The whole course in one picture

**Edit files → `git add` → `git commit` → `git push` → GitHub → `git pull` on another computer**

## What to learn next

| Goal | Next step |
|---|---|
| Show your work | Build a portfolio site and publish it with GitHub Pages |
| Automate | GitHub Actions: run tests every time you push |
| Safer logins | Set up an SSH key |
| Cleaner history | `git rebase` and `git stash` |

> **Remember**
> You will make mistakes with Git, and that is how everyone learns it. Because of the history, almost nothing is permanently lost. Stay calm, run `git status`, and read what it says.

## Try it

Ask a friend to add you to their repository (or fork a public one). Create a branch, change one line, push it, and open a pull request.
