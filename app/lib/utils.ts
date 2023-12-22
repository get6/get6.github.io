import { visit } from 'unist-util-visit'

export const readingTime = (text: string) => {
  if (text.length < 1) return 0

  const wordsPerMinute = 225
  const numberOfWords = text.split(/\s/g).length
  return Math.ceil(numberOfWords / wordsPerMinute)
}

/**
 * Analyzes local markdown/MDX images & videos and rewrites their `src`.
 * Supports both markdown-style images, MDX <Image /> components, and `source`
 * elements. Can be easily adapted to support other sources too.
 * @param {string} options.root - The root path when reading the image file.
 */
export const remarkSourceRedirect =
  (options: any) => (tree: any, file: any) => {
    // You need to grab a reference of your post's slug.
    // I'm using Contentlayer (https://www.contentlayer.dev/), which makes it
    // available under `file.data`.But if you're using something diffxerent, you
    // should be able to access it under `file.path`, or pass it as a parameter
    // the the plugin `options`.
    const slug = file.data.rawDocumentData.flattenedPath.replace('blog/', '')
    // This matches all images that use the markdown standard format ![label](path).
    visit(tree, 'paragraph', (node) => {
      const image = node.children.find((child: any) => child.type === 'image')
      if (image) {
        if (image.url.startsWith('http')) return

        if (image.url.startsWith('../'))
          image.url = image.url.replace('../', '')

        // image.url = `assets/${slug}/${image.url}`
        image.url = `blog/${image.url}`
      }
    })
    // This matches all MDX' <Image /> components & source elements that I'm
    // using within a custom <Video /> component.
    // Feel free to update it if you're using a different component name.
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name === 'Image' || node.name === 'source') {
        const srcAttr = node.attributes.find(
          (attribute: any) => attribute.name === 'src',
        )
        srcAttr.value = `assets/${slug}/${srcAttr.value}`
      }
    })
  }
