'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'

export default function GithubComment() {
  const ref = useRef<HTMLDivElement | null>(null)
  const { resolvedTheme } = useTheme()
  const utterancesTheme = `github-${resolvedTheme}`

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'get6/get6.github.io')
    script.setAttribute('issue-term', 'title')
    script.setAttribute('lable', '✨💬✨')
    script.setAttribute('theme', utterancesTheme)

    ref.current?.appendChild(script)
  })

  return <div className="w-full" ref={ref} />
}
