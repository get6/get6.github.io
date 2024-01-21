'use client'

import { Post } from '@/.contentlayer/generated'
import Badge from '@/app/ui/Badge'
import Line from '@/app/ui/Line'

import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  post: Post
}

export default function PrevPost({ post }: Props) {
  const { cover_image, date, title, body, tags } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="flex h-[120px] w-[344px] border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900 lg:h-[205px] lg:w-[520px]"
      onClick={() => push(post.url)}
    >
      <div className="flex min-w-[120px] border-r border-black dark:border-white lg:min-w-[164px]">
        <div className="relative w-full">
          <Image
            className="object-cover object-top"
            src={cover_image}
            alt="cover_image"
            priority
            fill
            sizes="(min-width: 1024px) 164px, (max-width: 1024px) 100vw"
          />
        </div>
      </div>
      <div className="flex flex-col justify-center overflow-auto px-6 lg:gap-4">
        <div className="flex flex-col justify-between lg:gap-2">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
          <div className="truncate text-sm font-normal dark:text-white lg:text-base">
            {body.raw.slice(0, 50)}
          </div>
        </div>
        <div className="py-2 lg:py-0">
          <Line />
        </div>
        <div className="flex gap-2">
          {tags.map((tag, index) => (
            <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}
