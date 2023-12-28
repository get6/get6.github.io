export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="absolute top-0 -z-10 h-screen w-full bg-[url('/images/bg.jpg')] bg-cover bg-bottom" />
      {children}
    </>
  )
}
