import type { AllLocale } from '@/app/i18n/config'
import { readingTime } from '@/app/lib/utils'
import FormattedDate from '@/app/ui/FormattedDate'
import { IsoDateTimeString } from 'contentlayer2/core'

const FORMAT_BY_LOCALE: Record<AllLocale, string> = {
  ko: 'M월 d일',
  ja: 'M月d日',
  en: 'MMM d',
}

interface Props {
  date: IsoDateTimeString
  body: string
  isDetail?: boolean
  locale?: AllLocale
}

export default function PostDate({
  date,
  body,
  isDetail = false,
  locale = 'ko',
}: Props) {
  return (
    <span
      className={`text-xs dark:text-white ${
        isDetail ? 'font-light lg:text-sm' : 'font-normal'
      }`}
    >
      <FormattedDate
        date={date}
        formatStr={FORMAT_BY_LOCALE[locale]}
        locale={locale}
      />
      &nbsp;・&nbsp;{readingTime(body)} min
    </span>
  )
}
