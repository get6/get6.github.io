import { BASE_URL, BookStatus } from '@/app/lib/definitions'
import { differenceInDays } from 'date-fns'
import { Book } from 'contentlayer/generated'

const CJK_CHARS_PER_MIN = 500
const LATIN_WPM = 225
const SECONDS_PER_IMAGE = 12
const CODE_LINES_PER_MIN = 80
const CJK_RE = /[぀-ゟ゠-ヿ一-鿿가-힯㐀-䶿]/g

export const readingTime = (text: string) => {
  if (!text || text.length < 1) return 0

  const codeBlockRe = /```[\s\S]*?```/g
  const imageRe = /!\[[^\]]*\]\([^)]*\)/g

  const codeBlocks = text.match(codeBlockRe) ?? []
  const codeLineCount = codeBlocks.reduce(
    (sum, block) => sum + block.split('\n').length,
    0,
  )
  const imageCount = (text.match(imageRe) ?? []).length

  const cleaned = text
    .replace(codeBlockRe, ' ')
    .replace(imageRe, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_~>`]/g, ' ')

  const cjkCharCount = (cleaned.match(CJK_RE) ?? []).length
  const latinWordCount = cleaned
    .replace(CJK_RE, ' ')
    .split(/\s+/)
    .filter((w) => /[A-Za-z0-9]/.test(w)).length

  const minutes =
    cjkCharCount / CJK_CHARS_PER_MIN +
    latinWordCount / LATIN_WPM +
    (imageCount * SECONDS_PER_IMAGE) / 60 +
    codeLineCount / CODE_LINES_PER_MIN

  return Math.max(1, Math.ceil(minutes))
}

export const sliceDesc = (text: string, length: number) => {
  return text.slice(0, length) + '...'
}

export const getOGImage = (markdown: string) => {
  let image: string | null = null
  const regex = /!\[[^\]]*\]\((.*?)\)/g
  const match = regex.exec(markdown)

  if (match) image = match[1]
  return image ? image : `${BASE_URL}/images/alt_image.webp`
}

/**
 * 책이 실제로 활발하게 읽고 있는 상태인지 확인
 * reading 상태이면서 30일 이내에 시작한 경우만 활발한 읽기로 간주
 */
export const isActivelyReading = (book: Book): boolean => {
  if (book.status !== BookStatus.Reading) {
    return false
  }

  const today = new Date()
  const startDate = new Date(book.start_read_date)
  const daysSinceStart = differenceInDays(today, startDate)

  return daysSinceStart <= 30
}

/**
 * 책이 논리적으로 paused 상태인지 확인
 * reading 상태지만 30일이 넘었으면 paused로 간주
 */
export const isPausedBook = (book: Book): boolean => {
  return book.status === BookStatus.Reading && !isActivelyReading(book)
}
