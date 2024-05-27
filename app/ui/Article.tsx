export default function Article({ html }: { html: string }) {
  const prose_img = 'my-0 rounded-xl shadow-sm'
    .split(' ')
    .map((s) => `prose-img:${s}`)
    .join(' ')

  return (
    <article
      className={`prose dark:prose-invert prose-p:items-center prose-a:text-blue-600 prose-pre:max-w-[85vw] dark:prose-a:text-blue-500 md:prose-pre:max-w-none ${prose_img}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
