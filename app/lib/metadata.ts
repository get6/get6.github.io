import { Metadata } from 'next'
import {
  BASE_URL,
  blog_description,
  blog_name,
  blog_title,
} from '@/app/lib/definitions'
import { defaultLocale, locales, ogLocaleMap } from '@/app/i18n/config'

interface GenerateMetadataProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  author?: string
  locale?: string
}

/** Build hreflang alternates for a given path (without locale prefix) */
function buildAlternates(pathWithoutLocale: string) {
  const languages: Record<string, string> = {}

  // Default locale (ko) has no prefix
  languages[defaultLocale] = `${BASE_URL}${pathWithoutLocale}`

  // Other locales have prefix
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${pathWithoutLocale}`
  }

  // x-default points to the default locale
  languages['x-default'] = `${BASE_URL}${pathWithoutLocale}`

  return languages
}

/** Extract path without locale prefix from a URL path */
function stripLocalePrefix(urlPath: string): string {
  const allLocales = [defaultLocale, ...locales] as string[]
  const segments = urlPath.split('/')
  if (segments.length > 1 && allLocales.includes(segments[1])) {
    return '/' + segments.slice(2).join('/') || '/'
  }
  return urlPath
}

export function generateMetadata({
  title,
  description = blog_description,
  image = '/images/alt_image.webp',
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  tags,
  author = blog_name,
  locale = 'ko',
}: GenerateMetadataProps): Metadata {
  const fullTitle = title ? `${title} - ${blog_name}` : blog_title
  const fullUrl = `${BASE_URL}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`
  const ogLocale = ogLocaleMap[locale] ?? 'ko_KR'
  const pathWithoutLocale = stripLocalePrefix(url || '/')

  return {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: blog_name,
    keywords: tags?.join(', '),
    openGraph: {
      type,
      locale: ogLocale,
      siteName: blog_name,
      title: fullTitle,
      description,
      url: fullUrl,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author],
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [fullImageUrl],
      creator: '@ittae',
    },
    alternates: {
      canonical: fullUrl,
      languages: buildAlternates(pathWithoutLocale),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
