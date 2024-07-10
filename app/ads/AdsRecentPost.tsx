'use client'
import { useEffect } from 'react'

export const AdsRecentPost = () => {
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
      data-ad-format="fluid"
      data-ad-layout-key="+37+pa+33+c+60"
      data-ad-client="ca-pub-1411731962767238"
      data-ad-slot="9407374003"
    ></ins>
  )
}
