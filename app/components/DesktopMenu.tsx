import Link from 'next/link'
import Image from 'next/image'

export function DesktopMenu() {
  return (
    <nav className="hidden md:block">
      <ul className="flex">
        <li className="hover:bg-slate-100/20">
          <Link className="flex p-4" href="/">
            Главная
          </Link>
        </li>
        <li className="hover:bg-slate-100/20">
          <Link className="flex p-4" href="/categories">
            Категории
          </Link>
        </li>
        <li className="hover:bg-slate-100/20">
          <Link className="flex p-4 gap-1" href="/cart">
            <Image
              src="/icons/cart2.svg"
              width={15}
              height={15}
              alt="cart-icon"
            />
            <span>Корзина</span>
          </Link>
        </li>
        <li className="hover:bg-slate-100/20">
          <Link className="flex p-4" href="/login">
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  )
}
