'use client'
import { useState } from 'react'
import Link from 'next/link'
import { BurgerButton } from './BurgerButton'
import { DesktopMenu } from './DesktopMenu'
import { MobileMenu } from './MobileMenu'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="bg-black text-white fixed top-0 left-0 right-0 z-50 shadow-md flex items-center justify-between px-4 py-3">
      <Link href="/">
        <h1 className="text-2xl font-bold">Shop</h1>
      </Link>
      <DesktopMenu />
      <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
      {isOpen && <MobileMenu onLinkClick={closeMenu} />}
    </header>
  )
}
