// Pretendard CSS와 woff2 청크를 public/fonts/pretendard로 복사한다.
// next/webpack이 dynamic-subset CSS의 다수 @font-face를 파싱하다 stack overflow를
// 일으키므로 빌드 파이프라인을 거치지 않고 정적 파일로 그대로 서빙한다.
//
// variable + dynamic-subset 조합:
// - variable font 한 파일에 모든 weight 포함(45~920) → woff2 1세트만 필요
// - unicode-range 청크로 페이지에서 쓰이는 글자만 fetch
// - static dynamic-subset(828 face)에 비해 CSS 크기 1/9
//
// CSS는 같은 디렉토리로 minify해서 저장(공백·주석 제거). lighthouse의
// unminified-css/unused-css 지표를 동시에 줄인다.
import fs from 'fs'
import path from 'path'

const SRC_BASE = path.resolve(
  __dirname,
  '..',
  'node_modules',
  'pretendard',
  'dist',
  'web',
  'variable',
)
const DEST_BASE = path.resolve(__dirname, '..', 'public', 'fonts', 'pretendard')

const CSS_FILE = 'pretendardvariable-dynamic-subset.css'
const WOFF2_DIR = 'woff2-dynamic-subset'

const minifyCss = (css: string): string =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/[\n\t]+/g, ' ')
    .replace(/ {2,}/g, ' ')
    .replace(/ ?([{}:;,]) ?/g, '$1')
    .replace(/;}/g, '}')
    .trim()

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
  fs.copyFileSync(src, dest)
  return 1
}

const cssSrc = path.join(SRC_BASE, CSS_FILE)
const cssDest = path.join(DEST_BASE, CSS_FILE)
const woff2Src = path.join(SRC_BASE, WOFF2_DIR)
const woff2Dest = path.join(DEST_BASE, WOFF2_DIR)

if (!fs.existsSync(cssSrc) || !fs.existsSync(woff2Src)) {
  console.error(`❌ Missing pretendard variable assets under ${SRC_BASE}`)
  process.exit(1)
}

// 매 빌드마다 dest를 비우고 fresh하게 복사한다. mtime 기반 skip 로직을 두면
// 다른 변형(예: static dynamic-subset)에서 남은 stale woff2가 누적된다.
fs.rmSync(DEST_BASE, { recursive: true, force: true })
fs.mkdirSync(DEST_BASE, { recursive: true })

fs.writeFileSync(cssDest, minifyCss(fs.readFileSync(cssSrc, 'utf8')))
const copied = 1 + copyRecursive(woff2Src, woff2Dest)

console.log(`✅ Pretendard variable files written: ${copied}`)
