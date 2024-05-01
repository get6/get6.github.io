import { allPosts } from '@/.contentlayer/generated'
import Article from '@/app/ui/Article'
import GithubComment from '@/app/ui/GithubComment'
import Line from '@/app/ui/Line'
import ToastPostal from '@/app/ui/ToastPostal'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTags from '@/app/ui/home/post/PostTags'
import DetailScreen from '@/app/ui/layout/DetailScreen'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params.slug)
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title, description: post.summary.slice(0, 160) }
}

export default function Post({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  const otherPosts = allPosts
    .filter((other) => other.url !== slug && other.date < post.date)
    .slice(0, 3)

  const { date, title, body, tags } = post

  return (
    <>
      <DetailScreen>
        <h1 className="flex w-full justify-center text-2xl lg:w-[650px] lg:text-4xl">
          {title}
        </h1>
        <div className="prose flex w-full items-center justify-between">
          <PostDate date={date} body={body.raw} isDetail />
          <ToastPostal />
        </div>
        <div className="flex w-full flex-col items-center">
          <Line className="prose" />
          <Article html={body.html} />
          <Line className="prose" />
        </div>
        <PostTags tags={tags} />
        <GithubComment />
      </DetailScreen>
      {0 < otherPosts.length && (
        <div className="flex items-center justify-center pb-8 lg:pb-16">
          <div className="flex w-full flex-col justify-center gap-4 px-4 lg:w-fit lg:px-0">
            <span className="text-sm font-extralight lg:text-base">
              Other posts
            </span>
            <div className="flex gap-4 overflow-x-auto">
              {otherPosts.map((post, index) => (
                <AnotherPost key={index} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
