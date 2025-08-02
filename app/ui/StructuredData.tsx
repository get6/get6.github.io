import { BASE_URL, blog_name } from '@/app/lib/definitions'

interface BlogPostingData {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
  image?: string
  tags?: string[]
}

interface WebsiteData {
  name: string
  description: string
  url: string
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
    inLanguage: 'ko-KR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ name, description, url }: WebsiteData) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Website',
    name,
    description,
    url,
    inLanguage: 'ko-KR',
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
