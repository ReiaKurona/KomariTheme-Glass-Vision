import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { ThemeSettings, PublicConfig } from '../types'

interface ThemeContextType {
  themeSettings: ThemeSettings
  updateThemeSettings: (settings: Partial<ThemeSettings>) => void
  publicConfig: PublicConfig | null
  isLoading: boolean
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({})
  const [publicConfig, setPublicConfig] = useState<PublicConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPublicConfig()
  }, [])

  const fetchPublicConfig = async () => {
    try {
      const response = await fetch('/api/public')
      const data = await response.json()
      
      if (data.status === 'success') {
        setPublicConfig(data.data)
        if (data.data.theme_settings) {
          setThemeSettings(data.data.theme_settings)
        }
      }
    } catch (error) {
      console.error('Failed to fetch theme settings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateThemeSettings = (newSettings: Partial<ThemeSettings>) => {
    setThemeSettings(prev => ({ ...prev, ...newSettings }))
  }

  // Apply theme settings to CSS variables
  useEffect(() => {
    const root = document.documentElement
    
    // Theme color
    const themeColorMap: Record<string, string> = {
      '蓝色': 'theme-blue',
      '紫色': 'theme-purple', 
      '绿色': 'theme-green',
      '橙色': 'theme-orange',
      '粉色': 'theme-pink',
      '青色': 'theme-cyan'
    }
    
    const themeClass = themeColorMap[themeSettings.theme_color || '蓝色'] || 'theme-blue'
    
    // Remove all theme classes
    Object.values(themeColorMap).forEach(className => {
      document.body.classList.remove(className)
    })
    
    // Add current theme class
    document.body.classList.add(themeClass)
    
    // Set CSS variables
    root.style.setProperty('--glass-opacity', String(themeSettings.glass_opacity ?? 20))
    root.style.setProperty('--glass-blur', `${themeSettings.glass_blur ?? 16}px`)
    root.style.setProperty('--card-radius', `${themeSettings.card_radius ?? 24}px`)
    
    // 强制重新渲染以应用新的 CSS 变量
    document.body.style.display = 'none'
    document.body.offsetHeight // 触发重排
    document.body.style.display = ''
  }, [themeSettings])

  return (
    <ThemeContext.Provider value={{
      themeSettings,
      updateThemeSettings,
      publicConfig,
      isLoading
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}