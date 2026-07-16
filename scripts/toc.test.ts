import assert from 'assert'

import { getHeadingTitle, getToC } from '../app/lib/toc'

// Real rehype-autolink-headings append output (anchor wrapping span).
const realAutolink = (id: string) =>
  `<a class="no-underline" href="#${id}"><span class="no-underline">#</span></a>`

// Span-only suffix (config without extra wrapping) still supported.
const spanOnlyAutolink = '<span class="no-underline">#</span>'

assert.strictEqual(
  getHeadingTitle(`일반 제목${realAutolink('plain')}`),
  '일반 제목',
)

assert.strictEqual(
  getHeadingTitle(
    `트랜잭션 (<code>@Transactional</code>) 가이드${realAutolink('tx')}`,
  ),
  '트랜잭션 (@Transactional) 가이드',
)

assert.strictEqual(
  getHeadingTitle(`span-only 제목${spanOnlyAutolink}`),
  'span-only 제목',
)

assert.strictEqual(getHeadingTitle('마지막 글자 유지'), '마지막 글자 유지')

const toc = getToC(`
  <h2 id="plain">일반 제목${realAutolink('plain')}</h2>
  <h3 id="inline-code">1. <code>BuildFailed</code> + 재시도${realAutolink('inline-code')}</h3>
  <h4 id="inline-html"><strong>강조</strong> 제목${realAutolink('inline-html')}</h4>
  <h2 id="span-only">span only${spanOnlyAutolink}</h2>
`)

assert.deepStrictEqual(toc, [
  { level: 2, id: 'plain', title: '일반 제목' },
  { level: 3, id: 'inline-code', title: '1. BuildFailed + 재시도' },
  { level: 4, id: 'inline-html', title: '강조 제목' },
  { level: 2, id: 'span-only', title: 'span only' },
])

console.log('toc tests passed')
