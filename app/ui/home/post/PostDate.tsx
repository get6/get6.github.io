interface Props {
  date: Date | string
  readingTime: number
  isPost?: boolean
}

// TODO Date to String 계산하기
export default function PostDate({ date, readingTime, isPost = false }: Props) {
  return (
    <span
      className={`${isPost ? 'text-sm font-light' : 'text-xs font-normal'}`}
    >
      {date.toString()} ・ {readingTime} min
    </span>
  )
}
