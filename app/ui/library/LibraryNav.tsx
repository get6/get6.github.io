interface Section {
  id: string
  label: string
  count: number
}

interface Props {
  sections: Section[]
}

export default function LibraryNav({ sections }: Props) {
  const visible = sections.filter((section) => section.count > 0)
  if (visible.length <= 1) return null

  return (
    <nav
      aria-label="library sections"
      className="flex flex-wrap gap-2 border-b border-black pb-4 dark:border-white"
    >
      {visible.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className="flex items-center gap-2 border border-black px-3 py-1.5 text-sm transition-colors hover:bg-gray-50 dark:border-white dark:text-white dark:hover:bg-gray-800"
        >
          {section.label}
          <span className="text-xs font-light text-gray-500 dark:text-gray-400">
            {section.count}
          </span>
        </a>
      ))}
    </nav>
  )
}
