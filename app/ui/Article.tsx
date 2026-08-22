import { AdsInPost } from '@/app/ads/AdsInPost'

export default function Article({ html }: { html: string }) {
  return (
    <div className="my-4 gap-4">
      <article
        className={`prose w-full min-w-0 max-md:max-w-[min(65ch,calc(100vw_-_4.5rem))] text-pretty dark:prose-invert prose-a:text-blue-600 prose-a:no-underline prose-pre:max-w-full prose-ol:my-0 prose-ol:mb-3 prose-ul:my-0 prose-ul:mb-3 prose-li:my-1 prose-table:table-fixed prose-th:text-start prose-th:align-top prose-td:text-pretty prose-td:break-words prose-img:mx-auto prose-img:my-0 prose-img:max-w-full prose-img:h-auto prose-img:rounded-xl prose-img:shadow dark:prose-a:text-blue-500 md:prose-pre:max-w-none`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <AdsInPost />
    </div>
  )
}
