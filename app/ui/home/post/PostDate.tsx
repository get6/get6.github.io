import { readingTime } from '@/app/lib/utils'
import { IsoDateTimeString } from 'contentlayer/core'
import { format } from 'date-fns'

interface Props {
  date: IsoDateTimeString
  body: string
  isDetail?: boolean
}

export default function PostDate({ date, body, isDetail = false }: Props) {
  return (
    <span
      className={`${
        isDetail ? 'text-sm font-light' : 'text-xs font-normal'
      } dark:text-white`}
    >
      {format(new Date(date), 'MMM d')}&nbsp;・&nbsp;{readingTime(body)} min
    </span>
  )
}
