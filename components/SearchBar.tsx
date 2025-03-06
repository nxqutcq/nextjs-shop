'use client'
import { useState, useEffect, useRef } from 'react'
import { Input } from './shared/Input'
import { supabase } from '@/lib/supabaseClient'
import { useDebounce } from '@/hooks/useDebounce'
import Image from 'next/image'
import { SearchIcon } from './shared/icons/SearchIcon'
import { SearchBarProducts } from '@/types/product'

export function SearchBar() {
  const [isActive, setIsActive] = useState(false)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [results, setResults] = useState<SearchBarProducts[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      fetchResults(debouncedQuery)
    } else {
      setResults([])
    }
  }, [debouncedQuery])

  async function fetchResults(searchText: string) {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, price, image_path')
      .ilike('name', `%${searchText}%`)
    if (error) {
      console.error(error)
    } else {
      setResults(data || [])
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsActive(false)
      }
    }
    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isActive])

  return (
    <div className="relative w-full flex justify-end" ref={containerRef}>
      <div className="flex relative items-center w-full justify-end ml-5 mr-1 gap-1">
        {!isActive && (
          <button
            onClick={() => setIsActive(true)}
            className="p-2 absolute rounded-lg border border-gray-200/20 bg-black/5 dark:bg-white/15 dark:hover:bg-white/20 hover:bg-gray-500/20 z-10"
          >
            <SearchIcon />
          </button>
        )}
        <div
          className="overflow-hidden transition-all duration-500 flex"
          style={{
            width: isActive ? '100%' : '0px',
            opacity: isActive ? 1 : 0,
          }}
        >
          <Input
            className="w-full"
            placeholder="Поиск..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus={isActive}
          />
        </div>
      </div>
      <div
        className="absolute ml-5 mr-1 left-0 right-0 top-full bg-white dark:bg-neutral-800 z-50 overflow-auto transition-all duration-500"
        style={{
          height: 'calc(100vh - 3rem)',
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateY(0)' : 'translateY(-10px)',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      >
        {results.length > 0 ? (
          <ul>
            {results.map((product) => (
              <li
                key={product.id}
                className="p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
              >
                <div className="flex items-center">
                  <Image
                    src={product.image_path}
                    alt={product.name}
                    className="w-10 h-10 object-cover mr-2"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-2 text-gray-500">Ничего не найдено</p>
        )}
      </div>
    </div>
  )
}
