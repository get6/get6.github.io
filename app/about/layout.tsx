export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-[url('/images/bg.jpg')] bg-cover bg-bottom bg-no-repeat" />
      {children}
    </>
  )
}
