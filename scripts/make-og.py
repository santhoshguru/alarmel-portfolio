#!/usr/bin/env python3
"""Generate the 1200x630 Open Graph / Twitter card at public/assets/og-image.jpg.

Run from the repo root:

    python3 scripts/make-og.py

Requires Pillow (PIL). Fonts are fetched from Google Fonts on first run and
cached in /tmp/alarmel-fonts/.
"""

import os
import sys
import urllib.request
from PIL import Image, ImageDraw, ImageFont

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PORTRAIT_SRC = os.path.join(REPO, "public/assets/alarmel.jpg")
OUT = os.path.join(REPO, "public/assets/og-image.jpg")

FONT_DIR = "/tmp/alarmel-fonts"
FONTS = {
    "CormorantGaramond-Italic500.ttf":
        "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5wDDOjw.ttf",
    "CormorantGaramond-Italic600.ttf":
        "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3smX5slCNuHLi8bLeY9MK7whWMhyjYrGFEsdtdc62E6zd5LDfOjw.ttf",
    "JetBrainsMono-Medium.ttf":
        "https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf",
}

os.makedirs(FONT_DIR, exist_ok=True)
for name, url in FONTS.items():
    path = os.path.join(FONT_DIR, name)
    if not os.path.exists(path):
        print(f"fetching {name} …")
        urllib.request.urlretrieve(url, path)

F_DISPLAY = os.path.join(FONT_DIR, "CormorantGaramond-Italic600.ttf")
F_DISPLAY_LIGHT = os.path.join(FONT_DIR, "CormorantGaramond-Italic500.ttf")
F_MONO = os.path.join(FONT_DIR, "JetBrainsMono-Medium.ttf")

W, H = 1200, 630
PAPER = (242, 234, 219)
INK = (27, 22, 18)
INK_2 = (74, 63, 51)
INK_3 = (122, 107, 88)
RULE = (201, 185, 152)
ACCENT = (168, 53, 31)

canvas = Image.new("RGB", (W, H), PAPER)
draw = ImageDraw.Draw(canvas)

# portrait on the right, square crop biased toward the face
portrait = Image.open(PORTRAIT_SRC).convert("RGB")
pw, ph = portrait.size
side = min(pw, ph)
left = (pw - side) // 2
top = max(0, (ph - side) // 2 - int(ph * 0.02))
portrait_sq = portrait.crop((left, top, left + side, top + side))

PORT = 470
portrait_sq = portrait_sq.resize((PORT, PORT), Image.LANCZOS)
px = W - PORT - 70
py = (H - PORT) // 2
canvas.paste(portrait_sq, (px, py))

border = 8
draw.rectangle(
    [px - border, py - border, px + PORT + border, py + PORT + border],
    outline=RULE, width=1,
)

# text on the left
x = 70
draw.text((x, 128), "§  CHENNAI  ·  TAMIL  VOICE ARTIST",
          font=ImageFont.truetype(F_MONO, 18), fill=ACCENT)

name_font = ImageFont.truetype(F_DISPLAY, 104)
draw.text((x, 170), "Alarmel", font=name_font, fill=INK)
draw.text((x, 270), "Mangai", font=name_font, fill=INK)

draw.line([(x, 400), (x + 60, 400)], fill=ACCENT, width=2)

tag_font = ImageFont.truetype(F_DISPLAY_LIGHT, 38)
draw.text((x, 420), "Stories, told aloud", font=tag_font, fill=INK_2)
draw.text((x, 464), "in Tamil.", font=tag_font, fill=INK_2)

draw.text((x, H - 60),
          "TAMIL  ·  AUDIOBOOKS  ·  NARRATION  ·  CHILDREN'S STORIES",
          font=ImageFont.truetype(F_MONO, 13), fill=INK_3)

canvas.save(OUT, "JPEG", quality=82, optimize=True, progressive=True)
size_kb = os.path.getsize(OUT) / 1024
print(f"wrote {OUT}  ({W}x{H}, {size_kb:.1f} KB)")
if size_kb > 300:
    print("WARNING: over 300 KB — WhatsApp may not render the preview.",
          file=sys.stderr)
