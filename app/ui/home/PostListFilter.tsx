'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

/** Hides list cards that do not match ?query= without taking the cards out of the static HTML. */
export default function PostListFilter() {
  const searchParams = useSearchParams()
  const query = (searchParams.get('query') ?? '').trim().toLowerCase()

  useEffect(() => {
    const root = document.getElementById('post-list')
    if (!root) return

    const cards = root.querySelectorAll<HTMLElement>('[data-post-card]')
    let visible = 0
    cards.forEach((card) => {
      const text = card.dataset.search ?? ''
      const show = query.length === 0 || text.includes(query)
      card.hidden = !show
      if (show) visible += 1
    })

    root.querySelectorAll<HTMLElement>('[data-ad-slot]').forEach((ad) => {
      ad.hidden = query.length > 0
    })

    const empty = root.querySelector<HTMLElement>('[data-empty]')
    if (empty) empty.hidden = visible !== 0
  }, [query])

  return null
}
