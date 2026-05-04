// KaTeX CSS는 약 25KB이고 수식이 있는 글(전체의 5%)에서만 필요하다.
// 이 컴포넌트를 import 하는 페이지의 CSS chunk에만 KaTeX 스타일이 포함되도록
// 격리해, 홈/리스트/태그/책 페이지의 unused-css를 줄인다.
import 'katex/dist/katex.min.css'

export default function KatexStyles() {
  return null
}
