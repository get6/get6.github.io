'use client'
import { useEffect, useState } from 'react'

export const AdsInBooks = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && process.env.NODE_ENV === 'production') {
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
    ></ins>
  )
}
