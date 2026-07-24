<!-- AGENT_POLICY_MANAGED_BLOCK:START -->
# CLAUDE.md

이 문서는 Claude Code 작업 시 적용되는 프로젝트 규칙이다.

## 공통 안전 규칙 (절대 우선)
- 삭제는 기본 허용이다. 작업에 필요하면 `rm`, `rmdir`, `git rm`을 사용한다. 절대 금지하지 않는다.
- 삭제 전 대상 경로를 특정한다. 추측으로 광범위 삭제하지 않는다.
- `rm -rf` / `find ... -delete` / `xargs rm` 등 재귀·일괄 삭제는 **대상이 명확할 때만** 사용한다.
- 고위험 경로는 사용자 확인 후: 홈 루트(`~`), 레포 `.git/`, 시크릿/ creds, 공유 runner·worktree 루트, 프로덕션 데이터.
- 복구가 중요하면 `trash`를 우선 고려하되, 도구/작업 흐름상 `rm`이 맞으면 `rm`을 쓴다.
- 대규모·모호한 정리 전: 영향 범위와 롤백 방법을 한 줄로 남긴다.

## 작업 품질 규칙
- 최소 수정 원칙: 필요한 범위만 변경
- 변경 전 1줄 계획, 변경 후 요약(무엇/왜/영향)
- 테스트/린트 가능하면 실행 후 결과 공유
- 기존 코드 스타일/아키텍처를 우선 존중하고, 리팩토링은 요청된 범위 내에서만 수행

## 관측·탐색 규율 (추정 금지의 구체적 실행)
- **잘린 출력으로 성공/실패를 판정하지 않는다.** `| tail`, `| head`를 거치면 exit code는 파이프의 것(대개 0)이라 실패를 가린다. 판정은 산출물 존재 확인 또는 전체 로그로 한다.
- **"없다 / 아니다 / 한 적 없다"에는 관측 범위를 붙인다.** "X가 없다"가 아니라 "이 디렉터리에 X가 없다". 한 곳의 부재를 전체의 부재로 일반화하지 않는다.
- **파일을 생성·수정하는 명령 전에 기존 방법을 1회 검색한다.** `rg`/`fd`로 그 일을 이미 하는 스크립트·설정·관행이 repo에 있는지 확인한다. 정본 도구를 두고 맨손 명령을 치면 기존 설정을 덮어쓴다.
- **Mac mini 기본 CLI 라우팅:** 텍스트=`rg`, 파일명=`fd`, AST/구조=`ast-grep`/`sg`, JSON=`jq`, YAML=`yq`, GitHub=`gh`, HTTP 스모크=`xh`(없으면 curl). Multica 플랫폼은 `multica` CLI만. `grep -r`/`find` 기본 탐색 금지. 툴 JSON은 raw로 넣지 말고 필터.
- **설정 생성기는 "생성"이 아니라 "덮어쓰기"로 취급한다.** `flutterfire config` 같은 도구는 기존 파일을 재작성한다. 실행 후 반드시 `git status`/`git diff`로 의도치 않은 변경을 확인한다.
- **로그는 원인부터 읽는다.** 에러 요약은 끝에 있어도 원인은 앞에 있다. 잘린 뒷부분만 보고 추론하면 헛다리를 짚는다.

## 설계 판단 규율
- **기각 근거가 무너지면 기각을 재검토한다.** 설계 문서에 "채택하지 않은 것" 목록을 적었으면, 새 검증 결과가 나올 때마다 그 목록을 다시 읽고 각 사유가 아직 유효한지 확인한다.
- **검증하지 않은 리스크를 근거로 기각하지 않는다.** 그래도 기각한다면 "미검증 추정"이라고 명시한다.
- **일반 패턴을 적용하기 전에 이 환경의 특수 제약을 먼저 나열한다.** 1인 개발, 개발 머신 = CI 러너, worktree 기반, 에이전트 다수 동시 작업. 일반적으로 옳은 패턴(예: "PR 산출물은 CI에서 만든다")이 여기서는 불필요한 비용일 수 있다.
- **도구를 평가하기 전에 "기존 자산으로 되는가"를 먼저 묻는다.**

## 개발 필수 베이스라인 (모든 개발 프로젝트)
- Clean Architecture 경계 유지 (모듈/레이어 책임 분리)
- 상태 관리 책임 분리 (state, side-effect, UI binding 분리)
- 에러 핸들링 표준화 (예외를 삼키지 말고 명시적으로 처리/전파)
- 사용자 노출 문자열 하드코딩 금지, 다국어(i18n) 리소스 사용

## Git/PR 규칙
- 브랜치/커밋/PR 단위를 작게 유지
- 커밋 메시지는 목적이 드러나게 작성
- PR 요약에 변경 범위, 리스크, 롤백 포인트 포함

## 검증 우선순위
1. 정적 분석/타입 체크
2. 단위 테스트
3. 통합/시나리오 테스트
4. 실행 검증(필요 시)

## 보고 형식 (짧고 명확하게)
- What changed
- Why
- Risk
- Next step

