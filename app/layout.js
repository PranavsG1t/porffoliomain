import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/space-mono/400.css'
import '@fontsource/space-mono/700.css'
import '../styles/globals.css'
import Nav from '@/components/ui/Nav'
import Footer from '@/components/ui/Footer'
import PageEffects from '@/components/ui/PageEffects'

export const metadata = {
  title: 'GGpranav',
  description: 'Pranav Ghadigaonkar: machine learning engineer who also designs and photographs. Projects, case studies and a live fraud-detection demo.',
}
export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' }

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Nav />
        {children}
        <Footer />
        <PageEffects />
      </body>
    </html>
  )
}
