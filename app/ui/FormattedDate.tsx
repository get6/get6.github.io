import { format } from 'date-fns'

interface Props {
  date: string
  formatStr?: string
}

export default function FormattedDate({
  date,
  formatStr = 'yyyy-MM-dd',
}: Props) {
  return <time dateTime={date}>{format(new Date(date), formatStr)}</time>
}
