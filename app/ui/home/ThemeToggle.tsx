import { ThemeState } from '@/app/lib/definitions'
import { SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const isComment = document.querySelector('iframe.utterances-frame')
    if (isComment) {
      const utterancesTheme = `github-${theme === undefined ? 'light' : theme}`
      const utterancesEl = document.querySelector(
        'iframe.utterances-frame',
      ) as HTMLIFrameElement

      utterancesEl?.contentWindow?.postMessage(
        { type: 'set-theme', theme: utterancesTheme },
        'https://utteranc.es/',
      )
    }
  })

  return (
    <SunIcon
      className="h-6 w-6 text-gray-900 hover:cursor-pointer hover:text-yellow-500 dark:text-white dark:hover:text-yellow-500"
      onClick={() =>
        setTheme(
          theme === ThemeState.Light ? ThemeState.Dark : ThemeState.Light,
        )
      }
    />
  )
}
