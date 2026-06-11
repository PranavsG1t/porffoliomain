# Pranav Ghadigaonkar — Portfolio

Monochrome mechanical portfolio. Built with Next.js 14 + Tailwind CSS. Deploys to Vercel.

## Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + inline styles (no CSS modules)
- **Fonts:** DM Serif Display · Space Mono · Inter (via next/font/google)
- **Deploy:** Vercel (free hobby plan)

## Local development

```bash
npm install
npm run dev
# open http://localhost:3000
```

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import repo
3. Vercel auto-detects Next.js — click Deploy
4. Done. You get a free `.vercel.app` URL instantly

## Adding real images

Replace placeholder cards with real images:

1. Drop your image files into `/public/images/`
2. In `data/projects.js`, change `bg` to `thumb: '/images/your-file.jpg'` on each project
3. In `Work.jsx`, swap the placeholder div with `<Image src={project.thumb} alt={project.title} fill style={{objectFit:'cover'}} />`

## Updating content

**All content lives in one file:** `data/projects.js`

- Edit `ABOUT` for bio, email, links
- Edit `PROJECTS` array for work cards
- Edit `PHOTOS` array for photography section
- Edit `SWITCHES` to add/remove discipline toggles
- Edit `SKILLS` / `EXPERIENCE` for those sections

## Adding a custom domain later

1. Buy domain at Namecheap or Cloudflare (~₹800/yr for .in)
2. Vercel project → Settings → Domains → Add your domain
3. Copy the two DNS records Vercel gives you
4. Paste them at your registrar
5. Done — SSL is automatic

## Project structure

```
portfolio/
├── app/
│   ├── layout.js          ← fonts, metadata, root wrapper
│   └── page.js            ← assembles all sections
├── components/
│   ├── ui/
│   │   ├── Nav.jsx        ← fixed nav bar
│   │   ├── Footer.jsx     ← footer with tagline
│   │   └── ScrollRevealProvider.jsx
│   └── sections/
│       ├── Hero.jsx       ← headline + dot canvas
│       ├── SwitchPanel.jsx ← tactile toggle switches (functional filter)
│       ├── About.jsx      ← ID plate + bio
│       ├── Work.jsx       ← project cards (controlled by switches)
│       ├── Photography.jsx ← masonry photo grid
│       ├── Skills.jsx     ← animated skill bars
│       ├── Experience.jsx ← timeline
│       └── Contact.jsx    ← ignition copy button
├── data/
│   └── projects.js        ← ALL content lives here
├── hooks/
│   └── useScrollReveal.js
├── styles/
│   └── globals.css        ← design tokens + grain + scanlines
├── public/
│   └── images/            ← drop your photos here
├── tailwind.config.js
├── next.config.js
├── jsconfig.json
└── vercel.json
```
