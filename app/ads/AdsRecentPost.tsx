'use client'
import { useEffect, useState } from 'react'

export const AdsRecentPost = () => {
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
    <div className="flex h-[140px] w-full items-center justify-center overflow-hidden border border-black bg-white dark:border-white dark:bg-gray-900 lg:h-[205px] lg:w-[520px]">
      {mounted && (
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
          }}
          data-ad-format="fluid"
          data-ad-layout-key="+37+pa+33+c+60"
          data-ad-client="ca-pub-1411731962767238"
          data-ad-slot="7771446987"
        ></ins>
      )}
    </div>
  )
}
