content = []
with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('shadow-2xl rounded-2xl p-4 flex items-center', 'shadow-2xl rounded-2xl p-4 flex items-center w-[90vw] sm:w-auto max-w-sm mx-auto')

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)
