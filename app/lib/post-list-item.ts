/**
 * 카드에 보이는 두 줄(line-clamp)보다 길다.
 * 이 길이만 넘기면 화면은 그대로이고, 글 본문은 목록 페이지에 실리지 않는다.
 */
export const CARD_SUMMARY_LENGTH = 200

/** 목록 카드와 태그 표가 렌더하는 필드. 마크다운 본문은 없다. */
export interface PostListItem {
  slug: string
  url: string
  title: string
  date: string
  summary: string
  cover_image: string
  tags: string[]
  locale: string
  readingMinutes: number
}

interface PostListSource {
  slug: string
  url: string
  title: string
  date: string
  summary?: string | null
  cover_image: string
  tags: string[]
  locale: string
}

export function toPostListItem(
  post: PostListSource,
  readingMinutes: number,
): PostListItem {
  const summary = (post.summary ?? '').replace(/\s+/g, ' ').trim()
  return {
    slug: post.slug,
    url: post.url,
    title: post.title,
    date: post.date,
    summary:
      summary.length > CARD_SUMMARY_LENGTH
        ? summary.slice(0, CARD_SUMMARY_LENGTH)
        : summary,
    cover_image: post.cover_image,
    tags: [...post.tags],
    locale: post.locale,
    readingMinutes,
  }
}

export function postSearchText(
  post: Pick<PostListItem, 'title' | 'summary' | 'tags'>,
): string {
  return [post.title, post.summary, post.tags.join(' ')].join(' ').toLowerCase()
}
