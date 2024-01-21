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
      className={`text-xs dark:text-white ${
        isDetail ? 'font-light lg:text-sm' : 'font-normal'
      }`}
    >
      {format(new Date(date), 'MMM d')}&nbsp;・&nbsp;{readingTime(body)} min
    </span>
  )
}
