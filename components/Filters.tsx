'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Accordion } from './shared/Accordion'

export function Filters() {
  const [isPending, startTransition] = useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])

  const currentCategories = searchParams.get('categories')?.split(',') || []
  const currentSort = searchParams.get('sort') || 'asc'
  const currentMinPrice = searchParams.get('minPrice') || '0'
  const currentMaxPrice = searchParams.get('maxPrice') || '1000'

  useEffect(() => {
    async function fetchCategories() {
      const { data, error } = await supabase.from('products').select('category')
      if (error) {
        console.error('Ошибка при получении категорий:', error)
      } else if (data) {
        const uniqueCategories = Array.from(
          new Set(data.map((item) => item.category).filter(Boolean))
        ) as string[]
        setCategories(uniqueCategories)
      }
    }
    fetchCategories()
  }, [])

  const updateParams = (params: URLSearchParams) => {
    startTransition(() => {
      router.replace(`?${params.toString()}`)
    })
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter((c) => c !== category)
      : [...currentCategories, category]

    if (newCategories.length > 0) {
      params.set('categories', newCategories.join(','))
    } else {
      params.delete('categories')
    }
    params.set('page', '1')
    updateParams(params)
  }

  const handleSortChange = (sortOrder: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    params.set('page', '1')
    updateParams(params)
  }

  const handlePriceChange = (min: number, max: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('minPrice', min.toString())
    params.set('maxPrice', max.toString())
    params.set('page', '1')
    updateParams(params)
  }

  return (
    <div className="relative">
      {isPending && (
        <div className="absolute inset-0 bg-white/80 dark:bg-black/80 z-10 flex items-center justify-center"></div>
      )}
      <div className="filters p-2 bg-stone-100 dark:bg-neutral-800 rounded-md mb-4">
        <Accordion title="Категории">
          <div className="flex flex-col gap-2 w-full">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center w-full space-x-3 p-2 rounded-lg hover:bg-neutral-300 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={currentCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 rounded text-blue-600 dark:bg-gray-800 focus:ring-blue-500 dark:focus:ring-offset-gray-900"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </Accordion>

        <Accordion title="Сортировка">
          <select
            value={currentSort}
            onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc')}
            className="outline-none rounded cursor-pointer p-2 transition-all bg-transparent text-black dark:text-white w-full"
          >
            <option
              className=" dark:bg-black text-black dark:text-white"
              value="asc"
            >
              По возрастанию цены
            </option>
            <option
              className=" dark:bg-black text-black dark:text-white"
              value="desc"
            >
              По убыванию цены
            </option>
          </select>
        </Accordion>

        <Accordion title="Диапазон цены">
          <div className="space-y-3 w-full p-2">
            <div className="flex flex-col gap-1">
              <label className="ml-1">Мин. цена:</label>
              <input
                type="number"
                value={currentMinPrice}
                onChange={(e) =>
                  handlePriceChange(
                    Number(e.target.value),
                    Number(currentMaxPrice)
                  )
                }
                className="text-black bg-transparent border dark:border-white/10 dark:text-white rounded p-2 mt-1 w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="ml-1">Макс. цена:</label>
              <input
                type="number"
                value={currentMaxPrice}
                onChange={(e) =>
                  handlePriceChange(
                    Number(currentMinPrice),
                    Number(e.target.value)
                  )
                }
                className="text-black bg-transparent border dark:border-white/10 dark:text-white rounded p-2 mt-1 w-full"
              />
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  )
}
