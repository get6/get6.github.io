import { BASE_URL } from '@/app/lib/definitions'
import { locales, defaultLocale } from '@/app/i18n/config'
import { allBooks, allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

/** Build alternates object for hreflang in sitemap */
function buildAlternates(path: string) {
  const languages: Record<string, string> = {}

  // Default locale (ko) at root
  languages[defaultLocale] = `${BASE_URL}${path}`

  // Other locales with prefix
  for (const loc of locales) {
    languages[loc] = `${BASE_URL}/${loc}${path}`
  }

  return { languages }
}

// Filter to ko-only posts/books for sitemap (they're the canonical content)
const koPosts = allPosts.filter((p) => (p as any).locale === 'ko')
const koBooks = allBooks.filter((b) => (b as any).locale === 'ko')

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPostDate = koPosts.length
    ? koPosts.reduce((latest, post) =>
        new Date(post.date) > new Date(latest.date) ? post : latest,
      ).date
    : new Date().toISOString()

  const latestBookDate = koBooks.length
    ? koBooks.reduce((latest, book) => {
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
    // Static pages with alternates
    {
      url: `${BASE_URL}/`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: buildAlternates('/'),
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: '2026-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: buildAlternates('/about'),
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
      alternates: buildAlternates('/books'),
    },
    {
      url: `${BASE_URL}/tags`,
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: buildAlternates('/tags'),
    },
    // Dynamic posts with alternates
    ...koPosts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/posts/${post.slug}`),
    })),
    // Dynamic books with alternates
    ...koBooks.map((book) => ({
      url: `${BASE_URL}/books/${book.slug}`,
      lastModified:
        book.start_read_date === book.finish_read_date
          ? book.start_read_date
          : book.finish_read_date,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
      alternates: buildAlternates(`/books/${book.slug}`),
    })),
  ]
}
