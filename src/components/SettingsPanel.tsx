import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { ThemeSettings } from '../types'

interface SettingsPanelProps {
  onClose: () => void
  themeSettings: ThemeSettings
  onUpdateSettings: (settings: Partial<ThemeSettings>) => void
}

export function SettingsPanel({ onClose, themeSettings, onUpdateSettings }: SettingsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">主题设置</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              主题颜色
            </label>
            <select
              value={themeSettings.theme_color || '蓝色'}
              onChange={(e) => onUpdateSettings({ theme_color: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:border-white/40 focus:outline-none"
            >
              <option value="蓝色">蓝色</option>
              <option value="紫色">紫色</option>
              <option value="绿色">绿色</option>
              <option value="橙色">橙色</option>
              <option value="粉色">粉色</option>
              <option value="青色">青色</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              玻璃透明度: {themeSettings.glass_opacity || 20}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={themeSettings.glass_opacity || 20}
              onChange={(e) => onUpdateSettings({ glass_opacity: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              玻璃模糊度: {themeSettings.glass_blur || 16}px
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={themeSettings.glass_blur || 16}
              onChange={(e) => onUpdateSettings({ glass_blur: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              启用动画效果
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={themeSettings.enable_animations !== false}
                onChange={(e) => onUpdateSettings({ enable_animations: e.target.checked })}
                className="mr-2"
              />
              <span className="text-white/70">启用液态玻璃动画</span>
            </label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}