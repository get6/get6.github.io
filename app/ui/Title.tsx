interface Props {
  children: React.ReactNode
}

export default function Title({ children }: Props) {
  return (
    <h1 className="truncate text-2xl font-bold">{children}</h1>
    // <h1 className="mb-12 text-center text-3xl font-bold leading-tight tracking-tighter md:text-left md:text-5xl md:leading-none lg:text-6xl">
    //   {children}
    // </h1>
  )
}
