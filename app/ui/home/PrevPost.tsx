'use client'

import { Post } from '@/.contentlayer/generated'
import Tag from '@/app/ui/Tag'

import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function PrevPost({ post }: Props) {
  const { date, title, body, tags } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="flex h-[205px] w-[520px] border border-black bg-white hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="h-[205px] w-[164px]">{/* 이미지 자리 */}</div>
      <div className="flex flex-col items-start justify-center gap-4 self-stretch border-l border-black px-6 py-2">
        <div className="flex w-full flex-col gap-2">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
          <div className="font-normal">{body.raw}</div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 py-2">
          {tags.map((tag, index) => (
            <Tag key={index} text={tag} onClick={handleTagClick(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}
