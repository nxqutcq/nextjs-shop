import { supabase } from '@/app/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from './components/AddToCartButton'

export const revalidate = 10;

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, image_path')
  if (error) {
    console.error('Ошибка загрузки товаров:', error)
    return <div>Ошибка загрузки товаров</div>
  }

  return (
    <div className="min-h-dvh">
      <h1 className="text-2xl font-bold mb-4">Все товары</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = supabase.storage
              .from('Product_pictures')
              .getPublicUrl(product.image_path).data.publicUrl
            return (
              <div
                className="border p-4 justify-between items-center border-white/30 md:hover:scale-105 duration-300 rounded-lg flex flex-col"
                key={product.id}
              >
                <Link href={`/products/${product.id}`}>
                  <li className="cursor-pointer flex flex-col items-center">
                    <Image
                      alt={product.name}
                      width={150}
                      height={150}
                      src={imageUrl}
                      draggable="false"
                      className="rounded-lg object-cover"
                    />
                    <strong className="mt-2">{product.name}</strong>
                    <div className="text-lg font-semibold text-gray-700">
                      ${product.price}
                    </div>
                  </li>
                </Link>
                <div>
                  <AddToCartButton
                    id={product.id}
                    name={product.name}
                    price={product.price}
                  />
                </div>
              </div>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500">Нет товаров для отображения</p>
      )}
    </div>
  )
}
