#!/usr/bin/env bash
# blog-post 스킬용: Templater가 채운 새 글 파일 경로를 stdout으로 출력한다.
# 1) title이 비어 있는 기존 글(cmd+N으로 만들어 둔 파일)이 있으면 가장 최근 것을 재사용
# 2) 없으면 Obsidian URI로 blog vault에 새 노트를 만들어 folder template(Post template)을 실행
set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
posts_dir="$repo_root/blog/posts"
vault_name="blog"
timeout_sec="${NEW_POST_TIMEOUT:-30}"

existing="$(rg -l --max-depth 1 '^title:[[:space:]]*$' "$posts_dir" -g '*.md' 2>/dev/null | sort | tail -n 1 || true)"
if [[ -n "$existing" ]]; then
  echo "$existing"
  exit 0
fi

offset=0
id="$(date +%Y%m%d%H%M)"
while [[ -e "$posts_dir/$id.md" ]]; do
  offset=$((offset + 1))
  id="$(date -v+"${offset}"M +%Y%m%d%H%M)"
done
target="$posts_dir/$id.md"

open "obsidian://new?vault=$vault_name&file=posts/$id"

for ((i = 0; i < timeout_sec; i++)); do
  if [[ -f "$target" ]] && ! rg -q '<%' "$target" && rg -q '^date: [0-9]' "$target"; then
    echo "$target"
    exit 0
  fi
  sleep 1
done

echo "error: ${timeout_sec}초 안에 Templater가 $target 을 채우지 못했어요. Obsidian(blog vault)이 열려 있는지 확인하세요." >&2
exit 1
