export default function Article({ html }: { html: string }) {
  return (
    <article
      className="prose py-4 dark:prose-invert prose-headings:text-inherit prose-a:text-blue-600 prose-img:mx-auto prose-img:rounded-xl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
