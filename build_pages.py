"""
Builds real web pages for Google, from the lessons you already wrote.

WHY: the course view (index.html#/post/...) is one page that changes with JavaScript, so
Google mostly sees only the home page. This script writes one real page for every lesson,
with its own address, title, description and full text:

    lessons/html-text.html, lessons/css-grid.html, ...
    lessons/index.html      (a list of all lessons)
    about.html              (made from content/about.md)
    roadmap.html            (made from data/roadmap.json)
    playground.html         (the free code playground)
    404.html                (the "page not found" page)
    sitemap.xml             (tells Google about every page)

HOW TO RUN (in a terminal, inside your CHHOYED project folder):

    py -m pip install markdown-it-py      <- only the first time
    py build_pages.py

Run it again every time you add or change a lesson, then commit the new files:

    git add .
    git commit -m "Update lesson pages"
    git push origin main

The files it writes can be rebuilt at any time, so you never edit them by hand.
Edit the lessons in content/*.md and data/*.json as usual.
"""
import html
import json
import re
import sys
from pathlib import Path

try:
    from markdown_it import MarkdownIt
except ImportError:
    sys.exit("Please run this first:   py -m pip install markdown-it-py")

ROOT = Path(__file__).resolve().parent
BASE = "https://miyampv8-code.github.io/CHHOYED/"   # your site address (must end with /)
SITE = "CHHOYED"
GOATCOUNTER = "chhoyed"                              # same code as in js/app.js
OG_IMAGE = BASE + "images/og-banner.png"

esc = lambda s: html.escape(str(s), quote=True)
load = lambda p: json.loads((ROOT / p).read_text(encoding="utf-8"))

subjects = load("data/subjects.json")
posts = load("data/posts.json")
teachers = {t["id"]: t for t in load("data/teachers.json")}
S = {s["id"]: s for s in subjects}

md = MarkdownIt("commonmark", {"html": False}).enable("table").enable("strikethrough")


# ---------------------------------------------------------------- helpers
def topic_of(p):
    return next((t for t in S.get(p["subject"], {}).get("topics", []) if t["id"] == p.get("topic")), None)


def label(p):
    s, t = S.get(p["subject"]), topic_of(p)
    if not s:
        return p["subject"].title(), "#888888"
    return (f"{s['name']} \u00b7 {t['name']}", t["color"]) if t else (s["name"], s["color"])


def course_name(p):
    t = topic_of(p)
    return t["name"] if t else S.get(p["subject"], {}).get("name", "")


def same_track(a, b):
    return a["subject"] == b["subject"] and (a.get("topic") or "") == (b.get("topic") or "")


def seq(ps):
    return sorted([p for p in ps if p.get("order")], key=lambda p: p["order"])


def fmt_date(d):
    y, m, day = d.split("-")
    months = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split()
    return f"{int(day)} {months[int(m) - 1]} {y}"


def initials(name):
    return "".join(w[0] for w in name.split()[:2]).upper()


def avatar(t, size, prefix):
    img = f'<img src="{prefix}{esc(t["photo"])}" alt="">' if t.get("photo") else ""
    return f'<span class="av {size}">{img}{esc(initials(t["name"]))}</span>'


def tag(name, color):
    return f'<span class="tag" style="--c:{esc(color)}"><i></i>{esc(name)}</span>'


def short(text, n=158):
    text = re.sub(r"\s+", " ", text).strip()
    return text if len(text) <= n else text[: n - 1].rsplit(" ", 1)[0] + "\u2026"


