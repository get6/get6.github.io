import { BASE_URL, blog_description, blog_title } from '@/app/lib/definitions'
import PageTitle from '@/app/ui/home/PageTitle'
import PostList from '@/app/ui/home/PostList'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { PostSkeleton, RecentPostSkeleton, Skeleton } from '@/app/ui/Skeleton'
import { WebsiteStructuredData } from '@/app/ui/StructuredData'
import { allPosts } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'
import { Suspense } from 'react'

function PostListFallback() {
  return (
    <div className="flex flex-wrap justify-center gap-8 lg:max-w-full lg:justify-between">
      {Array.from({ length: 4 }, (_, index) => (
        <PostSkeleton key={`post-skeleton-${index}`} />
      ))}
    </div>
  )
}

function RecentPostsFallback() {
  return (
    <div className="flex flex-wrap justify-center gap-4 lg:max-w-full lg:flex-nowrap lg:justify-between">
      {Array.from({ length: 3 }, (_, index) => (
        <RecentPostSkeleton key={`recent-post-skeleton-${index}`} />
      ))}
    </div>
  )
}

function SearchBarFallback() {
  return <Skeleton height="48px" width="320px" className="rounded-md" />
}

export default function Home() {
  const postsOrderByDesc = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  const recentPosts = postsOrderByDesc.slice(0, 3)
  const posts = postsOrderByDesc.slice(3)

  return (
    <PageScreen>
      <WebsiteStructuredData
        name={blog_title}
        description={blog_description}
        url={BASE_URL}
      />
      <div className="flex w-full flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-4">
          <PageTitle>Recent Posts</PageTitle>
          <Suspense fallback={<RecentPostsFallback />}>
            <div
              className={`flex flex-wrap justify-center gap-4 lg:max-w-full lg:flex-nowrap lg:justify-between`}
            >
              {recentPosts.map((post) => (
                <RecentPost key={post.slug} post={post} />
              ))}
            </div>
          </Suspense>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <PageTitle>All Posts</PageTitle>
            <Suspense fallback={<SearchBarFallback />}>
              <SearchBar />
            </Suspense>
          </div>
          <Suspense fallback={<PostListFallback />}>
            <PostList posts={posts} />
          </Suspense>
        </div>
      </div>
    </PageScreen>
  )
}
