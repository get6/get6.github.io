interface Props {
  children: React.ReactNode
  className?: string
}

export default function PageTitle({ children, className }: Props) {
  return (
    <div
      className={`relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ${className}`}
    >
      <div className="relative select-none font-bold dark:text-white dark:drop-shadow-[0_0_0.3rem_#ffffff70] lg:text-2xl">
        {children}
      </div>
    </div>
  )
}
