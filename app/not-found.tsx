'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = () => {
    // replace를 사용하여 현재 페이지를 홈페이지로 대체
    // 이렇게 하면 뒤로가기 버튼을 눌러도 404 페이지로 돌아가지 않음
    router.replace('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-900 dark:text-white">
          404
        </h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          헉! 😨 페이지를 찾을 수 없어요
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요
        </p>
        <button
          onClick={handleGoHome}
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}
