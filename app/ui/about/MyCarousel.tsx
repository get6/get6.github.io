'use client'
import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function MyCarousel() {
  const myImages = [
    { src: '/images/about/me1.jpg', objectPosition: 'center' },
    { src: '/images/about/me2.jpg', objectPosition: 'center' },
    { src: '/images/about/me3.jpg', objectPosition: 'center 70%' },
    { src: '/images/about/me4.jpg', objectPosition: 'center bottom' },
    { src: '/images/about/me5.jpg', objectPosition: 'center bottom' },
  ]

  return (
    <Carousel
      key={myImages.length}
      className="h-[370px]"
      infiniteLoop
      showThumbs={false}
      autoPlay
      useKeyboardArrows
      autoFocus
    >
      {myImages.map((image, index) => (
        <div key={index} className="relative h-[370px]">
          <Image
            className="object-cover"
            style={{ objectPosition: image.objectPosition }}
            src={image.src}
            alt={`me-${index}`}
            priority
            fill
            sizes="(min-width: 1024px) 888px, (max-width: 1024px) 100vw"
          />
        </div>
      ))}
    </Carousel>
  )
}
