import Link from 'next/link'
import CartIcon from './CartIcon'

export function DesktopMenu() {
  return (
    <nav className="hidden md:block">
      <ul className="flex font-bold">
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
          <CartIcon />
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
