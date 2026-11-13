"""
Turns a PDF book into web images for the CHHOYED site. Works for any book.

Run it in a terminal inside your CHHOYED project folder:

    py -m pip install pymupdf pillow
    py make_book_pages.py "path/to/book.pdf" --id integral

--id is the short name of the book (lowercase letters, numbers and dashes).
Images are saved as images/books/<id>/0001.webp, 0002.webp ... one per PDF page
(the number is the PDF page number). Pages that already exist are skipped, so
you can run it again safely.

Then, in data/posts.json, a lesson only needs the book id and a page range:
    "book": "integral", "pages": [8, 45]
"""
import argparse, os, re, sys

try:
    import fitz  # PyMuPDF
    from PIL import Image
except ImportError:
    sys.exit("Please run first:  py -m pip install pymupdf pillow   (or: pip install pymupdf pillow)")

ap = argparse.ArgumentParser()
ap.add_argument("pdf", help="path to the PDF book")
ap.add_argument("--id", required=True, help="short book name, for example: integral")
ap.add_argument("--pages", help="only some pages, for example 8-45 (default: all)")
ap.add_argument("--dpi", type=int, default=120, help="image sharpness (default 120)")
ap.add_argument("--quality", type=int, default=75, help="WebP quality 1-100 (default 75)")
a = ap.parse_args()

if not re.fullmatch(r"[a-z0-9-]+", a.id):
    sys.exit("--id may only use lowercase letters, numbers and dashes, for example: integral")
if not os.path.exists(a.pdf):
    sys.exit(f"PDF not found: {a.pdf}")

doc = fitz.open(a.pdf)
first, last = 1, len(doc)
if a.pages:
    m = re.fullmatch(r"(\d+)-(\d+)", a.pages)
    if not m:
        sys.exit("--pages must look like 8-45")
    first, last = max(1, int(m[1])), min(len(doc), int(m[2]))

out = os.path.join("images", "books", a.id)
os.makedirs(out, exist_ok=True)
zoom = fitz.Matrix(a.dpi / 72, a.dpi / 72)
made = 0
for p in range(first, last + 1):
    dst = os.path.join(out, f"{p:04d}.webp")
    if os.path.exists(dst):
        continue
    pix = doc[p - 1].get_pixmap(matrix=zoom, alpha=False)
    Image.frombytes("RGB", (pix.width, pix.height), pix.samples).save(dst, "WEBP", quality=a.quality, method=5)
    made += 1
    if made % 25 == 0:
        print(f"{p}/{last} pages done...")
print(f"Done. {made} new images in {out} (the book has {len(doc)} pages).")
print(f'In data/posts.json use:  "book": "{a.id}", "pages": [first, last]')
