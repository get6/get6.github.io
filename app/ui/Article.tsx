import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'

const mdxComponents = {
  img: (props: any) => {
    // Unsplash 이미지는 next/image로 처리
    if (props.src.includes('images.unsplash.com')) {
      // const searchParams = new URL(props.src).searchParams
      // width = Number(searchParams.get('w')) ?? width
      // height = Number(searchParams.get('h')) ?? height
      // return (
      //   <Image
      //     {...props}
      //     alt={props.alt}
      //     width={width}
      //     height={432}
      //   />
      // )
    }

    if (!props.src.includes('://')) {
      let width = props.width ?? 650
      let height = 300
      return (
        <Image
          {...props}
          alt={props.alt}
          placeholder="blur"
          blurDataURL={`/_next/image?url=${props.src}&w=16&q=1`}
          width={width}
          height={height}
        />
      )
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}

export default function Article({ code }: { code: string }) {
  const MDXContent = useMDXComponent(code)
  return (
    <article
      className={`prose mt-8 dark:prose-invert prose-a:text-blue-600 prose-pre:max-w-[85vw] prose-img:mx-auto prose-img:my-0 prose-img:rounded-xl prose-img:shadow-sm dark:prose-a:text-blue-500 md:prose-pre:max-w-none`}
    >
      <MDXContent components={mdxComponents} />
    </article>
  )
}
