import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkCallout from 'remark-callout'
import remarkEmbedImages from 'remark-embed-images'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkToc from 'remark-toc'
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

const toDataURI = async (url: string) => {
  // 이미지 요청
  const res = await fetch(url)

  // 응답 확인
  if (!res.ok) return url

  // 이미지 데이터 가져오기
  const imageData = await res.arrayBuffer()

  // Base64 문자열로 변환
  const base64 = Buffer.from(imageData).toString('base64')
  const contentType = res.headers.get('Content-Type') || 'image/jpeg'
  // Base64 문자열 반환
  return `data:image/${getImageType(contentType)};base64,${base64}`
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
        if (image.url.startsWith('http')) images.push(node)
        else {
          const parsedUrl = image.url.startsWith('../')
            ? image.url.replace('../', '')
            : image.url
          image.url = `./blog/${parsedUrl}`
        }
      }
    })

    const promises: Promise<any>[] = []
    for (const node of images) {
      const image = node.children.find((child: any) => child.type === 'image')
      promises.push(
        new Promise(async (resolve) => {
          image.url = await toDataURI(image.url)
          resolve(image.url)
        }),
      )
    }
    await Promise.all(promises)
  }

const rehypeImageSize = () => (tree: any) => {
  // 이미지를 포함한 p 태그에 클래스 추가
  visit(tree, 'element', (node: any) => {
    if (
      node.tagName === 'p' &&
      1 <= node.children.length &&
      node.children[0].tagName === 'img'
    ) {
      node.properties.className = 'flex flex-wrap justify-center gap-4'
    } else if (node.tagName === 'img') {
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

const getSummary = (body: string) => {
  // 정규 표현식을 사용하여 HTML 태그 제거
  const regex = /<[^>]+>/g
  const text = body.replace(regex, '')

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
    cover_image: {
      type: 'string',
      resolve: (post) => {
        const image = post.body.html.match(/<img.*?src=["'](.*?)["'].*?>/)?.[1]
        const cover_image = image ? image : '/images/alt_image.jpg'
        return cover_image
      },
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath.replace(/^posts\//, ''),
    },
    toc: {
      type: 'list',
      resolve: (post) => {
        const headers = post.body.html.match(
          /<h([1-6]).*?id=["'](.*?)["'].*?>(.*?)<\/h[1-6]>/g,
        )
        if (headers) {
          const res = headers.map((header) => {
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
            }
            return null
          })
          // console.log(res)
          return res
        } else {
          return null
        }
      },
    },
    summary: {
      type: 'string',
      resolve: (post) => getSummary(post.body.html),
    },
  },
}))

export const Book = defineDocumentType(() => ({
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
  },
}))

export default makeSource({
  contentDirPath: 'blog',
  contentDirExclude: ['.obsidian', 'assets', 'templates'],
  documentTypes: [Post, Book],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkBreaks,
      remarkCallout,
      remarkToc,
      remarkSourceRedirect,
      remarkEmbedImages,
      remarkLint as any,
    ],
    rehypePlugins: [
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
    ],
  },
  date: {
    timezone: 'Asia/Seoul',
  },
})
