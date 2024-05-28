import { Book, Post } from 'contentlayer/generated'

export const readingTime = (text: string) => {
  if (text.length < 1) return 0

  const wordsPerMinute = 225
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}

export const sliceDesc = (text: string, length: number) => {
  return text.slice(0, length) + '...'
}

export const getCoverImage = (post: Post) => {
  let image = '/images/alt_image.jpg'
  const img = post.html.match(/<img.*?src=["'](.*?)["'].*?>/)?.[1]
  image = img ?? image
  return image
}

// 목차 추출
const createToC = (html: string): ToC[] | null => {
  const headers = html.match(/<h([1-6]).*?id=["'](.*?)["'].*?>(.*?)<\/h[1-6]>/g)
  if (headers) {
    const headerList: ToC[] = headers.map((header) => {
      const matches = header.match(
        /<h([1-6]).*?id=["'](.*?)["'].*?>(.*?)<\/h[1-6]>/,
      )
      if (matches) {
        const title = matches[3]
        return {
          level: parseInt(matches[1]),
          id: matches[2],
          title: title.slice(0, title.indexOf('<')),
        }
      } else return { level: 0, id: '', title: '' }
    })
    const filteredList = headerList.filter((header) => header.level !== 0)
    if (1 < filteredList.length) return filteredList
  }
  return null
}

export const getToC = (doc: Post | Book): ToC[] | null => {
  return createToC(doc.html)
}

export const getSummary = (doc: Post | Book) => {
  // 정규 표현식을 사용하여 HTML 태그 제거
  const regex = /<[^>]+>/g
  const text = doc.html.replace(regex, '')
  // 공백 제거
  return text.replace(/\s+/g, ' ').trim()
}
