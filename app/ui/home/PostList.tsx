'use client'

import PrevPost from '@/app/ui/home/PrevPost'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Post } from 'contentlayer/generated'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  const param = 'query'
  const searchParams = useSearchParams()

  const query = (searchParams.get(param) ?? '').trim().toLowerCase()

  const indexedPosts = useMemo(
    () =>
      posts.map((post) => ({
        post,
        searchText: [
          post.title ?? '',
          post.summary ?? '',
          Array.isArray(post.tags) ? post.tags.join(' ') : '',
          // 본문 전체 스캔은 무거워서 앞부분만 인덱싱
          post.body?.raw?.slice(0, 1800) ?? '',
        ]
          .join(' ')
          .toLowerCase(),
      })),
    [posts],
  )

  const allPosts = useMemo(() => {
    if (!query) return posts
    return indexedPosts
      .filter(({ searchText }) => searchText.includes(query))
      .map(({ post }) => post)
  }, [indexedPosts, posts, query])

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
