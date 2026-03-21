#!/bin/bash
# Usage: ./scripts/translate-posts.sh [en|ja] [optional: single-slug]
# Example: ./scripts/translate-posts.sh en
# Example: ./scripts/translate-posts.sh ja 202312271551

set -e

LANG="${1:?Usage: $0 <en|ja> [slug]}"
SINGLE_SLUG="$2"
POSTS_DIR="blog/posts"
TARGET_DIR="blog/posts/$LANG"
TRANSLATE_GUIDE="TRANSLATE.md"

mkdir -p "$TARGET_DIR"

if [ "$LANG" = "en" ]; then
  LANG_NAME="English"
elif [ "$LANG" = "ja" ]; then
  LANG_NAME="Japanese"
else
  echo "Unsupported language: $LANG"
  exit 1
fi

translate_file() {
  local slug="$1"
  local src="$POSTS_DIR/$slug.md"
  local dst="$TARGET_DIR/$slug.md"

  # Skip if file exists and has valid frontmatter (--- appears at least twice)
  if [ -f "$dst" ]; then
    local fence_count
    fence_count=$(grep -c '^---$' "$dst" 2>/dev/null || echo 0)
    if [ "$fence_count" -ge 2 ]; then
      echo "SKIP: $dst (valid translation exists)"
      return
    else
      echo "RETRY: $dst (incomplete, retranslating)"
    fi
  fi

  echo "TRANSLATING: $src -> $dst"

  codex exec \
    --full-auto \
    "Read the translation guide at $TRANSLATE_GUIDE, then translate $src into $LANG_NAME and save to $dst. Follow the guide strictly: only translate the title and body text, keep frontmatter fields (date, tags, series, etc.) unchanged, keep code blocks and image markdown as-is, translate code comments only."
}

if [ -n "$SINGLE_SLUG" ]; then
  translate_file "$SINGLE_SLUG"
else
  for file in "$POSTS_DIR"/*.md; do
    slug=$(basename "$file" .md)
    translate_file "$slug"
  done
fi

echo "Done! Translated files in $TARGET_DIR:"
ls "$TARGET_DIR" | wc -l
