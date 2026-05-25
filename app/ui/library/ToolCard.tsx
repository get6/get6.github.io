import { Tool } from '@/app/lib/library'

interface Props {
  tool: Tool
}

export default function ToolCard({ tool }: Props) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden border border-black bg-white transition-colors hover:bg-gray-50 dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden border-b border-black bg-white p-8 dark:border-white dark:bg-gray-800">
        <img
          src={tool.image}
          alt={tool.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="flex grow flex-col gap-2 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-bold dark:text-white">
            {tool.name}
          </h3>
          {tool.category && (
            <span className="shrink-0 border border-black px-2 py-0.5 text-xs font-light dark:border-white dark:text-gray-300">
              {tool.category}
            </span>
          )}
        </div>
        {tool.note && (
          <p className="line-clamp-2 text-xs font-light text-gray-700 dark:text-gray-400">
            {tool.note}
          </p>
        )}
      </div>
    </a>
  )
}
