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
      className="mt-2 px-4 w-full py-2 rounded bg-foreground text-background hover:bg-background/20 active:bg-background/30 active:scale-95 transition duration-300"
    >
      Добавить в корзину
    </button>
  )
}
