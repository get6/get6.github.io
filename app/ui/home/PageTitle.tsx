interface Props {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className }: Props) {
  return (
    <div
      className={`page-title-glow relative z-[-1] flex place-items-center ${className}`}
    >
      <h1 className="relative m-0 select-none text-base font-bold dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70] lg:text-2xl">
        {children}
      </h1>
    </div>
  )
}
