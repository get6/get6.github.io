# Translation Guide

## Overview

Translate Korean blog posts from `blog/posts/*.md` into English and Japanese.

## Rules

### What to translate

- `title` field in frontmatter
- All body text (paragraphs, list items, headings, blockquotes, callouts)

### What NOT to translate

- `date`, `tags`, `series`, `series_title`, `note` fields — keep exactly as-is
- Image URLs and alt text format — keep as-is
- Code blocks (`...`) — keep code as-is, translate comments only
- Inline code (`...`) — keep as-is
- URLs and links — keep as-is
- Brand names, product names, library names (e.g. Next.js, Gatsby, Obsidian, GitHub) — keep as-is
- Korean-specific service names (e.g. Yes24, 이때) — keep as-is with brief context if needed

### Tone & Style

- **English**: Casual, friendly developer blog tone. Use "I" perspective. Similar to a dev.to post.
- **Japanese**: Polite but approachable (です/ます体). Use 私 sparingly. Similar to a Zenn/Qiita post.

### File naming

- Source: `blog/posts/{slug}.md`
- English: `blog/posts/en/{slug}.md`
- Japanese: `blog/posts/ja/{slug}.md`
- The filename (slug) must be identical to the source.

### Frontmatter format

Keep the exact same structure. Only translate the `title` value:

```yaml
---
title: [translated title]
date: [keep original]
tags: [keep original]
series: [keep original if exists]
series_title: [keep original if exists]
note: [keep original if exists]
---
```

### Quality checklist

- [ ] Frontmatter structure preserved
- [ ] Date, tags unchanged
- [ ] Code blocks untouched
- [ ] Image markdown syntax preserved
- [ ] No hallucinated content added
- [ ] Natural, fluent target language
- [ ] Technical terms used correctly
