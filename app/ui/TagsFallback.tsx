interface Props {
  tags: string[]
}

export default function TagsFallBack({ tags }: Props) {
  return (
    <>
      {tags.map((_, index) => (
        <div
          key={index}
          className="h-5 w-12 animate-pulse rounded-full bg-gray-200 px-2.5 py-0.5 dark:bg-gray-600"
        />
      ))}
    </>
  )
}
