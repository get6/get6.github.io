import { toLocalAsset } from './to-local-asset'

export type MarkdownImageNode = { url: string }

export const hasExternalProtocol = (
  url: string | undefined | null,
): url is string => typeof url === 'string' && url.includes('://')

export const toLocalBlogPath = (url: string): string =>
  `/blog/${url.replace(/\.(PNG|JPG|JPEG|png|jpg|jpeg)$/, '.webp')}`

/**
 * 외부 프로토콜 이미지 URL을 로컬 asset으로 치환한다.
 * 이미지 노드를 한 번씩만 처리하므로 같은 문단의 중복 fetch를 피한다.
 */
export const localizeExternalMarkdownImages = async (
  images: MarkdownImageNode[],
  localize: (url: string) => Promise<string> = toLocalAsset,
): Promise<void> => {
  await Promise.all(
    images.map(async (img) => {
      if (!hasExternalProtocol(img.url)) return
      img.url = await localize(img.url)
    }),
  )
}
