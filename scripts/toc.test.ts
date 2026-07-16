import assert from 'assert'

import { getHeadingTitle, getToC } from '../app/lib/toc'

assert.strictEqual(
  getHeadingTitle('일반 제목<span class="no-underline">#</span>'),
  '일반 제목',
)

assert.strictEqual(
  getHeadingTitle(
    '트랜잭션 (<code>@Transactional</code>) 가이드<span class="no-underline">#</span>',
  ),
  '트랜잭션 (@Transactional) 가이드',
)

assert.strictEqual(getHeadingTitle('마지막 글자 유지'), '마지막 글자 유지')

const toc = getToC(`
  <h2 id="plain">일반 제목<span class="no-underline">#</span></h2>
  <h3 id="inline-code">1. <code>BuildFailed</code> + 재시도<span class="no-underline">#</span></h3>
  <h4 id="inline-html"><strong>강조</strong> 제목</h4>
`)

assert.deepStrictEqual(toc, [
  { level: 2, id: 'plain', title: '일반 제목' },
  { level: 3, id: 'inline-code', title: '1. BuildFailed + 재시도' },
  { level: 4, id: 'inline-html', title: '강조 제목' },
])

console.log('toc tests passed')
