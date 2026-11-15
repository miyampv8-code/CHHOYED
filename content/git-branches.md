A **branch** is a separate line of work. You can try a new idea on a branch. If it works, you merge it into `main`. If it fails, you throw the branch away, and `main` is untouched.

## See your branches

```bash
git branch
```

```plaintext
* main
```

The star shows the branch you are on. When you start, you have one branch, called `main`.

## Create a branch and switch to it

```bash
git switch -c menu
```

```plaintext
Switched to a new branch 'menu'
```

`-c` means create. Now every commit you make goes onto the `menu` branch. Work as usual:

```bash
git add .
git commit -m "Add menu"
```

Switch back to `main`. The menu is not there, because it only exists on its branch.

```bash
git switch main
```

```plaintext
Switched to branch 'main'
```

> **Remember**
> Before you switch branches, commit your work (or `git status` must be clean). Otherwise Git may refuse to switch.

## Merge a branch

When the idea is finished, bring it into `main`. Stand on the branch that should **receive** the work, then merge:

```bash
git switch main
git merge menu
```

```plaintext
Updating 0a0284a..6d9403c
Fast-forward
 index.html | 1 +
 1 file changed, 1 insertion(+)
```

"Fast-forward" means `main` had no new work of its own, so Git simply moved it forward. Now the menu is on `main`.

Delete the branch when you are done with it:

```bash
git branch -d menu
```

## When two branches change the same line

If both branches changed the **same line** of the **same file**, Git cannot decide which one to keep. This is a **merge conflict**. It is normal, and you can fix it.

```bash
git merge b
```

```plaintext
Auto-merging index.html
CONFLICT (content): Merge conflict in index.html
Automatic merge failed; fix conflicts and then commit the result.
```

Open the file. Git marked both versions:

```plaintext
<<<<<<< HEAD
<h1>Version A</h1>
=======
<h1>Version B</h1>
>>>>>>> b
```

- Between `<<<<<<< HEAD` and `=======` is **your** version.
- Between `=======` and `>>>>>>> b` is the **other** version.

To fix it:

1. Edit the file so it contains exactly what you want. Delete the three marker lines.
2. Save the file.
3. Finish the merge:

```bash
git add index.html
git commit -m "Merge branch b"
```

If you get scared, you can cancel the merge and go back to how things were:

```bash
git merge --abort
```

## Branch commands

| Command | Meaning |
|---|---|
| `git branch` | List branches |
| `git switch name` | Go to a branch |
| `git switch -c name` | Create a branch and go to it |
| `git merge name` | Bring a branch into the current one |
| `git branch -d name` | Delete a branch after merging |

> **Key idea**
> A good habit for teams: never work directly on `main`. Create a branch for each new feature or fix, then merge it when it works.

## Try it

1. Create a branch called `colors`, change the background color in your CSS, and commit.
2. Switch back to `main` and check that the change is not there.
3. Merge `colors` into `main`, then delete the branch.
