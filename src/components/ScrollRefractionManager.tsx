import { useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'

export function ScrollRefractionManager() {
  const { themeSettings } = useTheme()

  useEffect(() => {
    if (themeSettings.enable_animations === false || themeSettings.performance_mode) {
      return
    }

    let scrollTimeout: number | null = null
    
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = Math.min(scrollY / maxScroll, 1)
      
      // Update CSS variables for scroll-based effects
      document.documentElement.style.setProperty('--scroll-angle', `${scrollProgress * 360}deg`)
      document.documentElement.style.setProperty('--refraction-opacity', String(0.6 + scrollProgress * 0.4))
      
      // Add scrolling class to glass cards
      const glassCards = document.querySelectorAll('.glass-card')
      glassCards.forEach(card => {
        card.classList.add('scrolling')
      })
      
      // Remove scrolling class after animation
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      
      scrollTimeout = window.setTimeout(() => {
        glassCards.forEach(card => {
          card.classList.remove('scrolling')
        })
      }, 800)
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      
      document.documentElement.style.setProperty('--mouse-x', `${x}%`)
      document.documentElement.style.setProperty('--mouse-y', `${y}%`)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [themeSettings.enable_animations, themeSettings.performance_mode])

  return null
}