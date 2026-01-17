import { useEffect, useState } from 'react'
import { HiMoon, HiSun } from 'react-icons/hi'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    return savedTheme || 'light'
  })

  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-circle btn-ghost border-2 border-base-content"
      aria-label="Alternar tema"
    >
      {theme === 'light' ? (
        <HiMoon className="h-6 w-6" />
      ) : (
        <HiSun className="h-6 w-6" />
      )}
    </button>
  )
}
