import { Post } from '@/app/lib/definitions'
import Tag from '@/app/ui/Tag'
import PostDate from '@/app/ui/home/post/PostDate'
import PostTitle from '@/app/ui/home/post/PostTitle'

interface Props {
  post: Post
}

export default function RecentPost() {
  return (
    <div className="h-[517px] w-[343px] border border-black">
      <div className="h-[343px]">{/* 이미지 자리 */}</div>
      {/* <img src="/images/1.png" className="h-[343px] w-full" /> */}
      <div className="inline-flex h-[174px] w-full flex-col items-start justify-start gap-4 border-t border-black px-6 py-2">
        <div className="flex h-[88px] flex-col items-start justify-start gap-2 self-stretch">
          <PostDate date={'Mar 23'} readingTime={2} />
          <PostTitle>Title here</PostTitle>
          <div className="self-stretch truncate text-base font-normal">
            Descriptions
          </div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 self-stretch py-2">
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
        </div>
      </div>
    </div>
  )
}
