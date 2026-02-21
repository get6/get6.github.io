'use client'

import PrevPost from '@/app/ui/home/PrevPost'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Post } from 'contentlayer/generated'
import { useSearchParams } from 'next/navigation'

interface Props {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  const param = 'query'
  const searchParams = useSearchParams()

  const allPosts = searchParams.has(param)
    ? posts.filter((post) => {
        const query = searchParams.get(param)!.toString().toLowerCase()

        // Safe string checking with fallbacks
        const titleMatch = post.title?.toLowerCase().includes(query) ?? false
        const summaryMatch =
          post.summary?.toLowerCase().includes(query) ?? false
        const bodyMatch = post.body?.raw?.toLowerCase().includes(query) ?? false

        // Safe tags checking with type validation
        const tagsMatch =
          Array.isArray(post.tags) &&
          post.tags.some(
            (tag) =>
              typeof tag === 'string' && tag.toLowerCase().includes(query),
          )

        return titleMatch || summaryMatch || tagsMatch || bodyMatch
      })
    : posts

  return (
    <div
      className={`flex flex-wrap justify-center gap-8 lg:max-w-full lg:justify-between`}
    >
      {0 < allPosts.length ? (
        allPosts.map((post) => <PrevPost key={post.slug} post={post} />)
      ) : (
        <div className="flex h-[205px] w-full flex-col items-center justify-center gap-2">
          <ExclamationCircleIcon className="h-10 w-10" />
          <p className="text-sm font-semibold lg:text-base">
            검색어를 포함하는 게시글이 없는 것 같아요 😢
          </p>
        </div>
      )}
    </div>
  )
}
