'use client'

import Giscus from '@giscus/react'

export default function GitHubGiscus() {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Giscus
          id="comments"
          repo="get6/get6.github.io"
          repoId="R_kgDOKybsIA"
          category="Announcements"
          categoryId="DIC_kwDOKybsIM4Cicqs"
          mapping="pathname"
          strict="0"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="ko"
        />
      )}
    </>
  )
}
