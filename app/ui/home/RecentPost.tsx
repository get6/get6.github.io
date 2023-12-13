'use client'

import { Post } from '@/.contentlayer/generated'
import Tag from '@/app/ui/Tag'
import Title from '@/app/ui/Title'
import Tooltip from '@/app/ui/Tooltip'
import PostDate from '@/app/ui/home/post/PostDate'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function RecentPost({ post }: Props) {
  const { date, title, body, tags } = post
  const { push } = useRouter()

  return (
    <div
      className="h-[517px] w-[343px] border border-black hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="h-[343px]">
        {/* 이미지 자리 */}
        {/* <img src="/images/1.png" className="h-[343px] w-full" /> */}
      </div>
      <div className="inline-flex h-[174px] w-full flex-col items-start justify-center gap-4 border-t border-black px-6">
        <div className="flex h-[88px] flex-col items-start justify-start gap-2 self-stretch">
          <span className="group relative flex">
            <Tooltip date={date} />
            <PostDate date={date} body={body.raw} />
          </span>
          <Title>{title}</Title>
          <div className="self-stretch truncate text-base font-normal">
            {body.raw}
          </div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 self-stretch">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
