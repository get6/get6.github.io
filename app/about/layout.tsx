import BackgroundImage from '@/app/ui/about/BackgroundImage'

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BackgroundImage />
      {children}
    </>
  )
}
