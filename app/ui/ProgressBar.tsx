export default function ProgressBar() {
  return (
    <div className="absolute w-full">
      <div className="h-1 overflow-hidden bg-blue-100 dark:bg-blue-950">
        <div className="animate-progress origin-left-right h-full bg-blue-500 dark:bg-blue-600" />
      </div>
    </div>
  )
}
