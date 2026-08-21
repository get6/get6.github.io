interface Props {
  children: React.ReactNode
}

export default function DetailScreen({ children }: Props) {
  return (
    <main className="m-4 flex max-w-full place-items-center gap-4 overflow-x-hidden lg:m-0 lg:my-16">
      <div className="flex min-w-0 flex-col items-center gap-4 overflow-hidden border border-black bg-white p-4 dark:border-white dark:bg-gray-900 md:p-6 lg:w-[840px]">
        {children}
      </div>
    </main>
  )
}