# ---------------------------------------------------------------- page shell
def shell(title, desc, path, prefix, body, jsonld=(), og_type="article", base_href="", scripts=True, extra_js=""):
    canon = BASE + path
    ld = "".join(f'<script type="application/ld+json">{json.dumps(j, ensure_ascii=False)}</script>\n  ' for j in jsonld)
    nav = f'<a href="{prefix}index.html#/">All</a>' + "".join(
        f'<a href="{prefix}index.html#/subject/{esc(s["id"])}">{esc(s["name"])}</a>' for s in subjects
    ) + f'<a href="{prefix}index.html#/roadmap">Roadmap</a><a href="{prefix}index.html#/contact">Contact</a><a href="{prefix}index.html#/search">Search</a>'
    gc = f'<script data-goatcounter="https://{GOATCOUNTER}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>' if GOATCOUNTER else ""
    js = (
        f'<script src="{prefix}js/vendor/highlight.min.js"></script>\n'
        f'  <script src="{prefix}js/tryit.js"></script>\n  <script src="{prefix}js/helpful.js"></script>\n  <script src="{prefix}js/reader.js"></script>\n  {extra_js}<script src="{prefix}js/page.js"></script>\n  {gc}'
    ) if scripts else f'{extra_js}<script src="{prefix}js/page.js"></script>\n  {gc}'
    return f"""<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  {f'<base href="{base_href}">' if base_href else ''}
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(desc)}">
  <link rel="canonical" href="{esc(canon)}">
  <meta property="og:type" content="{og_type}">
  <meta property="og:site_name" content="{SITE}">
  <meta property="og:title" content="{esc(title)}">
  <meta property="og:description" content="{esc(desc)}">
  <meta property="og:url" content="{esc(canon)}">
  <meta property="og:image" content="{OG_IMAGE}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{esc(title)}">
  <meta name="twitter:description" content="{esc(desc)}">
  <meta name="twitter:image" content="{OG_IMAGE}">
  {ld}<script>try{{var t=localStorage.getItem("chhoyed-theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}}catch(e){{}}</script>
  <link rel="icon" type="image/svg+xml" href="{prefix}images/logo.svg">
  <link rel="apple-touch-icon" href="{prefix}images/apple-touch-icon.png">
  <link rel="manifest" href="{prefix}manifest.webmanifest">
  <meta name="theme-color" content="#5b3df5">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700&family=Source+Serif+4:wght@400;600&family=Noto+Sans+Khmer:wght@400;600&family=Noto+Serif+Khmer:wght@400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{prefix}js/vendor/atom-one-dark.min.css">
  <link rel="stylesheet" href="{prefix}css/style.css">
</head>

<body>
  <header>
    <div class="wrap bar">
      <a class="logo" href="{prefix}index.html#/"><img src="{prefix}images/logo.svg" width="34" height="34" alt="">CHHOYED</a>
      <nav id="nav" aria-label="Subjects">{nav}</nav>
      <a id="srch" class="tbtn sbtn" href="{prefix}index.html#/search" aria-label="Search" title="Search"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></a>
      <button id="theme" class="tbtn" type="button" aria-label="Switch theme"></button>
    </div>
  </header>
  <main class="wrap">
{body}
  </main>
  <footer class="wrap"><a class="logo" href="{prefix}index.html#/"><img src="{prefix}images/logo.svg" width="28" height="28" alt="">CHHOYED</a>
    <p>Free lessons in coding, math and physics. Every lesson is posted by the CHHOYED team.</p>
    <p class="flinks"><a href="{prefix}about.html">About</a> \u00b7 <a href="{prefix}lessons/index.html">All lessons</a> \u00b7 <a href="{prefix}roadmap.html">Roadmap</a> \u00b7 <a href="{prefix}playground.html">Playground</a></p>
  </footer>
  {js}
</body>

</html>
"""


# ---------------------------------------------------------------- lesson pages
def render_body(p, prefix):
    out = ""
    if p.get("contentFile"):
        text = (ROOT / p["contentFile"]).read_text(encoding="utf-8")
        out = md.render(text)
        out = re.sub(r'src="(?!https?:|/|\.\./)', f'src="{prefix}', out)          # images
        out = out.replace("<img ", '<img loading="lazy" decoding="async" ')
    if p.get("pages") and p.get("book"):
        if not p.get("contentFile"):
            out += f"<p>{esc(p['summary'])} On a phone, pinch to zoom in on a page.</p>"
        a, b = p["pages"]
        out += "".join(
            f'<img class="bookpage" loading="lazy" decoding="async" src="{prefix}images/books/{esc(p["book"])}/{i:04d}.webp" alt="{esc(p["title"])}, page {i}">'
            for i in range(a, b + 1)
        )
    return out


