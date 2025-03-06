import { supabase } from '@/lib/supabaseClient'
import AllProducts from '@/components/AllProducts'
import Pagination from '@/components/Pagination'
import { Filters } from '@/components/Filters'
import { ProductsWithoutDescription } from '@/types/product'

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
  const page = Number(sp.page) || 1
  const pageSize = 20
  const categories = sp.categories?.split(',') || []
  const sort = sp.sort === 'desc' ? 'desc' : 'asc'
  const minPrice = Number(sp.minPrice) || 0
  const maxPrice = Number(sp.maxPrice) || 1000

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .gte('price', minPrice)
    .lte('price', maxPrice)

  if (categories.length > 0) {
    query = query.in('category', categories)
  }

  query = query.order('price', { ascending: sort === 'asc' })

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  const { data, error, count } = await query.range(from, to)

  if (error) throw new Error('Ошибка загрузки товаров')

  const products = data as ProductsWithoutDescription[]
  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="min-h-dvh max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
        <Filters />
        <div>
          <AllProducts products={products} />
          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </div>
    </div>
  )
}
