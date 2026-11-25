import { getDictionary } from '@/app/i18n/get-dictionary'
import {
  BASE_URL,
  blog_description,
  blog_name,
  blog_title,
} from '@/app/lib/definitions'
import { sharedMetadata } from '@/app/lib/site-metadata'
import RootDocument from '@/app/ui/layout/RootDocument'
import { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  ...sharedMetadata,
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
  alternates: {
    canonical: BASE_URL,
    languages: {
      ko: BASE_URL,
      en: `${BASE_URL}/en`,
      ja: `${BASE_URL}/ja`,
      'x-default': BASE_URL,
    },
  },
}

export default async function KoreanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dictionary = await getDictionary('ko')

  return (
    <RootDocument locale="ko" dictionary={dictionary}>
      {children}
    </RootDocument>
  )
}
