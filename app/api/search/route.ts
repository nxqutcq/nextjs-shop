import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(request: Request) {
  const { searchText } = Object.fromEntries(new URL(request.url).searchParams)
  const { data, error } = await supabase
    .from('products')
    .select('id, name, price, image_path')
    .ilike('name', `%${searchText}%`)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const enrichedData = data.map((product) => {
    const {
      data: { publicUrl },
    } = supabase.storage
      .from('Product_pictures')
      .getPublicUrl(product.image_path)
    return { ...product, publicUrl }
  })

  return NextResponse.json(enrichedData)
}
