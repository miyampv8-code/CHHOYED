Your portfolio works on your computer. Now you put it on the internet, check its quality, and share it.

## Before you publish: the checklist

| Check | Done? |
|---|---|
| Your name, texts and email are **yours**, not the example ones | |
| No link goes to `#` or to a missing page | |
| Every picture has an `alt` text | |
| The page title and description describe **you** | |
| The page works on a phone, with the menu open and closed | |
| The browser console (F12) shows no red errors | |
| File names are lowercase, without spaces | |

## Publish with GitHub Pages

You learned this in the Git & GitHub course. Here it is again for your portfolio.

1. Create a new repository on GitHub. For a portfolio, the best name is `YOUR-USERNAME.github.io`, because it gives you the shortest address.
2. Connect it and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git branch -M main
git push -u origin main
```

3. On GitHub, open **Settings**, then **Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
4. After about a minute, your site is at:

```plaintext
https://YOUR-USERNAME.github.io/
```

If you named the repository something else, such as `my-portfolio`, the address is `https://YOUR-USERNAME.github.io/my-portfolio/`.

## Test the live site

- Open it on your **phone**, on mobile data, not only on your computer.
- Click every menu link and every button.
- Send the link to a friend and ask: "What do you understand about me in 30 seconds?"

## Check the quality with Lighthouse

Chrome and Edge have a free quality checker.

1. Open your live site, then press **F12**.
2. Open the **Lighthouse** tab.
3. Choose **Mobile**, tick all four categories, and click **Analyze page load**.

| Category | What it checks |
|---|---|
| **Performance** | How fast the page loads |
| **Accessibility** | Whether people with disabilities can use it (contrast, alt texts, labels) |
| **Best practices** | Safe, modern code |
| **SEO** | Whether Google can understand the page |

Your page is small and simple, so high scores are realistic. Read the suggestions, fix what you can, and run it again.

## Make it easy to share

Add these lines inside your `<head>` so a link to your portfolio looks good in Telegram, Facebook and LinkedIn:

```html
<meta property="og:title" content="Sok Dara | Web Developer">
<meta property="og:description" content="Portfolio of Sok Dara, a student web developer from Phnom Penh.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://YOUR-USERNAME.github.io/images/preview.png">
<link rel="icon" href="images/favicon.png">
```

A **preview image** of about 1200 by 630 pixels, and a small **favicon** (the icon on the browser tab), make your page look finished.

## Tell people about it

- Put the link in your **CV**, your **GitHub profile** and your **LinkedIn**.
- Add it to the "Website" field of your GitHub profile.
- Share it with your teachers and classmates.

## Keep it alive

A portfolio is never finished. Do these every month:

1. **Add a new project** as soon as you finish one, with a real link and a short README.
2. **Remove the weakest project** when you have a better one. Three strong projects beat ten weak ones.
3. **Update your skills** when you learn something new.
4. Make a small change, then commit and push. Your commits show that you code regularly.

> **Remember**
> You started this site with a plan, a text file and an empty folder. A real portfolio, live on the internet with your name on it, is a big step. Every professional developer started with a simple, messy first page.

## What to learn next

| Goal | Next step |
|---|---|
| Show real work | Build each project as its own repository with a README, and link them from your cards |
| A bigger site | Learn a framework such as React, and a backend such as Node.js |
| Be found | Learn the basics of SEO, and use Google Search Console |
| Your own address | Buy a domain name and connect it in the Pages settings |

## Try it

1. Publish your portfolio and open it on your phone.
2. Run Lighthouse and fix one suggestion.
3. Send the link to three people, and ask for one thing they would improve.
