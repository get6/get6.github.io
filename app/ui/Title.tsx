interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h1 className="truncate font-bold dark:text-white lg:text-2xl">
      {children}
    </h1>
  )
}
