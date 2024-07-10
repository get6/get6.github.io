'use client'
import { useEffect } from 'react'

export const AdsInBooks = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

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
