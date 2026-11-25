import { defaultLocale, locales } from '../i18n/config'
import { BASE_URL } from './definitions'

/** Path with a locale prefix. The locale home is `/en`, not `/en/`. */
export function localePrefixedPath(path: string, locale: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) return normalized
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

/** Percent-encode each path segment. Slashes stay. Needed in sitemap `<loc>`. */
export function encodePathSegments(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

/** Absolute URL. The site root has no trailing slash, matching the canonical. */
export function absoluteUrl(path: string): string {
  if (path === '/' || path === '') return BASE_URL
  return `${BASE_URL}${path}`
}

export function absoluteLocaleUrl(path: string, locale: string): string {
  return absoluteUrl(localePrefixedPath(path, locale))
}

/**
 * Sitemap URL. The Korean home keeps `BASE_URL + '/'` (already 200).
 * Every other path is percent-encoded and has no trailing slash.
 */
export function sitemapLocaleUrl(path: string, locale: string): string {
  const prefixed = localePrefixedPath(path, locale)
  if (prefixed === '/') return `${BASE_URL}/`
  return `${BASE_URL}${encodePathSegments(prefixed)}`
}

export function hreflangLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    [defaultLocale]: absoluteLocaleUrl(path, defaultLocale),
    'x-default': absoluteLocaleUrl(path, defaultLocale),
  }
  for (const locale of locales) {
    languages[locale] = absoluteLocaleUrl(path, locale)
  }
  return languages
}

export function sitemapLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {
    [defaultLocale]: sitemapLocaleUrl(path, defaultLocale),
  }
  for (const locale of locales) {
    languages[locale] = sitemapLocaleUrl(path, locale)
  }
  return languages
}
