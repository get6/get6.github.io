import { ShareIcon } from '@heroicons/react/20/solid'

interface Props {
  onClose: () => void
  message?: string
}

export default function Toast({
  onClose,
  message = '링크가 복사됐어요! 👍',
}: Props) {
  return (
    <div
      id="share-toast"
      className="fixed bottom-6 left-1/2 z-50 flex w-auto max-w-[90vw] -translate-x-1/2 items-center space-x-3 divide-x divide-gray-200 rounded-xl border border-gray-200 bg-white px-3 py-2 text-gray-600 shadow-lg hover:cursor-pointer dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 rtl:space-x-reverse rtl:divide-x-reverse"
      role="alert"
      onClick={onClose}
    >
      <ShareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />
      <div className="pe-1 ps-3 text-sm font-normal">{message}</div>
    </div>
  )
}
