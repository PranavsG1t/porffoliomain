import { DM_Serif_Display, Space_Mono, Inter } from 'next/font/google'
import '../styles/globals.css'
import ScrollRevealProvider from '@/components/ui/ScrollRevealProvider'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-mono',
  display: 'swap',
})
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: 'Pranav Ghadigaonkar — AI/ML Engineer · Designer · Photographer',
  description: 'Portfolio of Pranav Ghadigaonkar. Building systems that think and experiences that feel. Mumbai, India.',
  keywords: ['AI Engineer', 'ML Engineer', 'Graphic Designer', 'Photographer', 'Mumbai'],
  authors: [{ name: 'Pranav Ghadigaonkar' }],
  openGraph: {
    title: 'Pranav Ghadigaonkar',
    description: 'Life is a paradox, so is Art.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${spaceMono.variable} ${inter.variable}`}>
      <body>
        <ScrollRevealProvider>
          {children}
        </ScrollRevealProvider>
      </body>
    </html>
  )
}
