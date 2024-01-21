interface Props {
  children: React.ReactNode
}

export function TableHead({ children }: Props) {
  return (
    <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
      {children}
    </thead>
  )
}

export function TableBody({ children }: Props) {
  return <tbody>{children}</tbody>
}

export default function Table({ children }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        {children}
      </table>
    </div>
  )
}
