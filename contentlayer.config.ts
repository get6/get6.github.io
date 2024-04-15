import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkCallout from 'remark-callout'
import remarkEmbedImages from 'remark-embed-images'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkToc from 'remark-toc'
import { visit } from 'unist-util-visit'

/**
 * @type {import('unified').Plugin<[], Root>}
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
const remarkSourceRedirect =
  (options?: void | undefined) => (tree: any, file: any) => {
    // This matches all images that use the markdown standard format ![label](path).
    visit(tree, 'paragraph', (node) => {
      const image = node.children.find((child: any) => child.type === 'image')
      if (image) {
        if (image.url.startsWith('http')) return
        if (image.url.startsWith('../'))
          image.url = image.url.replace('../', '')
        image.url = `./blog/${image.url}`
      }
    })
    // This matches all MDX' <Image /> components & source elements that I'm
    // using within a custom <Video /> component.
    // Feel free to update it if you're using a different component name.
    visit(tree, 'mdxJsxFlowElement', (node) => {
      // I didn't test this
      if (node.name === 'Image' || node.name === 'source') {
        const srcAttr = node.attributes.find(
          (attribute: any) => attribute.name === 'src',
        )
        srcAttr.value = `blog/${srcAttr.value}`
      }
    })
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
      type: 'json',
      resolve: async (post) => {
        return [{ level: 1, title: post.title }]
      },
    },
    summary: {
      type: 'string',
      resolve: (post) => {
        // 정규 표현식을 사용하여 HTML 태그 제거
        const regex = /<[^>]+>/g
        const text = post.body.html.replace(regex, '')

        // 공백 제거
        return text.replace(/\s+/g, ' ').trim()
      },
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
  },
}))

export default makeSource({
  contentDirPath: 'blog',
  contentDirExclude: ['.obsidian', 'assets', 'templates'],
  documentTypes: [Post, Book],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkCallout,
      remarkToc,
      remarkSourceRedirect,
      remarkEmbedImages,
      remarkLint as any,
    ],
    rehypePlugins: [
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
      rehypeHighlight,
      rehypePrettyCode as any,
    ],
  },
  date: {
    timezone: 'Asia/Seoul',
  },
})
