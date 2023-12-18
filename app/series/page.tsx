import { allPosts } from '@/.contentlayer/generated'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import SeriesCard from '@/app/ui/series/SeriesCard'
import { compareDesc } from 'date-fns'

export default function Series() {
  const series = allPosts
    .filter((post) => post.series != null)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <PageScreen>
      <div className="flex w-full max-w-[888px] flex-col gap-4">
        <PageTitle>Series</PageTitle>
        <div className="flex flex-col place-items-center gap-6">
          <SeriesCard series={series} />
        </div>
      </div>
    </PageScreen>
  )
}
