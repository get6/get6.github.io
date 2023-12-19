'use client'

import { Book } from '@/.contentlayer/generated'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import { LinkIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  books: Book[]
  isFinished?: boolean
}

export default function BookTable({ books, isFinished = false }: Props) {
  const { push } = useRouter()
  // const heads = ['Title', 'Author', 'Published', 'Price', 'Category', 'URL']
  const heads = ['Title', 'Author', 'Published', 'Category', 'URL']

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
        {books.map((book, index) => (
          <tr
            key={index}
            className={`border-b bg-white dark:border-gray-700 dark:bg-gray-800  ${
              isFinished &&
              'hover:cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            onClick={() => isFinished && push(book.url)}
          >
            <th
              scope="row"
              className="flex items-center gap-2 whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              <Image
                width={16}
                height={16}
                src={book.cover_url}
                alt={book.title}
              />
              {book.title}
            </th>
            <td className="px-6 py-4">{book.author}</td>
            <td className="px-6 py-4">
              {format(new Date(book.publish_date), 'yyyy-MM-dd')}
            </td>
            {/* <td className="px-6 py-4">&#8361;30,000</td> */}
            <td className="px-6 py-4">{book.tag.split(' ')[2]}</td>
            <td className="px-6 py-4">
              <LinkIcon
                className="h-5 w-5 hover:cursor-pointer hover:text-blue-500"
                onClick={(e) => {
                  e.stopPropagation()
                  push(book.url)
                }}
              />
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  )
}
