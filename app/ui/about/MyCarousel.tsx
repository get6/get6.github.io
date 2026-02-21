'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function MyCarousel() {
  const myImages = [
    { src: '/images/about/me1.webp', objectPosition: 'center' },
    { src: '/images/about/me2.webp', objectPosition: 'center' },
    { src: '/images/about/me3.webp', objectPosition: 'center 70%' },
    { src: '/images/about/me4.webp', objectPosition: 'center bottom' },
    { src: '/images/about/me5.webp', objectPosition: 'center bottom' },
  ]

  return (
    <Carousel
      key={myImages.length}
      className="h-[300px] md:h-[340px] lg:h-[370px]"
      infiniteLoop
      showThumbs={false}
      autoPlay
      useKeyboardArrows
      autoFocus
      showStatus={false}
      showIndicators
      interval={4200}
    >
      {myImages.map((image, index) => (
        <div
          key={image.src}
          className="relative h-[300px] md:h-[340px] lg:h-[370px]"
        >
          <Image
            className="object-cover"
            style={{ objectPosition: image.objectPosition }}
            src={image.src}
            alt={`me-${index + 1}`}
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            fill
            sizes="(min-width: 1024px) 888px, (max-width: 1024px) 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
        </div>
      ))}
    </Carousel>
  )
}
