'use client'
import React, { useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SortAccordion() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [, startTransition] = useTransition()

  const currentSort = searchParams.get('sort') || 'asc'

  const updateParams = (params: URLSearchParams) => {
    startTransition(() => {
      router.replace(`?${params.toString()}`)
    })
  }

  const handleSortChange = (sortOrder: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    params.set('page', '1')
    updateParams(params)
  }

  return (
    <div className="w-full text-sm justify-between px-5 items-center mb-3 flex">
      <span className="">Сортировка:</span>
      <select
        value={currentSort}
        onChange={(e) => handleSortChange(e.target.value as 'asc' | 'desc')}
        className="outline-none w-full md:w-min rounded cursor-pointer p-3 transition-all bg-transparent text-black dark:text-white"
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
    </div>
  )
}
