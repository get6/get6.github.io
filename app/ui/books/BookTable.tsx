import { Book } from '@/.contentlayer/generated'
import Table, { TableBody, TableHead } from '@/app/ui/Table'
import { LinkIcon } from '@heroicons/react/24/solid'
import { format } from 'date-fns'
import Image from 'next/image'

interface Props {
  books: Book[]
}

export default function BookTable({ books }: Props) {
  const heads = ['Title', 'Author', 'Published', 'Price', 'Category', 'URL']

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
            className="border-b bg-white hover:cursor-pointer hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
          >
            <th
              scope="row"
              className="flex items-center justify-center gap-2 whitespace-nowrap py-4 font-medium text-gray-900 dark:text-white"
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
            <td className="px-6 py-4">&#8361;30,000</td>
            <td className="px-6 py-4">{book.category}</td>
            <td className="px-6 py-4">
              <LinkIcon className="h-5 w-5 hover:text-blue-500" />
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  )
}
