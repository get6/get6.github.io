'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

export default function SearchBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const normalized = term.trim().toLowerCase()
    const current = (searchParams.get('query') ?? '').trim().toLowerCase()
    if (normalized === current) return

    const params = new URLSearchParams(searchParams)
    if (normalized) {
      params.set('query', normalized)
    } else {
      params.delete('query')
    }

    const qs = params.toString()
    replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }, 350)

  return (
    <div className="relative flex h-10 w-48 items-center overflow-hidden rounded-md border border-black bg-white dark:border-white dark:bg-gray-900 lg:h-12 lg:w-80">
      <div className="grid h-full w-12 place-items-center text-gray-400">
        <MagnifyingGlassIcon className="h-4 w-4" />
      </div>
      <input
        className="peer h-full w-full bg-white pr-2 text-sm text-gray-700 outline-none dark:bg-gray-900"
        type="search"
        id="search"
        placeholder="Search"
        autoComplete="off"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString().toLowerCase()}
      />
    </div>
  )
}
