import { ShareIcon } from '@heroicons/react/20/solid'

interface Props {
  onClose: () => void
}

export default function Toast({ onClose }: Props) {
  return (
    <div
      id="share-toast"
      className="space-x fixed right-5 top-5 flex w-full max-w-fit items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow hover:cursor-pointer rtl:space-x-reverse rtl:divide-x-reverse dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
      role="alert"
      onClick={onClose}
    >
      <ShareIcon className="h-5 w-5 text-blue-600 dark:text-blue-500" />
      <div className="pe-2 ps-4 text-sm font-normal">링크가 복사됐어요! 👍</div>
      {/* <div className="animation-toast-progress absolute bottom-0 right-0 h-1 w-full rounded-lg bg-blue-600" /> */}
    </div>
  )
}
