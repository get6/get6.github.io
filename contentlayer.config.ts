import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmbedImages from 'remark-embed-images'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkObsidian from 'remark-obsidian'
import remarkToc from 'remark-toc'
import { remarkSourceRedirect } from './app/lib/utils'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.md`,
  // contentType: 'mdx',
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
  },

  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => '/' + post._raw.flattenedPath,
    },
    cover_image: {
      type: 'string',
      resolve: (post) => {
        const cover_image = post.body.raw.match(/!\[.*\]\((.*)\)/m)?.[1]
        return cover_image
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
    book_url: { type: 'string' },
  },
  computedFields: {
    url: {
      type: 'string',
      // resolve: (book) => `/${book._raw.flattenedPath}`,
      resolve: (book) => '/' + book._raw.flattenedPath,
    },
  },
}))

export default makeSource({
  contentDirPath: 'blog',
  documentTypes: [Post, Book],
  markdown: {
    remarkPlugins: [
      remarkGfm,
      remarkLint,
      remarkToc,
      remarkObsidian,
      remarkSourceRedirect,
      remarkEmbedImages,
    ],
    rehypePlugins: [
      rehypeAutolinkHeadings,
      rehypePrettyCode,
      rehypeHighlight as any,
    ],
  },
  contentDirExclude: ['.obsidian', 'assets'],
})

// rehypeCodeTitles,
// rehypePrism,
