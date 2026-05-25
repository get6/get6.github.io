import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

export interface Video {
  title: string
  url: string
  channel: string
  added: string
  note?: string
  image: string
}

export interface Repo {
  name: string
  url: string
  description?: string
  language?: string
  stars: number
  image: string
  starredAt: string
}

export type ToolCategory = 'AI' | 'App' | 'Tool' | 'Service'

export interface Tool {
  name: string
  url: string
  category?: ToolCategory
  added: string
  note?: string
  image: string
}

interface VideoRaw extends Omit<Video, 'image'> {
  image?: string
}

interface ToolRaw {
  name: string
  url: string
  category?: ToolCategory
  added?: string
  note?: string
  image?: string
}

const LIBRARY_DIR = join(process.cwd(), 'blog', 'library')
const CACHE_DIR = join(process.cwd(), '.cache')
const STARS_CACHE_FILE = join(CACHE_DIR, 'github-stars.json')

const GITHUB_USERNAME = 'get6'
const STARS_PER_PAGE = 100
const STARS_MAX_PAGES = 10 // 100 × 10 = 별 1000개까지 안전

const PLACEHOLDER_IMAGE = '/images/alt_image.webp'

const toIsoDate = (value: unknown): string => {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

const readYaml = <T>(filename: string): T[] => {
  const path = join(LIBRARY_DIR, filename)
  const raw = readFileSync(path, 'utf-8')
  // safeLoad: !!js/function 등 임의 코드 실행 가능 타입을 거부 (js-yaml v3)
  const parsed = yaml.safeLoad(raw)
  if (!Array.isArray(parsed)) return []
  return (parsed as Array<Record<string, unknown>>).map((item) => {
    if (item.added === undefined) return item
    return { ...item, added: toIsoDate(item.added) }
  }) as T[]
}

const faviconForUrl = (url: string): string => {
  try {
    const hostname = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=128`
  } catch {
    return PLACEHOLDER_IMAGE
  }
}

const todayIso = (): string => new Date().toISOString().slice(0, 10)

const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /youtube\.com\/watch\?v=([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

const youtubeThumbnail = (url: string): string | null => {
  const id = extractYouTubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null
}

const byAddedDesc = <T extends { added: string }>(a: T, b: T): number =>
  b.added.localeCompare(a.added)

const byStarredAtDesc = (a: Repo, b: Repo): number =>
  b.starredAt.localeCompare(a.starredAt)

export const getVideos = (): Video[] => {
  const raw = readYaml<VideoRaw>('videos.yml')
  return raw
    .map((item) => ({
      ...item,
      image: item.image ?? youtubeThumbnail(item.url) ?? PLACEHOLDER_IMAGE,
    }))
    .sort(byAddedDesc)
}

export const getTools = (): Tool[] => {
  const raw = readYaml<ToolRaw>('tools.yml')
  return raw
    .map((item) => ({
      name: item.name,
      url: item.url,
      category: item.category,
      added: item.added ?? todayIso(),
      note: item.note,
      image: item.image ?? faviconForUrl(item.url),
    }))
    .sort(byAddedDesc)
}

interface GitHubStarred {
  starred_at: string
  repo: {
    full_name: string
    html_url: string
    description: string | null
    language: string | null
    stargazers_count: number
    owner: { avatar_url: string }
  }
}

const ensureCacheDir = () => {
  if (!existsSync(CACHE_DIR)) mkdirSync(CACHE_DIR, { recursive: true })
}

const loadStarsCache = (): Repo[] | null => {
  if (!existsSync(STARS_CACHE_FILE)) return null
  try {
    return JSON.parse(readFileSync(STARS_CACHE_FILE, 'utf-8')) as Repo[]
  } catch {
    return null
  }
}

const saveStarsCache = (repos: Repo[]) => {
  ensureCacheDir()
  writeFileSync(STARS_CACHE_FILE, JSON.stringify(repos, null, 2))
}

const toRepo = (item: GitHubStarred): Repo => ({
  name: item.repo.full_name,
  url: item.repo.html_url,
  description: item.repo.description ?? undefined,
  language: item.repo.language ?? undefined,
  stars: item.repo.stargazers_count,
  image: item.repo.owner.avatar_url,
  starredAt: item.starred_at,
})

const fetchStars = async (): Promise<Repo[]> => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.star+json',
    'User-Agent': `${GITHUB_USERNAME}-blog-build`,
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const collected: Repo[] = []
  for (let page = 1; page <= STARS_MAX_PAGES; page++) {
    const url = `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=${STARS_PER_PAGE}&page=${page}`
    const res = await fetch(url, { headers })
    if (!res.ok) {
      throw new Error(`GitHub stars API ${res.status}: ${res.statusText}`)
    }
    const data = (await res.json()) as GitHubStarred[]
    if (data.length === 0) break
    collected.push(...data.map(toRepo))
    if (data.length < STARS_PER_PAGE) break
  }
  return collected
}

export const getRepos = async (): Promise<Repo[]> => {
  try {
    const repos = await fetchStars()
    saveStarsCache(repos)
    return [...repos].sort(byStarredAtDesc)
  } catch (err) {
    console.warn(
      '[library] GitHub stars fetch failed, falling back to cache:',
      err,
    )
    const cached = loadStarsCache()
    return cached ? [...cached].sort(byStarredAtDesc) : []
  }
}
