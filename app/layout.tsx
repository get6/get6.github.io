import { blog_description, blog_title } from '@/app/lib/definitions'
import Navbar from '@/app/ui/Navbar'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: blog_title,
  description: blog_description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className}`}>
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  )
}
