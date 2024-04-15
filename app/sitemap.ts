import { allBooks, allPosts } from '@/.contentlayer/generated'
import { BASE_URL } from '@/app/lib/definitions'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/get912000won`,
      lastModified: new Date(),
    },
    ...allPosts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.date,
    })),
    ...allBooks.map((book) => ({
      url: `${BASE_URL}/books/${book.slug}`,
      lastModified:
        book.start_read_date === book.finish_read_date
          ? book.start_read_date
          : book.finish_read_date,
    })),
  ]
}
