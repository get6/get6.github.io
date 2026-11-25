import { allBooks, allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'
import { sitemapLanguages, sitemapLocaleUrl } from '@/app/lib/site-url'

export const dynamic = 'force-static'

/** hreflang alternates whose hrefs are the URLs that return 200. */
function buildAlternates(path: string) {
  return { languages: sitemapLanguages(path) }
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
      url: sitemapLocaleUrl('/', 'ko'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: buildAlternates('/'),
    },
    {
      url: sitemapLocaleUrl('/about', 'ko'),
      lastModified: '2026-01-01',
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: buildAlternates('/about'),
    },
    {
      url: sitemapLocaleUrl('/library', 'ko'),
      lastModified: latestBookDate
        ? latestBookDate.finish_read_date > latestBookDate.start_read_date
          ? latestBookDate.finish_read_date
          : latestBookDate.start_read_date
        : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: buildAlternates('/library'),
    },
    {
      url: sitemapLocaleUrl('/books', 'ko'),
      lastModified: latestBookDate
        ? latestBookDate.finish_read_date > latestBookDate.start_read_date
          ? latestBookDate.finish_read_date
          : latestBookDate.start_read_date
        : new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: buildAlternates('/books'),
    },
    {
      url: sitemapLocaleUrl('/tags', 'ko'),
      lastModified: latestPostDate,
      changeFrequency: 'weekly',
      priority: 0.5,
      alternates: buildAlternates('/tags'),
    },
    // Dynamic posts with alternates
    ...koPosts.map((post) => ({
      url: sitemapLocaleUrl(`/posts/${post.slug}`, 'ko'),
      lastModified: post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: buildAlternates(`/posts/${post.slug}`),
    })),
    // Dynamic books with alternates
    ...koBooks.map((book) => ({
      url: sitemapLocaleUrl(`/books/${book.slug}`, 'ko'),
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
