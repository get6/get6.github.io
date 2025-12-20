interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h3 className="line-clamp-1 font-bold dark:text-white lg:line-clamp-2 lg:text-xl">
      {children}
    </h3>
  )
}
