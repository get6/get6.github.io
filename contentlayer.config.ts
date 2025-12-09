import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkCallout from 'remark-callout'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import sharp from 'sharp'
import { visit } from 'unist-util-visit'
import { createHash } from 'crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// 캐시 디렉토리 설정
const CACHE_DIR = '.cache/images'
if (!existsSync(CACHE_DIR)) {
  mkdirSync(CACHE_DIR, { recursive: true })
}

// 외부 이미지를 가져와서 블러 처리
const toBlurDataURL = async (url: string) => {
  const params = new URL(url).searchParams
  const w = Number(params.get('w')) || 16
  const h = Number(params.get('h')) || 16

  // URL 해시 생성 (캐시 키)
  const hash = createHash('md5')
    .update(url + '-blur')
    .digest('hex')
  const cachePath = join(CACHE_DIR, `${hash}.webp`)

  // 캐시 확인
  if (existsSync(cachePath)) {
    const buffer = readFileSync(cachePath)
    return `data:image/webp;base64,${buffer.toString('base64')}`
  }

  // 이미지 요청
  const res = await fetch(url)
  // 응답 확인
  if (!res.ok) return ''

  const imageData = await res.arrayBuffer()
  const image = sharp(imageData)
  const imgAspectRatio = w / h

  // Base64 문자열로 변환
  const buffer = await image
    .resize(8, Math.round(8 / imgAspectRatio))
    .webp({
      quality: 75,
    })
    .toBuffer()

  // 캐시 저장
  writeFileSync(cachePath, buffer)

  return `data:image/webp;base64,${buffer.toString('base64')}`
}

const toDataURI = async (url: string) => {
  // URL 해시 생성 (캐시 키)
  const hash = createHash('md5').update(url).digest('hex')
  const cachePath = join(CACHE_DIR, `${hash}.webp`)

  // 캐시 확인
  if (existsSync(cachePath)) {
    const buffer = readFileSync(cachePath)
    return `data:image/webp;base64,${buffer.toString('base64')}`
  }

  // 이미지 요청
  const res = await fetch(url)

  // 응답 확인
  if (!res.ok) return url

  // 이미지 데이터 가져오기
  const imageData = await res.arrayBuffer()
  const image = sharp(imageData)

  // Base64 문자열로 변환
  const buffer = await image
    .webp({
      quality: 75,
    })
    .toBuffer()

  // 캐시 저장
  writeFileSync(cachePath, buffer)

  return `data:image/webp;base64,${buffer.toString('base64')}`
}

const adjustUl = (node: any, index: number | undefined, parent: any) => {
  if (index === undefined) return
  // 현재 노드가 텍스트만을 갖는지 확인
  const isTextOnly =
    node.children.length === 1 && node.children[0].type === 'text'

  // 다음 노드가 ul 태그인지 확인
  const nextNode = parent.children[index + 1]
  const isNextNodeUL = nextNode && nextNode.type === 'list'
  const className = 'prose-list'

  if (isTextOnly && isNextNodeUL) {
    // p 태그에 클래스 추가
    if (!node.data) node.data = {}
    if (!node.data.hProperties) node.data.hProperties = {}
    node.data.hProperties.className = (
      node.data.hProperties.className || []
    ).concat(className)
  }
}

/**
 * @type {import('unified').Plugin<[], Root>}
 * @param {string} options.root
 */
const remarkSourceRedirect = () => async (tree: any) => {
  const images: any[] = []
  visit(tree, 'paragraph', (node, index, parent) => {
    const imgs = node.children.filter((child: any) => child.type === 'image')
    for (const img of imgs) {
      if (img.url.includes('://')) images.push(node)
      else {
        img.url = `/blog/${img.url.replace(/\.(PNG|JPG|JPEG|png|jpg|jpeg)$/, '.webp')}`
      }
    }
    adjustUl(node, index, parent)
  })

  visit(tree, 'link', (node: any) => {
    const url: string = node.url
    if (url.startsWith('books/') || url.startsWith('posts/')) {
      let replacedUrl = url.replace(/\.(md)$/, '')
      let hostname =
        process.env.NODE_ENV === 'production'
          ? 'https://get6.github.io'
          : 'http://localhost:3000'
      node.url = `${hostname}/${replacedUrl}`
    }
  })
  // base64는 외부 이미지를 blur 처리하는 용도로 가져와도 좋을 것 같다. 0.1 퀄리티로 아주 작은 이미지를 가져와서 블러 처리
  const promises: Promise<any>[] = []
  for (const node of images) {
    const imgs = node.children.filter((child: any) => child.type === 'image')
    for (const img of imgs) {
      if (img.url.includes('images.unsplash.com'))
        promises.push(
          new Promise(async (resolve) => {
            img.url = await toDataURI(img.url)
            resolve(img.url)
          }),
        )
    }
  }
  await Promise.all(promises)
}

const isNameImg = (name: string) => name === 'img'

const hasImage = (props: any) => {
  return (
    props.children instanceof Array &&
    (props.children as any[]).some((child) => isNameImg(child.tagName))
  )
}

const rehypeImageSize = () => (tree: any) => {
  // 이미지를 포함한 p 태그에 클래스 추가
  visit(tree, 'element', (node: any) => {
    if (node.tagName === 'p' && hasImage(node)) {
      const images = node.children.filter((child: any) =>
        isNameImg(child.tagName),
      )
      if (1 < images.length) {
        if (node.properties.className)
          node.properties.className += ' flex flex-wrap justify-center gap-4'
        else node.properties.className = 'flex flex-wrap justify-center gap-4'
      }
    } else if (isNameImg(node.tagName)) {
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

const Post = defineDocumentType(() => ({
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
          return await toDataURI(match[1])
        }
        return '/images/alt_image.webp'
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

const Book = defineDocumentType(() => ({
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
    cover_image: {
      type: 'string',
      resolve: async (book) => await toDataURI(book.cover_url),
    },
  },
}))

const remarkPlugins = [
  remarkGfm,
  remarkBreaks,
  remarkCallout,
  remarkMath,
  remarkToc,
  remarkSourceRedirect,
  remarkLint,
]

const rehypePlugins = [
  rehypePrettyCode,
  rehypeKatex,
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
    },
  ],
]

export default makeSource({
  contentDirPath: 'blog',
  contentDirExclude: ['.obsidian', 'assets', 'templates'],
  documentTypes: [Post, Book],
  markdown: {
    remarkPlugins: remarkPlugins as any,
    rehypePlugins: rehypePlugins as any,
  },
  date: { timezone: 'Asia/Seoul' },
})
