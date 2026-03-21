import { BASE_URL, blog_description, blog_name } from '@/app/lib/definitions'
import { sliceDesc } from '@/app/lib/utils'
import { getPostsByLocale } from '@/app/lib/content'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getPostsByLocale('ko').slice(0, 20)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${blog_name}</title>
    <description>${blog_description}</description>
    <link>${BASE_URL}</link>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>

    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${sliceDesc(post.summary, 200)}]]></description>
      <link>${BASE_URL}/posts/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/posts/${post.slug}</guid>
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
