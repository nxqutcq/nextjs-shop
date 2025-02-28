import React from 'react'

interface ErrorProps {
  error: {
    message: string
  }
  reset: () => void
}

export default function ErrorComponent({ error, reset }: ErrorProps) {
  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold mb-4">Ошибка: {error.message}</h2>
      <button
        onClick={() => reset()}
        className="bg-gray-400/10 text-foreground hover:bg-gray-400/30 border-black/10 border dark:border-white/20 px-4 py-2 rounded-md"
      >
        Попробовать снова
      </button>
    </div>
  )
}
