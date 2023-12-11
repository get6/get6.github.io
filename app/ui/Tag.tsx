interface Props {
  text: string
  onClick?: () => void
}

export default function Tag({ text, onClick }: Props) {
  return (
    <div
      className="leading-sm inline-flex items-center rounded-full border bg-white px-3 py-1 text-xs font-bold uppercase text-gray-700 hover:cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>

    // <div className="flex items-center justify-center gap-1 rounded-[32px] bg-black px-3.5 pb-[9px] pt-[7px]">
    //   <div className="text-center text-base font-normal tracking-tight text-white">
    //     {text}
    //   </div>
    // </div>
  )
}
