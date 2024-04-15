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
  const { url, cover_image, date, title, body, tags, summary } = post
  const { push } = useRouter()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="aspect-square h-[517px] w-full border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900 lg:w-[343px]"
      onClick={() => push(url)}
    >
      <div className="relative h-[343px] w-full border-b border-black dark:border-white">
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
        <div className="flex flex-col gap-2">
          <div className="flex">
            <span className="group relative flex items-center">
              <Tooltip date={date} />
              <PostDate date={date} body={body.raw} />
            </span>
          </div>
          <Title>{title}</Title>
          <div className="truncate font-normal dark:text-white">{summary}</div>
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
