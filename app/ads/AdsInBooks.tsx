'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  adKey?: string
}

export const AdsInBooks = ({ adKey }: Props) => {
  const [mounted, setMounted] = useState(false)
  const pushed = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !pushed.current && process.env.NODE_ENV === 'production') {
      pushed.current = true
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <ins
      className="adsbygoogle"
      style={{
        display: 'block',
      }}
      data-ad-client="ca-pub-1411731962767238"
      data-ad-slot="2705917050"
      data-ad-format="auto"
      data-full-width-responsive="true"
      key={adKey}
    ></ins>
  )
}
