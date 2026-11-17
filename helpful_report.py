"""
Total "Was this lesson helpful?" votes for EVERY lesson, in one table.

The buttons on each lesson send every vote to GoatCounter as an event named
    helpful/yes/<lesson id>      or      helpful/no/<lesson id>
GoatCounter shows these as separate lines. This script asks GoatCounter for them,
puts Yes and No of each lesson together, and writes helpful-report.csv
(open it in Excel or Google Sheets).

ONE-TIME SETUP
  1. Log in to GoatCounter (https://chhoyed.goatcounter.com).
  2. Click your user name in the top menu, then "API".
  3. Create a new API key and tick only the permission to read statistics.
  4. Copy the key. KEEP IT SECRET: never put it in a file inside this project and never push it to GitHub.

HOW TO RUN (in a terminal, inside your CHHOYED project folder)

    py helpful_report.py

The script asks you to paste the key (nothing shows on screen while you paste). To avoid typing it every time:

    set GOATCOUNTER_TOKEN=paste-your-key-here        (Windows Command Prompt)
    $env:GOATCOUNTER_TOKEN="paste-your-key-here"     (Windows PowerShell)
    export GOATCOUNTER_TOKEN=paste-your-key-here     (macOS, Linux, Git Bash)

Options:
    py helpful_report.py --since 2026-11-01     count only votes since this date (default: 2026-01-01)
    py helpful_report.py --min-votes 5          in the printed list, only lessons with at least 5 votes
    py helpful_report.py --code mysite          if your GoatCounter code is not "chhoyed"

What the numbers mean: GoatCounter counts VISITORS, not clicks. A visitor who clicks the same button many
times counts once, and a visitor who changes their mind counts once as Yes and once as No.
"""
import argparse
import csv
import getpass
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAUSE = 0.35   # seconds between requests, to stay inside GoatCounter's rate limit


def load(rel):
    p = ROOT / rel
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else []


class GoatCounter:
    def __init__(self, base, token):
        self.base, self.token = base.rstrip("/"), token

    def get(self, path, params=None):
        url = f"{self.base}/api/v0/{path}"
        if params:
            url += "?" + urllib.parse.urlencode(params)
        for attempt in range(5):
            req = urllib.request.Request(url, headers={
                "Authorization": "Bearer " + self.token,
                "Content-Type": "application/json",
                "Accept": "application/json",
                "User-Agent": "chhoyed-helpful-report",
            })
            try:
                with urllib.request.urlopen(req, timeout=30) as r:
                    time.sleep(PAUSE)
                    return json.load(r)
            except urllib.error.HTTPError as e:
                if e.code == 429:                              # too many requests: wait, then try again
                    wait = int(e.headers.get("Retry-After", "3") or 3)
                    print(f"  GoatCounter asks us to slow down. Waiting {wait} seconds...")
                    time.sleep(wait + 1)
                    continue
                if e.code in (401, 403):
                    sys.exit("GoatCounter did not accept the API key (error %d).\n"
                             "Check that you copied the whole key, and that it may read statistics." % e.code)
                body = e.read().decode("utf-8", "replace")[:300]
                sys.exit(f"GoatCounter returned an error ({e.code}) for {path}: {body}")
            except urllib.error.URLError as e:
                sys.exit(f"Cannot reach GoatCounter ({e.reason}). Check your internet and the --code value.")
        sys.exit("GoatCounter kept refusing because of the rate limit. Please try again in a few minutes.")


def vote_paths(gc):
    """All paths whose name looks like helpful/yes/<id> or helpful/no/<id>."""
    found, after = [], None
    while True:
        params = {"Limit": 200}
        if after is not None:
            params["After"] = after
        data = gc.get("paths", params)
        batch = data.get("paths") or []
        for p in batch:
            name = (p.get("path") or "").lstrip("/")
            parts = name.split("/")
            if len(parts) >= 3 and parts[0] == "helpful" and parts[1] in ("yes", "no"):
                found.append((p["id"], parts[1], "/".join(parts[2:])))
        if not data.get("more") or not batch:
            return found
        after = batch[-1]["id"]


