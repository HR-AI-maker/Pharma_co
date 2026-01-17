import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartSidebar } from '@/components/cart/cart-sidebar'
import { WhatsAppWidget } from '@/components/layout/whatsapp-widget'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Pharma.co - Your Trusted Online Pharmacy',
  description: 'Get your medications delivered discreetly to your door. Fast, secure, and from a licensed UK pharmacy you can trust.',
  keywords: 'pharmacy, online pharmacy, medications, UK pharmacy, buy medicine online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfair.variable} font-sans`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <CartSidebar />
          <WhatsAppWidget />
        </Providers>
      </body>
    </html>
  )
}
