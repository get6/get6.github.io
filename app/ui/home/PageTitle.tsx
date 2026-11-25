interface Props {
  children: React.ReactNode
  className?: string
  level?: 1 | 2
  visuallyHidden?: boolean
}

export default function PageTitle({
  children,
  className,
  level = 1,
  visuallyHidden = false,
}: Props) {
  const Tag = level === 1 ? 'h1' : 'h2'
  if (visuallyHidden) {
    return <Tag className="sr-only">{children}</Tag>
  }
  return (
    <div
      className={`page-title-glow relative z-[-1] flex place-items-center ${className ?? ''}`}
    >
      <Tag className="relative m-0 text-base font-bold select-none dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70] lg:text-2xl">
        {children}
      </Tag>
    </div>
  )
}
