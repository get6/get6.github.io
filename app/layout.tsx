import { blog_description, blog_title } from '@/app/lib/definitions'
import { Providers } from '@/app/providers'
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
      url: '/icons/favicon.ico',
      media: '(prefers-color-scheme: light)',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      url: '/icons/favicon-dark.ico',
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
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-gray-900`}>
        <Providers>
          <header>
            <Navbar />
          </header>
          {children}
        </Providers>
      </body>
    </html>
  )
}
