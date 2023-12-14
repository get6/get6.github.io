'use client'

import { Post } from '@/.contentlayer/generated'
import PrevPost from '@/app/ui/home/PrevPost'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useSearchParams } from 'next/navigation'

interface Props {
  posts: Post[]
}

export default function PostList({ posts }: Props) {
  const param = 'query'
  const searchParams = useSearchParams()

  const allPosts = searchParams.has(param)
    ? posts.filter((post) =>
        post.title.includes(searchParams.get(param)!.toString()),
      )
    : posts

  return (
    <div className="flex flex-wrap justify-between gap-8">
      {0 < allPosts.length ? (
        allPosts.map((post, index) => <PrevPost key={index} post={post} />)
      ) : (
        <div className="flex h-[205px] w-full flex-col items-center justify-center gap-2">
          <ExclamationCircleIcon className="h-10 w-10" />
          <p className="font-semibold">
            검색어를 포함하는 게시글이 없는 것 같아요 😢
          </p>
        </div>
      )}
    </div>
  )
}
