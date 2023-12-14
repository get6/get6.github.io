'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)

    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }, 300)

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
        autoComplete="off"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  )
}
