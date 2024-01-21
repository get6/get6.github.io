interface Props {
  children: React.ReactNode
}

export default function DetailScreen({ children }: Props) {
  return (
    <main className="flex min-h-screen flex-col place-content-start place-items-center gap-4 p-4 lg:px-20 lg:py-16">
      <div className="flex h-full flex-col items-center gap-4 border border-black p-6 dark:border-white lg:w-[878px] lg:p-10">
        {children}
      </div>
    </main>
  )
}
