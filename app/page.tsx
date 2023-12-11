import { allPosts } from '@/.contentlayer/generated'
import ListPost from '@/app/ui/home/ListPost'
import PostTitle from '@/app/ui/home/PostTitle'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'
import PageScreen from '@/app/ui/layout/PageScreen'
import { compareDesc } from 'date-fns'

export default function Home() {
  const postsOrderByDesc = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  )

  // console.log(postsOrderByDesc)

  const recentPosts = postsOrderByDesc.slice(0, 3)
  const posts = postsOrderByDesc.slice(3)

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-4">
        <PostTitle>Recent Posts</PostTitle>
        <div className=" flex justify-between">
          {recentPosts.map((post, index) => (
            <RecentPost key={index} post={post} />
          ))}
          {/* {recentPosts.map((post, index) => (
            <RecentPost key={index} post={post} />
          ))}
          {recentPosts.map((post, index) => (
            <RecentPost key={index} post={post} />
          ))} */}
        </div>
        <div className="flex justify-between">
          <PostTitle>All Posts</PostTitle>
          <SearchBar />
        </div>
        {/* <div className="grid grid-cols-2 place-items-stretch space-y-4"> */}
        <div className="flex flex-wrap justify-between gap-8">
          <ListPost />
          <ListPost />
          <ListPost />
          <ListPost />
          <ListPost />
          {/* {posts.map((post, index) => (
            <ListPost key={index} post={post} />
          ))} */}
        </div>
      </div>
    </PageScreen>
  )
}
