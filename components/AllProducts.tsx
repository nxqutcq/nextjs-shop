import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'
import { supabase } from '@/lib/supabaseClient'
import { ProductsWithoutDescription } from '@/types/product'
import Pagination from '@/components/Pagination'

interface AllProductsProps {
  searchParams?: {
    page?: string
    categories?: string
    sort?: 'asc' | 'desc'
    minPrice?: string
    maxPrice?: string
  }
}

export default async function AllProducts({ searchParams }: AllProductsProps) {
  const page = Number(searchParams?.page) || 1
  const pageSize = 20
  const categories = searchParams?.categories?.split(',') || []
  const sort = searchParams?.sort === 'desc' ? 'desc' : 'asc'
  const minPrice = Number(searchParams?.minPrice) || 0
  const maxPrice = Number(searchParams?.maxPrice) || 1000

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
    <div>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const {
              data: { publicUrl },
            } = supabase.storage
              .from('Product_pictures')
              .getPublicUrl(product.image_path)

            return (
              <li
                key={product.id}
                className="border border-white/20 rounded-lg shadow-md md:hover:scale-105 transition-transform duration-200"
              >
                <Link
                  href={`/product/${product.id}`}
                  className="block relative h-48"
                >
                  <Image
                    src={publicUrl}
                    alt={product.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </Link>
                <div className="p-4">
                  <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                  <p className="text-foreground mb-4">${product.price}</p>
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-center text-gray-500 py-8">Товары не найдены</p>
      )}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  )
}
