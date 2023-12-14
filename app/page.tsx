import { allPosts } from '@/.contentlayer/generated'
import PostList from '@/app/ui/home/PostList'
import PageTitle from '@/app/ui/home/PageTitle'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { compareDesc } from 'date-fns'

export default function Home() {
  const postsOrderByDesc = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  const recentPosts = postsOrderByDesc.slice(0, 2)
  const posts = postsOrderByDesc.slice(3)

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-4">
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
        <div className="flex justify-between">
          <PageTitle>All Posts</PageTitle>
          <SearchBar />
        </div>
        <PostList posts={posts} />
      </div>
    </PageScreen>
  )
}
