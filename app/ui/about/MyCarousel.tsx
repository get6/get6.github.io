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
    { src: Me3, objectPosition: 'center bottom' },
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
            src={image.src}
            alt={`sunhwang + ${index}`}
            priority
            fill
            style={{ objectFit: 'cover', objectPosition: image.objectPosition }}
            sizes="(max-width: 886px) 100vw, 370px"
          />
        </div>
      ))}
    </Carousel>
  )
}
