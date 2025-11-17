import { useEffect, useState } from 'react'
import { useTheme } from '../hooks/useTheme'

export function BackgroundManager() {
  const { themeSettings } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const body = document.body
    
    // Get background URL based on device type
    const bgUrl = isMobile 
      ? themeSettings.bg_mobile_url 
      : themeSettings.bg_desktop_url
    
    if (bgUrl) {
      body.style.backgroundImage = `url(${bgUrl})`
      
      // Apply alignment
      const alignmentMap: Record<string, string> = {
        '居中': 'bg-alignment-center',
        '拉伸': 'bg-alignment-stretch',
        '平铺': 'bg-alignment-tile',
        '顶部': 'bg-alignment-top',
        '底部': 'bg-alignment-bottom'
      }
      
      // Remove all alignment classes
      Object.values(alignmentMap).forEach(className => {
        body.classList.remove(className)
      })
      
      // Add current alignment class
      const alignmentClass = alignmentMap[themeSettings.bg_alignment || '居中']
      if (alignmentClass) {
        body.classList.add(alignmentClass)
      }
    } else {
      // Default gradient background
      body.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      body.style.backgroundSize = 'cover'
      body.style.backgroundPosition = 'center'
      body.style.backgroundRepeat = 'no-repeat'
    }
    
    // 移动端背景修复：使用 scroll 而不是 fixed
    body.style.backgroundAttachment = isMobile ? 'scroll' : 'fixed'
    
    return () => {
      // Cleanup on unmount
      body.style.backgroundImage = ''
      body.style.backgroundSize = ''
      body.style.backgroundPosition = ''
      body.style.backgroundRepeat = ''
      body.style.backgroundAttachment = ''
    }
  }, [themeSettings.bg_desktop_url, themeSettings.bg_mobile_url, themeSettings.bg_alignment, isMobile])

  return null
}