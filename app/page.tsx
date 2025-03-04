import AllProducts from '@/components/AllProducts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Главная',
}

export default async function ProductsPage() {
  return (
    <div className="min-h-dvh max-w-7xl mx-auto">
      <AllProducts />
    </div>
  )
}