## 프로젝트 이해/탐색 원칙
- 먼저 `README`, `ARCHITECTURE`, 핵심 설정 파일을 읽고 시작
- 빌드/테스트/린트 명령을 확인한 뒤 변경 시작
- 모르면 추정하지 말고 빠르게 확인 질문

## 구현 원칙
- 아키텍처 경계를 침범하지 않기 (레이어/모듈 경계 존중)
- 새 코드보다 기존 패턴 재사용 우선
- 비동기/에러 처리/널 안정성 명시

## 테스트 원칙
- 변경한 영역에 맞는 최소 테스트를 반드시 추가/수정
- flaky 가능성이 보이면 원인/완화책을 함께 보고

## Flutter/Clean Architecture 특화 규칙 (해당 프로젝트일 때)
- `lib/features/{feature}/domain|data|presentation` 레이어 경계를 지킬 것
- `core`에는 도메인 의존 로직을 넣지 말 것(순수 공통만)
- Riverpod 사용 시 `select` 우선으로 불필요한 rebuild 줄이기
- UI 문자열 하드코딩 금지, l10n 리소스 사용
- 신규 기능은 최소 1개 이상 테스트(기본: unit/widget) 포함

## 완료 조건 (Definition of Done)
- [ ] 아키텍처 경계를 침범하지 않았다
- [ ] 상태 관리 책임이 분리되어 있다
- [ ] 정상/실패 경로 에러 핸들링이 명시되어 있다
- [ ] 사용자 노출 문자열이 i18n에 반영되어 있다

## Claude 전용 지침
- 긴 작업은 단계별로 쪼개 진행
- 결과는 체크리스트 형태로 간결히 보고
- 불확실한 요구사항은 바로 질문 1~2개로 정리

