'use client'

import { Post } from '@/.contentlayer/generated'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import { format } from 'date-fns'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  posts: Post[]
}

export default function PostTable({ posts }: Props) {
  const { push } = useRouter()
  const heads = ['Title', 'Date', 'Categories']
  const searchParams = useSearchParams()

  const allPosts = searchParams.has('tag')
    ? posts.filter((post) =>
        post.tags.includes(searchParams.get('tag')!.toString()),
      )
    : posts

  return (
    <Table>
      <TableHead>
        <tr>
          {heads.map((head, index) => (
            <th key={index} scope="col" className="px-6 py-3">
              {head}
            </th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {allPosts.map((post, index) => (
          <tr
            key={index}
            className="border-b bg-white hover:cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            onClick={() => push(post.url)}
          >
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              {post.title}
            </th>
            <td className="px-6 py-4">
              {format(new Date(post.date), 'yyyy-MM-dd')}
            </td>
            <td className="px-6 py-4">{post.tags.join(' ')}</td>
          </tr>
        ))}
      </TableBody>
    </Table>
  )
}
