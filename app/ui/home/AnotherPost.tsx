import PostDate from '@/app/ui/home/post/PostDate'
import Title from '@/app/ui/Title'

export default function AnotherPost() {
  return (
    <div className="h-[234px] w-[282px] border border-black">
      <div className="h-[162px]">{/* 이미지 자리 */}</div>
      {/* <img src="/images/1.png" className="h-[343px] w-full" /> */}
      <div className="inline-flex w-full flex-col items-start justify-start gap-4 border-t border-black px-6 py-2">
        <div className="flex flex-col items-start justify-start gap-2 self-stretch">
          <PostDate date={'Mar 23'} body={'adasdasd'} />
          <Title>Title here</Title>
        </div>
      </div>
    </div>
  )
}
