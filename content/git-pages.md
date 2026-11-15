**GitHub Pages** is a free service that turns a GitHub repository into a real website. You push your files, and GitHub puts them online. This very website, CHHOYED, is hosted that way.

## What you need

- A GitHub repository that contains a file named **`index.html`** in its main folder. This is the home page.
- Only static files (HTML, CSS, JavaScript, images). Pages does not run PHP or Node.js on the server.

## Turn it on

1. Open your repository on GitHub.
2. Click **Settings**, then **Pages** in the left menu.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose the branch **main** and the folder **/ (root)**, then click **Save**.
5. Wait about a minute and refresh the page. GitHub shows your address.

## Your website address

For a normal repository, the address is:

```plaintext
https://USERNAME.github.io/REPOSITORY/
```

For example, a repository called `my-site` owned by `dara` is published at `https://dara.github.io/my-site/`.

There is one special case. If you name a repository exactly `USERNAME.github.io`, the site gets the shorter address `https://USERNAME.github.io/`. This is perfect for your personal portfolio.

## Update your website

After the first set-up, updating the site is just your normal Git routine:

```bash
git add .
git commit -m "Add contact page"
git push
```

A minute later, the live website shows the change. If you do not see it, refresh with **Ctrl + Shift + R** to skip your browser's saved copy.

## Common problems

| Problem | Fix |
|---|---|
| The page shows 404 | Check that `index.html` is in the root folder and the name is lowercase |
| CSS or images are missing | Use **relative** paths such as `css/style.css`, not `C:\Users\...` or a path starting with `/` |
| Changes do not appear | Wait a minute, then hard refresh. Check the **Actions** tab on GitHub for errors |
| Wrong capital letters | `Image.png` and `image.png` are different files on GitHub. Match them exactly |

## Make it yours

- Add a **custom domain** in the Pages settings if you buy one.
- Add a `.nojekyll` file (an empty file with that name) if you do not use Jekyll, so GitHub does not try to process your files.
- Link your website from your GitHub profile and your CV.

> **Key idea**
> Your portfolio is your best proof that you can code. A live website with a link in your CV is much stronger than saying "I know HTML".

## Project: publish your profile page

1. Take the profile page you built in the HTML and CSS lessons.
2. Put it in a Git repository, with `index.html` in the main folder.
3. Push it to GitHub and turn on Pages.
4. Open your new address on your phone, and send the link to a friend.
