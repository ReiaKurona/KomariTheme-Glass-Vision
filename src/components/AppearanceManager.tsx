import { useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

export function AppearanceManager() {
  const { themeSettings } = useTheme()

  useEffect(() => {
    const applyAppearanceMode = () => {
      const mode = themeSettings.appearance_mode || '跟随系统'
      
      const body = document.body
      
      // Remove existing classes
      body.classList.remove('light', 'dark')
      
      switch (mode) {
        case '浅色模式':
          body.classList.add('light')
          break
        case '暗黑模式':
          body.classList.add('dark')
          break
        case '跟随系统':
        default:
          // Follow system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          body.classList.add(prefersDark ? 'dark' : 'light')
          break
      }
    }

    // 初始应用
    applyAppearanceMode()

    // 监听系统主题变化（仅在跟随系统模式下）
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = () => {
      if (themeSettings.appearance_mode === '跟随系统' || !themeSettings.appearance_mode) {
        applyAppearanceMode()
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [themeSettings.appearance_mode])

  return null
}