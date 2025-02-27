import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '../components/AddToCartButton'

export const revalidate = 10

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, image_path')

  if (error) {
    console.error('Ошибка загрузки товаров:', error)
    return <div>Ошибка загрузки товаров</div>
  }

  return (
    <div className="min-h-dvh max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center py-4">Все товары</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const imageUrl = supabase.storage
              .from('Product_pictures')
              .getPublicUrl(product.image_path).data.publicUrl

            return (
              <li
                key={product.id}
                className="border border-white/30 rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 flex flex-col"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="relative h-48 block"
                >
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    draggable="false"
                    className="object-cover rounded-t-lg"
                  />
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-semibold text-lg mb-2">{product.name}</h2>
                  <p className="text-foreground mb-4">${product.price}</p>
                  <div className="mt-auto items-center w-full">
                    <AddToCartButton
                      id={product.id}
                      name={product.name}
                      price={product.price}
                    />
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500 text-center">Нет товаров для отображения</p>
      )}
    </div>
  )
}
