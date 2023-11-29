import Post from '@/app/ui/home/Post'
import RecentPost from '@/app/ui/home/RecentPost'
import SearchBar from '@/app/ui/home/SearchBar'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-4 p-24">
      <div className="flex w-full justify-start pl-2">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="relative text-2xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
            Recent Posts
          </div>
        </div>
      </div>
      <div className="flex justify-evenly gap-4">
        <RecentPost />
        <RecentPost />
        <RecentPost />
      </div>

      <div className="flex w-full items-center justify-between px-2">
        <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          <div className="relative text-2xl font-bold dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert">
            All Posts
          </div>
        </div>
        <SearchBar />
      </div>

      {/* <div className="grid grid-flow-col grid-cols-2 items-center justify-evenly"> */}
      <div className="flex flex-wrap justify-around gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  )
}
