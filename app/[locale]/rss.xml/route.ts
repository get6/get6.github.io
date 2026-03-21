import { BASE_URL } from '@/app/lib/definitions'
import { locales, localePath } from '@/app/i18n/config'
import { getDictionary } from '@/app/i18n/get-dictionary'
import { getPostsByLocale } from '@/app/lib/content'
import { sliceDesc } from '@/app/lib/utils'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const langMap: Record<string, string> = {
  en: 'en-US',
  ja: 'ja-JP',
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  // Use locale posts, fallback to ko
  let posts = getPostsByLocale(locale)
  if (posts.length === 0) {
    posts = getPostsByLocale('ko')
  }
  posts = posts.slice(0, 20)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${dictionary.meta.blogName}</title>
    <description>${dictionary.meta.blogDescription}</description>
    <link>${BASE_URL}/${locale}</link>
    <language>${langMap[locale] ?? locale}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/${locale}/rss.xml" rel="self" type="application/rss+xml"/>

    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${sliceDesc(post.summary, 200)}]]></description>
      <link>${BASE_URL}${localePath(`/posts/${post.slug}`, locale)}</link>
      <guid isPermaLink="true">${BASE_URL}${localePath(`/posts/${post.slug}`, locale)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags?.map((tag) => `<category>${tag}</category>`).join('') || ''}
    </item>`,
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
