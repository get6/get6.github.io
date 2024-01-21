import { Post, allPosts } from '@/.contentlayer/generated'
import PageTitle from '@/app/ui/home/PageTitle'
import PageScreen from '@/app/ui/layout/PageScreen'
import SeriesCard from '@/app/ui/series/SeriesCard'
import { compareDesc } from 'date-fns'

export default function Series() {
  const seriesGroups: { [key: string]: Post[] } = {}
  const seriesArray: Post[][] = []

  allPosts
    .filter((post) => post.series != null)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((post) => {
      const series = post.series?.join('')!
      if (!seriesGroups[series]) {
        seriesGroups[series] = []
        seriesArray.push(seriesGroups[series])
      }
      seriesGroups[series].push(post)
    })

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-4 lg:max-w-[888px]">
        <PageTitle>Series</PageTitle>
        <div className="flex w-full flex-col justify-center gap-6">
          {seriesArray.map((series, index) => (
            <SeriesCard key={index} series={series} />
          ))}
        </div>
      </div>
    </PageScreen>
  )
}