def visitors(gc, path_id, start, end):
    """Number of visitors for one path in the date range (one path per request, so the request is simple)."""
    data = gc.get("stats/hits", {"include_paths": path_id, "start": start, "end": end, "limit": 1})
    for h in data.get("hits") or []:
        if h.get("path_id") == path_id or len(data["hits"]) == 1:
            return int(h.get("count") or 0)
    return 0


def main():
    ap = argparse.ArgumentParser(description="Total helpful votes for every lesson.")
    ap.add_argument("--code", default="chhoyed", help='your GoatCounter code (default: "chhoyed")')
    ap.add_argument("--since", default="2026-01-01", help="count votes since this date, YYYY-MM-DD")
    ap.add_argument("--min-votes", type=int, default=1, help="in the printed list, hide lessons with fewer votes")
    ap.add_argument("--base-url", default=os.environ.get("GOATCOUNTER_BASE", ""), help=argparse.SUPPRESS)
    a = ap.parse_args()

    token = os.environ.get("GOATCOUNTER_TOKEN") or getpass.getpass("Paste your GoatCounter API key (it will not show): ").strip()
    if not token:
        sys.exit("No API key given.")
    try:
        start = datetime.strptime(a.since, "%Y-%m-%d").strftime("%Y-%m-%dT00:00:00Z")
    except ValueError:
        sys.exit("--since must look like 2026-11-01")
    end = (datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0) + timedelta(hours=1)).strftime("%Y-%m-%dT%H:00:00Z")

    gc = GoatCounter(a.base_url or f"https://{a.code}.goatcounter.com", token)
    print("Looking for vote events in GoatCounter...")
    paths = vote_paths(gc)
    if not paths:
        print("No votes found yet. Votes appear after visitors press Yes or Not really on the live site.\n"
              "(Clicks on your own computer, 127.0.0.1 or localhost, are not counted.)")
        return
    print(f"Found {len(paths)} vote lines. Reading the numbers...")
    votes = {}
    for i, (pid, kind, lesson) in enumerate(paths, 1):
        votes.setdefault(lesson, {"yes": 0, "no": 0})[kind] += visitors(gc, pid, start, end)
        if i % 20 == 0:
            print(f"  {i} of {len(paths)}")

    posts = {p["id"]: p for p in load("data/posts.json")}
    subjects = {s["id"]: s for s in load("data/subjects.json")}

    def course(p):
        s = subjects.get(p["subject"], {})
        t = next((x for x in s.get("topics", []) if x["id"] == p.get("topic")), None)
        return (t or s).get("name", p["subject"])

    rows = []
    for lesson, v in votes.items():
        total = v["yes"] + v["no"]
        p = posts.get(lesson)
        rows.append({
            "Lesson ID": lesson,
            "Title": p["title"] if p else "(lesson not found in data/posts.json)",
            "Course": course(p) if p else "",
            "Yes": v["yes"], "Not really": v["no"], "Total votes": total,
            "% helpful": round(100 * v["yes"] / total) if total else "",
        })
    # most worrying first: lowest % helpful, then most "Not really" votes
    rows.sort(key=lambda r: (r["% helpful"] if r["% helpful"] != "" else 101, -r["Not really"]))

    out = ROOT / "helpful-report.csv"
    with open(out, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    shown = [r for r in rows if r["Total votes"] >= a.min_votes]
    print(f"\nLessons with at least {a.min_votes} vote(s), the ones that need attention first:\n")
    print(f"{'Yes':>4} {'No':>4} {'%':>5}  {'Course':<22} Lesson")
    for r in shown[:40]:
        pct = f"{r['% helpful']}%" if r["% helpful"] != "" else "-"
        print(f"{r['Yes']:>4} {r['Not really']:>4} {pct:>5}  {str(r['Course'])[:22]:<22} {r['Title'][:50]}")
    if len(shown) > 40:
        print(f"... and {len(shown) - 40} more in the CSV file.")
    ty, tn = sum(r["Yes"] for r in rows), sum(r["Not really"] for r in rows)
    print(f"\nAll lessons together: {ty} Yes, {tn} Not really, {len(rows)} lessons with votes.")
    print(f"Saved: {out}")


if __name__ == "__main__":
    main()
