import { Repo } from '@/app/lib/library'
import { StarIcon } from '@heroicons/react/24/solid'

interface Props {
  repo: Repo
}

const formatStars = (n: number): string => {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`
  return String(n)
}

export default function RepoCard({ repo }: Props) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden border border-black bg-white transition-colors hover:bg-gray-50 dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      <div className="relative aspect-square w-full overflow-hidden border-b border-black bg-gray-50 dark:border-white dark:bg-gray-800">
        <img
          src={repo.image}
          alt={repo.name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex grow flex-col gap-2 px-4 py-3">
        <h3 className="line-clamp-1 text-sm font-bold dark:text-white">
          {repo.name}
        </h3>
        <div className="flex flex-wrap items-center gap-2">
          {repo.language && (
            <span className="border border-black px-2 py-0.5 text-xs font-light dark:border-white dark:text-gray-300">
              {repo.language}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs font-light dark:text-gray-300">
            <StarIcon className="h-3 w-3" />
            {formatStars(repo.stars)}
          </span>
        </div>
        {repo.description && (
          <p className="line-clamp-2 text-xs font-light text-gray-700 dark:text-gray-400">
            {repo.description}
          </p>
        )}
      </div>
    </a>
  )
}
