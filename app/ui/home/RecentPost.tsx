import Tag from '@/app/ui/Tag'

interface Tag {
  text: string
}

interface Props {
  title: string
  date: Date
  desc: string
  tag: Tag[]
}

export default function RecentPost() {
  return (
    <div className="h-[517px] w-[343px] border border-black">
      <div className="h-[343px]"></div>
      {/* <img src="/images/1.png" className="h-[343px] w-full" /> */}
      <div className="inline-flex h-[174px] w-full flex-col items-start justify-start gap-4 border-t border-black px-6 py-2">
        <div className="flex h-[88px] flex-col items-start justify-start gap-2 self-stretch">
          <div className="text-xs font-normal">Mar 23 ・ 2 min</div>
          <div className="text-2xl font-bold">Title here</div>
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
