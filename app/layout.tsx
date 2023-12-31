import { blog_description, blog_title } from '@/app/lib/definitions'
import Navbar from '@/app/ui/Navbar'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: blog_title,
  description: blog_description,
  icons: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/favicon-dark.ico',
      media: '(prefers-color-scheme: dark)',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="dark">
      <body className={`${inter.className} dark:bg-black`}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  )
}
