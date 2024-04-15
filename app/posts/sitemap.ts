import { allPosts } from '@/.contentlayer/generated'
import { BASE_URL } from '@/app/lib/definitions'
import { MetadataRoute } from 'next'

export async function generateSitemaps() {
  // Fetch the total number of products and calculate the number of sitemaps needed
  return allPosts.map((post, index) => ({ id: index }))
}

export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const start = id * 50000
  const end = start + 50000

  return allPosts.map((post) => ({
    url: `${BASE_URL}/post/${post.slug}`,
    lastModified: post.date,
  }))
}
