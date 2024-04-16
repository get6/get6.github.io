export default function Article({ html }: { html: string }) {
  return (
    <article
      className="prose py-4 dark:prose-invert prose-headings:text-inherit prose-a:text-blue-600 prose-pre:max-w-[85vw] prose-img:mx-auto prose-img:rounded-xl md:prose-pre:max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