## Project Context (from README.md)
- ## 실행 명령어
- ## 블로그 개발 환경
- - 패키지 매니저: [pnpm](https://pnpm.io/)
- - 풀스택 웹 애플리케이션: [Next.js](https://nextjs.org/)
- - 프론트앤드 라이브러리: [React](https://react.dev/)
- - 개발 언어: [TypeScript](https://www.typescriptlang.org/)
- - CSS 스타일: [Tailwind CSS](https://tailwindcss.com/)
- - 코드 정적 분석: [ESLint](https://eslint.org/)
- - 코드 포맷터: [Prettier](https://prettier.io/)
- - 게시글 서식 언어: [Markdown](https://ko.wikipedia.org/wiki/%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4)
- - Tailwind CSS IntelliSense
- - Prettier - Code formatter
<!-- AGENT_POLICY_MANAGED_BLOCK:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Package Manager**: pnpm (required)

```bash
# Development
pnpm dev              # Start development server
pnpm predev           # Runs copy-dir before dev (automatic)

# Building
pnpm build            # Build for production (static export)
pnpm prebuild         # Runs copy-dir before build (automatic)
pnpm build:content    # Build Contentlayer content only

# Static site serving (after build)
npx http-server out   # Serve built static files from out/ directory

# Code Quality
pnpm lint             # Run Next.js ESLint

# Utilities
pnpm copy-dir         # Copy images from blog/assets to public/blog/assets
```

## Architecture Overview

This is a **statically-exported Next.js blog** with content management via Contentlayer. The site generates a static export to the `out/` directory for deployment to GitHub Pages.

### Key Technologies

- **Next.js 14**: Full-stack React framework with static export
- **Contentlayer2**: MDX/Markdown content management with type safety
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recoil**: Client-side state management
- **pnpm**: Package manager (performance-focused)

### Content Management System

Content is managed through markdown files in the `blog/` directory:

- **Posts**: `blog/posts/*.md` → `/posts/[slug]`
- **Books**: `blog/books/*.md` → `/books/[slug]` (book reviews/notes)
- **Assets**: `blog/assets/*.webp` → Auto-copied to `public/blog/assets/`

Contentlayer processes markdown with:

- Frontmatter validation and type generation
- Image optimization (external images → data URIs)
- Table of contents extraction
- Syntax highlighting via rehype-pretty-code

### Project Structure

```
app/                   # Next.js App Router
├── (pages)/           # Route groups
│   ├── about/         # About page
│   ├── books/         # Book reviews
│   ├── posts/         # Blog posts
│   └── tags/          # Tag pages
├── ads/               # AdSense components
├── api/               # API routes (health check, RSS)
├── lib/               # Utilities and definitions
├── ui/                # Reusable components
└── types/             # TypeScript interfaces

blog/                  # Content directory
├── posts/             # Blog post markdown files
├── books/             # Book review markdown files
└── assets/            # Images (auto-copied to public/)

public/                # Static assets
└── blog/assets/       # Copied blog images
```

### Key Components Architecture

**Layout System**:

- `app/layout.tsx` → Root layout with metadata, analytics
- `app/ui/Navbar.tsx` → Main navigation
- Theme switching via `next-themes`

**Content Processing**:

- `contentlayer.config.ts` → Content schema, transformations, plugins
- Image processing: External images → optimized data URIs
- Custom remark/rehype plugins for enhanced markdown

**State Management**:

- Recoil for client-side state (theme, search, etc.)
- `app/providers.tsx` → Context providers wrapper

### Build Process

1. **Pre-build**: `copy-dir` script copies blog assets to public directory
2. **Content**: Contentlayer processes markdown files → type-safe content objects
3. **Build**: Next.js builds with static export (`output: 'export'`)
4. **Output**: Static files in `out/` directory ready for deployment

### Styling Conventions

- **Tailwind CSS**: Utility classes, custom components in `globals.css`
- **Dark Mode**: System preference detection + manual toggle
- **Typography**: `@tailwindcss/typography` for markdown content
- **Images**: WebP format preferred, responsive design

### Development Workflow

1. Add content to `blog/posts/` or `blog/books/`
2. Images go in `blog/assets/` (auto-copied on dev/build)
3. Run `pnpm dev` for development with hot reload
4. Content changes trigger Contentlayer rebuilds
5. Use `pnpm build` to generate static export

### Important Notes

- **Static Export**: Site generates to `out/` directory, no server-side features
- **Image Optimization**: External images converted to data URIs for performance
- **Content Validation**: Contentlayer enforces frontmatter schemas
- **Korean Language**: Primary language is Korean, configured in layout
- **Performance**: Bundle analysis available via `ANALYZE=true pnpm build`

### Markdown Authoring (Bold + Korean)

Due to CommonMark's emphasis flanking rule, a closing `**` will NOT render as bold when it is immediately **preceded by punctuation** (`"`, `)`, `%`, etc.) and immediately **followed by a Korean character**. This is spec-conformant behavior, not a bug. Keep punctuation **outside** the `**` markers.

- Bad: `**"시작할지"**가` → does not close (renders literally)
- Good: `"**시작할지**"가` → closes correctly, particle attaches with no space
- Avoid: `**"시작할지"** 가` → closes, but the trailing space inserts an awkward gap before the Korean particle

Bold wrapped by Korean on both sides (e.g. `**환경**이`) works fine.

## 검색·컨텍스트 규율 (토큰 효율)

<!-- BEGIN agent-search-discipline (managed) -->
- 코드/텍스트 검색은 `rg`, 파일 탐색은 `fd`, 구조(AST) 매칭은 `ast-grep`/`sg` (`grep -r`/`find`/정규식 대신).
- 파일을 통째로 읽지 않는다. `rg`/`ast-grep`로 위치를 특정한 뒤 필요한 심볼/라인 범위만 읽는다.
- 툴 결과 JSON/YAML을 raw로 컨텍스트에 넣지 않는다. `jq`/`yq`로 필요한 필드만 필터한다.
- GitHub는 `gh`, HTTP 스모크는 `xh`(없으면 `curl`). Multica 플랫폼은 `multica` CLI만.
- 광범위 매칭을 통째로 프롬프트에 넣지 않는다. 범위를 좁히거나 count만 확인한다.
- 목적: 토큰 낭비·환각(길 잃음) 방지. Multica 할당 에이전트도 workspace context/agent instructions의 Mac mini CLI routing과 동일 적용.
<!-- END agent-search-discipline -->

## 검증 규율 (analyze 먼저, test 나중)

<!-- BEGIN agent-verify-discipline (managed) -->

- 코드 작성/수정 직후 정적 분석을 **테스트보다 먼저** 돌린다. 통과 후에만 필요한 테스트를 타겟 실행.
  - Dart/Flutter: `dart analyze`/`flutter analyze` (+ clean_architecture_linter) · TS/Node: `tsc --noEmit` + eslint · Python: `ruff`+`mypy`
- analyze 경고/에러는 test 전에 해소. 무지성 전체 test 반복 대신 정적 피드백 루프 우선 → 토큰 절감.
- 실행 검증도 전체가 아니라 바뀐 부분만 타겟한다.
<!-- END agent-verify-discipline -->

## PR 작성 규율 (org 템플릿 준수)

<!-- BEGIN agent-pr-discipline (managed) -->

- ittae 조직 PR 본문은 `ittae/.github`의 `.github/PULL_REQUEST_TEMPLATE.md` 구조를 그대로 채운다. `gh pr create --body`는 템플릿이 자동 적용되지 않으므로 직접 가져와 작성한다: `gh api repos/ittae/.github/contents/.github/PULL_REQUEST_TEMPLATE.md --jq .content | base64 -d`
- 필수 섹션: 요약 / 목표·이유 / 변경 사항 / 범위 밖 / 관련 이슈(`Closes ITT-child` vs `Related ITT-parent`) / 실제 동작 증거(실행 환경·명령·결과 수치, 검증 안 한 영역까지 명시) / 위험(Risk tier T0~T3, rollback, 사람 결정 필요) / UI 증빙 / 체크리스트.
- 모르는 항목은 지우지 말고 "미확인"/"해당 없음". 제목은 `<type>: ITT-123 한국어 요약` 또는 `<type>: 한국어 요약`. 본문 한국어, code/path/error 원문 유지.
<!-- END agent-pr-discipline -->
