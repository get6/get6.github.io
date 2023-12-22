interface Props {
  children: React.ReactNode
  className?: string
}

export default function PageScreen({ children, className }: Props) {
  return (
    <main className={`flex place-content-center py-20 ${className}`}>
      <div className="flex w-full max-w-[1116px] flex-col place-items-center">
        {children}
      </div>
    </main>
  )
}
