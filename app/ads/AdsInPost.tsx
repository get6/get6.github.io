'use client'
import { useEffect } from 'react'

export const AdsInPost = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [])

  return (
    <ins
      className="adsbygoogle max-w-prose"
      style={{
        display: 'block',
        textAlign: 'center',
      }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-1411731962767238"
      data-ad-slot="6140930882"
    ></ins>
  )
}
