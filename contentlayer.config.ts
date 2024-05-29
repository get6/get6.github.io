import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkCallout from 'remark-callout'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkToc from 'remark-toc'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'

const getImageType = (contentType: string): string => {
  if (contentType) {
    const matches = contentType.match(/image\/(\w+)/)
    if (matches && matches[1]) {
      return matches[1]
    }
  }
  return 'jpeg' // 기본값 JPEG로 설정
}

// 외부 이미지를 가져와서 블러 처리
const toBlurDataURL = async (url: string) => {
  const params = new URL(url).searchParams
  const w = Number(params.get('w')) || 16
  const h = Number(params.get('h')) || 16

  // 이미지 요청
  const res = await fetch(url)
  // 응답 확인
  if (!res.ok) return ''
  const contentType = res.headers.get('Content-Type') || 'image/png'

  const imageData = await res.arrayBuffer()
  const image = sharp(imageData)
  const imgAspectRatio = w / h
  const blurDataURL = await image
    .resize(8, Math.round(8 / imgAspectRatio))
    .png({
      quality: 75,
    })
    .toBuffer()
    .then(
      (buffer) =>
        `data:image/${getImageType(contentType)};base64,${buffer.toString('base64')}`,
    )
  return blurDataURL
}

const toDataURI = async (url: string) => {
  // 이미지 요청
  const res = await fetch(url)

  // 응답 확인
  if (!res.ok) return url

  // 이미지 데이터 가져오기
  const imageData = await res.arrayBuffer()
  const image = sharp(imageData)

  const contentType = res.headers.get('Content-Type') || 'image/jpeg'
  // Base64 문자열로 변환

  const dataURL = await image
    .png({
      quality: 75,
    })
    .toBuffer()
    .then(
      (buffer) =>
        `data:image/${getImageType(contentType)};base64,${buffer.toString('base64')}`,
    )
  return dataURL
}

/**
 * @type {import('unified').Plugin<[], Root>}
 * @param {string} options.root -
 */
const remarkSourceRedirect =
  (options?: void | undefined) => async (tree: any, file: any) => {
    const images: any[] = []
    visit(tree, 'paragraph', (node) => {
      const image = node.children.find((child: any) => child.type === 'image')
      if (image) {
        if (image.url.includes('://')) images.push(node)
        else {
          image.url = `/blog/${image.url}`
        }
      }
    })
    // base64는 외부 이미지를 blur 처리하는 용도로 가져와도 좋을 것 같다. 0.1 퀄리티로 아주 작은 이미지를 가져와서 블러 처리
    const promises: Promise<any>[] = []
    for (const node of images) {
      const image = node.children.find((child: any) => child.type === 'image')
      if (image.url.includes('images.unsplash.com')) {
        promises.push(
          new Promise(async (resolve) => {
            image.url = await toDataURI(image.url)
            resolve(image.url)
          }),
        )
      }
    }
    await Promise.all(promises)
  }

const nameIsImg = (name: string) => name === 'img'

const hasImage = (props: any) => {
  return (
    props.children instanceof Array &&
    (props.children as any[]).some((child) => nameIsImg(child.tagName))
  )
}

const rehypeImageSize = () => (tree: any) => {
  // 이미지를 포함한 p 태그에 클래스 추가
  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'p' && hasImage(node)) {
      if (
        1 <
        node.children.filter((child: any) => nameIsImg(child.tagName)).length
      )
        node.properties.className = ' flex flex-wrap justify-center gap-4'
    } else if (nameIsImg(node.tagName)) {
      const src = node.properties.src
      const alt = node.properties.alt

      if (src && alt) {
        if (alt.toString().includes('|')) {
          const width = alt.split('|').map((s: string) => s.trim())[1]
          node.properties.width = width
        }
      } else if (src && !alt) {
        node.properties.alt = 'image'
      }
    }
  })
}

// 목차 추출
const getToC = (html: string): ToC[] | null => {
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

const getSummary = (html: string) => {
  // 정규 표현식을 사용하여 HTML 태그 제거
  const regex = /<[^>]+>/g
  const text = html.replace(regex, '').replace(/#/g, '')
  // 공백 제거
  return text.replace(/\s+/g, ' ').trim()
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {
      type: 'list',
      required: true,
      of: { type: 'string' },
    },
    series: {
      type: 'list',
      of: { type: 'string' },
    },
    series_title: { type: 'string' },
    note: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace(/^posts\//, ''),
    },
    cover_image: {
      type: 'string',
      resolve: async (post) => {
        const regex = /!\[[^\]]*\]\((.*?)\)/g
        const match = regex.exec(post.body.raw)
        if (match) {
          // return match[1]
          return await toDataURI(match[1])
        }
        return '/images/alt_image.jpg'
      },
    },
    summary: {
      type: 'string',
      resolve: (post) => getSummary(post.body.html),
    },
    toc: {
      type: 'list',
      resolve: (post) => getToC(post.body.html),
    },
  },
}))

export const Book = defineDocumentType(() => ({
  extensions: {},
  name: 'Book',
  filePathPattern: `books/**/*.md`,
  fields: {
    created: { type: 'date', required: true },
    // tag: {
    //   type: 'list',
    //   required: true,
    //   of: { type: 'string' },
    // },
    tag: { type: 'string', required: true },
    title: { type: 'string', required: true },
    subtitle: { type: 'string' },
    author: { type: 'string', required: true },
    category: { type: 'string', required: true },
    total_page: { type: 'number', required: true },
    publish_date: { type: 'date', required: true },
    cover_url: { type: 'string', required: true },
    status: { type: 'string', required: true },
    start_read_date: { type: 'date', required: true },
    finish_read_date: { type: 'date', required: true },
    my_rate: { type: 'number', required: true },
    book_note: { type: 'string' },
    book_url: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (book) => `/${book._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (book) => book._raw.flattenedPath.replace(/^books\//, ''),
    },
    summary: {
      type: 'string',
      resolve: (book) => getSummary(book.body.html),
    },
    toc: {
      type: 'list',
      resolve: (book) => getToC(book.body.html),
    },
  },
}))

const remarkPlugins = [
  remarkGfm,
  remarkBreaks,
  remarkCallout,
  remarkToc,
  remarkSourceRedirect,
  remarkLint as any,
]

const rehypePlugins = [
  rehypeImageSize,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: {
        className: ['no-underline'],
      },
      content: {
        type: 'element',
        tagName: 'span',
        properties: {
          className: 'no-underline',
        },
        children: [
          {
            type: 'text',
            value: '#',
          },
        ],
      },
    },
  ],
  [
    rehypeExternalLinks,
    {
      rel: ['noopener', 'noreferrer'],
      target: '_blank',
      properties: { className: "after:content-['_↗']" },
    },
  ],
  rehypeHighlight,
  rehypePrettyCode as any,
]

export default makeSource({
  contentDirPath: 'blog',
  contentDirExclude: ['.obsidian', 'assets', 'templates'],
  documentTypes: [Post, Book],
  markdown: { remarkPlugins, rehypePlugins },
  date: {
    timezone: 'Asia/Seoul',
  },
})
