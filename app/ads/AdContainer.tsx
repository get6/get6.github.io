import AdSense from "@/app/ads/AdSense"
import Script from "next/script"

interface Props {
    id: string
}

export const AdContainer = ({ id }: Props) => {
    return (
        <div>
            <AdSense/>
            <Script id={id}>(adsbygoogle = window.adsbygoogle || []).push({});</Script>
        </div>
    )
}