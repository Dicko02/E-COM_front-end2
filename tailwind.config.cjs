/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#0a0a0a',
      white: '#ffffff',
      slate: {
        50: '#f8fafc', 100: '#f1f5f9', 150: '#e8ecf1', 200: '#e2e8f0',
        250: '#dcdfea', 300: '#cbd5e1', 350: '#c5cce2', 400: '#94a3b8',
        450: '#8b98ab', 500: '#64748b', 550: '#5a667b', 600: '#475569',
        650: '#3d4556', 700: '#334155', 750: '#2a3544', 800: '#1e293b',
        850: '#172032', 900: '#0f172a', 950: '#020617',
      },
      green: {
        50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
        400: '#4ade80', 500: '#22c55e', 600: '#16a34a', 700: '#15803d',
        800: '#166534', 900: '#14532d', 950: '#052e16',
      },
      emerald: {
        50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac',
        400: '#4ade80', 500: '#10b981', 600: '#059669', 700: '#047857',
        800: '#065f46', 900: '#064e3b',
      },
      red: {
        50: '#fef2f2', 100: '#fee2e2', 150: '#fecaca', 200: '#fecaca',
        250: '#fba8a8', 300: '#fca5a5', 350: '#fb9999', 400: '#f87171',
        450: '#f55e5e', 500: '#ef4444', 600: '#dc2626', 700: '#b91c1c',
        800: '#991b1b', 900: '#7f1d1d',
      },
      blue: {
        50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd',
        400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
        800: '#1e40af', 900: '#1e3a8a',
      },
      amber: {
        50: '#fffbeb', 100: '#fef3c7', 200: '#fde58a', 300: '#fcd34d',
        400: '#fbbf24', 500: '#f59e0b', 600: '#d97706', 700: '#b45309',
        800: '#92400e', 900: '#78350f',
      },
      purple: {
        50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe',
        400: '#c084fc', 500: '#a855f7', 600: '#9333ea', 700: '#7e22ce',
        800: '#6b21a8', 900: '#581c87',
      },
      orange: {
        400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
      },
      gray: {
        50: '#f9fafb', 100: '#f3f4f6', 200: '#e5e7eb', 300: '#d1d5db',
        400: '#9ca3af', 500: '#6b7280', 600: '#4b5563', 700: '#374151',
        800: '#1f2937', 900: '#111827',
      },
    },
    spacing: {
      0: '0', 1: '0.25rem', 2: '0.5rem', 3: '0.75rem', 4: '1rem',
      5: '1.25rem', 6: '1.5rem', 7: '1.75rem', 8: '2rem', 9: '2.25rem',
      10: '2.5rem', 11: '2.75rem', 12: '3rem', 14: '3.5rem', 16: '4rem',
      20: '5rem', 24: '6rem', 28: '7rem', 32: '8rem', 36: '9rem',
      40: '10rem', 44: '11rem', 48: '12rem', 52: '13rem', 56: '14rem',
      60: '15rem', 64: '16rem', 72: '18rem', 80: '20rem', 96: '24rem',
    },
    extend: {
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.25rem', DEFAULT: '0.375rem', md: '0.5rem', lg: '0.625rem',
      },
      // Breakpoints standards Tailwind — NE PAS MODIFIER
      // sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.8' },
        },
        'spin-premium': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        slideIn: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(34,197,94,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(34,197,94,0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'shimmer-fast': 'shimmer 3s infinite linear',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'spin-premium': 'spin-premium 2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'slideIn': 'slideIn 0.3s ease-out',
        'fadeInUp': 'fadeInUp 0.5s ease-out both',
        'fadeInDown': 'fadeInDown 0.4s ease-out both',
        'pulse-green': 'pulseGreen 2s infinite',
        'ticker': 'ticker 25s linear infinite',
      },
      opacity: {
        '5': '0.05', '10': '0.1', '20': '0.2', '30': '0.3',
        '40': '0.4', '50': '0.5', '60': '0.6', '70': '0.7',
        '80': '0.8', '90': '0.9',
      },
    },
  },
  plugins: [],
}
