import { BASE_URL, blog_description, blog_title } from '@/app/lib/definitions'
import { Providers } from '@/app/providers'
import Navbar from '@/app/ui/Navbar'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NODE_ENV === 'production' ? BASE_URL : 'http://localhost:3000',
  ),
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
  verification: {
    google: 'TKcf-2ROx-mSTXqWfCfdwRGHICOHF8NpvuGfTY650o0',
    other: {
      'naver-site-verification': '6e81cb6b70ea6de1df6822ac96bb0fb48838ae8a',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <Head>
        <meta name="google-site-verification" content="" />
        <meta
          name="naver-site-verification"
          content="6e81cb6b70ea6de1df6822ac96bb0fb48838ae8a"
        />
      </Head>
      <body className={`${inter.className} dark:bg-gray-900`}>
        <Providers>
          <header>
            <Navbar />
          </header>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && (
          <>
            {/* Google tag (gtag.js) */}
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-YGW2B2X46K" />
            <Script id="google-analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-YGW2B2X46K');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
