import os
import glob
import re

dir_path = r'c:\Users\Jero\Downloads\car_service-main final\car_service-main'
html_files = glob.glob(os.path.join(dir_path, '*.html'))

count = 0
for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    nav_match = re.search(r'<nav[^>]*>.*?</nav>', content, flags=re.DOTALL)
    if not nav_match:
        continue
    
    nav_html = nav_match.group(0)
    
    pattern = r'(<a href="customer/dashboard\.html"[^>]*>Dashboard</a>)(\s*)(<a href="contact\.html"[^>]*>Contact</a>)'
    
    new_nav_html = re.sub(pattern, r'\3\2\1', nav_html)

    if new_nav_html != nav_html:
        content = content.replace(nav_html, new_nav_html)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        count += 1
        print(f"Updated {os.path.basename(fpath)}")

print(f"Total updated: {count}")
