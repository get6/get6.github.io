import {
  allPosts,
  allBooks,
  type Post,
  type Book,
} from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { defaultLocale, locales, localePath } from '@/app/i18n/config'

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

/**
 * Get available translations for a post (excluding the current locale).
 * Returns a map of locale → URL path.
 */
export function getPostTranslations(
  slug: string,
  currentLocale: string,
): Record<string, string> {
  const allLocales: string[] = [defaultLocale, ...locales]
  const translations: Record<string, string> = {}

  for (const loc of allLocales) {
    if (loc === currentLocale) continue
    const translated = getTranslatedPost(slug, loc)
    if (translated) {
      translations[loc] = localePath(`/posts/${slug}`, loc)
    }
  }

  return translations
}

/**
 * Get available translations for a book (excluding the current locale).
 * Returns a map of locale → URL path.
 */
export function getBookTranslations(
  slug: string,
  currentLocale: string,
): Record<string, string> {
  const allLocales: string[] = [defaultLocale, ...locales]
  const translations: Record<string, string> = {}

  for (const loc of allLocales) {
    if (loc === currentLocale) continue
    const translated = getTranslatedBook(slug, loc)
    if (translated) {
      translations[loc] = localePath(`/books/${slug}`, loc)
    }
  }

  return translations
}
