import { useState } from 'react'

export function Accordion({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b items-center flex flex-col text-sm">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full my-2 py-3 px-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-white/20 transition-colors rounded-lg"
      >
        <span className="font-medium text-foreground">{title}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            open ? 'rotate-180' : ''
          } text-gray-600 dark:text-gray-400`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="p-2 w-full flex flex-col items-center space-y-3 bg-neutral-100 dark:hover:bg-neutral-800 transition-all dark:bg-transparent m-2 rounded-lg">
          {children}
        </div>
      )}
    </div>
  )
}
