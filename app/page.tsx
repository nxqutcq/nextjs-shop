import { SearchBar } from '@/components/SearchBar'
import AllProducts from '@/components/AllProducts'

export default async function ProductsPage() {
  return (
    <div className="min-h-dvh max-w-7xl mx-auto">
      <SearchBar />
      <AllProducts />
    </div>
  )
}
