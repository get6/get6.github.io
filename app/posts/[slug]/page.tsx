import { sliceDesc } from '@/app/lib/utils'
import Article from '@/app/ui/Article'
import GithubComment from '@/app/ui/GithubComment'
import Line from '@/app/ui/Line'
import ToastPostal from '@/app/ui/ToastPostal'
import Toc from '@/app/ui/Toc'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTags from '@/app/ui/home/post/PostTags'
import AsideHelper from '@/app/ui/layout/AsideHelper'
import DetailScreen from '@/app/ui/layout/DetailScreen'
import { allPosts } from 'contentlayer/generated'
import { Metadata } from 'next'

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({
  params,
}: {
  params: { slug: string }
}): Metadata => {
  const slug = decodeURIComponent(params.slug)
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  return {
    title: post.title,
    description: sliceDesc(post.summary, 160),
    openGraph: {
      images: [post.cover_image],
    },
  }
}

export default function Post({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug)
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) throw new Error(`Post not found for slug: ${slug}`)

  const otherPosts = allPosts
    .filter((other) => other.url !== slug && other.date < post.date)
    .slice(0, 3)

  const { date, title, body, tags, toc } = post

  return (
    <>
      <div
        className={`flex justify-center ${toc ? 'xl:justify-between' : 'xl:justify-center'}`}
      >
        {toc && <AsideHelper headers={toc} />}
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
            {/* TODO Mobile이면 toc가 여기에 나타나기 */}
            <Article html={body.html} />
            <Line className="prose" />
          </div>
          <PostTags tags={tags} />
          <GithubComment />
        </DetailScreen>
        {toc && <Toc headers={toc} />}
      </div>
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
