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
pnpm lint:css         # Run Stylelint on CSS files
pnpm lint:css:fix     # Fix CSS linting issues

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
