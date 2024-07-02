export default function Article({ html }: { html: string }) {
  return (
    <article
      className={`prose my-4 dark:prose-invert prose-a:text-blue-600 prose-pre:max-w-[85vw] prose-table:table-fixed prose-th:text-start prose-th:align-top prose-td:text-pretty prose-td:break-words prose-img:mx-auto prose-img:my-0 prose-img:rounded-xl prose-img:shadow dark:prose-a:text-blue-500 md:prose-pre:max-w-none prose-a:no-underline`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
