import { Post } from '@/app/lib/definitions'
import Line from '@/app/ui/Line'
import Tag from '@/app/ui/Tag'
import AnotherPost from '@/app/ui/home/AnotherPost'
import PostDate from '@/app/ui/home/post/PostDate'
import { ShareIcon } from '@heroicons/react/24/outline'

export default function Post({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-20">
      <div className="flex h-screen w-[1240px] flex-col items-center gap-4 border border-black p-16">
        <div className="flex w-full justify-center text-5xl">asdasdas</div>
        <div className="flex w-full justify-between">
          <PostDate date={'Mar 23'} readingTime={2} isPost />
          <ShareIcon className="h-6 w-6 hover:cursor-pointer" />
        </div>
        <div className="w-full">
          <Line />
        </div>
        <article className="prose h-full w-full max-w-none break-all">
          slug text here
        </article>
        <div className="w-full">
          <Line />
        </div>
        <div className="flex w-full justify-end gap-2">
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex max-w-max flex-col gap-4">
          <div className="flex flex-none grow-0 justify-between">
            <span className="font-extralight">Other posts</span>
            <span className="font-extralight hover:cursor-pointer">
              See all posts in Life&apos;s tag
            </span>
          </div>
          <div className="flex flex-none grow-0 justify-center gap-4">
            <AnotherPost />
            <AnotherPost />
            <AnotherPost />
          </div>
        </div>
      </div>
    </main>
  )
}

export async function generateStaticParams() {
  // const posts: Post[] = await fetch('https://.../posts').then((res) =>
  //   res.json(),
  // )
  const posts: Post[] = []

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
