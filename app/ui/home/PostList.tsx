'use client'

import { AdsRecentPost } from '@/app/ads/AdsRecentPost'
import { ad_per_content } from '@/app/lib/definitions'
import PrevPost from '@/app/ui/home/PrevPost'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Post } from 'contentlayer/generated'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface Props {
  posts: Post[]
}

type PostOrAd = Post | { type: 'Ad' }

export default function PostList({ posts }: Props) {
  const param = 'query'
  const searchParams = useSearchParams()

  const query = (searchParams.get(param) ?? '').trim().toLowerCase()

  const indexedPosts = useMemo(
    () =>
      posts.map((post) => ({
        post,
        searchText: [
          post.title ?? '',
          post.summary ?? '',
          Array.isArray(post.tags) ? post.tags.join(' ') : '',
          // 본문 전체 스캔은 무거워서 앞부분만 인덱싱
          post.body?.raw?.slice(0, 1800) ?? '',
        ]
          .join(' ')
          .toLowerCase(),
      })),
    [posts],
  )

  const allPosts = useMemo(() => {
    if (!query) return posts
    return indexedPosts
      .filter(({ searchText }) => searchText.includes(query))
      .map(({ post }) => post)
  }, [indexedPosts, posts, query])

  const postsWithAds = useMemo((): PostOrAd[] => {
    if (query) return allPosts
    const result: PostOrAd[] = []
    for (let i = 0; i < allPosts.length; i++) {
      if (i > 0 && i % ad_per_content === 0) {
        result.push({ type: 'Ad' })
      }
      result.push(allPosts[i])
    }
    return result
  }, [allPosts, query])

  return (
    <div
      className={`flex flex-wrap justify-center gap-8 lg:max-w-full lg:justify-between`}
    >
      {0 < postsWithAds.length ? (
        postsWithAds.map((item, index) =>
          'type' in item && item.type === 'Ad' ? (
            <AdsRecentPost key={`ad-${index}`} />
          ) : (
            <PrevPost key={(item as Post).slug} post={item as Post} />
          ),
        )
      ) : (
        <div className="flex h-[205px] w-full flex-col items-center justify-center gap-2">
          <ExclamationCircleIcon className="h-10 w-10" />
          <p className="text-sm font-semibold lg:text-base">
            검색어를 포함하는 게시글이 없는 것 같아요 😢
          </p>
        </div>
      )}
    </div>
  )
}
