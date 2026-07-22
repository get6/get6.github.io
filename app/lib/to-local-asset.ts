import { createHash } from 'crypto'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import sharp from 'sharp'

type FetchResponse = Pick<Response, 'ok' | 'arrayBuffer'>

type ToLocalAssetOptions = {
  cacheDir?: string
  publicImageDir?: string
  publicUrlPrefix?: string
  fetcher?: (url: string) => Promise<FetchResponse>
}

const DEFAULT_CACHE_DIR = '.cache/images'
const DEFAULT_PUBLIC_IMAGE_DIR = 'public/blog/external'
const DEFAULT_PUBLIC_URL_PREFIX = '/blog/external'

/**
 * 외부 이미지를 WebP로 변환해 로컬 asset 경로를 반환한다.
 * 외부 fetch/body/이미지 변환 실패는 원본 URL로 fallback한다.
 * 로컬 파일 읽기/쓰기는 빌드 산출물의 정합성 문제이므로 예외를 유지한다.
 */
export const toLocalAsset = async (
  url: string,
  options: ToLocalAssetOptions = {},
): Promise<string> => {
  const cacheDir = options.cacheDir ?? DEFAULT_CACHE_DIR
  const publicImageDir = options.publicImageDir ?? DEFAULT_PUBLIC_IMAGE_DIR
  const publicUrlPrefix = options.publicUrlPrefix ?? DEFAULT_PUBLIC_URL_PREFIX
  const fetcher = options.fetcher ?? fetch
  const hash = createHash('md5').update(url).digest('hex')
  const fileName = `${hash}.webp`
  const cachePath = join(cacheDir, fileName)
  const publicPath = join(publicImageDir, fileName)
  const urlPath = `${publicUrlPrefix}/${fileName}`

  if (existsSync(publicPath)) return urlPath

  if (existsSync(cachePath)) {
    writeFileSync(publicPath, readFileSync(cachePath))
    return urlPath
  }

  let buffer: Buffer
  try {
    const response = await fetcher(url)
    if (!response.ok) return url

    buffer = await sharp(await response.arrayBuffer())
      .webp({ quality: 75 })
      .toBuffer()
  } catch {
    return url
  }

  writeFileSync(cachePath, buffer)
  writeFileSync(publicPath, buffer)
  return urlPath
}
