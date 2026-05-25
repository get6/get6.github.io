import { Video } from '@/app/lib/library'

interface Props {
  video: Video
}

export default function VideoCard({ video }: Props) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col overflow-hidden border border-black bg-white transition-colors hover:bg-gray-50 dark:border-white dark:bg-gray-900 dark:hover:bg-gray-800"
    >
      <div className="relative aspect-video w-full overflow-hidden border-b border-black dark:border-white">
        <img
          src={video.image}
          alt={video.title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex grow flex-col gap-2 px-4 py-3">
        <h3 className="line-clamp-2 text-sm font-bold dark:text-white">
          {video.title}
        </h3>
        <span className="text-xs font-light dark:text-gray-300">
          {video.channel}
        </span>
        {video.note && (
          <p className="line-clamp-2 text-xs font-light text-gray-700 dark:text-gray-400">
            {video.note}
          </p>
        )}
      </div>
    </a>
  )
}