def lesson_page(p):
    prefix = "../"
    t = teachers.get(p["teacherId"], {"id": "", "name": "CHHOYED Team", "title": "", "bio": ""})
    name, color = label(p)
    track = seq([x for x in posts if same_track(x, p)])
    k = next((i for i, x in enumerate(track) if x["id"] == p["id"]), -1)
    ordered = k >= 0

    nav = ""
    if ordered:
        parts = []
        for n, x in enumerate([track[k - 1] if k > 0 else None, track[k + 1] if k + 1 < len(track) else None]):
            if x:
                parts.append(f'<a href="{esc(x["id"])}.html"{' class="nx"' if n else ''}><small>{"Next lesson" if n else "Previous lesson"}</small>{esc(x["title"])}</a>')
        nav = f'<div class="pn">{"".join(parts)}</div>'

    toc = ""
    if ordered:
        items = "".join(
            f'<li{' class="now"' if x["id"] == p["id"] else ''}><a href="{esc(x["id"])}.html">{esc(x["title"])}</a></li>' for x in track
        )
        toc = f'<section class="toc"><h2>All lessons in {esc(course_name(p))}</h2><ol>{items}</ol></section>'

    crumbs = [("Home", f"{prefix}index.html#/"), ("All lessons", "index.html")]
    sub = S.get(p["subject"])
    if sub:
        crumbs.append((course_name(p), f'{prefix}index.html#/subject/{esc(p["subject"])}{"/" + esc(p["topic"]) if p.get("topic") else ""}'))
    crumb_html = " \u203a ".join(f'<a href="{u}">{esc(n)}</a>' for n, u in crumbs)

    file_btns = ""
    if p.get("file"):
        file_btns = (f'<div class="btns fileb"><a class="btn" href="{prefix}{esc(p["file"])}" target="_blank" rel="noopener">Open the PDF</a>'
                     f'<a class="btn alt" href="{prefix}{esc(p["file"])}" download>Download</a></div>')

    pill = f'<span class="pill">Lesson {k + 1} of {len(track)}</span>' if ordered else ""
    done = ('<div class="donebar"><span>Finished this lesson?</span>'
            f'<button type="button" class="btn donebtn" data-done="{esc(p["id"])}" aria-pressed="false">Mark as done</button></div>') if ordered else ""
    helpful = (
        '<div class="helpful" data-helpful="%s" data-contact="%sindex.html#/contact/%s"><span class="hq">Was this lesson helpful?</span>'
        '<button type="button" data-vote="yes">\U0001F44D Yes</button><button type="button" data-vote="no">\U0001F44E Not really</button>'
        '<a class="hrep" href="%sindex.html#/contact/%s">Found a mistake? Report it</a><span class="hm" role="status"></span></div>'
    ) % (esc(p["id"]), prefix, esc(p["id"]), prefix, esc(p["id"])) if p.get("contentFile") else ""

    body = f"""    <div class="crumbs" role="navigation" aria-label="Breadcrumb">{crumb_html}</div>
    <article data-id="{esc(p['id'])}"{' data-ordered="1"' if ordered else ''}>
      {tag(name, color)}{pill}
      <h1>{esc(p['title'])}</h1>
      <a class="byline" href="{prefix}index.html#/teacher/{esc(t['id'])}">{avatar(t, 'sm', prefix)}<span>{esc(t['name'])}</span><time datetime="{esc(p['date'])}">{fmt_date(p['date'])}</time></a>
      {file_btns}
      <div class="lesson">{render_body(p, prefix)}</div>
      {done}{helpful}
    </article>
    {nav}
    {toc}
    <p class="openlink"><a class="btn alt" href="{prefix}index.html#/post/{esc(p['id'])}">Open this lesson in the course view (progress, practice, search)</a></p>
    <aside class="credit">{avatar(t, 'md', prefix)}<div><h3>{esc(t['name'])}</h3><p>{esc(t.get('title', ''))}</p><p>{esc(t.get('bio', ''))}</p><p><a href="{prefix}index.html#/teacher/{esc(t['id'])}">See all lessons by {esc(t['name'])}</a></p></div></aside>"""

    url = f"{BASE}lessons/{p['id']}.html"
    ld = [
        {
            "@context": "https://schema.org", "@type": "Article", "headline": p["title"], "description": p["summary"],
            "datePublished": p["date"], "dateModified": p["date"], "inLanguage": "en", "image": OG_IMAGE,
            "mainEntityOfPage": url, "isAccessibleForFree": True,
            "author": {"@type": "Organization" if t["id"] == "chhoyed-team" else "Person", "name": t["name"]},
            "publisher": {"@type": "Organization", "name": SITE, "logo": {"@type": "ImageObject", "url": BASE + "images/apple-touch-icon.png"}},
        },
        {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE},
                {"@type": "ListItem", "position": 2, "name": "All lessons", "item": BASE + "lessons/"},
                {"@type": "ListItem", "position": 3, "name": p["title"], "item": url},
            ],
        },
    ]
    title = f"{p['title']} | {course_name(p) or SITE} | {SITE}" if course_name(p) else f"{p['title']} | {SITE}"
    desc = f"{course_name(p)}: {p['summary']}" if course_name(p) else p["summary"]
    return shell(title, short(desc + " Free lesson on " + SITE + "."), f"lessons/{p['id']}.html", prefix, body, ld)


