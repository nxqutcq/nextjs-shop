import { AddToCartButton } from '@/components/AddToCartButton'
import { supabase } from '@/lib/supabaseClient'
import { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const productId = Number((await params).id)
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  return {
    title: product?.name || 'Продукт не найден',
    description: product?.description || 'Описание продукта',
  }
}

export default async function ProductPage(props: PageProps) {
  const { id } = await props.params
  const productId = Number(id)

  return (
    <div className="max-w-7xl mx-auto">
      <Suspense fallback={<Loader />}>
        <ProductContent productId={productId} />
      </Suspense>
    </div>
  )
}

function Loader() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="animate-pulse bg-gray-200 rounded-lg aspect-square" />
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-3/4" />
        <div className="h-6 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="h-12 bg-gray-200 rounded w-64" />
      </div>
    </div>
  )
}

async function ProductContent({ productId }: { productId: number }) {
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', productId)
    .single()

  if (error) {
    throw new Error('Продукт не найден')
  }

  const imageUrl = supabase.storage
    .from('Product_pictures')
    .getPublicUrl(product.image_path).data.publicUrl

  return (
    <div className="grid md:grid-cols-2 p-4 gap-8">
      <div className="relative aspect-square">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          priority
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
  )
}
