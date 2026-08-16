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
    if (menu) {
        menu.classList.toggle('hidden');
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
    
    // Add event listeners for toggles if they exist
    const themeBtns = document.querySelectorAll('#theme-toggle');
    themeBtns.forEach(btn => btn.addEventListener('click', toggleTheme));
    
    const rtlBtns = document.querySelectorAll('#rtl-toggle');
    rtlBtns.forEach(btn => btn.addEventListener('click', toggleRTL));

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', toggleMobileMenu);

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
