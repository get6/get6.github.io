interface Props {
  children: React.ReactNode
}

export default function PageScreen({ children }: Props) {
  return (
    <main className="flex place-content-center py-20">
      <div className="flex w-full max-w-[1116px] flex-col place-items-center">
        {children}
      </div>
    </main>
  )
}
