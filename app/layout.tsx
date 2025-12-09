import AdSense from '@/app/ads/AdSense'
import {
  BASE_URL,
  blog_description,
  blog_name,
  blog_title,
} from '@/app/lib/definitions'
import { Providers } from '@/app/providers'
import Navbar from '@/app/ui/Navbar'
import { WebVitals } from '@/app/ui/WebVitals'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import 'katex/dist/katex.min.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: blog_title,
  description: blog_description,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: blog_name,
    url: BASE_URL,
    title: blog_title,
    description: blog_description,
    images: [
      {
        url: '/images/alt_image.webp',
        width: 1200,
        height: 630,
        alt: blog_title,
      },
    ],
  },
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
  // 보안을 위한 메타 태그들
  other: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <AdSense />
      </head>
      <body className={`${inter.className} dark:bg-gray-900`}>
        <Providers>
          <WebVitals />
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
