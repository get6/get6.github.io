interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h3 className="w-full max-w-full min-w-0 overflow-hidden text-ellipsis break-all line-clamp-1 font-bold dark:text-white lg:line-clamp-2 lg:text-xl">
      {children}
    </h3>
  )
}
