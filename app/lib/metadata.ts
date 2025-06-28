import { Metadata } from 'next'
import { BASE_URL, blog_description, blog_name, blog_title } from '@/app/lib/definitions'

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
}: GenerateMetadataProps): Metadata {
  const fullTitle = title ? `${title} - ${blog_name}` : blog_title
  const fullUrl = `${BASE_URL}${url}`
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`

  return {
    title: fullTitle,
    description,
    authors: [{ name: author }],
    creator: author,
    publisher: blog_name,
    keywords: tags?.join(', '),
    openGraph: {
      type,
      locale: 'ko_KR',
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
      creator: '@ittae', // 트위터 핸들이 있다면
    },
    alternates: {
      canonical: fullUrl,
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
