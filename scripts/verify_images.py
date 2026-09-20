import os
import glob
import re
import urllib.parse

public_dir = os.path.abspath('public')
html_files = glob.glob(os.path.join(public_dir, '**/*.html'), recursive=True)

broken_images = []
checked = 0

for html_file in html_files:
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    img_srcs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', content)
    for src in img_srcs:
        checked += 1
        if src.startswith(('http://', 'https://', 'data:')):
            continue
        
        clean_src = src.split('?')[0].split('#')[0]
        decoded_src = urllib.parse.unquote(clean_src)
        
        html_dir = os.path.dirname(html_file)
        target_path = os.path.abspath(os.path.join(html_dir, decoded_src))
        
        if not os.path.exists(target_path):
            rel_html = os.path.relpath(html_file, public_dir)
            broken_images.append((rel_html, src, target_path))

print(f"Checked {checked} <img> tags across {len(html_files)} HTML files.")
if broken_images:
    print(f"❌ Found {len(broken_images)} BROKEN IMAGES:")
    for html_rel, src, target in broken_images:
        print(f"  File: {html_rel}")
        print(f"    src: {src}")
        print(f"    expected path: {target}")
else:
    print("✅ ALL IMAGE LINKS ARE 100% VALID AND EXIST ON DISK!")
