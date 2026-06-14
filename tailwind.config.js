/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F6F0E6',
        navy: '#1B283A',
        terracotta: '#B26967',
        'navy-light': '#2D3F56',
        'cream-dark': '#EDE7D9',
        'terracotta-light': '#C4857F',
        'terracotta-dark': '#9A5553',
        'surface-0': 'var(--surface-0)',
        'surface-1': 'var(--surface-1)',
        'surface-2': 'var(--surface-2)',
        'surface-3': 'var(--surface-3)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-tertiary': 'var(--text-tertiary)',
      },
      fontFamily: {
        display: ['Gelica', 'Georgia', 'serif'],
        body: ['FilsonSoft', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
