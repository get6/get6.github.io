import { BASE_URL } from '@/app/lib/definitions'
import { allBooks, allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly', // 블로그는 주간 업데이트가 적절
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/books`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/series`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // 정적 페이지들 (있는 경우)
    {
      url: `${BASE_URL}/get912000won`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // 동적 포스트들
    ...allPosts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // 동적 책들
    ...allBooks.map((book) => ({
      url: `${BASE_URL}/books/${book.slug}`,
      lastModified:
        book.start_read_date === book.finish_read_date
          ? book.start_read_date
          : book.finish_read_date,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}
