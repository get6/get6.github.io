'use client'

import { differenceInCalendarDays } from 'date-fns'
import { useEffect, useState } from 'react'

interface Props {
  startReadDate: string
}

export default function DaysOfReading({ startReadDate }: Props) {
  const [today, setToday] = useState(new Date())

  useEffect(() => {
    setToday(new Date())
  }, [])

  return (
    <span className="font-semibold text-red-500">
      +{differenceInCalendarDays(today, startReadDate)}일째
    </span>
  )
}
