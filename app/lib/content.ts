import {
  allPosts,
  allBooks,
  type Post,
  type Book,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

/** Get posts filtered by locale, sorted by date descending */
export function getPostsByLocale(locale: string): Post[] {
  return allPosts
    .filter((post) => (post as any).locale === locale)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
}

/** Get books filtered by locale, sorted by start_read_date descending */
export function getBooksByLocale(locale: string): Book[] {
  return allBooks
    .filter((book) => (book as any).locale === locale)
    .sort((a, b) =>
      compareDesc(new Date(a.start_read_date), new Date(b.start_read_date)),
    )
}

/**
 * Check if a translated version of a post exists for the given locale.
 * Returns the translated post or null.
 */
export function getTranslatedPost(slug: string, locale: string): Post | null {
  return (
    allPosts.find(
      (post) => (post as any).locale === locale && (post as any).slug === slug,
    ) ?? null
  )
}

/**
 * Check if a translated version of a book exists for the given locale.
 * Returns the translated book or null.
 */
export function getTranslatedBook(slug: string, locale: string): Book | null {
  return (
    allBooks.find(
      (book) => (book as any).locale === locale && (book as any).slug === slug,
    ) ?? null
  )
}
