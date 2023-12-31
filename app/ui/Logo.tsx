import ThemeImage from '@/app/ui/ThemeImage'

export default function Logo() {
  return (
    <ThemeImage
      srcLight="/favicon.ico"
      srcDark="/favicon-dark.ico"
      alt="favicon"
      width={24}
      height={24}
    />
  )
}
