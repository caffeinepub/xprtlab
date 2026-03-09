/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        poppins: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        border:      'oklch(var(--border) / <alpha-value>)',
        input:       'oklch(var(--input) / <alpha-value>)',
        ring:        'oklch(var(--ring) / <alpha-value>)',
        background:  'oklch(var(--background) / <alpha-value>)',
        foreground:  'oklch(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT:    'oklch(var(--primary) / <alpha-value>)',
          foreground: 'oklch(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT:    'oklch(var(--secondary) / <alpha-value>)',
          foreground: 'oklch(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT:    'oklch(var(--destructive) / <alpha-value>)',
          foreground: 'oklch(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT:    'oklch(var(--muted) / <alpha-value>)',
          foreground: 'oklch(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT:    'oklch(var(--accent) / <alpha-value>)',
          foreground: 'oklch(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT:    'oklch(var(--popover) / <alpha-value>)',
          foreground: 'oklch(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT:    'oklch(var(--card) / <alpha-value>)',
          foreground: 'oklch(var(--card-foreground) / <alpha-value>)',
        },
        success: 'oklch(var(--success) / <alpha-value>)',
        warning: 'oklch(var(--warning) / <alpha-value>)',
        brand: {
          deep:  '#0D47A1',
          blue:  '#1976D2',
          teal:  '#26A69A',
          cyan:  '#26C6DA',
        },
      },
      borderRadius: {
        lg:   'var(--radius)',
        md:   'calc(var(--radius) - 2px)',
        sm:   'calc(var(--radius) - 4px)',
        xl:   '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        card:           '0 8px 24px rgba(0, 0, 0, 0.08)',
        'card-hover':   '0 12px 32px rgba(13, 71, 161, 0.12)',
        'card-premium': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'nav-premium':  '0 -8px 25px rgba(0, 0, 0, 0.08)',
        'btn-gradient': '0 6px 20px rgba(13, 71, 161, 0.4)',
        'step-active':  '0 4px 12px rgba(13, 71, 161, 0.3)',
      },
      backgroundImage: {
        'gradient-brand':   'linear-gradient(135deg, #0D47A1 0%, #1976D2 100%)',
        'gradient-brand-h': 'linear-gradient(90deg, #0D47A1 0%, #26A69A 100%)',
        'gradient-teal':    'linear-gradient(135deg, #0D47A1 0%, #26A69A 100%)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        pageFadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        stepSlideIn: {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        iconPulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        'page-fade-in':   'pageFadeIn 0.3s ease forwards',
        'step-slide-in':  'stepSlideIn 0.2s ease forwards',
        'icon-pulse':     'iconPulse 0.6s ease',
        shimmer:          'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
