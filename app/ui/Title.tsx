interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h3 className="w-full max-w-full min-w-0 overflow-hidden truncate font-bold dark:text-white lg:line-clamp-2 lg:whitespace-normal lg:text-xl">
      {children}
    </h3>
  )
}
