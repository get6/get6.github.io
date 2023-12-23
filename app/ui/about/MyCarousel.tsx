'use client'

import Me1 from '@/public/images/about/me1.jpg'
import Me2 from '@/public/images/about/me2.jpg'
import Me3 from '@/public/images/about/me3.jpg'
import Me4 from '@/public/images/about/me4.jpg'
import Me5 from '@/public/images/about/me5.jpg'

import Image from 'next/image'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export default function MyCarousel() {
  const myImages = [
    { src: Me1, objectPosition: 'center' },
    { src: Me2, objectPosition: 'center' },
    { src: Me3, objectPosition: 'center 70%' },
    { src: Me4, objectPosition: 'center bottom' },
    { src: Me5, objectPosition: 'center bottom' },
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
