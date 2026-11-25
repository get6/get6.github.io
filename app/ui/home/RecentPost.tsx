import { tagFilterHref } from '@/app/lib/tag-path'
import type { PostListItem } from '@/app/lib/content'
import TagLink from '@/app/ui/TagLink'
import Title from '@/app/ui/Title'
import Tooltip from '@/app/ui/Tooltip'
import PostDate from '@/app/ui/home/post/PostDate'
import Image from 'next/image'
import Link from 'next/link'

export default function RecentPost({
  post,
  locale = 'ko',
}: {
  post: PostListItem
  locale?: string
}) {
  const { url, date, title, tags, cover_image, summary, readingMinutes } = post
  const normalizedSummary = summary.replace(/\s+/g, ' ').trim()

  return (
    <article className="card-hover relative h-[517px] w-full border border-black bg-white hover:cursor-pointer dark:border-white dark:bg-gray-900 lg:h-[545px] lg:w-[343px]">
      <div className="relative h-[343px] w-full border-b border-black dark:border-white">
        <Image
          className="object-cover object-top"
          src={cover_image}
          alt={`${title} 커버 이미지`}
          fill
          sizes="(min-width: 1024px) 343px, (max-width: 1024px) 100vw"
        />
      </div>
      <div className="flex h-[174px] flex-col justify-center gap-4 px-6 lg:h-[202px]">
        <Link
          href={url}
          className="flex flex-col gap-2 after:absolute after:inset-0 lg:max-w-[306px]"
        >
          <div className="flex">
            <span className="group relative flex items-center">
              <Tooltip date={date} />
              <PostDate post={post} readingMinutes={readingMinutes} />
            </span>
          </div>
          <Title>{title}</Title>
          <div className="line-clamp-2 min-h-12 w-full min-w-0 overflow-hidden text-ellipsis text-sm leading-6 font-normal dark:text-white">
            {normalizedSummary}
          </div>
        </Link>
        <div className="relative z-10 flex gap-2 overflow-x-hidden">
          {tags.map((tag) => (
            <TagLink key={tag} name={tag} href={tagFilterHref(tag, locale)} />
          ))}
        </div>
      </div>
    </article>
  )
}
