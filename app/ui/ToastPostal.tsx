'use client'

import Toast from '@/app/ui/Toast'
import { ShareIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { createPortal } from 'react-dom'

export default function ToastPostal() {
  const [showToast, setShowToast] = useState(false)
  return (
    <>
      <ShareIcon
        className="h-6 w-6 hover:cursor-pointer"
        onClick={async () => {
          await navigator.clipboard.writeText(window.location.href)
          setShowToast(true)
          setTimeout(() => setShowToast(false), 2000)
        }}
      />

      {showToast &&
        createPortal(
          <Toast onClose={() => setShowToast(false)} />,
          document.body,
        )}
    </>
  )
}
