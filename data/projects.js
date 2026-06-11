export const ABOUT = {
  name:      'Pranav Ghadigaonkar',
  role:      'AI/ML Engineer · Graphic Designer · Photographer',
  location:  'Mumbai, India',
  company:   'Vynqe Circle LLP',
  education: 'M.Tech Robotics & Automation',
  email:     'ggpranavv@gmail.com',
  phone:     '+91 81697 69335',
  github:    'https://github.com/ggpranav',
  linkedin:  '#',
  bio: [
    "Junior AI/ML Engineer building Kynos — a behavioural prediction and nudge routing system for BFSI clients. Mechanical engineer by training, ML practitioner by craft, designer by instinct.",
    "When not tuning LightGBM pipelines, I'm deep in Figma, behind a lens, or soldering something to a microcontroller. Published researcher in IoT-driven industrial control systems.",
  ],
  tags: ['LightGBM','Python','React','Flask','PostgreSQL','Figma','SLAM','Photography','Branding'],
}

export const STATS = [
  { label: 'Projects',   value: '12+',  unit: 'Delivered',             badge: 'Output'  },
  { label: 'Experience', value: '3 yr', unit: 'Active',                badge: 'Active'  },
  { label: 'Stack',      value: 'ML',   unit: 'LightGBM · Python · React', badge: 'Primary' },
]

export const INDICATORS = [
  { label: 'Kynos ML Pipeline', on: true  },
  { label: 'UI/UX Design',      on: true  },
  { label: 'Photography',       on: true  },
  { label: 'More TBD',          on: false },
]

// categories must match switch data-cat: 'ai-ml' | 'uiux' | 'branding' | 'web' | 'robotics'
export const PROJECTS = [
  {
    id: 'kynos',
    categories: ['ai-ml'],
    cat_label:  'AI · ML · BFSI',
    title:      'Kynos — Behavioural Prediction',
    desc:       'LightGBM next-event prediction for personal loan funnels. 5-stage ML pipeline with multi-tenant nudge routing across BFSI clients.',
    year:       '2024 — 2025',
    bg:         'linear-gradient(135deg,#0A140A,#060C06)',
    thumb_label:'KYNOS / ML PIPELINE',
    link:       null,
  },
  {
    id: 'tagsocial-brand',
    categories: ['branding','uiux'],
    cat_label:  'Branding · Social Media · UI/UX',
    title:      'TagSocial — Brand Identity',
    desc:       'End-to-end branding for a location-based social platform. Identity, social posts, app listing design, in-app illustration systems.',
    year:       '2022 — 2023',
    bg:         'linear-gradient(135deg,#140404,#0A0208)',
    thumb_label:'TAGSOCIAL / BRANDING',
    link:       null,
  },
  {
    id: 'app-listing',
    categories: ['uiux'],
    cat_label:  'App Design · UI',
    title:      'App Store Listing Design',
    desc:       'Visually compelling App Store listings crafted to captivate and drive downloads. Motion-forward feature showcase banners.',
    year:       '2023',
    bg:         'linear-gradient(135deg,#04040E,#020208)',
    thumb_label:'APP LISTING / UI',
    link:       null,
  },
  {
    id: 'campaign',
    categories: ['branding'],
    cat_label:  'Advertising · Campaign · OOH',
    title:      'Campaign Signage',
    desc:       'OOH and digital advertising — billboard, digital screens, and building signage campaigns that make brands unforgettable.',
    year:       '2023',
    bg:         'linear-gradient(135deg,#0A080E,#060408)',
    thumb_label:'CAMPAIGN / OOH',
    link:       null,
  },
  {
    id: 'tagsocial-web',
    categories: ['web','uiux'],
    cat_label:  'Web Design · Frontend',
    title:      'TagSocial Web Platform',
    desc:       'Full marketing website and mobile landing page. Responsive, dark-forward design mirroring the app aesthetic language.',
    year:       '2022 — 2023',
    bg:         'linear-gradient(135deg,#040810,#020408)',
    thumb_label:'WEB DESIGN',
    link:       null,
  },
  {
    id: 'slam-robot',
    categories: ['ai-ml','robotics'],
    cat_label:  'Robotics · AI',
    title:      'Humanoid SLAM Robot',
    desc:       'Bipedal humanoid with onboard SLAM navigation using Dijkstra pathfinding. Real-time obstacle mapping and autonomous route planning.',
    year:       '2023 — 2024',
    bg:         'linear-gradient(135deg,#040C06,#020604)',
    thumb_label:'SLAM / ROBOTICS',
    link:       null,
  },
]

