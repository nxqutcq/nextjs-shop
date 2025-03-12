'use client'

import React from 'react'
import Link from 'next/link'
import { useCartStore } from '../store/cartStore'
import { CartSvg } from './shared/icons/CartSvg'

const CartIcon = () => {
  const distinctItemsCount = useCartStore((state) => state.items.length)
  return (
    <Link href="/cart" className="relative items-center flex p-4 gap-1">
      <div className="h-4 w-4">
        <CartSvg />
      </div>
      <span>Корзина</span>
      {distinctItemsCount > 0 && (
        <span className="absolute top-3 md:top-2 left-5 p-2 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-red-100 bg-red-600 rounded-full transition-opacity duration-300 ease-in-out opacity-0 animate-fadeIn">
          {distinctItemsCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon
