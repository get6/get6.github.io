'use client'

import {
  getLocaleFromPathname,
  getClientDictionary,
} from '@/app/i18n/client-dictionary'
import Toast from '@/app/ui/Toast'
import { ShareIcon } from '@heroicons/react/24/outline'
import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ToastPostal() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [copiedFlash, setCopiedFlash] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const dictionary = getClientDictionary(locale)

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
      if (isDesktop && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        showToast(dictionary.common.linkCopied, true)
        return
      }

      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url,
        })
        showToast(dictionary.common.shareOpened)
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        showToast(dictionary.common.linkCopied, true)
        return
      }

      showToast(dictionary.common.copyNotSupported)
    } catch {
      showToast(dictionary.common.shareFailed)
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={dictionary.common.share}
        title={dictionary.common.share}
        onClick={handleShare}
        className={`p-1 transition-all duration-200 hover:scale-110 active:scale-95 ${
          copiedFlash
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-black dark:text-white'
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
