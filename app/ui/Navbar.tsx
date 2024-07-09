'use client'

import { blog_name, menus } from '@/app/lib/definitions'
import Logo from '@/app/ui/Logo'
import ThemeToggle from '@/app/ui/home/ThemeToggle'
import { HashtagIcon } from '@heroicons/react/20/solid'
import { Bars3Icon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  // State to keep track of whether the menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to toggle the menu state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const pathname = usePathname()

  const mdNavbar = (
    <>
      <div className="px-8 dark:text-white sm:px-2 md:px-2 lg:px-3">
        <Link
          href="/"
          className="flex items-center text-sm font-light hover:cursor-pointer"
        >
          <Logo />
          {blog_name}
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
    </>
  )

  const defaultNavbar = (
    <>
      <div className="flex h-full items-center px-2 hover:cursor-pointer dark:text-white">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          onClick={toggleMenu}
        >
          <Bars3Icon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } absolute left-2 top-10 z-10 md:block`}
      >
        <div className="w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900 rtl:space-x-reverse">
            {menus.map((menu, index) => (
              <li key={index}>
                <button onClick={toggleMenu}>
                  <Link
                    href={menu.href}
                    className={` ${
                      pathname === menu.href &&
                      'block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0 md:text-blue-700 md:dark:text-blue-500'
                    } ${
                      pathname !== menu.href &&
                      'block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500'
                    }`}
                  >
                    {menu.name}
                  </Link>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button onClick={() => setIsMenuOpen(false)}>
        <Link
          href="/"
          className="flex h-full items-center justify-center gap-2 text-xl font-light hover:cursor-pointer dark:text-white"
        >
          <Logo />
          {blog_name}
        </Link>
      </button>
      <div className="flex h-full items-center px-4">
        <ThemeToggle />
      </div>
    </>
  )

  return (
    <nav className="bg-white dark:bg-gray-900">
      <div className="hidden h-8 items-center justify-start divide-x divide-black border border-black dark:divide-white dark:border-white md:flex">
        {mdNavbar}
      </div>
      <div className="flex h-14 items-center justify-between dark:text-gray-900 md:hidden">
        {defaultNavbar}
      </div>
    </nav>
  )
}
