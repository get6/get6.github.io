import Tag from '@/app/ui/Tag'

export default function Post() {
  return (
    <div className="flex h-[205px] w-[520px] items-start justify-start border border-black bg-white">
      <div className="h-[205px] w-[164px]">{/* 이미지 자리 */}</div>
      <div className="flex flex-col items-start justify-center gap-4 self-stretch border-l border-black px-6 py-2">
        <div className="flex w-full flex-col gap-2">
          <div className="text-xs font-normal">Mar 23・2 min</div>
          <div className="text-2xl font-bold">Title here</div>
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