// categories: on = switch starts ON
export const SWITCHES = [
  { cat: 'ai-ml',    label: 'AI / ML',  on: true  },
  { cat: 'uiux',     label: 'UI / UX',  on: true  },
  { cat: 'branding', label: 'Brand',    on: true  },
  { cat: 'robotics', label: 'Robotics', on: false },
  { cat: 'web',      label: 'Web',      on: true  },
]

export const PHOTOS = [
  { id:'ganesh',    bg:'linear-gradient(135deg,#1A0808,#0A0404)', ratio:'1/1',   caption:'Ganesh Chaturthi · Mumbai',     label:'GANESH CHATURTHI', mt:0   },
  { id:'silhou',    bg:'linear-gradient(135deg,#0E0604,#060404)', ratio:'4/5',   caption:'Silhouettes · Fire',            label:'SILHOUETTES',      mt:28  },
  { id:'mountain',  bg:'linear-gradient(135deg,#04060A,#020408)', ratio:'16/10', caption:'Mountains · North India',       label:'MOUNTAINS',        mt:0   },
  { id:'camera',    bg:'linear-gradient(135deg,#04040A,#020206)', ratio:'4/3',   caption:'The Tool · Sky',                label:'CAMERA IN SKY',    mt:20  },
  { id:'lensball',  bg:'linear-gradient(135deg,#0C0602,#060402)', ratio:'1/1',   caption:'Lensball · Bandra Worli',       label:'LENSBALL',         mt:0   },
  { id:'structure', bg:'linear-gradient(135deg,#06080C,#040408)', ratio:'3/4',   caption:'Steel Structure · Landscape',   label:'ARCHITECTURE',     mt:44  },
  { id:'street',    bg:'linear-gradient(135deg,#0A0A08,#060604)', ratio:'3/4',   caption:'Street · Mumbai',               label:'STREET PORTRAIT',  mt:0   },
  { id:'aurora',    bg:'linear-gradient(135deg,#02080C,#020408)', ratio:'16/10', caption:'Aurora · Digital Art',          label:'AURORA ARTWORK',   mt:16  },
  { id:'vangogh',   bg:'linear-gradient(135deg,#0A0210,#060108)', ratio:'4/5',   caption:'An Art of an Artist to an Artist', label:'ART OF AN ARTIST', mt:0 },
]

export const SKILLS = [
  { cluster: 'ML / Data', items: [['LightGBM',90],['Python',88],['Pandas',85],['PostgreSQL',78]] },
  { cluster: 'Frontend',  items: [['React',82],['Tailwind',80],['Next.js',75],['Framer',65]] },
  { cluster: 'Backend',   items: [['Flask',80],['FastAPI',72],['Nginx',65],['Docker',60]] },
  { cluster: 'Design',    items: [['Figma',88],['Illustrator',82],['Photoshop',80],['Premiere',65]] },
]

export const EXPERIENCE = [
  {
    period:  '2024 — Present',
    role:    'Junior AI/ML Engineer',
    company: 'Vynqe Circle LLP, Mumbai',
    desc:    'Building Kynos — a 5-stage ML pipeline for BFSI behavioural prediction. LightGBM next-event models, nudge routing engine, multi-tenant PostgreSQL, React dashboard.',
  },
  {
    period:  '2022 — 2024',
    role:    'Freelance Graphic Designer',
    company: 'Self-employed',
    desc:    'B2B/B2C branding, social media, app listing design, advertising campaigns, web design. Clients across tech startups and consumer brands.',
  },
  {
    period:  '2023 — Present',
    role:    'M.Tech — Robotics & Automation',
    company: 'K.J. Somaiya School of Engineering',
    desc:    'Humanoid SLAM robot with Dijkstra navigation. Published paper on IoT-driven industrial control systems.',
  },
]
