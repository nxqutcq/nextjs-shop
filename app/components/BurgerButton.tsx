'use client'
import { FC } from 'react'
import { useCartStore } from '../store/cartStore'

interface BurgerButtonProps {
  isOpen: boolean
  toggleMenu: () => void
}

export const BurgerButton: FC<BurgerButtonProps> = ({ isOpen, toggleMenu }) => {
  const distinctItemsCount = useCartStore((state) => state.items.length)
  return (
    <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
      <div className="flex flex-col items-center justify-center gap-1 p-2">
        <span
          className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2' : ''
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-current transition duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
          }`}
        >
          {distinctItemsCount > 0 && (
            <span
              className={`${
                isOpen ? 'hidden' : 'block'
              } absolute bottom-1 left-4 p-2 inline-flex items-center justify-center w-3 h-3 text-xs font-bold text-red-100 bg-red-600 rounded-full`}
            >
              {distinctItemsCount}
            </span>
          )}
        </span>
      </div>
    </button>
  )
}
