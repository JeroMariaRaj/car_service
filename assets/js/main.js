// Initialize Theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    // Default to light mode for the reference style
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
    updateBrandMark();
}

function updateBrandMark() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('img.brand-mark').forEach((mark) => {
        mark.src = mark.src.replace(isDark ? 'logo-car-only.png' : 'logo-car-only-dark.png', isDark ? 'logo-car-only-dark.png' : 'logo-car-only.png');
    });
}

// Initialize RTL
function initRTL() {
    const savedRTL = localStorage.getItem('rtl');
    if (savedRTL === 'true') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

// Toggle Theme
function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateBrandMark();
}

// Toggle RTL
function toggleRTL() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    if (isRTL) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('rtl', 'false');
    } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (menu) {
        const isClosed = menu.classList.contains('translate-x-full');
        
        if (isClosed) {
            // Open
            if(backdrop) {
                backdrop.classList.remove('hidden');
                setTimeout(() => backdrop.classList.remove('opacity-0'), 10);
            }
            menu.classList.remove('translate-x-full');
        } else {
            // Close
            if(backdrop) {
                backdrop.classList.add('opacity-0');
                setTimeout(() => backdrop.classList.add('hidden'), 300);
            }
            menu.classList.add('translate-x-full');
        }
        
        const button = document.getElementById('mobile-menu-btn');
        if (button) {
            button.setAttribute('aria-expanded', String(isClosed));
        }
    }
}





