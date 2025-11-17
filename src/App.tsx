import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Grid3x3, BarChart3, Sun, Moon, Monitor, Activity } from 'lucide-react'
import { ThemeProvider } from './contexts/ThemeContext'
import { useTheme } from './hooks/useTheme'
import { useKomariAPI } from './hooks/useKomariAPI'
import { NodeGrid } from './components/NodeGrid'
import { NodeCompact } from './components/NodeCompact'
import { NodeTable } from './components/NodeTable'
import { NodeDetail } from './components/NodeDetail'
import { SettingsPanel } from './components/SettingsPanel'
import { LoadingScreen } from './components/LoadingScreen'
import { BackgroundManager } from './components/BackgroundManager'
import { ScrollRefractionManager } from './components/ScrollRefractionManager'
import { AppearanceManager } from './components/AppearanceManager'
import { NetworkStatusNotification } from './components/NetworkStatusNotification'
import { GlobalStats } from './components/GlobalStats'
import { useMobile } from './hooks/useMobile'
import type { ViewMode } from './types'

function AppContent() {
  const { themeSettings, updateThemeSettings, publicConfig } = useTheme()
  const { nodes, nodeStatuses, isLoading, wsConnected, isReconnecting } = useKomariAPI()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const isMobile = useMobile()

  // 从本地存储恢复视图模式
  useEffect(() => {
    const savedViewMode = localStorage.getItem('nodeViewMode') as ViewMode
    if (savedViewMode && ['grid', 'compact', 'table'].includes(savedViewMode)) {
      setViewMode(savedViewMode)
    }
  }, [])

  // 从主题设置获取默认视图模式
  useEffect(() => {
    if (themeSettings.default_view_mode) {
      const modeMap: Record<string, ViewMode> = {
        '网格': 'grid',
        '紧凑': 'compact',
        '表格': 'table'
      }
      const defaultMode = modeMap[themeSettings.default_view_mode]
      if (defaultMode) {
        setViewMode(defaultMode)
      }
    }
  }, [themeSettings.default_view_mode])

  const handleViewModeChange = (mode: ViewMode) => {
    React.startTransition(() => {
      setViewMode(mode)
      localStorage.setItem('nodeViewMode', mode)
    })
  }

  // 主题切换功能
  const toggleTheme = () => {
    const currentMode = themeSettings.appearance_mode || '跟随系统'
    let nextMode = ''
    
    switch (currentMode) {
      case '跟随系统':
        nextMode = '浅色模式'
        break
      case '浅色模式':
        nextMode = '暗黑模式'
        break
      case '暗黑模式':
        nextMode = '跟随系统'
        break
      default:
        nextMode = '跟随系统'
    }
    
    updateThemeSettings({ appearance_mode: nextMode })
  }

  // 获取当前主题图标
  const getThemeIcon = () => {
    const mode = themeSettings.appearance_mode || '跟随系统'
    switch (mode) {
      case '浅色模式':
        return Sun
      case '暗黑模式':
        return Moon
      default:
        return Monitor
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen">
      <BackgroundManager />
      <ScrollRefractionManager />
      <AppearanceManager />
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-0 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                {publicConfig?.sitename || 'Komari Monitor'}
              </h1>
              {!wsConnected && (
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Activity size={16} />
                  <span className="text-sm">
                    {isReconnecting ? '重连中...' : '连接断开'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {/* 全局统计 */}
              <GlobalStats nodes={nodes} nodeStatuses={nodeStatuses} />

              {/* 视图切换 */}
              <div className="flex items-center space-x-1 glass-button rounded-lg p-1">
                <motion.button
                  onClick={() => handleViewModeChange('grid')}
                  className={`p-1.5 rounded transition-all duration-200 ${
                    viewMode === 'grid' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid3x3 size={isMobile ? 14 : 16} />
                </motion.button>
                <motion.button
                  onClick={() => handleViewModeChange('compact')}
                  className={`p-1.5 rounded transition-all duration-200 ${
                    viewMode === 'compact' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <BarChart3 size={isMobile ? 14 : 16} />
                </motion.button>
                <motion.button
                  onClick={() => handleViewModeChange('table')}
                  className={`p-1.5 rounded transition-all duration-200 ${
                    viewMode === 'table' 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </motion.button>
              </div>

              {/* 主题切换 */}
              <motion.button
                onClick={toggleTheme}
                className="glass-button p-2 rounded-lg text-white/70 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={`当前: ${themeSettings.appearance_mode || '跟随系统'}`}
              >
                {React.createElement(getThemeIcon(), { size: isMobile ? 14 : 18 })}
              </motion.button>

              {/* 设置按钮 */}
              <motion.button
                onClick={() => setShowSettings(true)}
                className="glass-button p-2 rounded-lg text-white/70 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Settings size={isMobile ? 14 : 18} />
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {selectedNode ? (
            <NodeDetail
              key="detail"
              nodeId={selectedNode}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {viewMode === 'grid' && (
                <NodeGrid
                  nodes={nodes}
                  nodeStatuses={nodeStatuses}
                  onNodeClick={setSelectedNode}
                />
              )}
              {viewMode === 'compact' && (
                <NodeCompact
                  nodes={nodes}
                  nodeStatuses={nodeStatuses}
                  onNodeClick={setSelectedNode}
                />
              )}
              {viewMode === 'table' && (
                <NodeTable
                  nodes={nodes}
                  nodeStatuses={nodeStatuses}
                  onNodeClick={setSelectedNode}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-white/50 text-sm">
        Powered by Komari Monitor.
      </footer>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            onClose={() => setShowSettings(false)}
            themeSettings={themeSettings}
            onUpdateSettings={updateThemeSettings}
          />
        )}
      </AnimatePresence>

      {/* Network Status Notification */}
      <NetworkStatusNotification 
        isConnected={wsConnected}
        isReconnecting={isReconnecting}
      />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App