'use client'
import React from 'react'
import { useCartStore } from '../store/cartStore'

interface AddToCartButtonProps {
  id: string
  name: string
  price: number
}

export function AddToCartButton({ id, name, price }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    addItem({ id, name, price, quantity: 1 })
  }

  return (
    <button
      onClick={handleAdd}
      className="mt-2 px-4 w-full py-2 text-white rounded bg-white/10 hover:bg-white/20 active:bg-white/30 active:scale-95 transition duration-300"
    >
      Добавить в корзину
    </button>
  )
}
