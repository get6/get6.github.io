'use client'

import { useTheme } from 'next-themes'

export default function GithubComment() {
  const { resolvedTheme } = useTheme()

  return (
    <section
      className="w-full"
      ref={(element) => {
        if (!element) return

        const script = document.createElement('script')
        script.src = 'https://utteranc.es/client.js'
        script.async = true
        script.crossOrigin = 'anonymous'
        script.setAttribute('repo', 'get6/get6.github.io')
        script.setAttribute('issue-term', 'title')
        script.setAttribute('lable', '✨💬✨')
        script.setAttribute('theme', `github-${resolvedTheme}`)

        element.replaceChildren(script)
      }}
    />
  )
}
