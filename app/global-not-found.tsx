import NotFoundScreen from '@/app/ui/NotFoundScreen'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없어요',
  robots: { index: false, follow: false },
}

export default function GlobalNotFound() {
  return (
    <html lang="ko">
      <body className="bg-slate-50 dark:bg-gray-900">
        <ThemeProvider attribute="class">
          <NotFoundScreen />
        </ThemeProvider>
      </body>
    </html>
  )
}
