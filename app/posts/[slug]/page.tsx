import { allPosts } from '@/.contentlayer/generated'
import Line from '@/app/ui/Line'
import ToastPostal from '@/app/ui/ToastPostal'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTags from '@/app/ui/home/post/PostTags'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const slug = decodeURIComponent(params.slug)
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) throw new Error(`Post not found for slug: ${slug}`)
  return { title: post.title }
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
    <main className="flex min-h-screen flex-col place-content-start place-items-center gap-4 p-4 lg:p-20">
      <div className="flex h-full flex-col items-center gap-4 border border-black p-8 dark:border-white lg:w-[878px] lg:p-10">
        <h1 className="flex w-full justify-center text-2xl lg:text-4xl">
          {title}
        </h1>
        <div className="prose flex w-full items-center justify-between">
          <PostDate date={date} body={body.raw} isDetail />
          <ToastPostal />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <Line className="prose" />
          <article
            className="prose dark:prose-invert prose-img:mx-auto lg:pb-4"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
          <Line className="prose" />
        </div>
        <PostTags tags={tags} />
      </div>
      {0 < otherPosts.length && (
        <div className="flex w-full justify-center lg:w-fit">
          <div className="flex w-full flex-col justify-center gap-4">
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
    </main>
  )
}
