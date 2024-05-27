import Image from 'next/image'

const isImageType = (child: any) => {
  return child.type === 'img' || child.type instanceof Function
}

const hasImage = (props: any) => {
  if (
    props.children instanceof Array &&
    (props.children as any[]).some((child) => isImageType(child))
  ) {
    console.log(props)
  }
  return (
    (props.children instanceof Object &&
      (props.children.type === 'img' ||
        props.children.type instanceof Function)) ||
    (props.children instanceof Array &&
      (props.children as any[]).some((child) => isImageType(child)))
  )
}

const mdxComponents = {
  p: (props: any) => {
    let className = props.className || ''
    if (hasImage(props)) {
      if (props.children instanceof Array) {
        const imgs = (props.children as any[]).filter((child) =>
          isImageType(child),
        )
        if (1 < imgs.length) className += 'flex-wrap justify-center gap-4'
      }
    }
    return (
      <p {...props} className={`${className}`}>
        {props.children}
      </p>
    )
  },
  img: (props: any) => {
    let width = 650
    let height = 300
    // Unsplash 이미지는 next/image로 처리
    if (props.src.includes('images.unsplash.com')) {
      // eslint-disable-next-line @next/next/no-img-element
      const searchParams = new URL(props.src).searchParams
      width = Number(searchParams.get('w')) ?? width
      // height = Number(searchParams.get('h')) ?? height
      // return (
      //   <Image
      //     {...props}
      //     alt={props.alt}
      //     width={width}
      //     height={432}
      //     className="aspect-auto"
      //   />
      // )
      return <img {...props} alt={props.alt} className="aspect-square" />
    }

    const alt = props.alt
    if (alt && alt.toString().includes('|')) {
      const num = alt.split('|').map((s: string) => s.trim())[1]
      width = isNaN(Number(num)) ? width : Number(num)
    }
    if (!props.src.includes('://')) {
      return (
        <Image
          {...props}
          src={`/blog/${props.src}`}
          alt={props.alt}
          // placeholder="blur"
          // blurDataURL={`/_next/image?url=${props.src}&w=16&q=1`}
          width={width}
          height={500}
        />
      )
    }
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}

export default function Article({ html }: { html: string }) {
  const prose_img = 'my-0 rounded-xl shadow-sm'
    .split(' ')
    .map((s) => `prose-img:${s}`)
    .join(' ')

  // const MDXContent = useMDXComponent(html)
  return (
    <article
      className={`prose dark:prose-invert prose-p:items-center prose-a:text-blue-600 prose-pre:max-w-[85vw] dark:prose-a:text-blue-500 md:prose-pre:max-w-none ${prose_img}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
    // <article
    //   className={`prose dark:prose-invert prose-p:items-center prose-a:text-blue-600 prose-pre:max-w-[85vw] dark:prose-a:text-blue-500 md:prose-pre:max-w-none ${prose_img}`}
    // >
    //   <MDXContent components={mdxComponents} />
    // </article>
  )
}
