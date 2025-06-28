interface SkeletonProps {
  className?: string
  count?: number
  width?: string
  height?: string
}

export function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-600 ${className}`}
      style={{ width, height }}
    />
  )
}

export function PostSkeleton() {
  return (
    <div className="flex aspect-square h-[120px] w-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:h-[205px] lg:w-[520px]">
      <div className="min-w-[120px] border-r border-gray-200 dark:border-gray-700 lg:min-w-[164px]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex flex-col justify-center gap-2 px-6 lg:gap-4">
        <Skeleton height="16px" width="60px" />
        <Skeleton height="20px" width="200px" />
        <Skeleton height="14px" width="150px" />
        <div className="flex gap-2">
          <Skeleton height="20px" width="50px" className="rounded-full" />
          <Skeleton height="20px" width="40px" className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function RecentPostSkeleton() {
  return (
    <div className="aspect-square h-[517px] w-full border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 lg:w-[343px]">
      <Skeleton className="h-[343px] w-full border-b border-gray-200 dark:border-gray-700" />
      <div className="flex h-[174px] flex-col justify-center gap-4 px-6">
        <Skeleton height="14px" width="80px" />
        <Skeleton height="24px" width="250px" />
        <Skeleton height="16px" width="200px" />
        <div className="flex gap-2">
          <Skeleton height="20px" width="50px" className="rounded-full" />
          <Skeleton height="20px" width="40px" className="rounded-full" />
          <Skeleton height="20px" width="45px" className="rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function BookSkeleton() {
  return (
    <div className="flex items-center gap-2 px-6 py-4">
      <Skeleton height="24px" width="16px" />
      <Skeleton height="16px" width="200px" />
    </div>
  )
}
