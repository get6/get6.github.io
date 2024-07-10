import { AdContainer } from '@/app/ads/AdContainer'

interface Props {
  id: string
  children: React.ReactNode
}

export default function DetailScreen({ id, children }: Props) {
  return (
    <AdContainer id={`ads-${id}`}>
      <main className="m-4 flex place-items-center gap-4 lg:m-0 lg:my-16">
        <div className="flex flex-col items-center gap-4 border border-black p-6 dark:border-white lg:w-[840px]">
          {children}
        </div>
      </main>
    </AdContainer>
  )
}
