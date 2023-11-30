interface Props {
  text: string
}

export default function Tag({ text }: Props) {
  return (
    <div className="flex items-center justify-center gap-1 rounded-[32px] bg-black px-3.5 pb-[9px] pt-[7px]">
      <div className="text-center text-base font-normal tracking-tight text-white">
        {text}
      </div>
    </div>
  )
}