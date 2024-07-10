import { AdContainer } from '@/app/ads/AdContainer'

interface Props {
  id: string
  children: React.ReactNode
}

export default function PageScreen({ id, children }: Props) {
  return (
    <AdContainer id={`ads-${id}`}>
      <main className="flex place-content-center px-4 py-4 lg:px-0 lg:py-20">
        <div className="flex w-full flex-col place-items-center lg:max-w-[1116px]">
          {children}
        </div>
      </main>
    </AdContainer>
  )
}
