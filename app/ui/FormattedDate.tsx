'use client'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'

interface Props {
  date: string
  formatStr?: string
}

export default function FormattedDate({
  date,
  formatStr = 'yyyy-MM-dd',
}: Props) {
  const [str, setStr] = useState<string | null>(null)

  useEffect(() => {
    setStr(format(new Date(date), formatStr))
  }, [date, formatStr])

  return <time dateTime={date}>{str}</time>
}
