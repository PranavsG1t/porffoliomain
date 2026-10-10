/** Design tokens match styles/globals.css. Preflight is off because globals.css is a complete hand-written design system. */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: { extend: {
    colors: { bg: '#E9E1C9', card: '#F6F1E0', ink: '#2B1A17', mid: '#54403A', soft: '#6E5A52', line: '#C9BFA2', tile: '#DDD3B6', accent: '#B5311C', red: '#D9402B', sun: '#F2B52B', brown: '#3A2420' },
    fontFamily: { display: ['Instrument Serif', 'Georgia', 'serif'], body: ['Inter', 'system-ui', 'sans-serif'], mono: ['Space Mono', 'ui-monospace', 'monospace'] },
  } },
  plugins: [],
}
