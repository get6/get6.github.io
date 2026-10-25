import assert from 'assert'

import { getDescription } from '../app/lib/description'

const longSummary = '가'.repeat(300)

// frontmatter description이 있으면 그대로 쓴다 (자르지 않음)
assert.strictEqual(
  getDescription({ description: '직접 쓴 설명', summary: longSummary }, 160),
  '직접 쓴 설명',
)

// 앞뒤 공백은 정리한다
assert.strictEqual(
  getDescription({ description: '  설명  ', summary: longSummary }, 160),
  '설명',
)

// description이 없거나 비어 있으면 summary를 잘라 쓴다
assert.strictEqual(
  getDescription({ summary: longSummary }, 160),
  `${'가'.repeat(160)}...`,
)
assert.strictEqual(
  getDescription({ description: '   ', summary: longSummary }, 160),
  `${'가'.repeat(160)}...`,
)
assert.strictEqual(
  getDescription({ description: null, summary: longSummary }, 200),
  `${'가'.repeat(200)}...`,
)

// 짧은 summary에는 말줄임표를 붙이지 않는다
assert.strictEqual(getDescription({ summary: '짧은 본문' }, 160), '짧은 본문')

// summary도 없으면 빈 문자열
assert.strictEqual(getDescription({}, 160), '')

console.log('description tests passed')
