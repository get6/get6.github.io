import AdSense from "@/app/ads/AdSense"
import Script from "next/script"

interface Props {
    id: string
    children: React.ReactNode
}

export const AdContainer = ({ id, children }: Props) => {
    return (
        <>
            <AdSense/>
            {children}
            <Script id={id}>(adsbygoogle = window.adsbygoogle || []).push({});</Script>
        </>
    )
}