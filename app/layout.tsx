import AdSense from '@/app/ads/AdSense'
import {
  BASE_URL,
  blog_description,
  blog_name,
  blog_title,
} from '@/app/lib/definitions'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { Providers } from '@/app/providers'
import Navbar from '@/app/ui/Navbar'
import { WebVitals } from '@/app/ui/WebVitals'
import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
  alternates: {
    canonical: BASE_URL,
    languages: {
      ko: BASE_URL,
      en: `${BASE_URL}/en`,
      ja: `${BASE_URL}/ja`,
      'x-default': BASE_URL,
    },
  },
  other: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dictionary = await getDictionary('ko')

  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="이때의 나 RSS"
          href="/rss.xml"
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          rel="stylesheet"
          href="/fonts/pretendard/pretendard-dynamic-subset.css"
        />
        <AdSense />
      </head>
      <body className={`${inter.className} dark:bg-gray-900`}>
        <Providers dictionary={dictionary} locale="ko">
          <WebVitals />
          <header>
            <Navbar />
          </header>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-YGW2B2X46K"
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
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
