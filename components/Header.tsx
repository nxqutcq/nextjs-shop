'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { DesktopMenu } from '@/components/DesktopMenu'
import { BurgerButton } from '@/components/BurgerButton'
import { MobileMenu } from '@/components/MobileMenu'
import { SearchBar } from './SearchBar'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.top = `-${scrollY}px`
    } else {
      const scrollY = parseInt(document.body.style.top || '0') * -1
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [isOpen])

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
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-30" />
      )}
      <header className="bg-background text-foreground md:text-xs fixed top-0 left-0 right-0 z-50 shadow-md dark:shadow-neutral-300/10 flex items-center justify-between px-4 h-[3rem]">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <Link href="/">
            <h1 className="text-2xl font-bold">Shop</h1>
          </Link>
          <div className="flex w-full items-center justify-end">
            <SearchBar />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <DesktopMenu />
            <BurgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
            {isOpen && <MobileMenu onLinkClick={closeMenu} />}
          </div>
        </div>
      </header>
    </>
  )
}
