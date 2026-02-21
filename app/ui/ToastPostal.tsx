'use client'

import Toast from '@/app/ui/Toast'
import { ShareIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ToastPostal() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [copiedFlash, setCopiedFlash] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = (message: string, flash = false) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToastMessage(message)
    setCopiedFlash(flash)
    timerRef.current = setTimeout(() => {
      setToastMessage(null)
      setCopiedFlash(false)
    }, 2000)
  }

  const handleShare = async () => {
    const url = window.location.href
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches

    try {
      // 데스크탑은 항상 복사 우선
      if (isDesktop && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        showToast('링크가 복사됐어요! ✅', true)
        return
      }

      // 모바일은 공유 시트 우선
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url,
        })
        showToast('공유 창을 열었어요 📤')
        return
      }

      // fallback: 링크 복사
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        showToast('링크가 복사됐어요! ✅', true)
        return
      }

      showToast('이 브라우저에서는 자동 복사가 어려워요 😢')
    } catch {
      showToast('공유가 취소되었거나 실패했어요 🙏')
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label="링크 공유 또는 복사"
        title="링크 공유/복사"
        onClick={handleShare}
        className={`p-1 transition-all duration-200 hover:scale-110 active:scale-95 ${
          copiedFlash ? 'text-blue-600 dark:text-blue-400' : 'text-inherit'
        }`}
      >
        <ShareIcon className="h-6 w-6" />
      </button>

      {toastMessage &&
        createPortal(
          <Toast
            onClose={() => setToastMessage(null)}
            message={toastMessage}
          />,
          document.body,
        )}
    </>
  )
}
