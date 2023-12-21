'use client'

import { blog_title } from '@/app/lib/definitions'
import { HashtagIcon } from '@heroicons/react/20/solid'
import { SunIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  const menus = [
    { name: 'Books', href: '/books' },
    // { name: 'Life', href: '/life' },
    { name: 'Series', href: '/series' },
    { name: 'Tags', href: '/tags' },
    { name: 'About me', href: '/about' },
  ]

  return (
    <nav className="flex h-10 items-center justify-start divide-x divide-black border border-black bg-white shadow">
      <div className="px-8 sm:px-2 md:px-2 lg:px-3">
        <Link href="/" className="text-sm font-light hover:cursor-pointer">
          {`🌍 ${blog_title}`}
        </Link>
      </div>
      <div className="flex grow items-center justify-center divide-x divide-black self-stretch">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="flex grow basis-0 items-center justify-center self-stretch"
          >
            <Link
              href={menu.href}
              className={`text-center text-sm font-thin hover:cursor-pointer hover:text-blue-600 ${
                pathname === menu.href &&
                'font-normal text-blue-600 underline underline-offset-4'
              }`}
            >
              {menu.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 self-stretch px-8">
        <SunIcon className="h-6 w-6 text-gray-900 hover:cursor-pointer hover:text-yellow-500" />
        <a href="https://ittae.com/" target="_blank">
          <HashtagIcon className="h-5 w-5 text-gray-900 hover:cursor-pointer hover:text-blue-700" />
        </a>
      </div>
    </nav>
  )
}
