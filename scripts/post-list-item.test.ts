import assert from 'assert'

import {
  CARD_SUMMARY_LENGTH,
  postSearchText,
  toPostListItem,
} from '../app/lib/post-list-item'

const longSummary = '가'.repeat(500)
const item = toPostListItem(
  {
    slug: '202611242359',
    url: '/posts/202611242359',
    title: '제목',
    date: '2026-11-24T14:59:00.000Z',
    summary: longSummary,
    cover_image: 'https://example.com/cover.webp',
    tags: ['에세이', 'mindset'],
    locale: 'ko',
  },
  3,
)

assert.strictEqual(item.summary.length, CARD_SUMMARY_LENGTH)
assert.strictEqual(item.readingMinutes, 3)
assert.strictEqual('body' in item, false)
assert.deepStrictEqual(item.tags, ['에세이', 'mindset'])

const short = toPostListItem(
  {
    slug: 'short',
    url: '/posts/short',
    title: '짧은 글',
    date: '2026-11-24T14:59:00.000Z',
    summary: '  한 줄   요약  ',
    cover_image: '/images/alt_image.webp',
    tags: [],
    locale: 'en',
  },
  0,
)
assert.strictEqual(short.summary, '한 줄 요약')
assert.strictEqual(short.readingMinutes, 0)

assert.strictEqual(
  postSearchText({
    title: 'Hello',
    summary: 'World',
    tags: ['AI', 'note'],
  }),
  'hello world ai note',
)

console.log('post-list-item tests passed')