# ---------------------------------------------------------------- list of all lessons
def index_page():
    prefix = "../"
    out = ['    <h1>All lessons</h1>', '    <p class="blurb">Every lesson on CHHOYED, grouped by course. Pick a course and start from lesson 1.</p>', '    <div class="alllist">']
    for s in subjects:
        out.append(f'    <h2>{esc(s["name"])}</h2>')
        groups = [(t["name"], t["tagline"] if t.get("tagline") else "", [p for p in posts if p["subject"] == s["id"] and p.get("topic") == t["id"]]) for t in s.get("topics", [])]
        rest = [p for p in posts if p["subject"] == s["id"] and not topic_of(p)]
        if rest:
            groups.append((s["name"] if not s.get("topics") else "More lessons", "", rest))
        for gname, tagline, ps in groups:
            if not ps:
                continue
            ps = seq(ps) + sorted([p for p in ps if not p.get("order")], key=lambda p: p["date"], reverse=True)
            if s.get("topics") or len(groups) > 1:
                out.append(f'    <h3>{esc(gname)}</h3>')
                if tagline:
                    out.append(f'    <p>{esc(tagline)}</p>')
            out.append("    <ul>" + "".join(f'<li><a href="{esc(p["id"])}.html">{esc(p["title"])}</a><small>{esc(p["summary"])}</small></li>' for p in ps) + "</ul>")
    out.append("    </div>")
    ld = [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "All lessons", "url": BASE + "lessons/", "isPartOf": {"@type": "WebSite", "name": SITE, "url": BASE}}]
    return shell(f"All lessons | {SITE}", "Every free CHHOYED lesson in coding, math and physics, grouped by course.", "lessons/", prefix, "\n".join(out), ld, "website", scripts=False)


# ---------------------------------------------------------------- about and 404
def about_page():
    text = (ROOT / "content" / "about.md").read_text(encoding="utf-8")
    tracks = {}
    for p in posts:
        if p.get("order"):
            tracks.setdefault((p["subject"], p.get("topic") or ""), []).append(p)
    items = []
    for s in subjects:
        for t in s.get("topics", []) or [{"id": "", "name": s["name"], "tagline": ""}]:
            ps = tracks.get((s["id"], t["id"]))
            if ps:
                href = f'index.html#/subject/{s["id"]}' + (f'/{t["id"]}' if t["id"] else "")
                items.append(f'- **[{t["name"]}]({href})**: {len(ps)} lessons' + (f' ({t["tagline"]})' if t.get("tagline") else ""))
    text = text.replace("{{lessons}}", str(len(posts))).replace("{{courses}}", str(len(tracks))).replace("{{courselist}}", "\n".join(items))
    body = f'    <article>\n      <h1>About CHHOYED</h1>\n      <div class="lesson">{md.render(text)}</div>\n    </article>'
    ld = [{"@context": "https://schema.org", "@type": "AboutPage", "name": "About CHHOYED", "url": BASE + "about.html"}]
    return shell(f"About | {SITE}", "CHHOYED is a free place to learn coding, math and physics, from beginner to advanced.", "about.html", "", body, ld, "website", scripts=False)


