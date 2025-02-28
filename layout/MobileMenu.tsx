import CartIcon from '@/components/CartIcon'
import Link from 'next/link'

interface MobileMenuProps {
  onLinkClick: () => void
}

export function MobileMenu({ onLinkClick }: MobileMenuProps) {
  return (
    <nav className="absolute top-full border-b-2 text-foreground border-t-2 border-t-gray-300/20 border-b-gray-300/20 left-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-[3px] md:hidden">
      <ul className="flex flex-col">
        <li className="hover:bg-slate-100/20">
          <Link className="block p-4" href="/" onClick={onLinkClick}>
            Главная
          </Link>
        </li>
        <li className="hover:bg-slate-100/20">
          <Link className="block p-4" href="/categories" onClick={onLinkClick}>
            Категории
          </Link>
        </li>
        <li onClick={onLinkClick} className="hover:bg-slate-100/20">
          <CartIcon />
        </li>
        <li className="hover:bg-slate-100/20">
          <Link className="block p-4" href="/login" onClick={onLinkClick}>
            Войти
          </Link>
        </li>
      </ul>
    </nav>
  )
}
