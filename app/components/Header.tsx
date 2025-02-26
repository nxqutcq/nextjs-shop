import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black z-50 text-white top-0 text-xs backdrop-blur-md overflow-hidden shadow-md sticky flex justify-start gap-5 items-center">
      <h1 className="text-2xl ml-2 pl-4 font-bold">Shop</h1>
      <nav className="h-full">
        <ul className="flex flex-wrap duration-300 h-full">
          <li className="hover:bg-slate-100/20 flex h-full">
            <Link className="h-full flex p-4" href="/">
              Главная
            </Link>
          </li>
          <li className="hover:bg-slate-100/20 h-full">
            <Link className="h-full flex p-4" href="/categories">
              <span className="flex items-center">Категории</span>
            </Link>
          </li>
          <li className="hover:bg-slate-100/20 h-full">
            <Link
              className="h-full flex-wrap items-center justify-center flex p-4 gap-1"
              href="/cart"
            >
              <Image
                src="/icons/cart2.svg"
                width={15}
                height={15}
                alt="cart-icon"
              />
              <span className="items-center flex">Корзина</span>
            </Link>
          </li>
          <li className="hover:bg-slate-100/20 h-full">
            <Link className="h-full flex p-4" href="/login">
              <span className="items-center flex">Войти</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
