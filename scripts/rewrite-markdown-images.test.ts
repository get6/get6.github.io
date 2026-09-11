import assert from 'assert'

import {
  hasExternalProtocol,
  localizeExternalMarkdownImages,
  toLocalBlogPath,
} from '../app/lib/rewrite-markdown-images'

assert.strictEqual(
  hasExternalProtocol('https://images.unsplash.com/a.jpg'),
  true,
)
assert.strictEqual(hasExternalProtocol('http://image.yes24.com/a.jpg'), true)
assert.strictEqual(
  hasExternalProtocol('https://upload.wikimedia.org/foo.svg'),
  true,
)
assert.strictEqual(hasExternalProtocol('file:///tmp/a.png'), true)
assert.strictEqual(hasExternalProtocol('assets/cover.png'), false)
assert.strictEqual(hasExternalProtocol('/blog/assets/cover.webp'), false)
assert.strictEqual(hasExternalProtocol(''), false)
assert.strictEqual(hasExternalProtocol(undefined), false)

assert.strictEqual(
  toLocalBlogPath('assets/cover.PNG'),
  '/blog/assets/cover.webp',
)
assert.strictEqual(
  toLocalBlogPath('assets/nested/photo.jpeg'),
  '/blog/assets/nested/photo.webp',
)
assert.strictEqual(
  toLocalBlogPath('assets/already.webp'),
  '/blog/assets/already.webp',
)

const run = async () => {
  const calls: string[] = []
  const unsplashUrl = 'https://images.unsplash.com/photo.jpg'
  const yes24Url = 'https://image.yes24.com/goods/1/XL'
  const wikimediaUrl =
    'https://upload.wikimedia.org/wikipedia/commons/1/1d/example.svg'
  const unsplash = { url: unsplashUrl }
  const yes24 = { url: yes24Url }
  const wikimedia = { url: wikimediaUrl }
  const local = { url: 'assets/cover.png' }

  await localizeExternalMarkdownImages(
    [unsplash, yes24, wikimedia, local],
    async (url) => {
      calls.push(url)
      return `/blog/external/${calls.length}.webp`
    },
  )

  assert.deepStrictEqual(calls, [unsplashUrl, yes24Url, wikimediaUrl])
  assert.strictEqual(unsplash.url, '/blog/external/1.webp')
  assert.strictEqual(yes24.url, '/blog/external/2.webp')
  assert.strictEqual(wikimedia.url, '/blog/external/3.webp')
  assert.strictEqual(local.url, 'assets/cover.png')

  const failing = { url: 'https://images.example.com/broken.png' }
  await assert.rejects(
    () =>
      localizeExternalMarkdownImages([failing], async () => {
        throw new Error('disk write failed')
      }),
    /disk write failed/,
  )
  assert.strictEqual(failing.url, 'https://images.example.com/broken.png')

  console.log('rewrite-markdown-images tests passed')
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
