export default function Line({ className }: { className?: string }) {
  return (
    <hr
      className={`h-px w-full border-0 bg-black dark:bg-gray-700 ${className}`}
    />
  )
}
