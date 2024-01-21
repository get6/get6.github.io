interface Props {
  children: React.ReactNode
}

export default function PageScreen({ children }: Props) {
  return (
    <main className="flex place-content-center px-4 py-4 lg:px-0 lg:py-20">
      <div className="flex w-full max-w-[1116px] flex-col place-items-center">
        {children}
      </div>
    </main>
  )
}
