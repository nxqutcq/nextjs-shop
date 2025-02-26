import { FC } from 'react'

interface BurgerButtonProps {
  isOpen: boolean
  toggleMenu: () => void
}

export const BurgerButton: FC<BurgerButtonProps> = ({ isOpen, toggleMenu }) => (
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
      ></span>
    </div>
  </button>
)
