import { AdsRecentPost } from '@/app/ads/AdsRecentPost'
import { ad_per_content } from '@/app/lib/definitions'
import type { PostListItem } from '@/app/lib/content'
import PrevPost from '@/app/ui/home/PrevPost'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

interface Props {
  posts: PostListItem[]
  locale?: string
  emptyLabel: string
}

export default function PostList({ posts, locale = 'ko', emptyLabel }: Props) {
  return (
    <div
      id="post-list"
      className="flex flex-wrap justify-center gap-8 lg:max-w-full lg:justify-between"
    >
      {posts.map((post, index) => (
        <Fragment key={post.slug}>
          {index > 0 && index % ad_per_content === 0 ? (
            <AdsRecentPost key={`ad-${post.slug}`} />
          ) : null}
          <PrevPost post={post} locale={locale} />
        </Fragment>
      ))}
      <div
        data-empty
        hidden
        className="flex h-[205px] w-full flex-col items-center justify-center gap-2"
      >
        <ExclamationCircleIcon className="h-10 w-10" />
        <p className="text-sm font-semibold lg:text-base">{emptyLabel}</p>
      </div>
    </div>
  )
}
