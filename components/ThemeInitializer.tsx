'use client'
import { useEffect } from 'react'
import { useThemeStore } from '../store/themeStore'

export default function ThemeInitializer() {
  const { theme } = useThemeStore()
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  return null
}
