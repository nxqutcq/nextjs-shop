'use client'
import React from 'react'
import { useCartStore } from '../../store/cartStore'

export default function Cart() {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore()

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleIncrement = (id: string, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1)
  }

  const handleDecrement = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1)
    } else {
      removeItem(id)
    }
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <p className="text-lg text-gray-600">Корзина пуста</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto min-h-dvh">
      <h1 className="text-2xl font-bold mb-4">Корзина</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border border-white/20 p-3 px-5 rounded shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">Цена: ${item.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDecrement(item.id, item.quantity)}
                className="px-2 py-1 bg-gray-200/20 rounded hover:bg-gray-300/35 active:scale-95 transition"
              >
                –
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => handleIncrement(item.id, item.quantity)}
                className="px-2 py-1 bg-gray-200/20 rounded hover:bg-gray-300/35 transition active:scale-95"
              >
                +
              </button>
            </div>
            <div className="text-lg font-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-t-white/20 pt-4">
        <p className="text-lg">
          Всего товаров: <span className="font-bold">{totalQuantity}</span>
        </p>
        <p className="text-lg">
          Общая сумма:{' '}
          <span className="font-bold">${totalPrice.toFixed(2)}</span>
        </p>
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={clearCart}
          className="px-4 active:scale-95 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Очистить корзину
        </button>
        <button className="px-4 py-2 active:scale-95 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Оформить заказ
        </button>
      </div>
    </div>
  )
}
