import PostDate from '@/app/ui/home/post/PostDate'
import PostTitle from '@/app/ui/home/post/PostTitle'

export default function AnotherPost() {
  return (
    <div className="h-[234px] w-[282px] border border-black">
      <div className="h-[162px]">{/* 이미지 자리 */}</div>
      {/* <img src="/images/1.png" className="h-[343px] w-full" /> */}
      <div className="inline-flex w-full flex-col items-start justify-start gap-4 border-t border-black px-6 py-2">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <PostDate date={'Mar 23'} readingTime={2} />
          <PostTitle>Title here</PostTitle>
        </div>
      </div>
    </div>
  )
}
