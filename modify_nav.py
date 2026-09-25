import os
import glob
import re

dir_path = r'c:\Users\Jero\Downloads\car_service-main final\car_service-main'
html_files = glob.glob(os.path.join(dir_path, '*.html'))

for fpath in html_files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop Nav
    # Find the nav tag
    nav_match = re.search(r'<nav[^>]*>.*?</nav>', content, flags=re.DOTALL)
    if not nav_match:
        continue
    
    nav_html = nav_match.group(0)
    
    # Replace in nav_html
    # Look for contact link
    # <a href="contact.html" class="...">Contact</a>
    new_nav_html = re.sub(
        r'(<a href="contact.html" class="([^"]+)">Contact</a>)',
        r'<a href="customer/dashboard.html" class="\2">Dashboard</a>\n                    \1',
        nav_html
    )
    
    # Also for mobile menu if it exists (only in index.html, but just in case)
    # The class in mobile menu will be captured and reused.
    
    if new_nav_html != nav_html:
        content = content.replace(nav_html, new_nav_html)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(fpath)}")
