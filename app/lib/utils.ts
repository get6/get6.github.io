import { BASE_URL } from '@/app/lib/definitions'

export const readingTime = (text: string) => {
  if (text.length < 1) return 0

  const wordsPerMinute = 225
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
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
