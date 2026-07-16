// rehype-autolink-headings (behavior: append, content: <span>#</span>) wraps
// the span in an anchor, so real HTML ends with:
//   <a class="no-underline" href="#id"><span class="no-underline">#</span></a>
// Keep a span-only alternative for robustness against config changes.
const AUTOLINK_SUFFIX_REGEX =
  /\s*(?:<a\b[^>]*>\s*)?<span\b[^>]*>\s*#\s*<\/span>\s*(?:<\/a>\s*)?$/i
const HTML_TAG_REGEX = /<[^>]+>/g
const HEADER_REGEX = /<h([1-6]).*?id=["'](.*?)["'].*?>(.*?)<\/h[1-6]>/g

export interface TocEntry {
  level: number
  id: string
  title: string
}

export const getHeadingTitle = (headingHtml: string) => {
  const withoutAutolinkSuffix = headingHtml.replace(AUTOLINK_SUFFIX_REGEX, '')
  return withoutAutolinkSuffix.replace(HTML_TAG_REGEX, '').trim()
}

export const getToC = (html: string): TocEntry[] | null => {
  const headers = html.match(HEADER_REGEX)
  if (!headers) return null

  const headerList: TocEntry[] = headers.map((header) => {
    const matches = header.match(
      /<h([1-6]).*?id=["'](.*?)["'].*?>(.*?)<\/h[1-6]>/,
    )

    if (!matches) return { level: 0, id: '', title: '' }

    return {
      level: parseInt(matches[1]),
      id: matches[2],
      title: getHeadingTitle(matches[3]),
    }
  })

  const filteredList = headerList.filter((header) => header.level !== 0)
  return 1 < filteredList.length ? filteredList : null
}
