/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium Dark Navy + Electric Blue Theme
        navy: {
          950: '#0a0e27',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        electric: {
          600: '#0284c7',
          500: '#0ea5e9',
          400: '#38bdf8',
        },
        cyan: {
          500: '#06b6d4',
          400: '#22d3ee',
        },
        slate: {
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
        },
      },
      backgroundImage: {
        'gradient-navy-blue': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 100%)',
        'gradient-electric': 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      },
      boxShadow: {
        'electric': '0 0 30px rgba(14, 165, 233, 0.2)',
        'electric-lg': '0 0 50px rgba(14, 165, 233, 0.3)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.8s ease-out',
        'slideUp': 'slideUp 0.6s ease-out',
        'pulse-electric': 'pulse-electric 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-electric': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
