import assert from 'assert'
import fs from 'fs'
import os from 'os'
import path from 'path'
import sharp from 'sharp'

import { getCopyPath, processImages } from './copy-image'

const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'copy-image-test-'))
const sourceDir = path.join(tempRoot, 'source')
const targetDir = path.join(tempRoot, 'target')

assert.strictEqual(
  getCopyPath('sample.png', targetDir),
  path.resolve(targetDir, 'sample.webp'),
)
assert.strictEqual(
  getCopyPath('sample.JPG', targetDir),
  path.resolve(targetDir, 'sample.webp'),
)
assert.strictEqual(
  getCopyPath('sample.jpeg', targetDir),
  path.resolve(targetDir, 'sample.webp'),
)
assert.strictEqual(
  getCopyPath('sample.webp', targetDir),
  path.resolve(targetDir, 'sample.webp'),
)

const run = async () => {
  try {
    fs.mkdirSync(sourceDir)
    fs.writeFileSync(path.join(sourceDir, 'notes.txt'), 'not an image')

    await sharp({
      create: {
        width: 1,
        height: 1,
        channels: 3,
        background: '#ffffff',
      },
    })
      .png()
      .toFile(path.join(sourceDir, 'sample.PNG'))

    const result = await processImages(sourceDir, targetDir)
    const outputPath = path.join(targetDir, 'sample.webp')

    assert.deepStrictEqual(result.processedFiles, ['sample.PNG'])
    assert.deepStrictEqual(result.skippedFiles, [])
    assert.strictEqual(fs.existsSync(outputPath), true)

    const metadata = await sharp(outputPath).metadata()
    assert.strictEqual(metadata.format, 'webp')

    await assert.rejects(
      () => processImages(path.join(tempRoot, 'missing'), targetDir),
      /Source image directory does not exist/,
    )

    console.log('copy-image tests passed')
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true })
  }
}

run().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
