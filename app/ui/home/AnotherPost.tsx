'use client'

import { Post } from '@/.contentlayer/generated'
import PostDate from '@/app/ui/home/post/PostDate'
import Title from '@/app/ui/Title'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function AnotherPost({ post }: Props) {
  const { title, date, body } = post
  const { push } = useRouter()

  return (
    <div
      className="hover h-[234px] w-[282px] border border-black hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="h-[162px]">{/* 이미지 자리 */}</div>
      <div className="inline-flex w-full flex-col items-start justify-start gap-4 border-t border-black px-6 py-2">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
        </div>
      </div>
    </div>
  )
}
