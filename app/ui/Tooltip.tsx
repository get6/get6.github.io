import FormattedDate from '@/app/ui/FormattedDate'
import { IsoDateTimeString } from 'contentlayer2/core'

interface Props {
  date: IsoDateTimeString
}

export default function Tooltip({ date }: Props) {
  return (
    <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] hidden w-auto -translate-x-[50%] group-hover:block">
      <div className="bottom-full right-0 whitespace-nowrap rounded bg-black px-4 py-1 text-xs text-white">
        <FormattedDate date={date} formatStr="yyyy-MM-dd HH:mm:ss" />
        <svg
          className="absolute left-0 top-full h-2 w-full text-black"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  )
}
