tailwind.config = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444', 
          600: '#dc2626', // Racing Red
          700: '#b91c1c', 
          800: '#991b1b',
          900: '#7f1d1d', 
        },
        dark: {
          bg: '#0f172a',    // slate-900
          card: '#1e293b',  // slate-800
          border: '#334155', // slate-700
          text: '#f8fafc',
          heading: '#ffffff',
        }
      },
      animation: {
        'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    }
  }
}
