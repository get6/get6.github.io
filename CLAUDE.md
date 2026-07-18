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

- 코드/텍스트 검색은 `rg`, 파일 탐색은 `fd`, 구조(AST) 매칭은 `ast-grep` (`grep -r`/`find`/정규식 대신).
- 파일을 통째로 읽지 않는다. `rg`로 위치를 특정한 뒤 필요한 심볼/라인 범위만 읽는다.
- 툴 결과 JSON/YAML을 raw로 컨텍스트에 넣지 않는다. `jq`/`yq`로 필요한 필드만 필터한다.
- 광범위 매칭을 통째로 프롬프트에 넣지 않는다. 범위를 좁히거나 count만 확인한다.
- 목적: 토큰 낭비·환각(길 잃음) 방지.
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
