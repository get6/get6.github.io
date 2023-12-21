import { allPosts } from '@/.contentlayer/generated'
import Line from '@/app/ui/Line'
import ToastPostal from '@/app/ui/ToastPostal'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTags from '@/app/ui/home/post/PostTags'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }))

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `posts/${params.slug}`,
  )
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)
  return { title: post.title }
}

export default function Post({ params }: { params: { slug: string } }) {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `posts/${params.slug}`,
  )
  if (!post) throw new Error(`Post not found for slug: ${params.slug}`)

  const otherPosts = allPosts
    .filter(
      (other) =>
        other._raw.flattenedPath !== `posts/${params.slug}` &&
        other.date < post.date,
    )
    .slice(0, 3)

  console.log(post)

  const { date, title, body, tags } = post

  return (
    <main className="flex min-h-screen flex-col place-content-start place-items-center gap-4 p-20">
      <div className="flex h-full w-[1240px] flex-col items-center gap-4 border border-black p-16">
        <div className="flex w-full justify-center text-5xl">{title}</div>
        <div className="flex w-full justify-between">
          <PostDate date={date} body={body.raw} isDetail />
          <ToastPostal />
        </div>
        <div className="flex w-full flex-col gap-8">
          <Line />
          <article
            className="prose h-full w-full max-w-none break-all [&>*:last-child]:mb-0 [&>*]:mb-3"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
          <Line />
        </div>
        <PostTags tags={tags} />
      </div>
      {0 < otherPosts.length && (
        <div className="flex justify-center">
          <div className="flex max-w-max flex-col gap-4">
            <div className="flex flex-none grow-0 justify-between">
              <span className="font-extralight">Other posts</span>
              <span className="font-extralight hover:cursor-pointer">
                See all posts in Life&apos;s tag
              </span>
            </div>
            <div className="flex flex-none grow-0 justify-center gap-4">
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
