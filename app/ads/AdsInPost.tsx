'use client'
import { useEffect, useState } from 'react'

export const AdsInPost = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && process.env.NODE_ENV === 'production') {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    }
  }, [mounted])

  return (
    <div className="max-w-prose px-6 lg:px-0 has-[[data-ad-status='unfilled']]:hidden">
      {mounted && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
          }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client="ca-pub-1411731962767238"
          data-ad-slot="6140930882"
        ></ins>
      )}
    </div>
  )
}
