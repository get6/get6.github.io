'use client'

import { TAG_SEPARATOR } from '@/app/lib/tag-path'
import { applyActiveTagLinks } from '@/app/ui/tags/active-tag-links'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/** Filters the server-rendered tag table from ?tag= and toggles the active chip. */
export default function TagTableFilter() {
  const searchParams = useSearchParams()
  const tag = searchParams.get('tag')

  useEffect(() => {
    const rows = document.querySelectorAll<HTMLElement>('[data-post-row]')
    let visible = 0
    rows.forEach((row) => {
      const tags = (row.dataset.tags ?? '').split(TAG_SEPARATOR)
      const show = !tag || tags.includes(tag)
      row.hidden = !show
      if (show) visible += 1
    })

    document.querySelectorAll<HTMLElement>('[data-ad-slot]').forEach((ad) => {
      ad.hidden = Boolean(tag)
    })

    const count = document.querySelector('[data-post-count]')
    if (count) count.textContent = String(visible)

    const empty = document.querySelector<HTMLElement>('[data-empty]')
    if (empty) empty.hidden = visible !== 0

    applyActiveTagLinks(tag)
  }, [tag])

  return null
}
