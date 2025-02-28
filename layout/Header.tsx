'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DesktopMenu } from '@/components/DesktopMenu'
import { BurgerButton } from '@/components/BurgerButton'
import { MobileMenu } from '@/layout/MobileMenu'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest('.mobile-menu') &&
        !event.target.closest('.burger-button')
      ) {
        closeMenu()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('body-no-scroll')
    } else {
      document.body.classList.remove('body-no-scroll')
    }
  }, [isOpen])

  return (
    <header className="bg-background text-foreground md:text-xs fixed top-0 left-0 right-0 z-50 shadow-md dark:shadow-white/20 flex items-center justify-between px-4 h-[3rem]">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <Link href="/">
          <h1 className="text-2xl font-bold">Shop</h1>
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
          <DesktopMenu />
          <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
          {isOpen && <MobileMenu onLinkClick={closeMenu} />}
        </div>
      </div>
    </header>
  )
}
