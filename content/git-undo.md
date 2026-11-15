Mistakes happen to everyone. Git is a safety net: you can see what changed, and you can go back.

## git diff: see what changed

After you edit a file but before you add it, `git diff` shows the exact lines that changed.

```bash
git diff
```

```plaintext
diff --git a/index.html b/index.html
index 986a4a1..8a642cd 100644
--- a/index.html
+++ b/index.html
@@ -1 +1 @@
-<h1>Hello</h1>
+<h1>Hello, CHHOYED!</h1>
```

A line starting with `-` was removed. A line starting with `+` was added. To see changes you have already staged, use `git diff --staged`.

A short version of `git status` is also useful:

```bash
git status -s
```

```plaintext
 M index.html
```

`M` means modified.

## Undo changes you have not committed

You edited a file and want it back the way it was at the last commit:

```bash
git restore index.html
```

> **Remember**
> `git restore` **throws away** your edits for that file. They cannot be recovered. Check with `git diff` first.

You ran `git add` on a file by mistake, and want to remove it from the staging area (your edits stay):

```bash
git restore --staged style.css
```

## Undo a commit the safe way: git revert

A commit is already part of the history. The safest way to undo it is to make a **new commit that does the opposite**.

```bash
git revert --no-edit HEAD
```

```plaintext
[main 430d065] Revert "Add menu"
 1 file changed, 1 deletion(-)
```

`HEAD` means "the latest commit". You can also use a hash from `git log --oneline`, to revert an older commit.

```bash
git log --oneline
```

```plaintext
430d065 Revert "Add menu"
6d9403c Add menu
0a0284a Add style
035f9f2 Add home page
```

The history is not erased. It now shows both the mistake and its undo. This is exactly what you want when you work with other people.

## Look at an old version

Use the hash from `git log` to inspect an old commit:

```bash
git show 0a0284a
```

You see the message and the changes of that commit.

## Which undo do I need?

| Situation | Command |
|---|---|
| See what I changed | `git diff` |
| Throw away my edits in a file | `git restore file` |
| Remove a file from the staging area | `git restore --staged file` |
| Undo a commit, safely | `git revert HEAD` |

> **Key idea**
> Commit often, in small steps. Small commits are easy to understand and easy to undo. One giant commit at the end of the week is hard to fix.

## Try it

1. Change a file, run `git diff`, then use `git restore` to undo the change.
2. Make a commit with a small mistake, then use `git revert` to undo it. Check `git log --oneline`.
