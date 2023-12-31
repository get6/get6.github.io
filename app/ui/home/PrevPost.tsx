'use client'

import { Post } from '@/.contentlayer/generated'
import Badge from '@/app/ui/Badge'

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
      className="flex h-[205px] w-[520px] border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-black"
      onClick={() => push(post.url)}
    >
      <div className="flex min-w-[164px] border-r border-black dark:border-white">
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
      <div className="flex flex-col justify-center gap-4 overflow-auto px-6">
        <div className="flex flex-col gap-2">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
          <div className="truncate font-normal dark:text-white">
            {body.raw.slice(0, 50)}
          </div>
        </div>
        <div className="flex gap-2 py-2">
          {tags.map((tag, index) => (
            <Badge key={index} name={tag} onClick={handleTagClick(tag)} />
          ))}
        </div>
      </div>
    </div>
  )
}
