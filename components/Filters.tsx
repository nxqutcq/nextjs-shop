'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import LoadingIcon from '@/components/shared/icons/LoadingIcon'
import { supabase } from '@/lib/supabaseClient'
import { Input } from './shared/Input'
import { Accordion } from './shared/Accordion'

export function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

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
      setLoading(false)
    }
    fetchCategories()
  }, [])

  const updateParams = (params: URLSearchParams) => {
    router.replace(`?${params.toString()}`)
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
    <div className="filters p-4 dark:bg-white/10 border dark:border-white/20 rounded-md mb-4">
      <Accordion title="Категории">
        {loading ? (
          <LoadingIcon />
        ) : (
          categories.map((category) => (
            <label key={category} className="block mb-1">
              <Input
                type="checkbox"
                checked={currentCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2"
              />
              {category}
            </label>
          ))
        )}
      </Accordion>

      <Accordion title="Сортировка">
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc')}
          className="border rounded p-1 text-black w-full"
        >
          <option value="asc">По возрастанию цены</option>
          <option value="desc">По убыванию цены</option>
        </select>
      </Accordion>

      <Accordion title="Диапазон цены">
        <div className="space-y-2">
          <div>
            <label>Мин. цена:</label>
            <Input
              type="number"
              value={currentMinPrice}
              onChange={(e) =>
                handlePriceChange(
                  Number(e.target.value),
                  Number(currentMaxPrice)
                )
              }
              className="text-black dark:text-white border rounded p-1 w-full"
            />
          </div>
          <div>
            <label>Макс. цена:</label>
            <Input
              type="number"
              value={currentMaxPrice}
              onChange={(e) =>
                handlePriceChange(
                  Number(currentMinPrice),
                  Number(e.target.value)
                )
              }
              className="text-black dark:text-white border rounded p-1 w-full"
            />
          </div>
        </div>
      </Accordion>
    </div>
  )
}
