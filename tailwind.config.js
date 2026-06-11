/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        mono:    ['var(--font-mono)',    'monospace'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      colors: {
        bg:      '#000000',
        surface: '#0D0D0D',
        panel:   '#141414',
        border:  '#2A2A2A',
        mid:     '#555555',
        light:   '#AAAAAA',
        bright:  '#E8E8E8',
      },
    },
  },
  plugins: [],
}
