'use client'

import bg from '@/public/images/about/bg.jpg'
import dargBg from '@/public/images/about/dark-bg.jpg'

import { useTheme } from 'next-themes'
import Image, { ImageProps } from 'next/image'
import { CSSProperties } from 'react'

export default function BackgroundImage() {
  const { resolvedTheme } = useTheme()

  const attributes: Omit<ImageProps, 'src' | 'alt'> = {
    placeholder: 'blur',
    quality: 100,
    sizes: '100vw',
  }
  const style: CSSProperties = {
    objectFit: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  }

  return (
    <>
      <Image
        {...attributes}
        alt="Dark mountain background image"
        src={dargBg}
        style={{
          ...style,
          display: resolvedTheme === 'dark' ? 'unset' : 'none',
        }}
      />
      <Image
        {...attributes}
        alt="Mountain background image"
        src={bg}
        style={{
          ...style,
          display: resolvedTheme === 'light' ? 'unset' : 'none',
        }}
      />
    </>
  )
}
