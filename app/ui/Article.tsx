export default function Article({ html }: { html: string }) {
  const prose_a = 'prose-a:text-blue-600 dark:prose-a:text-blue-500'
  const prose_pre = 'prose-pre:max-w-[85vw] md:prose-pre:max-w-none'
  const prose_img = 'my-0 rounded-xl shadow-sm'
    .split(' ')
    .map((s) => `prose-img:${s}`)
    .join(' ')

  return (
    <article
      className={`prose dark:prose-invert prose-headings:text-inherit prose-p:items-center ${prose_a} ${prose_pre} ${prose_img}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
