'use client'

import Badge from '@/app/ui/Badge'
import TagsFallBack from '@/app/ui/TagsFallback'
import Title from '@/app/ui/Title'
import Tooltip from '@/app/ui/Tooltip'
import PostDate from '@/app/ui/home/post/PostDate'
import { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Suspense } from 'react'

export default function RecentPost({ post }: { post: Post }) {
  const { url, date, title, body, tags, cover_image, summary } = post
  const normalizedSummary = summary.replace(/\s+/g, ' ').trim()
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
          alt={`${title} 커버 이미지`}
          fill
          sizes="(min-width: 1024px) 343px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex h-[174px] flex-col justify-center gap-4 px-6">
        <div className="flex flex-col gap-2 lg:max-w-[306px]">
          <div className="flex">
            <span className="group relative flex items-center">
              <Tooltip date={date} />
              <PostDate date={date} body={body.raw} />
            </span>
          </div>
          <Title>{title}</Title>
          <div className="min-h-12 w-full min-w-0 overflow-hidden text-ellipsis line-clamp-2 text-sm font-normal leading-6 dark:text-white">
            {normalizedSummary}
          </div>
        </div>
        <div className="flex gap-2 overflow-x-hidden">
          <Suspense fallback={<TagsFallBack tags={tags} />}>
            {tags.map((tag) => (
              <Badge key={tag} name={tag} onClick={handleTagClick(tag)} />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
