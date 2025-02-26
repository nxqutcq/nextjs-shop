import Link from 'next/link'
import Image from 'next/image'

interface MobileMenuProps {
  onLinkClick: () => void
}

export function MobileMenu({ onLinkClick }: MobileMenuProps) {
  return (
    <nav className="absolute top-full border-b-2 border-b-gray-300/20 left-0 w-full bg-black/90 backdrop-blur-[3px] md:hidden">
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
        <li className="hover:bg-slate-100/20">
          <Link className="block p-4" href="/cart" onClick={onLinkClick}>
            <div className="flex items-center gap-1">
              <Image
                src="/icons/cart2.svg"
                width={15}
                height={15}
                alt="cart-icon"
              />
              <span>Корзина</span>
            </div>
          </Link>
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
