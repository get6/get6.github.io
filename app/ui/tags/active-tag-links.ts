/** Marks the chip whose name matches ?tag=. Safe to call after chips mount. */
export function applyActiveTagLinks(tag: string | null) {
  document.querySelectorAll<HTMLElement>('[data-tag-link]').forEach((el) => {
    if (tag && el.dataset.tagLink === tag) {
      el.dataset.active = 'true'
    } else {
      delete el.dataset.active
    }
  })
}
