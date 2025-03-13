'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Input } from './shared/Input'
import Image from 'next/image'
import { SearchIcon } from './shared/icons/SearchIcon'
import debounce from 'lodash.debounce'
import Link from 'next/link'
import { SearchBarProducts } from '@/types/product'

export function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchBarProducts[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const fetchResults = useCallback(async (searchText: string) => {
    try {
      const res = await fetch(
        `/api/search?searchText=${encodeURIComponent(searchText)}`
      )
      if (!res.ok) {
        throw new Error('Ошибка при получении данных')
      }
      const data = await res.json()
      setResults(data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const debouncedFetchResults = useMemo(
    () =>
      debounce((searchText) => {
        if (searchText.trim() !== '') {
          fetchResults(searchText)
        } else {
          setResults([])
        }
      }, 500),
    [fetchResults]
  )

  useEffect(() => {
    debouncedFetchResults(query)
    return () => {
      debouncedFetchResults.cancel()
    }
  }, [query, debouncedFetchResults])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false)
      }
    }
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isModalOpen])

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="p-2 mr-1 rounded-lg border border-gray-200/20 bg-black/5 dark:bg-white/15 dark:hover:bg-white/20 hover:bg-gray-500/20"
      >
        <SearchIcon />
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex justify-center items-start"
          style={{ paddingTop: 'var(--header-height, 4rem)' }}
        >
          <div
            className="w-full max-w-7xl bg-white dark:bg-neutral-900 p-4 rounded shadow-lg"
            ref={containerRef}
          >
            <Input
              className="w-full"
              placeholder="Поиск..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus={true}
            />
            <div className="mt-4 max-h-[70vh] overflow-auto">
              {results.length > 0 ? (
                <ul>
                  {results.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      onClick={() => {
                        setIsModalOpen(false)
                        setQuery('')
                        setResults([])
                      }}
                      key={product.id}
                    >
                      <li className="p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer">
                        <div className="flex items-center">
                          {product.publicUrl ? (
                            <Image
                              src={product.publicUrl}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 object-cover mr-2"
                            />
                          ) : (
                            <div className="w-10 h-10 dark:bg-neutral-600 bg-gray-300 mr-2" />
                          )}
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              {product.price}$
                            </p>
                          </div>
                        </div>
                      </li>
                    </Link>
                  ))}
                </ul>
              ) : (
                <p className="p-2 text-gray-500">Ничего не найдено</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
