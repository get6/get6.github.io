'use client'

import { differenceInCalendarDays } from 'date-fns'
import { useEffect, useState } from 'react'

interface Props {
  startReadDate: Date
}

export default function DaysOfReading({ startReadDate }: Props) {
  const [clientDate, setClientDate] = useState<Date | null>(null)

  useEffect(() => {
    const currentDate = new Date()
    setClientDate(currentDate)
  }, [])

  return (
    clientDate && (
      <span className="font-semibold text-red-500">
        +{differenceInCalendarDays(clientDate, startReadDate)}일째
      </span>
    )
  )
}
