content = []
with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

# I will replace the submit event listener specifically.
import re

old_script = '''        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const toast = document.getElementById('successToast');
            toast.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            
            setTimeout(() => {
                closeToast();
                window.location.href = 'customer/dashboard.html';
            }, 1500);
        });'''

new_script = '''        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const toast = document.getElementById('successToast');
            toast.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            
            setTimeout(() => {
                closeToast();
            }, 2500);
        });'''

if old_script in content:
    content = content.replace(old_script, new_script)
else:
    # Just in case whitespace differs
    print("Exact match failed, trying regex")
    content = re.sub(r'setTimeout\(\(\) => \{\s*closeToast\(\);\s*window\.location\.href = \'customer/dashboard\.html\';\s*\}, 1500\);', r'setTimeout(() => {\n                closeToast();\n            }, 2500);', content)

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated login.html")
