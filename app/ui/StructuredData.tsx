import { BASE_URL, blog_name } from '@/app/lib/definitions'
import { htmlLangMap } from '@/app/i18n/config'

const toInLanguage = (locale?: string) => htmlLangMap[locale ?? 'ko'] ?? 'ko'

interface BlogPostingData {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
  image?: string
  tags?: string[]
  locale?: string
}

interface WebsiteData {
  name: string
  description: string
  url: string
  locale?: string
}

export function BlogPostStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  author,
  url,
  image,
  tags,
  locale,
}: BlogPostingData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: blog_name,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.webp`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}${url}`,
    },
    url: `${BASE_URL}${url}`,
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image.startsWith('http') ? image : `${BASE_URL}${image}`,
        width: 1200,
        height: 630,
      },
    }),
    ...(tags && {
      keywords: tags.join(', '),
    }),
    inLanguage: toInLanguage(locale),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface BookReviewData {
  title: string
  author: string
  description: string
  image: string
  url: string
  datePublished: string
  rating: number
  bookUrl: string
  locale?: string
}

export function BookReviewStructuredData({
  title,
  author,
  description,
  image,
  url,
  datePublished,
  rating,
  bookUrl,
  locale,
}: BookReviewData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Book',
      name: title,
      author: { '@type': 'Person', name: author },
      image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
      url: bookUrl,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
    },
    author: { '@type': 'Person', name: blog_name },
    description,
    datePublished,
    url: `${BASE_URL}${url}`,
    publisher: { '@type': 'Organization', name: blog_name },
    inLanguage: toInLanguage(locale),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

interface PersonData {
  name: string
  description: string
  url: string
  jobTitle: string
  locale?: string
}

export function PersonStructuredData({
  name,
  description,
  url,
  jobTitle,
  locale,
}: PersonData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    description,
    url: `${BASE_URL}${url}`,
    jobTitle,
    sameAs: ['https://github.com/get6/', 'https://linktr.ee/hwangitae/'],
    inLanguage: toInLanguage(locale),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({
  name,
  description,
  url,
  locale,
}: WebsiteData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name,
    description,
    url,
    inLanguage: toInLanguage(locale),
    author: {
      '@type': 'Person',
      name: blog_name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/?search={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
