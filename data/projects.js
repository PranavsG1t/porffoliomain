import { LINKS } from './site'

// Order here = order on the page.
export const PROJECTS = [
  { title: 'Fraud detection with NL alerts', desc: 'Real-time card fraud scoring with LightGBM and SHAP (PR-AUC 0.828), a document-forgery detector, and a RAG layer that writes analyst-ready alerts.', tags: 'Machine learning, RAG, computer vision. Case study and live demo', year: '2026', href: '/projects/fraud-detection' },
  { title: 'Kynos', desc: 'A LightGBM next-event prediction system for B2B SaaS in BFSI, with SHAP explanations for non-technical teams.', tags: 'Machine learning, BFSI', year: '2025\u201326', href: '/projects/kynos' },
  { title: 'AI-powered humanoid robot', desc: 'Real-time perception on a Raspberry Pi, SLAM with Dijkstra path planning, and voice, IMU, ultrasonic and servo control in one loop.', tags: 'Robotics, M.Tech major project', year: '2024\u201325', href: '/projects/humanoid-robot' },
  { title: 'Sustainable manufacturing in Industry 4.0', desc: 'Published research on safety and rapid response in industrial control systems with smart edge IoT devices.', tags: 'Research, IoT. Read the paper on ResearchGate', year: '2024', href: LINKS.paper, external: true },
]
