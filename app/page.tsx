import { allPosts } from '@/.contentlayer/generated'
import PostList from '@/app/ui/home/PostList'
import PostTitle from '@/app/ui/home/PostTitle'
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
        <PostTitle>Recent Posts</PostTitle>
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
          <PostTitle>All Posts</PostTitle>
          <SearchBar />
        </div>
        <PostList posts={posts} />
      </div>
    </PageScreen>
  )
}
