'use client'

import { blog_title } from '@/app/lib/definitions'
import Logo from '@/app/ui/Logo'
import ThemeToggle from '@/app/ui/home/ThemeToggle'

import { HashtagIcon } from '@heroicons/react/20/solid'
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
    <nav className="flex h-8 items-center justify-start divide-x divide-black border border-black bg-white dark:divide-white dark:border-white dark:bg-gray-900">
      <div className="px-8 dark:text-white sm:px-2 md:px-2 lg:px-3">
        <Link
          href="/"
          className="flex items-center text-sm font-light hover:cursor-pointer"
        >
          <Logo />
          {blog_title}
        </Link>
      </div>
      <div className="flex grow items-center justify-center divide-x divide-black self-stretch dark:divide-white">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="flex grow basis-0 items-center justify-center self-stretch"
          >
            <Link
              href={menu.href}
              className={`text-center text-sm font-thin hover:cursor-pointer hover:text-blue-600 dark:hover:text-blue-300 ${
                pathname === menu.href &&
                'font-normal text-blue-600 underline underline-offset-4 dark:text-blue-300 dark:underline dark:underline-offset-4'
              }`}
            >
              {menu.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 self-stretch px-8">
        <ThemeToggle />
        <a href="https://ittae.com/" target="_blank">
          <HashtagIcon className="h-5 w-5 text-gray-900 hover:cursor-pointer hover:text-blue-700 dark:text-white dark:hover:text-blue-500" />
        </a>
      </div>
    </nav>
  )
}
