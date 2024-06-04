import Toc from '@/app/ui/Toc'

interface Props {
  headers: ToC[]
}

// Toc의 맞은편에 위치해서 게시글이 중앙에 위치하도록 함
export default function AsideHelper({ headers }: Props) {
  return (
    headers && (
      <aside className="hidden max-w-fit xl:invisible xl:block">
        <Toc headers={headers} />
      </aside>
    )
  )
}
