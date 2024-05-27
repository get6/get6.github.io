import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/images/logo.png"
      className="h-6 w-6"
      alt="logo"
      width={24}
      height={24}
      priority
    />
  )
}
