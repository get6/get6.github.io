import { allPosts } from '@/.contentlayer/generated'
import PageTitle from '@/app/ui/home/PageTitle'
import PostList from '@/app/ui/home/PostList'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { compareDesc } from 'date-fns'
import { Suspense } from 'react'

function PostListFallback() {
  return (
    <div className="flex flex-wrap justify-between gap-8">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="h-[205px] w-[520px] animate-pulse rounded-md bg-gray-200"
        />
      ))}
    </div>
  )
}

function SearchBarFallback() {
  return <div className="h-12 w-80 animate-pulse rounded-md bg-gray-200" />
}

export default function Home() {
  const postsOrderByDesc = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  const recentPosts = postsOrderByDesc.slice(0, 3)
  const posts = postsOrderByDesc.slice(3)

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-8">
        <div className="flex flex-col gap-4">
          <PageTitle>Recent Posts</PageTitle>
          <div
            className={`flex ${
              recentPosts.length == 3 ? 'justify-between' : 'gap-10'
            }`}
          >
            {recentPosts.map((post, index) => (
              <RecentPost key={index} post={post} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
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
