## Summary

- extract `getToC` heading title parsing into a pure helper
- preserve inline code / inline HTML text while removing the trailing autolink `#`
- add a regression test script for plain headings, inline code headings, and no-HTML headings

## Verification

- loaded required skills: `codex`, `github-workflows`
- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm test:toc`
- `corepack pnpm build:content`
- `corepack pnpm lint` (passes with existing `@next/next/no-img-element` warnings in library UI files)

Closes ITT-1491
Related: parent track #1290
