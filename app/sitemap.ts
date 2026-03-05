import { BASE_URL } from '@/app/lib/definitions'
import { allBooks, allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = allPosts.length
    ? allPosts.reduce((latest, post) =>
        new Date(post.date) > new Date(latest.date) ? post : latest,
      ).date
    : new Date().toISOString()

  const latestBookDate = allBooks.length
    ? allBooks.reduce((latest, book) => {
        const d =
          book.finish_read_date > book.start_read_date
            ? book.finish_read_date
            : book.start_read_date
        const ld =
          latest.finish_read_date > latest.start_read_date
            ? latest.finish_read_date
            : latest.start_read_date
        return new Date(d) > new Date(ld) ? book : latest
      })
    : null

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2026-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/books`,
      lastModified: latestBookDate
        ? latestBookDate.finish_read_date > latestBookDate.start_read_date
          ? latestBookDate.finish_read_date
          : latestBookDate.start_read_date
        : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/series`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/get912000won`,
      lastModified: '2025-01-01',
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
