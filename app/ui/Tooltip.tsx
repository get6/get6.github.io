import { IsoDateTimeString } from 'contentlayer/core'
import { format } from 'date-fns'
{
  /* <button data-tooltip-target="tooltip-default" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Default tooltip</button> */
}

interface Props {
  date: IsoDateTimeString
}

export default function Tooltip({ date }: Props) {
  return (
    <div className="absolute bottom-[calc(100%+0.5rem)] left-[50%] hidden w-auto -translate-x-[50%] group-hover:block">
      <div className="bottom-full right-0 whitespace-nowrap rounded bg-black px-4 py-1 text-xs text-white">
        {format(new Date(date), 'yyyy-MM-dd HH:mm:ss')}
        <svg
          className="absolute left-0 top-full h-2 w-full text-black"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xmlSpace="preserve"
        >
          <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  )
}
