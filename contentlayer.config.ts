import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkEmbedImages from 'remark-embed-images'
import remarkGfm from 'remark-gfm'
import remarkLint from 'remark-lint'
import remarkObsidian from 'remark-obsidian'
import { visit } from 'unist-util-visit'
import rehypeSlug from 'rehype-slug'

/**
 * @type {import('unified').Plugin<[], Root>}
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
const remarkSourceRedirect = (options: any) => (tree: any, file: any) => {
  // This matches all images that use the markdown standard format ![label](path).
  visit(tree, 'paragraph', (node) => {
    const image = node.children.find((child: any) => child.type === 'image')
    if (image) {
      if (image.url.startsWith('http')) return
      if (image.url.startsWith('../')) image.url = image.url.replace('../', '')
      image.url = `blog/${image.url}`
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
      srcAttr.value = `blog/assets/${srcAttr.value}`
    }
  })
}

/**
 * @type {import('unified').Plugin<[], Root>}
 */
const remarkCustomObsidian = (options: any) => async (tree: any, file: any) => {
  // file = await remark().use(remarkObsidian).process(file)
  // const paragraphs: any[] = []
  // visit(tree, 'paragraph', (node) => {
  //   const text = node.children.find((child: any) => child.type === 'text')
  //   // console.log(text)
  //   if (text) {
  //     paragraphs.push(node)
  //   }
  // })
  // /** @type {Array<Promise<void>>} */
  // const promises = paragraphs.map(async (node: any) => {
  //   const text = node.children.find((child: any) => child.type === 'text')
  //   if (text) {
  //     text.value = await remark().use(remarkObsidian).process(text.value)
  //   }
  // })
  // await Promise.all(promises)
}

const tocPlugin = (headings: PostHeading[]) => () => {
  return (node: any) => {
    console.log(node)
    node.children
      .filter((_: any) => _.type === 'heading')
      .forEach((heading: any) => {
        // visit(heading, 'paragraph', (node) => {
        //   node.
        // })
        console.log(heading)
        const title = heading.children[0].value
        // const title = toMarkdown({ type: 'paragraph', children: heading.children }, { extensions: [mdxToMarkdown()] })
        // .trim()
        // // removes MDX in headlines
        // .replace(/<.*$/g, '')
        // // remove backslashes (e.g. from list items)
        // .replace(/\\/g, '')
        // .trim()

        return headings.push({ level: heading.depth, title })
      })
  }
}
/**
 * @type {import('unified').Plugin<[], Root>}
 */
const rehypeCustomObsidian = (options: any) => async (tree: any, file: any) => {
  const paragraphs: any[] = []

  visit(tree, 'element', (node) => {
    const text = node.children.find((child: any) => child.type === 'text')
    if (text) {
      paragraphs.push(node)
    }
  })

  /** @type {Array<Promise<void>>} */
  const promises = paragraphs.map(async (node: any) => {
    const text = node.children.find((child: any) => child.type === 'text')
    if (text) {
      console.log(text)
      if (text.value) text.value = text.value.replace(/<br>/g, '\n')
    }
  })
  console.log(promises)
  await Promise.all(promises)
}

type PostHeading = { level: 1 | 2 | 3; title: string }

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
        const contents: PostHeading[] = []

        const regex = /<h([1-3])[^>]*>(.*?)<\/h\1>/g
        const headerMatches = Array.from(post.body.html.matchAll(regex))
        return [{ level: 1, title: post.title }, ...contents]
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
      // remarkCustomObsidian,
      // [
      //   remarkObsidian,
      //   {
      //     markdownFolder: 'blog',
      //     paywall: '',
      //   },
      // ],
      remarkSourceRedirect,
      remarkEmbedImages as any,
      remarkLint,
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

// rehypeCodeTitles,
// rehypePrism,