def roadmap_page():
    road = load("data/roadmap.json")
    tops = {t["id"]: (s, t) for s in subjects for t in s.get("topics", [])}
    out = ['    <h1>Learning roadmap</h1>', '    <p class="blurb">Not sure where to start? Pick a path and follow the courses in order.</p>']
    for pt in road["paths"]:
        out.append(f'    <section class="rpath"><h2>{esc(pt["title"])}</h2><p class="blurb">{esc(pt["description"])}</p><ol class="rsteps">')
        n = 0
        for cid in pt["courses"]:
            if cid not in tops:
                continue
            s_, t_ = tops[cid]
            ps = seq([p for p in posts if p["subject"] == s_["id"] and p.get("topic") == cid])
            if not ps:
                continue
            n += 1
            out.append(f'<li class="rstep" style="--c:{esc(t_["color"])}"><a href="lessons/{esc(ps[0]["id"])}.html"><b>{n}</b><div><h3>{esc(t_["name"])}</h3>'
                       f'<p>{esc(t_.get("tagline", ""))}</p><span class="pill">{len(ps)} lessons</span></div></a></li>')
        out.append("    </ol></section>")
    ld = [{"@context": "https://schema.org", "@type": "CollectionPage", "name": "Learning roadmap", "url": BASE + "roadmap.html", "isPartOf": {"@type": "WebSite", "name": SITE, "url": BASE}}]
    return shell(f"Learning roadmap: how to learn web development, programming and math | {SITE}",
                 "Pick a path and follow the free courses in order: web developer, data, programming and math.", "roadmap.html", "", "\n".join(out), ld, "website", scripts=False)


def playground_page():
    body = ('    <h1>Playground</h1>\n    <p class="blurb">Write HTML, CSS and JavaScript and see the result at once. Free, and nothing to install.</p>\n'
            '    <div id="pg-root"></div>\n    <noscript><p>The playground needs JavaScript.</p></noscript>')
    ld = [{"@context": "https://schema.org", "@type": "WebApplication", "name": "CHHOYED Playground", "url": BASE + "playground.html", "applicationCategory": "EducationalApplication", "operatingSystem": "Any", "isAccessibleForFree": True}]
    return shell(f"Free online HTML, CSS and JavaScript playground | {SITE}",
                 "Write HTML, CSS and JavaScript and see the result at once. Free, with a console, and nothing to install.", "playground.html", "", body, ld, "website",
                 scripts=False, extra_js='<script src="js/playground.js"></script>\n  ')


def not_found_page():
    body = ('    <article>\n      <h1>Page not found</h1>\n      <div class="lesson"><p>Sorry, this page does not exist. The link may be old or mistyped.</p>\n'
            '      <p><a class="btn" href="index.html#/">Go to the home page</a> <a class="btn alt" href="lessons/index.html">Browse all lessons</a></p></div>\n    </article>')
    page = shell(f"Page not found | {SITE}", "This page does not exist.", "404.html", "", body, (), "website", base_href=urlbase(), scripts=False)
    return page.replace('<meta name="description"', '<meta name="robots" content="noindex">\n  <meta name="description"', 1)


def urlbase():
    return "/" + BASE.split("//", 1)[1].split("/", 1)[1]    # "/CHHOYED/"


# ---------------------------------------------------------------- write everything
def main():
    (ROOT / "lessons").mkdir(exist_ok=True)
    count = 0
    for p in posts:
        (ROOT / "lessons" / f"{p['id']}.html").write_text(lesson_page(p), encoding="utf-8")
        count += 1
    (ROOT / "lessons" / "index.html").write_text(index_page(), encoding="utf-8")
    (ROOT / "about.html").write_text(about_page(), encoding="utf-8")
    (ROOT / "roadmap.html").write_text(roadmap_page(), encoding="utf-8")
    (ROOT / "playground.html").write_text(playground_page(), encoding="utf-8")
    (ROOT / "404.html").write_text(not_found_page(), encoding="utf-8")

    latest = max(p["date"] for p in posts)
    urls = [(BASE, latest), (BASE + "lessons/", latest), (BASE + "about.html", latest), (BASE + "roadmap.html", latest), (BASE + "playground.html", latest)] + [(f"{BASE}lessons/{p['id']}.html", p["date"]) for p in posts]
    sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    sm += "".join(f"  <url><loc>{esc(u)}</loc><lastmod>{d}</lastmod></url>\n" for u, d in urls) + "</urlset>\n"
    (ROOT / "sitemap.xml").write_text(sm, encoding="utf-8")
    print(f"Done: {count} lesson pages, lessons/index.html, about.html, roadmap.html, playground.html, 404.html and sitemap.xml with {len(urls)} addresses.")


if __name__ == "__main__":
    main()