// Initialize everything on load
// Custom Alert Modal Function
window.showCustomAlert = function(title, message, isSuccess = true) {
    const iconClass = isSuccess ? 'fa-check text-green-600 dark:text-green-400' : 'fa-triangle-exclamation text-amber-600 dark:text-amber-400';
    const bgClass = isSuccess ? 'bg-green-100 dark:bg-green-900/30' : 'bg-amber-100 dark:bg-amber-900/30';
    
    const modalHtml = `
    <div id="dynamicAlertModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center opacity-0 transition-opacity duration-300">
        <div class="bg-white dark:bg-[#111] p-10 rounded-3xl shadow-2xl max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300 text-center border border-[#EFEBE9] dark:border-[#333]">
            <div class="w-20 h-20 ${bgClass} rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <i class="fa-solid ${iconClass} text-4xl"></i>
            </div>
            <h3 class="text-2xl font-display font-bold text-[#3E2723] dark:text-white mb-2">${title}</h3>
            <p class="text-[#5D4037] dark:text-gray-400 mb-8">${message}</p>
            <button onclick="document.getElementById('dynamicAlertModal').remove()" class="btn-primary w-full py-3 rounded-xl text-lg font-bold shadow-lg shadow-primary-600/30 transition-all hover:-translate-y-1">Got it!</button>
        </div>
    </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const modal = document.getElementById('dynamicAlertModal');
    const modalContent = modal.querySelector('div');
    
    // Trigger reflow for animation
    void modal.offsetWidth;
    modal.classList.remove('opacity-0');
    modalContent.classList.remove('scale-95');
};

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    addMobileMenuIfMissing();
    
    // Add event listeners for toggles if they exist
    const themeBtns = document.querySelectorAll('#theme-toggle');
    themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));
    
    const rtlBtns = document.querySelectorAll('#rtl-toggle');
    rtlBtns.forEach(btn => btn.addEventListener('click', toggleRTL));

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', toggleMobileMenu);
    const backdrop = document.getElementById('mobile-menu-backdrop');
    if (backdrop) backdrop.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu && !menu.classList.contains('translate-x-full')) toggleMobileMenu();
        });
    });

    const mobileHomeToggle = document.getElementById('mobile-home-toggle');
    const mobileHomeDropdown = document.getElementById('mobile-home-dropdown');
    if (mobileHomeToggle && mobileHomeDropdown) {
        mobileHomeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileHomeDropdown.classList.toggle('hidden');
            const icon = mobileHomeToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    }

    // Global Footer Interactions (Social & Subscribe)
    const facebookIcons = document.querySelectorAll('footer .bi-facebook');
    facebookIcons.forEach(icon => {
        if(icon.parentElement) icon.parentElement.href = 'https://facebook.com/autocare';
    });
    const twitterIcons = document.querySelectorAll('footer .bi-twitter-x');
    twitterIcons.forEach(icon => {
        if(icon.parentElement) icon.parentElement.href = 'https://twitter.com/autocare';
    });
    const instagramIcons = document.querySelectorAll('footer .bi-instagram');
    instagramIcons.forEach(icon => {
        if(icon.parentElement) icon.parentElement.href = 'https://instagram.com/autocare';
    });

    const subscribeForms = document.querySelectorAll('footer form');
    subscribeForms.forEach(form => {
        const btn = form.querySelector('button');
        const input = form.querySelector('input[type="email"]');
        if(btn && input) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if(input.value) {
                    showCustomAlert('Subscription Confirmed!', 'Thank you for subscribing to AutoCare updates.', true);
                    input.value = '';
                } else {
                    showCustomAlert('Action Required', 'Please enter a valid email address to subscribe.', false);
                }
            });
        }
    });

    // Contact Form Interception
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = contactForm.querySelectorAll('input, textarea');
            let data = {};
            inputs.forEach(input => {
                if(input.placeholder) {
                    data[input.placeholder] = input.value;
                }
            });
            
            // Format message object
            const msgObj = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                name: (data['John'] || '') + ' ' + (data['Doe'] || ''),
                email: data['john@example.com'] || 'No Email',
                content: data['How can we help you?'] || '',
                status: 'New'
            };

            // Save to localStorage
            let messages = JSON.parse(localStorage.getItem('admin_messages') || '[]');
            messages.unshift(msgObj);
            localStorage.setItem('admin_messages', JSON.stringify(messages));

            showCustomAlert('Message Sent!', 'Your message has been sent successfully. Our team will contact you soon.', true);
            contactForm.reset();
        });
    }
});

function addMobileMenuIfMissing() {
    const menuButton = document.getElementById('mobile-menu-btn');
    const publicNav = document.querySelector('nav.fixed');
    if (!menuButton || !publicNav || document.getElementById('mobile-menu')) return;

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.id = 'mobile-menu-backdrop';
    backdrop.className = 'fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[90] hidden opacity-0 transition-opacity duration-300 xl:hidden';
    document.body.appendChild(backdrop);

    // Create sidebar
    const menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'fixed top-0 right-0 w-[85%] max-w-sm h-full bg-white dark:bg-slate-950 shadow-2xl z-[100] transform translate-x-full transition-transform duration-300 flex flex-col xl:hidden';
    menu.innerHTML = `<div class="flex items-center justify-between px-6 pt-6 pb-2 shrink-0">
                <a href="index.html" class="flex items-center brand-lockup"><img src="assets/img/logo-car-only.png" alt="AutoCare" class="brand-mark h-10"><span class="brand-copy"><span class="brand-name">Auto<span class="text-primary-600">Care</span></span></span></a>
                <div class="flex items-center gap-2 sm:gap-4 text-slate-600 dark:text-white">
                    
                    
                    <button id="mobile-menu-close" class="text-2xl ml-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
            <div class="px-6 py-2 space-y-2 flex-1 overflow-y-auto">
                <div class="space-y-1">
                    <button id="mobile-home-toggle" class="flex w-full items-center justify-between px-3 py-2 text-base font-bold text-[#b91c1c] bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg transition-colors">
                        <span>Home</span>
                        <i class="bi bi-chevron-down text-sm transition-transform duration-200"></i>
                    </button>
                    <div id="mobile-home-dropdown" class="hidden pl-4 space-y-1 mt-1">
                        <a href="index.html" class="block px-3 py-2 text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Home 1</a>
                        <a href="index-2.html" class="block px-3 py-2 text-sm font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Home 2</a>
                    </div>
                </div>
                <a href="about.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">About</a>
                <a href="services.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Services</a>
                <a href="pricing.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Pricings</a>
                <a href="blog.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Blog</a>
                <a href="contact.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Contact</a>
                <a href="customer/dashboard.html" class="block px-3 py-2 text-base font-bold text-slate-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors">Dashboard</a>
            </div>
            <div class="px-6 pt-4 pb-8 shrink-0">
                <div class="flex flex-col gap-3">
                    <a href="login.html" class="flex justify-center items-center px-3 py-3 text-base font-bold text-[#b91c1c] dark:text-[#f87171] border border-[#b91c1c] dark:border-[#f87171] rounded-full hover:bg-[#b91c1c] hover:text-white dark:hover:bg-[#f87171] dark:hover:text-slate-900 transition-colors shadow-sm">Login</a>
                    <a href="register.html" class="flex justify-center items-center px-3 py-3 text-base font-bold text-white bg-[#b91c1c] dark:bg-[#dc2626] rounded-full hover:bg-[#991b1b] transition-colors shadow-md">Book Free Trial</a>
                </div>
            </div>`; document.body.appendChild(menu);
}



