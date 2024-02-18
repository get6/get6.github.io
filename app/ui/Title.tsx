interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h1 className="flex flex-wrap font-bold dark:text-white lg:line-clamp-2 lg:text-xl">
      {children}
    </h1>
  )
}
