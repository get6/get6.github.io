import assert from 'assert'
import { createHash } from 'crypto'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'

import { isHttpUrl, toLocalAsset } from '../app/lib/to-local-asset'

const sourceUrl = 'https://images.example.com/photo.png'
const fileName = `${createHash('md5').update(sourceUrl).digest('hex')}.webp`
const toArrayBuffer = (buffer: Buffer): ArrayBuffer =>
  buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer

const run = async () => {
  const tempRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), 'to-local-asset-test-'),
  )
  const cacheDir = path.join(tempRoot, 'cache')
  const publicImageDir = path.join(tempRoot, 'public')
  const publicUrlPrefix = '/external'
  fs.mkdirSync(cacheDir)
  fs.mkdirSync(publicImageDir)

  const options = { cacheDir, publicImageDir, publicUrlPrefix }

  try {
    assert.strictEqual(isHttpUrl('https://images.example.com/photo.png'), true)
    assert.strictEqual(isHttpUrl('http://image.yes24.com/goods/1/XL'), true)
    assert.strictEqual(isHttpUrl('assets/cover.png'), false)
    assert.strictEqual(isHttpUrl('file:///tmp/cover.png'), false)
    assert.strictEqual(isHttpUrl('/blog/assets/cover.webp'), false)

    const unusedFetcher = async () => {
      throw new Error('non-http url must not fetch')
    }
    assert.strictEqual(
      await toLocalAsset('assets/cover.png', {
        ...options,
        fetcher: unusedFetcher,
      }),
      'assets/cover.png',
    )
    assert.strictEqual(
      await toLocalAsset('file:///tmp/cover.png', {
        ...options,
        fetcher: unusedFetcher,
      }),
      'file:///tmp/cover.png',
    )

    assert.strictEqual(
      await toLocalAsset(sourceUrl, {
        ...options,
        fetcher: async () => {
          throw new Error('network unavailable')
        },
      }),
      sourceUrl,
    )

    assert.strictEqual(
      await toLocalAsset(sourceUrl, {
        ...options,
        fetcher: async () => ({
          ok: false,
          arrayBuffer: async () => new ArrayBuffer(0),
        }),
      }),
      sourceUrl,
    )

    assert.strictEqual(
      await toLocalAsset(sourceUrl, {
        ...options,
        fetcher: async () => ({
          ok: true,
          arrayBuffer: async () => {
            throw new Error('response body unavailable')
          },
        }),
      }),
      sourceUrl,
    )

    assert.strictEqual(
      await toLocalAsset(sourceUrl, {
        ...options,
        fetcher: async () => ({
          ok: true,
          arrayBuffer: async () =>
            toArrayBuffer(Buffer.from('<html>not an image</html>')),
        }),
      }),
      sourceUrl,
    )

    const png = await sharp({
      create: {
        width: 2,
        height: 2,
        channels: 3,
        background: '#ffffff',
      },
    })
      .png()
      .toBuffer()

    let fetchCount = 0
    const localPath = await toLocalAsset(sourceUrl, {
      ...options,
      fetcher: async () => {
        fetchCount += 1
        return { ok: true, arrayBuffer: async () => toArrayBuffer(png) }
      },
    })

    assert.strictEqual(localPath, `${publicUrlPrefix}/${fileName}`)
    assert.strictEqual(fetchCount, 1)
    assert.strictEqual(fs.existsSync(path.join(cacheDir, fileName)), true)
    assert.strictEqual(fs.existsSync(path.join(publicImageDir, fileName)), true)
    assert.strictEqual(
      (await sharp(path.join(publicImageDir, fileName)).metadata()).format,
      'webp',
    )

    fs.unlinkSync(path.join(publicImageDir, fileName))
    const cacheHitPath = await toLocalAsset(sourceUrl, {
      ...options,
      fetcher: async () => {
        throw new Error('cache hit must not fetch')
      },
    })

    assert.strictEqual(cacheHitPath, localPath)
    assert.strictEqual(fs.existsSync(path.join(publicImageDir, fileName)), true)

    await assert.rejects(
      () =>
        toLocalAsset('https://images.example.com/write-failure.png', {
          cacheDir: path.join(tempRoot, 'missing', 'cache'),
          publicImageDir,
          publicUrlPrefix,
          fetcher: async () => ({
            ok: true,
            arrayBuffer: async () => toArrayBuffer(png),
          }),
        }),
      /ENOENT/,
    )

    console.log('to-local-asset tests passed')
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true })
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
