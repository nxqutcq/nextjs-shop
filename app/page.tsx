import { supabase } from '@/app/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProductsPage() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, price, image_path')
  if (error) {
    console.error('Ошибка загрузки товаров:', error)
    return <div>Ошибка загрузки товаров</div>
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Все товары</h1>
      {products.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const imageUrl = supabase.storage
              .from('Product_pictures')
              .getPublicUrl(product.image_path).data.publicUrl
            return (
              <Link key={product.id} href={`/products/${product.id}`}>
                <li className="p-4 cursor-pointer hover:scale-105 duration-300 border rounded-lg shadow-md flex flex-col items-center">
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
                    {product.price}
                  </div>
                </li>
              </Link>
            )
          })}
        </ul>
      ) : (
        <p className="text-gray-500">Нет товаров для отображения</p>
      )}
    </div>
  )
}
