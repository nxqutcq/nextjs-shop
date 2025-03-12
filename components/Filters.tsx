'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Accordion } from './shared/Accordion'
import Slider from 'rc-slider'
import debounce from 'lodash.debounce'
import 'rc-slider/assets/index.css'

export function Filters() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [categories, setCategories] = useState<string[]>([])

  const currentCategories = searchParams.get('categories')?.split(',') || []
  const currentMinPrice = searchParams.get('minPrice') || '0'
  const currentMaxPrice = searchParams.get('maxPrice') || '1000'

  const [priceRange, setPriceRange] = useState([
    Number(currentMinPrice),
    Number(currentMaxPrice),
  ])

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

  const updateParams = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        router.replace(`?${params.toString()}`)
      })
    },
    [router, startTransition]
  )

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

  const handlePriceChange = useCallback(
    (min: number, max: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('minPrice', min.toString())
      params.set('maxPrice', max.toString())
      params.set('page', '1')
      updateParams(params)
    },
    [searchParams, updateParams]
  )

  const debouncedPriceChange = useMemo(
    () =>
      debounce((min: number, max: number) => {
        handlePriceChange(min, max)
      }, 500),
    [handlePriceChange]
  )

  useEffect(() => {
    return () => {
      debouncedPriceChange.cancel()
    }
  }, [debouncedPriceChange])

  useEffect(() => {
    setPriceRange([
      Number(searchParams.get('minPrice')) || 0,
      Number(searchParams.get('maxPrice')) || 1000,
    ])
  }, [searchParams])

  const resetFilters = () => {
    const params = new URLSearchParams()
    params.delete('categories')
    params.delete('minPrice')
    params.delete('maxPrice')
    params.set('page', '1')
    updateParams(params)
  }

  const hasActiveFilters =
    currentCategories.length > 0 ||
    currentMinPrice !== '0' ||
    currentMaxPrice !== '1000'

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

        <Accordion title="Диапазон цены">
          <div className="w-full p-2">
            <Slider
              range
              className=""
              min={0}
              max={1000}
              value={priceRange}
              onChange={(value: number | number[]) => {
                if (Array.isArray(value)) {
                  setPriceRange(value)
                  debouncedPriceChange(value[0], value[1])
                }
              }}
            />
            <div className="flex justify-between mt-2">
              <span>{priceRange[0]}</span>
              <span>{priceRange[1]}</span>
            </div>
          </div>
        </Accordion>
        <button
          onClick={resetFilters}
          disabled={!hasActiveFilters}
          className={`w-full mt-4 px-4 py-2 rounded-md transition-colors ${
            hasActiveFilters
              ? 'bg-blue-600 text-white text-sm hover:bg-blue-700 cursor-pointer'
              : 'bg-gray-300 dark:bg-gray-700 text-sm text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  )
}
