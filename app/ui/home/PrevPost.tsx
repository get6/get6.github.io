'use client'

import Badge from '@/app/ui/Badge'
import Line from '@/app/ui/Line'
import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import { Post } from 'contentlayer/generated'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PrevPost({ post }: { post: Post }) {
  const { push } = useRouter()
  const { url, date, title, body, tags, cover_image, summary } = post
  const normalizedSummary = summary.replace(/\s+/g, ' ').trim()

  const handleTagClick = (tag: string) => (e: React.MouseEvent) => {
    e.stopPropagation()
    push(`/tags/?tag=${tag}`)
  }

  return (
    <div
      className="flex aspect-square h-[120px] w-full overflow-hidden border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900 lg:h-[205px] lg:w-[520px]"
      onClick={() => push(url)}
    >
      <div className="flex min-w-[120px] border-r border-black dark:border-white lg:min-w-[164px]">
        <div className="relative w-full">
          <Image
            className="object-cover object-top"
            src={cover_image}
            alt={`${title} 커버 이미지`}
            fill
            sizes="(min-width: 1024px) 164px, (max-width: 1024px) 100vw"
          />
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col px-4 py-3 lg:px-6 lg:py-4">
        <div className="min-h-0 flex-1 overflow-hidden lg:max-w-[306px]">
          <PostDate date={date} body={body.raw} />
          <Title>{title}</Title>
          <div className="mt-1 w-full min-w-0 overflow-hidden truncate text-sm font-normal leading-6 dark:text-white lg:line-clamp-2 lg:whitespace-normal lg:text-base">
            {normalizedSummary}
          </div>
        </div>
        <div className="my-1 lg:my-2">
          <Line />
        </div>
        <div className="shrink-0">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tags.map((tag) => (
              <Badge key={tag} name={tag} onClick={handleTagClick(tag)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
