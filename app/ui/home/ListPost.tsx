import Tag from '@/app/ui/Tag'
import Title from '@/app/ui/Title'
import PostDate from '@/app/ui/home/post/PostDate'

export default function ListPost() {
  return (
    <div className="flex h-[205px] w-[520px] items-start justify-start border border-black bg-white">
      <div className="h-[205px] w-[164px]">{/* 이미지 자리 */}</div>
      <div className="flex flex-col items-start justify-center gap-4 self-stretch border-l border-black px-6 py-2">
        <div className="flex w-full flex-col gap-2">
          <PostDate date={'Mar 23'} body={'asdasd'} />
          <Title>Title here</Title>
          <div className="font-normal">Descriptions</div>
        </div>
        <div className="inline-flex items-start justify-start gap-2 py-2">
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
          <Tag text="tag" />
        </div>
      </div>
    </div>
  )
}
