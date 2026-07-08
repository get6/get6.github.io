import assert from 'assert'
import path from 'path'

import { getCopyPath } from './copy-image'

const targetDir = path.resolve('/tmp', 'copy-image-output')

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

console.log('copy-image path conversion tests passed')
