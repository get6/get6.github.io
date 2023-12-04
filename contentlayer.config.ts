import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkToc from 'remark-toc'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: {
      type: 'list',
      required: true,
      of: { type: 'string' },
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/posts/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'blog/posts',
  documentTypes: [Post],
  markdown: {
    remarkPlugins: [remarkGfm, remarkLint, remarkToc],
    rehypePlugins: [rehypePrettyCode, rehypeHighlight],
  },
})
