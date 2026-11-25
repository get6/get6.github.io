import { AdsInTable } from '@/app/ads/AdsInTable'
import { ad_per_content } from '@/app/lib/definitions'
import type { PostListItem } from '@/app/lib/content'
import { TAG_SEPARATOR } from '@/app/lib/tag-path'
import FormattedDate from '@/app/ui/FormattedDate'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import Link from 'next/link'
import { Fragment } from 'react'

interface Labels {
  title: string
  date: string
  categories: string
  empty: string
}

interface Props {
  posts: PostListItem[]
  labels: Labels
}

export default function PostTable({ posts, labels }: Props) {
  const heads = [labels.title, labels.date, labels.categories]

  return (
    <Table>
      <TableHead>
        <tr>
          {heads.map((head, index) => (
            <th key={head} scope="col" className="px-6 py-3">
              {head}{' '}
              {index === 0 && (
                <>
                  (<span data-post-count>{posts.length}</span>)
                </>
              )}
            </th>
          ))}
        </tr>
      </TableHead>
      <TableBody>
        {posts.map((post, index) => (
          <Fragment key={post.slug}>
            {index > 0 && index % ad_per_content === 0 ? (
              <tr
                data-ad-slot
                className="max-h-14 border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <td
                  colSpan={heads.length}
                  className="max-w-0 overflow-hidden p-0"
                >
                  <AdsInTable adKey={`post-ad-${index}`} />
                </td>
              </tr>
            ) : null}
            <tr
              data-post-row
              data-tags={post.tags.join(TAG_SEPARATOR)}
              className="border-b bg-white hover:cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              {/*
                셀마다 링크를 둔다. tr에 position:relative를 주면 명세상 포함 블록이
                정해지지 않고, Safari는 absolute 오버레이를 행 밖으로 보내
                어느 행을 눌러도 마지막 링크가 열린다.
              */}
              <th
                scope="row"
                className="p-0 font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                <Link
                  href={post.url}
                  prefetch={false}
                  className="block px-6 py-4 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </th>
              <td className="p-0">
                <Link
                  href={post.url}
                  prefetch={false}
                  tabIndex={-1}
                  className="block truncate px-6 py-4"
                >
                  <FormattedDate date={post.date} />
                </Link>
              </td>
              <td className="p-0">
                <Link
                  href={post.url}
                  prefetch={false}
                  tabIndex={-1}
                  className="block truncate px-6 py-4"
                >
                  {post.tags.join(', ')}
                </Link>
              </td>
            </tr>
          </Fragment>
        ))}
        <tr data-empty hidden>
          <td
            colSpan={3}
            className="py-4 text-center text-sm font-semibold lg:text-base"
          >
            {labels.empty}
          </td>
        </tr>
      </TableBody>
    </Table>
  )
}
