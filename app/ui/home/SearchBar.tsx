import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchBar() {
  return (
    <div className="relative flex h-12 w-80 items-center overflow-hidden rounded border border-black bg-white">
      <div className="grid h-full w-12 place-items-center text-gray-400">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
      <input
        className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
        type="search"
        id="search"
        placeholder="Search"
      />
    </div>
  )
}
