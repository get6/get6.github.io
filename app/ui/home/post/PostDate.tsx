import { readingTime } from '@/app/lib/utils'
import FormattedDate from '@/app/ui/FormattedDate'
import { IsoDateTimeString } from 'contentlayer/core'

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
      <FormattedDate date={date} formatStr="MMM d" />
      &nbsp;・&nbsp;{readingTime(body)} min
    </span>
  )
}
