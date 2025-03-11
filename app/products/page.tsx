import AllProducts from '@/components/AllProducts'
import { Filters } from '@/components/Filters'
import SortAccordion from '@/components/SortAccordion'
import { Suspense } from 'react'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string
    categories?: string
    sort?: 'asc' | 'desc'
    minPrice?: string
    maxPrice?: string
  }>
}) {
  const sp = await searchParams

  return (
    <div className="min-h-dvh max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
        <div>
          <SortAccordion />
          <Filters />
        </div>
        <Suspense key={JSON.stringify(sp)} fallback={<ProductsSkeleton />}>
          <AllProducts searchParams={sp} />
        </Suspense>
      </div>
    </div>
  )
}

function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 dark:bg-neutral-800 h-48 rounded-t-lg"></div>
          <div className="p-4 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
