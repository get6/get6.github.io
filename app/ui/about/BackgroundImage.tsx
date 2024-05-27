'use client'

import bg from '@/public/images/about/bg.jpg'
import dargBg from '@/public/images/about/dark-bg.jpg'

import { useTheme } from 'next-themes'
import Image, { ImageProps } from 'next/image'

export default function BackgroundImage() {
  const { resolvedTheme } = useTheme()

  const attributes: Omit<ImageProps, 'src' | 'alt'> = {
    placeholder: 'blur',
    sizes: '100vw',
  }
  const className =
    'fixed left-0 top-0 z-[-1] h-full w-full object-cover select-none'

  const isDark = resolvedTheme === 'dark'

  return (
    <>
      <Image
        {...attributes}
        src={dargBg}
        alt="Dark mountain background image"
        className={`${className} ${isDark ? 'block' : 'hidden'}`}
      />
      <Image
        {...attributes}
        src={bg}
        alt="Mountain background image"
        className={`${className} ${isDark ? 'hidden' : 'block'}`}
      />
    </>
  )
}
