'use client'

import Image, { ImageProps } from 'next/image'

export default function BackgroundImage() {
  const attributes: Omit<ImageProps, 'src' | 'alt'> = {
    sizes: '100vw',
  }
  // TODO import했을 때는 번쩍이는게 없었는데 src로 옮기고 나서는 계속 발생함
  return (
    <>
      <Image
        {...attributes}
        src="/images/about/dark-bg.jpg"
        alt="Dark mountain background image"
        className="fixed left-0 top-0 z-[-1] hidden h-full w-full select-none object-cover dark:block"
        width={2048}
        height={1107}
      />
      <Image
        {...attributes}
        src="/images/about/bg.jpg"
        alt="Mountain background image"
        className="fixed left-0 top-0 z-[-1] block h-full w-full select-none object-cover dark:hidden"
        width={2048}
        height={1107}
      />
    </>
  )
}
