"""Generate extension icons. Run: python scripts/gen_icons.py"""
import os
try:
    from PIL import Image, ImageDraw
except ImportError:
    print("Install Pillow: pip install Pillow")
    exit(1)

os.makedirs("icons", exist_ok=True)
for size in (16, 48, 128):
    img = Image.new("RGB", (size, size), (15, 52, 96))
    d = ImageDraw.Draw(img)
    pad = max(2, size // 8)
    d.rectangle([pad, pad, size - pad, size - pad], fill=(30, 90, 150), outline=(80, 140, 200))
    d.rectangle([size // 2 - size // 8, pad, size // 2 + size // 8, size - pad], fill=(255, 255, 255))
    img.save(f"icons/icon{size}.png")
print("Icons saved to icons/")
