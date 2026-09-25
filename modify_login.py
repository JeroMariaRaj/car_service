content = []
with open('login.html', 'r', encoding='utf-8') as f:
    content = f.read()

toast_html = '''
    <!-- Success Toast -->
    <div id="successToast" class="fixed top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-dark-card border border-green-200 dark:border-green-900 shadow-2xl rounded-2xl p-4 flex items-center gap-4 z-[100] transition-all duration-300 opacity-0 -translate-y-10 pointer-events-none">
        <div class="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-lg">
            <i class="fa-solid fa-check"></i>
        </div>
        <p class="text-slate-900 dark:text-white font-bold text-lg pr-4">Login Successful</p>
        <button type="button" class="text-slate-400 hover:text-slate-600 dark:hover:text-white transition" onclick="closeToast()">
            <i class="fa-solid fa-xmark text-xl"></i>
        </button>
    </div>
'''

new_script = '''
    <script>
        function togglePassword() {
            const pwd = document.getElementById('password');
            const icon = document.getElementById('eyeIcon');
            if (pwd.type === 'password') {
                pwd.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                pwd.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        function closeToast() {
            const toast = document.getElementById('successToast');
            toast.classList.add('opacity-0', '-translate-y-10', 'pointer-events-none');
            toast.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }

        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const toast = document.getElementById('successToast');
            toast.classList.remove('opacity-0', '-translate-y-10', 'pointer-events-none');
            toast.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            
            setTimeout(() => {
                closeToast();
                window.location.href = 'customer/dashboard.html';
            }, 1500);
        });
    </script>
'''

import re

# Insert toast before <!-- Background Decoration -->
content = content.replace('<!-- Background Decoration -->', toast_html + '\n    <!-- Background Decoration -->')

# Replace the script block
old_script_block = re.search(r'<script>\s*function togglePassword\(\).*?</script>', content, flags=re.DOTALL).group(0)
content = content.replace(old_script_block, new_script.strip())

with open('login.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated login.html")
