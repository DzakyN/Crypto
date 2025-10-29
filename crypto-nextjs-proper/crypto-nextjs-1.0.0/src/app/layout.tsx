import TrackerClient from './_tracker-client'
import { Inter } from 'next/font/google'
import './globals.css'
import Aoscompo from '@/lib/utils/aos'
import ScrollToTop from './components/scroll-to-top'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
const font = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
      
{/* Tracking bootstrap */}
<script suppressHydrationWarning dangerouslySetInnerHTML={{__html:`
if (typeof window !== 'undefined') {
  (async () => {
    try {
      const m = await import('/utils/tracker.js');
      await m.initAutoTracking();
    } catch (e) { console.warn('tracker init failed', e); }
  })();
}
`}}/>

  <TrackerClient />
</body>
    </html>
  )
}