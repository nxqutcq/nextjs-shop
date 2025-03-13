export interface Product {
  id: string
  name: string
  price: number
  description: string
  category: string
  image_path: string
  publicUrl?: string 
}

export type ProductsWithoutDescription = Omit<Product, 'description'>

export interface AllProductsWithoutDescription {
  products: ProductsWithoutDescription[]
}

export type SearchBarProducts = Omit<Product, 'description' | 'category'>
