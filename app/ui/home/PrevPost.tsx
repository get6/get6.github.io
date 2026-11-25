import { postSearchText } from '@/app/lib/post-list-item'
import { tagFilterHref } from '@/app/lib/tag-path'
import type { PostListItem } from '@/app/lib/content'
import Line from '@/app/ui/Line'
import TagLink from '@/app/ui/TagLink'
import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import Link from 'next/link'

export default function PrevPost({
  post,
  locale = 'ko',
}: {
  post: PostListItem
  locale?: string
}) {
  const { url, title, tags, cover_image, summary, readingMinutes } = post
  const normalizedSummary = summary.replace(/\s+/g, ' ').trim()

  return (
    <article
      data-post-card
      data-search={postSearchText(post)}
      className="card-hover relative flex h-[140px] w-full overflow-hidden border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900 lg:h-[205px] lg:w-[520px]"
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
      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 py-3 lg:px-6 lg:py-4">
        <Link
          href={url}
          className="min-h-0 min-w-0 flex-1 overflow-hidden after:absolute after:inset-0 lg:max-w-[306px]"
        >
          <PostDate post={post} readingMinutes={readingMinutes} />
          <Title>{title}</Title>
          <div className="mt-1 line-clamp-1 w-full min-w-0 overflow-hidden text-sm leading-6 font-normal dark:text-white lg:line-clamp-2 lg:text-base">
            {normalizedSummary}
          </div>
        </Link>
        <div className="my-1 lg:my-2">
          <Line />
        </div>
        <div className="relative z-10 shrink-0">
          <div className="flex gap-2 overflow-x-hidden">
            {tags.map((tag) => (
              <TagLink key={tag} name={tag} href={tagFilterHref(tag, locale)} />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
