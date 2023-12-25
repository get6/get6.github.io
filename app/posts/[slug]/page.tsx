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
  // const MDXContent = useMDXComponent(post.body.code)

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
          {/* <MDXContent /> */}
          <Line />
        </div>
        <PostTags tags={tags} />
      </div>
      {0 < otherPosts.length && (
        <div className="flex justify-center">
          <div className="flex max-w-max flex-col gap-4">
            <span className="font-extralight">Other posts</span>
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
