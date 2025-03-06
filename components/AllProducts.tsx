'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AddToCartButton } from '@/components/AddToCartButton'
import { supabase } from '@/lib/supabaseClient'
import { AllProductsWithoutDescription } from '@/types/product'

export default function AllProducts({
  products,
}: AllProductsWithoutDescription) {
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
                className="border border-white/20 rounded-lg shadow-xs dark:shadow-md shadow-md dark:shadow-white/20 hover:scale-105 hover:shadow-md dark:hover:shadow-white/30 transition-transform duration-200"
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
    </div>
  )
}
