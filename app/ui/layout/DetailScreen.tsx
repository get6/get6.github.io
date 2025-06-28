interface Props {
  children: React.ReactNode
}

export default function DetailScreen({ children }: Props) {
  return (
    <main className="m-4 flex place-items-center gap-4 lg:m-0 lg:my-16">
      <div className="flex min-w-0 flex-col items-center gap-4 overflow-hidden border border-black p-4 dark:border-white md:p-6 lg:w-[840px]">
        {children}
      </div>
    </main>
  )
}
