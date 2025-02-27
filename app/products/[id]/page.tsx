import { AddToCartButton } from '@/components/AddToCartButton'
import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const productId = Number(id)

  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (error) {
    return <div>Продукт не найден</div>
  }

  const imageUrl = supabase.storage
    .from('Product_pictures')
    .getPublicUrl(product.image_path).data.publicUrl

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-primary">Цена: ${product.price}</p>
          <p className="text-foreground">Описание: {product.description}</p>
          <div className="max-w-64">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
