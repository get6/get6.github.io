import { localePath } from '@/app/i18n/config'

/** Joins tag names on a table row without colliding with commas inside a tag. */
export const TAG_SEPARATOR = '\u001f'

/** Tag archive query on the slash-less /tags page (GitHub Pages 404s /tags/). */
export function tagFilterHref(tag: string, locale: string): string {
  const params = new URLSearchParams({ tag })
  return localePath(`/tags?${params.toString()}`, locale)
}
