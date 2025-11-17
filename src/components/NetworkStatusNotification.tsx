import { motion, AnimatePresence } from 'framer-motion'
import { Wifi, WifiOff } from 'lucide-react'

interface NetworkStatusNotificationProps {
  isConnected: boolean
  isReconnecting: boolean
}

export function NetworkStatusNotification({ isConnected, isReconnecting }: NetworkStatusNotificationProps) {
  const showNotification = !isConnected || isReconnecting

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="glass-card p-4 flex items-center space-x-3">
            {isReconnecting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Wifi size={20} className="text-yellow-400" />
              </motion.div>
            ) : (
              <WifiOff size={20} className="text-red-400" />
            )}
            <span className="text-white text-sm">
              {isReconnecting ? '正在重连...' : '连接断开'}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}