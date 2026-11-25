import AdSense from '@/app/ads/AdSense'
import { htmlLangMap } from '@/app/i18n/config'
import type { Dictionary } from '@/app/i18n/get-dictionary'
import { Providers } from '@/app/providers'
import Navbar from '@/app/ui/Navbar'
import { WebVitals } from '@/app/ui/WebVitals'
import { Inter } from 'next/font/google'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  locale: string
  dictionary: Dictionary
  children: React.ReactNode
}

export default function RootDocument({ locale, dictionary, children }: Props) {
  const lang = htmlLangMap[locale] ?? locale

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={dictionary.meta.rssTitle}
          href={locale === 'ko' ? '/rss.xml' : `/${locale}/rss.xml`}
        />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          rel="stylesheet"
          href="/fonts/pretendard/pretendardvariable-dynamic-subset.css"
        />
        <AdSense />
      </head>
      <body className={`${inter.className} bg-slate-50 dark:bg-gray-900`}>
        <Providers dictionary={dictionary} locale={locale}>
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
