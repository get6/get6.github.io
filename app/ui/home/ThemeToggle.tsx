import { ThemeState } from '@/app/lib/definitions'
import { SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

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
