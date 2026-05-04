// pretendard CSS와 폰트 파일을 public/fonts/pretendard으로 복사한다.
// next/webpack이 dynamic-subset CSS(92개 @font-face)를 파싱하다 stack overflow를 일으키므로
// 빌드 파이프라인을 거치지 않고 정적 파일로 그대로 서빙한다.
import fs from 'fs'
import path from 'path'

const SRC_BASE = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'pretendard',
  'dist',
  'web',
  'static',
)
const DEST_BASE = path.resolve(__dirname, '..', 'public', 'fonts', 'pretendard')

const COPY_TARGETS = ['pretendard-dynamic-subset.css', 'woff2-dynamic-subset']

const copyRecursive = (src: string, dest: string): number => {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true })
    return fs
      .readdirSync(src)
      .reduce(
        (sum, entry) =>
          sum + copyRecursive(path.join(src, entry), path.join(dest, entry)),
        0,
      )
  }
  if (fs.existsSync(dest) && fs.statSync(dest).mtime >= stat.mtime) {
    return 0
  }
  fs.copyFileSync(src, dest)
  return 1
}

fs.mkdirSync(DEST_BASE, { recursive: true })

let copied = 0
for (const target of COPY_TARGETS) {
  const src = path.join(SRC_BASE, target)
  const dest = path.join(DEST_BASE, target)
  if (!fs.existsSync(src)) {
    console.error(`❌ Missing pretendard source: ${src}`)
    process.exit(1)
  }
  copied += copyRecursive(src, dest)
}

console.log(`✅ Pretendard files copied/updated: ${copied}`)
