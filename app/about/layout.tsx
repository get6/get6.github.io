export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="fixed left-0 top-0 -z-10 h-full w-full bg-[url('/images/about/bg.jpg')] bg-cover bg-bottom bg-no-repeat dark:bg-slate-900 dark:bg-[url('/images/about/dark-bg.jpg')] dark:bg-center" />
      {children}
    </>
  )
}
