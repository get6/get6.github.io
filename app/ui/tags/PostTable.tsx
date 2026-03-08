'use client'

import { AdsInTable } from '@/app/ads/AdsInTable'
import { Ad, ad_per_content } from '@/app/lib/definitions'
import FormattedDate from '@/app/ui/FormattedDate'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import { Post, allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

type PostOrAd = Post | Ad

const insertAdsIntoPosts = (posts: Post[], interval: number): PostOrAd[] => {
  const result: PostOrAd[] = []
  for (let i = 0; i < posts.length; i++) {
    if (i > 0 && i % interval === 0) {
      result.push({ type: 'Ad' })
    }
    result.push(posts[i])
  }
  return result
}

export default function PostTable() {
  const { push } = useRouter()
  const heads = ['Title', 'Date', 'Categories']
  const searchParams = useSearchParams()

  const posts = (
    searchParams.has('tag')
      ? allPosts.filter((post) =>
          post.tags.includes(searchParams.get('tag')!.toString()),
        )
      : allPosts
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const postsWithAds = insertAdsIntoPosts(posts, ad_per_content)

  return (
    <Table>
      <TableHead>
        <tr>
          {heads.map((head, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              {head} {index === 0 && `(${posts.length})`}
            </th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {postsWithAds.map((item, index) => {
          if ('type' in item && item.type === 'Ad') {
            return (
              <tr
                key={`ad-${index}`}
                className="max-h-14 border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td colSpan={heads.length}>
                  <AdsInTable />
                </td>
              </tr>
            )
          }
          const post = item as Post
          return (
            <tr
              key={post.slug}
              onClick={() => push(post.url)}
              className="border-b bg-white hover:cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <Link
                  href={post.url}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </th>
              <td className="truncate px-6 py-4">
                <FormattedDate date={post.date} />
              </td>
              <td className="truncate px-6 py-4">{post.tags.join(', ')}</td>
            </tr>
          )
        })}
        {posts.length === 0 && (
          <tr>
            <td
              colSpan={3}
              className="lg:text-md py-4 text-center text-sm font-semibold"
            >
              찾고자 하는 태그와 일치하는 게시글이 없어요 😢
            </td>
          </tr>
        )}
      </TableBody>
    </Table>
  )
}
