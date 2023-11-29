import { SunIcon } from '@heroicons/react/24/outline'
import { GlobeAsiaAustraliaIcon } from '@heroicons/react/24/solid'

export default function Navbar() {
  const menus = [
    { name: 'Books', href: '#' },
    { name: 'Life', href: '#' },
    { name: 'Series', href: '#' },
    { name: 'Tags', href: '#' },
    { name: 'About me', href: '#' },
  ]

  return (
    <nav className="flex h-12 w-screen items-center justify-start divide-x divide-black border border-black bg-white shadow">
      <div className="px-8">
        <span className="text-xl hover:cursor-pointer">
          🌍 Sunhwang&apos;s blog
        </span>
      </div>
      <div className="flex grow items-center justify-center divide-x divide-black self-stretch">
        {menus.map((menu, index) => (
          <div
            key={index}
            className="flex grow basis-0 items-center justify-center self-stretch"
          >
            <div className="text-center text-lg font-thin hover:cursor-pointer hover:text-blue-600">
              {menu.name}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 self-stretch px-8">
        <SunIcon className="h-6 w-6 text-gray-900 hover:cursor-pointer hover:text-yellow-500" />
        <GlobeAsiaAustraliaIcon className="h-6 w-6 text-gray-900 hover:cursor-pointer hover:text-blue-700" />
      </div>
    </nav>
  )
}
