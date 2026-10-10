# GGpranav portfolio

Next.js 15 (App Router) + React 19 + Tailwind CSS 3, plain JavaScript. Deploys on Vercel with no extra setup.

## Run it
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Two things to add before going live
1. **Resume:** put your PDF at `public/resume.pdf` (the nav, contact section and buttons already point there).
2. **Fraud dashboard link:** copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_DEMO_URL`. On Vercel, add the same variable under Project Settings, Environment Variables.

## Where to edit things
| What | File |
|---|---|
| Projects list and order | `data/projects.js` |
| Experience and education | `data/experience.js` |
| Skills (sticker colours: `k-ml` red, `k-fe` mustard, `k-be` brown, `k-ds` cream) | `data/skills.js` |
| Design & creative carousel (add images to `public/images/creative`) | `data/creative.js` |
| Email, phone, GitHub, LinkedIn | `data/site.js` |
| About text | `components/sections/About.jsx` |
| Fraud case study text | `content/fraudCaseStudy.js` (plain HTML) |
| Humanoid robot article | `content/humanoidArticle.js` (plain HTML, figures in `public/images/humanoid`) |
| Kynos page (placeholder) | `app/projects/kynos/page.js` |
| Colours, fonts, spacing | `styles/globals.css` (variables at the top) |

## Notes
- `tailwind.config.js` has Tailwind's preflight reset **off**, because `styles/globals.css` is a complete hand-written design system. Tailwind utilities (`className="mt-4 text-ink"`) still work and use the same colours.
- Fonts (Instrument Serif, Inter, Space Mono) are self-hosted through `@fontsource`, so there is no Google Fonts request.
- The pixel cursor lives in `public/cursors`. The favicon is `app/icon.svg`.
- The hero animation is `lib/asciiHero.js`; the carousel is `lib/carousel.js`.
- Animations switch off automatically for visitors who prefer reduced motion.
