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

export const getFirstImage = (markdown: string) => {
  const regex = /!\[[^\]]*\]\((.*?)\)/g
  const match = regex.exec(markdown)

  if (match) {
    return match[1]
  }
  return null
}

export const getOGImage = (markdown: string) => {
  const image = getFirstImage(markdown)
  return image ? image : `${BASE_URL}/images/alt_image.jpg`
}
