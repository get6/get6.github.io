import { allPosts } from '@/.contentlayer/generated'
import { compareDesc } from 'date-fns'
import PageTitle from '../ui/home/PageTitle'
import PageScreen from '../ui/layout/PageScreen'

export default function Series() {
  const series = allPosts
    // .filter((post) => post.series != null)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <PageScreen>
      <div className="flex w-full flex-col gap-4">
        <PageTitle>Series</PageTitle>
        <div className="flex flex-col justify-between"></div>
      </div>
    </PageScreen>
  )
}
