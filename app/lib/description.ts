interface DescriptionSource {
  description?: string | null
  summary?: string | null
}

/**
 * 검색 결과·OG·RSS·구조화 데이터에 쓸 설명문을 고른다.
 * frontmatter `description`이 있으면 그대로, 없으면 본문 summary를 `length`자로 자른다.
 */
export const getDescription = (
  { description, summary }: DescriptionSource,
  length: number,
): string => {
  const written = description?.trim()
  if (written) return written

  const text = summary ?? ''
  return text.length > length ? `${text.slice(0, length)}...` : text
}
