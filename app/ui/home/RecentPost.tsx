'use client'

import { Post } from '@/.contentlayer/generated'
import Badge from '@/app/ui/Badge'
import TagsFallBack from '@/app/ui/TagsFallback'
import Title from '@/app/ui/Title'
import Tooltip from '@/app/ui/Tooltip'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface Props {
  post: Post
}

export default function RecentPost({ post }: Props) {
  const { cover_image, date, title, body, tags } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="h-[517px] w-[343px] border border-black bg-white hover:cursor-pointer"
      onClick={() => push(post.url)}
    >
      <div className="relative h-[343px] w-full border-b border-black">
        <Image
          className="object-cover object-top"
          src={cover_image}
          alt="cover_image"
          priority
          fill
          sizes="(min-width: 1024px) 343px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex h-[174px] flex-col justify-center gap-4 px-6">
        <div className="flex h-[88px] flex-col gap-2 self-stretch">
          <span className="group relative flex">
            <Tooltip date={date} />
            <PostDate date={date} body={body.raw} />
          </span>
          <Title>{title}</Title>
          <div className="truncate font-normal">{body.raw.slice(0, 50)}</div>
        </div>
        <div className="flex gap-2">
          <Suspense fallback={<TagsFallBack tags={tags} />}>
            {tags.map((tag, index) => (
              <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
